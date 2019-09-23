#include <WiFi.h>
#include <map>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
////------------------------------
#include <WiFiClientSecure.h>

//--------------------------------------------------------
#define SSID "senorita"
#define PASSWORD "bally000"
#define FIREBASE_HOST "https://finalprojectcoe.firebaseio.com/"
#define FIREBASE_AUTH "a0RKKalOcerf7tZngMLTYwar8eMahjUvppIcoXpR"
//--------------------------------------------------------
/* ฟังกชั่น สำหรับ รับและส่งข้อมูลไปยัง Firebase ใช้สำหรับ ESP32 */
String  TD32_Get_Firebase(String path );               // รับค่า path จาก Firebase
int     TD32_Set_Firebase(String path, String value, bool push = false ); // ส่งค่าขึ้น Firebase  (ทับข้อมูลเดิมใน path เดิม)
int     TD32_Push_Firebase(String path, String value); // ส่งค่าขึ้น Firebase แบบ Pushing data  (เพิ่มเข้าไปใหม่เรื่อยๆใน path เดิม)
//--------------------------------------------------------


////WiFi
// include Non-OS SDK functions
#include "esp_wifi.h"
const wifi_promiscuous_filter_t filt = {
  .filter_mask = WIFI_PROMIS_FILTER_MASK_MGMT | WIFI_PROMIS_FILTER_MASK_DATA
};
typedef struct {
  uint8_t mac[6];
} __attribute__((packed)) MacAddr;

typedef struct {
  int16_t fctl;
  int16_t duration;
  MacAddr da;
  MacAddr sa;
  MacAddr bssid;
  int16_t seqctl;
  unsigned char payload[];
} __attribute__((packed)) WifiMgmtHdr;



// ===== SETTINGS ===== //
#define LED 2              /* LED pin (2=built-in LED) */
#define LED_INVERT true    /* Invert HIGH/LOW for LED */
#define SERIAL_BAUD 115200 /* Baudrate for serial communication */
#define CH_TIME 140        /* Scan time (in ms) per channel */
#define PKT_RATE 5         /* Min. packets before it gets recognized as an attack */
#define PKT_TIME 1         /* Min. interval (CH_TIME*CH_RANGE) before it gets recognized as an attack */

// Channels to scan on (US=1-11, EU=1-13, JAP=1-14)
const short channels[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13/*,14*/ };

// ===== Runtime variables ===== //
int ch_index { 0 };               // Current index of channel array
int packet_rate { 0 };            // Deauth packet counter (resets with each update)
int attack_counter { 0 };         // Attack counter
unsigned long update_time { 0 };  // Last update time
unsigned long ch_time { 0 };      // Last channel hop time
int period = 0;
bool found = false;
bool configDone = false;
bool customizeDone = false;
// variables added for training experiment
bool trainingend = false;
int count = 0;
int deauthCountMax = 0;
int probeCountMax = 0;
int beaconCountMax = 0;
int temp1, temp2, temp3;

//
std::map<uint8_t*, int> memforbeacon;
std::map<uint8_t*, int> memfordeauth;
std::map<uint8_t*, int> memforprobe;
std::map<uint8_t*, int>::iterator it;

// ===== Sniffer function ===== //
void sniffer(void* buff, wifi_promiscuous_pkt_type_t type) {
  //Serial.println("packet incoming");
  std::map<uint8_t*, int> ::iterator itrfordeauth;
  std::map<uint8_t*, int> ::iterator itrforbeacon;
  std::map<uint8_t*, int> ::iterator itrforprobe;
  if (type == WIFI_PKT_MGMT) {
    // Serial.println("packet caught");
    wifi_promiscuous_pkt_t *p = (wifi_promiscuous_pkt_t*)buff;
    int len = p->rx_ctrl.sig_len;
    WifiMgmtHdr *wh = (WifiMgmtHdr*)p->payload;
    len -= sizeof(WifiMgmtHdr);
    if (len < 0) return;
    int fctl = ntohs(wh->fctl);

    //  byte pkt_type = buf[12]; // second half of frame control field
    //  byte* addr_a = &buf[16]; // first MAC address
    //  byte* addr_b = &buf[22]; // second MAC address

    // If captured packet is a deauthentication or dissassociaten frame
    //
    MacAddr addr_aa = (wh->da);
    byte* addr_a =  addr_aa.mac;
    MacAddr addr_bb = (wh->sa);
    byte* addr_b =  addr_bb.mac;
    // Serial.println(fctl,HEX);
    //
    if (fctl == 0x0A000 || fctl == 0x0C000) {
      //  Serial.println("DEAUTH");
      itrfordeauth = memfordeauth.find(addr_a);
      if (itrfordeauth == memfordeauth.end())
      {
        memfordeauth[addr_a] = 1;
      }
      else
      {
        temp1 = (int)(itrfordeauth->second + 1);
        memfordeauth[addr_a] = itrfordeauth->second + 1;
        if (configDone == true && trainingend == false)
        {
            if (temp1 > deauthCountMax)
            {
              deauthCountMax = temp1;
            }
        }
        else if (configDone == true && trainingend == true)
        {
          if (temp1 > deauthCountMax)
          {
            found = true;
            Serial.println("Alert now deauth =");
            Serial.println(temp1);
            delay(4000);
            TD32_Set_Firebase("Project/attack", "deauthentication");
            delay(4000);
          }
        }
      }
    }
    if (fctl == 0x08000) {
      itrforbeacon = memforbeacon.find(addr_b);
      if (itrforbeacon == memforbeacon.end())
      {
        memforbeacon[addr_b] = 1;
      }
      else
      {
        temp2 = (int)(itrforbeacon->second + 1);
        memforbeacon[addr_b] = itrforbeacon->second + 1;

        if (configDone == true && trainingend == false)
        {
            if (temp2 > beaconCountMax)
            {
              beaconCountMax = temp2;
            } 
        }
        else if (configDone == true && trainingend == true)
        {
          if (temp2 > beaconCountMax * 5)
          {
            found = true;
            Serial.println("Alert now beacon =");
            Serial.println(temp2);
            delay(4000);
            TD32_Set_Firebase("Project/attack", "beacon frame spoofing");
            delay(4000);
          }
        }
      }
    }
    if (fctl == 0x04000 ) {

      itrforprobe = memforprobe.find(addr_a);
      if (itrforprobe == memforprobe.end())
      {
        memforprobe[addr_a] = 1;
      }
      else
      {
        temp3 = (int)(itrforprobe->second + 1);
        memforprobe[addr_a] = itrforprobe->second + 1;
        if (configDone == true && trainingend == false)
        {
            if (temp3 > probeCountMax)
            {
              probeCountMax = temp3;
            }
        }
        else if (configDone == true && trainingend == true)
        {
          if (temp3 > probeCountMax * 2)
          {
            found = true;
            Serial.println("Alert now probe =");
            Serial.println(temp3);
            delay(4000);
            TD32_Set_Firebase("Project/attack", "probe request");
            delay(4000);
          }
        }
      }
    }
  }
}






//BLUETOOTH
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
int dat;
class CallBackFunction1: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string rxValue = pCharacteristic->getValue();
      
      if (rxValue.length() > 0)
      {
        Serial.println("Start recieving");
        Serial.println("recieved:");
        Serial.println(rxValue.c_str());

        for (int i = 0; i < rxValue.length(); i++) {
          dat = (int)rxValue[i];
          Serial.println((int)rxValue[i]);
        }

        if (rxValue.length() == 1) {
          if(dat == 4){
              Serial.println("Start training");
              configDone = true;
              customizeDone = true;
              dat = 0;
          }else if(dat == 5){
              Serial.println("Recieve customize value");
              configDone = true;
              customizeDone = false;
              dat = 0;
          } 
        }
        else if(rxValue.length() == 3)
        {
          deauthCountMax = (int)rxValue[0];
          beaconCountMax = (int)rxValue[1];
          probeCountMax = (int)rxValue[2];
          Serial.print("set deauth: ");
          Serial.println(deauthCountMax);
          Serial.print("set beacon: ");
          Serial.println(beaconCountMax);
          Serial.print("set probe: ");
          Serial.println(probeCountMax);
          trainingend = true;
          configDone = true;
          customizeDone = true;
        }



        Serial.println(dat);
        Serial.println("End recieving");
      }
    }
};
// ===== Setup ===== //
void setup() {

  Serial.begin(SERIAL_BAUD); // Start serial communication
  pinMode(LED, OUTPUT); // Enable LED pin
  digitalWrite(LED, LOW);
  Serial.begin(115200);
  BLEDevice::init("WAD");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  //pCharacteristic->setValue("Hello World says Neil");
  pCharacteristic->setCallbacks(new CallBackFunction1());
  pService->start();
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("connecting to WIFI");
  }
  //TD32_Set_Firebase("name", "\"Trident_ESP32\"");
  wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
  esp_wifi_init(&cfg);
  esp_wifi_set_storage(WIFI_STORAGE_RAM);
  //  esp_wifi_set_mode(WIFI_MODE_NULL);
  esp_wifi_start();
  esp_wifi_set_promiscuous(true);
  esp_wifi_set_promiscuous_filter(&filt);
  esp_wifi_set_promiscuous_rx_cb(&sniffer);
  esp_wifi_set_channel(channels[0], WIFI_SECOND_CHAN_NONE);

  Serial.println("Started \\o/");
}


void detectAttack() {
  unsigned long current_time = millis(); // Get current time (in ms)

  // Update each second (or scan-time-per-channel * channel-range)
  if (current_time - update_time >= (sizeof(channels)*CH_TIME)) {
    update_time = current_time; // Update time variable
    if (configDone == false)
    {
      Serial.println("waiting");
    }

    //****When detected deauth packets exceed the minimum allowed number*****

    if (configDone == true && trainingend == false)
    {
          if(customizeDone == true){
            count++;  
          }else{
           delay(4000);
           TD32_Set_Firebase("Project/deauthmax", String(deauthCountMax)); 
           delay(4000);
           TD32_Set_Firebase("Project/beaconmax", String(beaconCountMax));
           delay(4000);
           TD32_Set_Firebase("Project/probemax", String(probeCountMax));
           delay(4000);
          }
          Serial.println("count=");
          Serial.println(count);
          Serial.println("deauthMax=");
          Serial.println(deauthCountMax);
          Serial.println("beaconMax=");
          Serial.println(beaconCountMax);
          Serial.println("probeMax=");
          Serial.println(probeCountMax);
    
          memforbeacon.clear();
          memfordeauth.clear();
          memforprobe.clear();
          if (count == 10)
          {
            if (deauthCountMax < 10)
            {
              deauthCountMax = 10;
            }
            if (beaconCountMax < 50)
            {
              beaconCountMax = 50;
            }
            if (probeCountMax < 30)
            {
              probeCountMax = 30;
            }
            //delay(4000);
            //TD32_Push_Firebase("Project/train", String(deauthCountMax));
            //delay(4000);
            trainingend = true;
          }    
       
      
    }
    else if (trainingend == true)
    {
      if (period >= 5)
      {
        if (found == true)
        {
          Serial.println("found");
        }
        else
        {
          Serial.println("not found");
        }

        memforbeacon.clear();
        memfordeauth.clear();
        memforprobe.clear();
        found = false;
        period = 0;
      }

      period++;


    }
  }

  //    //****When detected deauth packets exceed the minimum allowed number*****
  //
  //  //**************Channel hopping************************************
  if (sizeof(channels) > 1 && current_time - ch_time >= CH_TIME) {
    ch_time = current_time; // Update time variable

    // Get next channel
    ch_index = (ch_index + 1) % (sizeof(channels) / sizeof(channels[0]));
    short ch = channels[ch_index];

    // Set channel
    //Serial.print("Set channel to ");
    //Serial.println(ch);
    //    wifi_set_channel(ch);
    esp_wifi_set_channel(ch, WIFI_SECOND_CHAN_NONE);
  }
}

void loop() {
  detectAttack();
}


////------------------------------------
/**********************************************************
   ฟังกชั่น TD32_Set_Firebase
   สำหรับ ESP32 ใช้กำหนด ค่า value ให้ path ของ Firebase
   โดย path อยู่ใน รูปแบบ เช่น "Room/Sensor/DHT/Humid" เป็นต้น

   ทั้ง path และ  value ต้องเป็น ข้อมูลประเภท String
   และ คืนค่าฟังกชั่น กลับมาด้วย http code

   เช่น หากเชื่อมต่อไม่ได้ จะคืนค่าด้วย 404
   หากกำหนดลงที่ Firebase สำเร็จ จะคืนค่า 200 เป็นต้น

 **********************************************************/
// Root CA ของ https://www.firebaseio.com
// ใช้ได้ตั้งแต่ 01/08/2018 17:21:49 GMT ถึง หมดอายุสิ้นสุด 27/03/2019 00:00:00 GMT
const char* FIREBASE_ROOT_CA = \
                               "-----BEGIN CERTIFICATE-----\n" \
                               "MIIEXDCCA0SgAwIBAgINAeOpMBz8cgY4P5pTHTANBgkqhkiG9w0BAQsFADBMMSAw\n" \
                               "HgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMjETMBEGA1UEChMKR2xvYmFs\n" \
                               "U2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0xNzA2MTUwMDAwNDJaFw0yMTEy\n" \
                               "MTUwMDAwNDJaMFQxCzAJBgNVBAYTAlVTMR4wHAYDVQQKExVHb29nbGUgVHJ1c3Qg\n" \
                               "U2VydmljZXMxJTAjBgNVBAMTHEdvb2dsZSBJbnRlcm5ldCBBdXRob3JpdHkgRzMw\n" \
                               "ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDKUkvqHv/OJGuo2nIYaNVW\n" \
                               "XQ5IWi01CXZaz6TIHLGp/lOJ+600/4hbn7vn6AAB3DVzdQOts7G5pH0rJnnOFUAK\n" \
                               "71G4nzKMfHCGUksW/mona+Y2emJQ2N+aicwJKetPKRSIgAuPOB6Aahh8Hb2XO3h9\n" \
                               "RUk2T0HNouB2VzxoMXlkyW7XUR5mw6JkLHnA52XDVoRTWkNty5oCINLvGmnRsJ1z\n" \
                               "ouAqYGVQMc/7sy+/EYhALrVJEA8KbtyX+r8snwU5C1hUrwaW6MWOARa8qBpNQcWT\n" \
                               "kaIeoYvy/sGIJEmjR0vFEwHdp1cSaWIr6/4g72n7OqXwfinu7ZYW97EfoOSQJeAz\n" \
                               "AgMBAAGjggEzMIIBLzAOBgNVHQ8BAf8EBAMCAYYwHQYDVR0lBBYwFAYIKwYBBQUH\n" \
                               "AwEGCCsGAQUFBwMCMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFHfCuFCa\n" \
                               "Z3Z2sS3ChtCDoH6mfrpLMB8GA1UdIwQYMBaAFJviB1dnHB7AagbeWbSaLd/cGYYu\n" \
                               "MDUGCCsGAQUFBwEBBCkwJzAlBggrBgEFBQcwAYYZaHR0cDovL29jc3AucGtpLmdv\n" \
                               "b2cvZ3NyMjAyBgNVHR8EKzApMCegJaAjhiFodHRwOi8vY3JsLnBraS5nb29nL2dz\n" \
                               "cjIvZ3NyMi5jcmwwPwYDVR0gBDgwNjA0BgZngQwBAgIwKjAoBggrBgEFBQcCARYc\n" \
                               "aHR0cHM6Ly9wa2kuZ29vZy9yZXBvc2l0b3J5LzANBgkqhkiG9w0BAQsFAAOCAQEA\n" \
                               "HLeJluRT7bvs26gyAZ8so81trUISd7O45skDUmAge1cnxhG1P2cNmSxbWsoiCt2e\n" \
                               "ux9LSD+PAj2LIYRFHW31/6xoic1k4tbWXkDCjir37xTTNqRAMPUyFRWSdvt+nlPq\n" \
                               "wnb8Oa2I/maSJukcxDjNSfpDh/Bd1lZNgdd/8cLdsE3+wypufJ9uXO1iQpnh9zbu\n" \
                               "FIwsIONGl1p3A8CgxkqI/UAih3JaGOqcpcdaCIzkBaR9uYQ1X4k2Vg5APRLouzVy\n" \
                               "7a8IVk6wuy6pm+T7HT4LY8ibS5FEZlfAFLSW8NwsVz9SBK2Vqn1N0PIMn5xA6NZV\n" \
                               "c7o835DLAFshEWfC7TIe3g==\n" \
                               "-----END CERTIFICATE-----\n";

int TD32_Set_Firebase(String path, String value, bool push ) {
  WiFiClientSecure ssl_client;
  String host = String(FIREBASE_HOST); host.replace("https://", "");
  if (host[host.length() - 1] == '/' ) host = host.substring(0, host.length() - 1);
  String resp = "";
  int httpCode = 404; // Not Found

  String firebase_method = (push) ? "POST " : "PUT ";
  //  ssl_client.setCACert(FIREBASE_ROOT_CA);
  if ( ssl_client.connect( host.c_str(), 443)) {
    String uri = ((path[0] != '/') ? String("/") : String("")) + path + String(".json?auth=") + String(FIREBASE_AUTH);
    String request = "";
    request +=  firebase_method + uri + " HTTP/1.1\r\n";
    request += "Host: " + host + "\r\n";
    request += "User-Agent: TD_ESP32\r\n";
    request += "Connection: close\r\n";
    request += "Accept-Encoding: identity;q=1,chunked;q=0.1,*;q=0\r\n";
    request += "Content-Length: " + String( value.length()) + "\r\n\r\n";
    request += value;

    ssl_client.print(request);
    while ( ssl_client.connected() && !ssl_client.available()) delay(10);
    if ( ssl_client.connected() && ssl_client.available() ) {
      resp      = ssl_client.readStringUntil('\n');
      httpCode  = resp.substring(resp.indexOf(" ") + 1, resp.indexOf(" ", resp.indexOf(" ") + 1)).toInt();
    }
    ssl_client.stop();
  }
  else {
    Serial.println("[Firebase] can't connect to Firebase Host");
  }
  return httpCode;
}

/**********************************************************
   ฟังกชั่น TD32_Push_Firebase
   สำหรับ ESP32 ใช้กำหนด ค่า value ให้ path ของ Firebase
   แบบ Pushing data (เติมเข้าไปที่ path เรื่อยๆ ไม่ทับของเดิม)
   โดย path อยู่ใน รูปแบบ เช่น "Room/Sensor/DHT/Humid" เป็นต้น

   ทั้ง path และ  value ต้องเป็น ข้อมูลประเภท String
   และ คืนค่าฟังกชั่น กลับมาด้วย http code

   เช่น หากเชื่อมต่อไม่ได้ จะคืนค่าด้วย 404
   หากกำหนดลงที่ Firebase สำเร็จ จะคืนค่า 200 เป็นต้น

 **********************************************************/
int TD32_Push_Firebase(String path, String value) {
  return TD32_Set_Firebase(path, value, true);
}
/**********************************************************
   ฟังกชั่น TD32_Get_Firebase
   ใช้สำหรับ EPS32 รับ ค่า value ของ path ที่อยู่บน Firebase
   โดย path อยู่ใน รูปแบบ เช่น "Room/Sensor/DHT/Humid" เป็นต้น

   path เป็น ข้อมูลประเภท String
   คืนค่าของฟังกชั่น คือ value ของ path ที่กำหนด ในข้อมูลประเภท String

 **********************************************************/
String TD32_Get_Firebase(String path ) {
  WiFiClientSecure ssl_client;
  String host = String(FIREBASE_HOST); host.replace("https://", "");
  if (host[host.length() - 1] == '/' ) host = host.substring(0, host.length() - 1);
  String resp = "";
  String value = "";
  //  ssl_client.setCACert(FIREBASE_ROOT_CA);
  if ( ssl_client.connect( host.c_str(), 443)) {
    String uri = ((path[0] != '/') ? String("/") : String("")) + path + String(".json?auth=") + String(FIREBASE_AUTH);
    String request = "";
    request += "GET " + uri + " HTTP/1.1\r\n";
    request += "Host: " + host + "\r\n";
    request += "User-Agent: TD_ESP32\r\n";
    request += "Connection: close\r\n";
    request += "Accept-Encoding: identity;q=1,chunked;q=0.1,*;q=0\r\n\r\n";

    ssl_client.print( request);
    while ( ssl_client.connected() && !ssl_client.available()) delay(10);
    if ( ssl_client.connected() && ssl_client.available() ) {
      while ( ssl_client.available()) resp += (char)ssl_client.read();
      value = resp.substring( resp.lastIndexOf('\n') + 1, resp.length() - 1);
    }
    ssl_client.stop();
  } else {
    Serial.println("[Firebase] can't connect to Firebase Host");
  }
  return value;
}
