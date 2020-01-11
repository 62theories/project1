#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
//FirebaseESP8266.h must be included before ESP8266WiFi.h

#define FIREBASE_HOST "finalprojectcoe.firebaseio.com"
#define FIREBASE_AUTH "a0RKKalOcerf7tZngMLTYwar8eMahjUvppIcoXpR"
#define WIFI_SSID "senorita"
#define WIFI_PASSWORD "ballball"

//Define FirebaseESP8266 data object
FirebaseData firebaseData;
// include ESP8266 Non-OS SDK functions
extern "C" {
#include "user_interface.h"
}

String arr1[100];
String arr2[100];

int arr1c = 0;
int arr2c = 0;

//// ===== SETTINGS ===== //
#define LED 2              /* LED pin (2=built-in LED) */
#define LED_INVERT true    /* Invert HIGH/LOW for LED */
#define SERIAL_BAUD 115200 /* Baudrate for serial communication */
#define CH_TIME 140        /* Scan time (in ms) per channel */
#define PKT_RATE 5         /* Min. packets before it gets recognized as an attack */
#define PKT_TIME 1         /* Min. interval (CH_TIME*CH_RANGE) before it gets recognized as an attack */

//// Channels to scan on (US=1-11, EU=1-13, JAP=1-14)
const short channels[] = { 1,2,3,4,5,6,7,8,9,10,11,12,13/*,14*/ };

// ===== Runtime variables ===== //
int ch_index { 0 };               // Current index of channel array
int packet_rate { 0 };            // Deauth packet counter (resets with each update)
int attack_counter { 0 };         // Attack counter
unsigned long update_time { 0 };  // Last update time
unsigned long ch_time { 0 };      // Last channel hop time

bool test = false;

// ===== Setup ===== //
void setup() {
  Serial.begin(SERIAL_BAUD); // Start serial communication

  pinMode(LED, OUTPUT); // Enable LED pin
  digitalWrite(LED, LED_INVERT);
WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
//Firebase.pushTimestamp(firebaseData,"/Deauth/1");
WiFi.disconnect();                   // Disconnect from any saved or active WiFi connections
//  wifi_set_opmode(STATION_MODE);       // Set device to client/station mode
  wifi_set_promiscuous_rx_cb(sniffer); // Set sniffer function
  wifi_set_channel(channels[0]);        // Set channel
  wifi_promiscuous_enable(true);       // Enable sniffer

  Serial.println("Started \\o/");
}

// ===== Loop ===== //
void loop() {
  unsigned long current_time = millis();
  if (current_time - update_time >= (sizeof(channels)*CH_TIME) * 10){
    update_time = current_time;
    wifi_promiscuous_enable(false);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
      Serial.print(".");
      delay(300);
    }
    Serial.println("");
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    while(!Firebase.getInt(firebaseData,"/count")){
      Serial.println("get count failed, trying again");
    }
    int count = firebaseData.intData();
    int newCount = count + 1;
    while(!Firebase.setInt(firebaseData,"/count",newCount)){
      Serial.println("send new count failed, trying again");
    }
    while(!Firebase.setTimestamp(firebaseData,"/Monitor/" + String(count) + "/Time" )){
      Serial.println("send time failed, trying again");
    }
    Serial.println("sending deauth record");
    for(int i = 0;i < 100;i++){
        if(arr1[i] != ""){
          Firebase.pushTimestamp(firebaseData,"/Monitor/" + String(count) + "/Data/Deauth/" + arr1[i]); 
        }
    }
    Serial.println("sending probe record");
    for(int i = 0;i < 100;i++){
        if(arr2[i] != ""){
          Firebase.pushTimestamp(firebaseData,"/Monitor/" + String(count) + "/Data/Probe/" + arr2[i]); 
        }  
    }
    WiFi.disconnect();
    arr1c = 0;
    arr2c = 0;
    for(int i=0;i<100;i++){
        arr1[i] = "";
        arr2[i] = "";
    }
    wifi_promiscuous_enable(true);
    if (sizeof(channels) > 1 && current_time - ch_time >= CH_TIME) {
    ch_time = current_time; // Update time variable

    // Get next channel
    ch_index = (ch_index+1) % (sizeof(channels)/sizeof(channels[0]));
    short ch = channels[ch_index];

    // Set channel
    //Serial.print("Set channel to ");
    //Serial.println(ch);
    wifi_set_channel(ch);
  }
  }

}


typedef struct
{
    signed rssi:8;            /**< signal intensity of packet */
    unsigned rate:4;          /**< data rate */
    unsigned is_group:1;
    unsigned :1;              /**< reserve */
    unsigned sig_mode:2;      /**< 0:is not 11n packet; 1:is 11n packet */
    unsigned legacy_length:12;
    unsigned damatch0:1;
    unsigned damatch1:1;
    unsigned bssidmatch0:1;
    unsigned bssidmatch1:1;
    unsigned mcs:7;           /**< if is 11n packet, shows the modulation(range from 0 to 76) */
    unsigned cwb:1;           /**< if is 11n packet, shows if is HT40 packet or not */
    unsigned HT_length:16;             /**< reserve */
    unsigned smoothing:1;     /**< reserve */
    unsigned not_sounding:1;  /**< reserve */
    unsigned :1;              /**< reserve */
    unsigned aggregation:1;   /**< Aggregation */
    unsigned stbc:2;          /**< STBC */
    unsigned fec_coding:1;    /**< Flag is set for 11n packets which are LDPC */
    unsigned sgi:1;           /**< SGI */
    unsigned rxend_state:8;
    unsigned ampdu_cnt:8;     /**< ampdu cnt */
    unsigned channel:4;       /**< which channel this packet in */
    unsigned :4;              /**< reserve */
    signed noise_floor:8;
} wifi_pkt_rx_ctrl_t;

typedef struct {
    wifi_pkt_rx_ctrl_t rx_ctrl;
    uint8 buf[112];
    uint16 cnt;
    uint16 len; //length of packet
} wifi_pkt_mgmt_t;

typedef struct {
  uint16 length;
  uint16 seq;
  uint8  address3[6];
} wifi_pkt_lenseq_t;

typedef struct {
    wifi_pkt_rx_ctrl_t rx_ctrl;
    uint8_t  buf[36];
    uint16_t cnt;
    wifi_pkt_lenseq_t lenseq[1];
} wifi_pkt_data_t;

typedef struct {
    wifi_pkt_rx_ctrl_t rx_ctrl; /**< metadata header */
    uint8_t payload[0];       /**< Data or management payload. Length of payload is described by rx_ctrl.sig_len. Type of content determined by packet type argument of callback. */
} wifi_promiscuous_pkt_t;

typedef enum
{
    WIFI_PKT_MGMT,
    WIFI_PKT_CTRL,
    WIFI_PKT_DATA,
    WIFI_PKT_MISC,
} wifi_promiscuous_pkt_type_t;

typedef enum
{
    ASSOCIATION_REQ,
    ASSOCIATION_RES,
    REASSOCIATION_REQ,
    REASSOCIATION_RES,
    PROBE_REQ,
    PROBE_RES,
    NU1,  /* ......................*/
    NU2,  /* 0110, 0111 not used */
    BEACON,
    ATIM,
    DISASSOCIATION,
    AUTHENTICATION,
    DEAUTHENTICATION,
    ACTION,
    ACTION_NACK,
} wifi_mgmt_subtypes_t;

typedef struct
{
  unsigned interval:16;
  unsigned capability:16;
  unsigned tag_number:8;
  unsigned tag_length:8;
  char ssid[0];
  uint8 rates[1];
} wifi_mgmt_beacon_t;

typedef struct
{
    unsigned protocol:2;
    unsigned type:2;
    unsigned subtype:4;
    unsigned to_ds:1;
    unsigned from_ds:1;
    unsigned more_frag:1;
    unsigned retry:1;
    unsigned pwr_mgmt:1;
    unsigned more_data:1;
    unsigned wep:1;
    unsigned strict:1;
} wifi_header_frame_control_t;

/**
 * Ref: https://github.com/lpodkalicki/blog/blob/master/esp32/016_wifi_sniffer/main/main.c
 */
typedef struct
{
    wifi_header_frame_control_t frame_ctrl;
    //unsigned duration_id:16; /* !!!! ugly hack */
    uint8_t addr1[6]; /* receiver address */
    uint8_t addr2[6]; /* sender address */
    uint8_t addr3[6]; /* filtering address */
    unsigned sequence_ctrl:16;
    uint8_t addr4[6]; /* optional */
} wifi_ieee80211_mac_hdr_t;

typedef struct
{
    wifi_ieee80211_mac_hdr_t hdr;
    uint8_t payload[2]; /* network data ended with 4 bytes csum (CRC32) */
} wifi_ieee80211_packet_t;

void mac2str(const uint8_t* ptr, char* string)
{
    sprintf(string, "%02x:%02x:%02x:%02x:%02x:%02x", ptr[0], ptr[1], ptr[2], ptr[3], ptr[4], ptr[5]);
  return;
}

// ===== Sniffer function ===== //
void sniffer(uint8_t *buff, uint16_t len) {
  if (!buff || len < 28) return; // Drop packets without MAC header

  byte pkt_type = buff[12]; // second half of frame control field
  byte* addr_a = &buff[16]; // first MAC address
  byte* addr_b = &buff[22]; // second MAC address

  // First layer: type cast the received buffer into our generic SDK structure
  const wifi_promiscuous_pkt_t *ppkt = (wifi_promiscuous_pkt_t *)buff;
  // Second layer: define pointer to where the actual 802.11 packet is within the structure
  const wifi_ieee80211_packet_t *ipkt = (wifi_ieee80211_packet_t *)ppkt->payload;
  // Third layer: define pointers to the 802.11 packet header and payload
  const wifi_ieee80211_mac_hdr_t *hdr = &ipkt->hdr;

  
  // If captured packet is a deauthentication or dissassociaten frame
  if (pkt_type == 0xA0 || pkt_type == 0xC0) {
    char addr1[] = "00:00:00:00:00:00\0";
    mac2str(hdr->addr1, addr1);
    if(arr1c <= 99){
      arr1[arr1c++] = String(addr1);
    }
  }else if(pkt_type == 0x40){
    char addr2[] = "00:00:00:00:00:00\0";
    mac2str(hdr->addr2, addr2);
    if(arr2c <= 99){
      arr2[arr2c++] = String(addr2); 
    }
  }
}
