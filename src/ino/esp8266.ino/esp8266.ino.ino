#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <map>
#include <SoftwareSerial.h>
extern "C" {
#include "user_interface.h"
}

SoftwareSerial ToArduino(D2, D3); // RX | TX

#define CH_TIME 140

const short channels[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13/*,14*/ };

int ch_index { 0 };
unsigned long update_time { 0 };  // Last update time
unsigned long ch_time { 0 };      // Last channel hop time
unsigned long input_time { 0 }; 

std::map<String, int> mapDeauth;
std::map<String, int> mapProbe;
int beaconCount = 0;
std::map<String, int>::iterator mapIt;

void setup() {
  pinMode(D2, INPUT);
  pinMode(D3, OUTPUT);
  Serial.begin(115200); // Start serial communication
  ToArduino.begin(9600);
  pinMode(2, OUTPUT); // Enable LED pin
  wifi_set_promiscuous_rx_cb(sniffer); // Set sniffer function
  wifi_set_channel(channels[0]);        // Set channel
  wifi_promiscuous_enable(true);       // Enable sniffer
  Serial.println("Started \\o/");
}

void loop() {
  unsigned long current_time = millis();
  if (current_time - update_time >= (sizeof(channels)*CH_TIME)) {
    update_time = current_time;
    if (sizeof(channels) > 1 && current_time - ch_time >= CH_TIME) {
      ch_time = current_time; // Update time variable
      ch_index = (ch_index + 1) % (sizeof(channels) / sizeof(channels[0]));
      short ch = channels[ch_index];
      wifi_set_channel(ch);
    }
  }

  if(current_time - input_time >= 60000) {
    wifi_promiscuous_enable(false);
    int deauthMax = 0;
    int probeMax = 0;
    int probeCount = 0;
    String printDeauth = "";
    String printProbe = "";
    String printBeacon = "";
    String printAmount = "";
    for (mapIt = mapDeauth.begin() ; mapIt != mapDeauth.end() ; mapIt++ ) {
          if(mapIt->second > deauthMax) {
            deauthMax = mapIt->second;
          }
    }
    for (mapIt = mapProbe.begin() ; mapIt != mapProbe.end() ; mapIt++ ) {
          if(mapIt->second > probeMax) {
            probeMax = mapIt->second;
          }
    }
    printDeauth += String("\"DEAUTH\":");
    printDeauth += String("\"") + String(deauthMax) + String("\"");
    printProbe += String("\"PROBE\":");
    printProbe += String("\"") + String(probeMax) + String("\"");
    printBeacon += String("\"BEACON\":");
    printBeacon += String("\"") + String(beaconCount) + String("\"");
    printAmount += String("{") + printDeauth + String(",") + printProbe + String(",") + printBeacon + String("}");
    ToArduino.print(printAmount);
    delay(30000);
    String macDeauth = "";
    String macProbe = "";
    String macToArduino = "";
    for (mapIt = mapDeauth.begin() ; mapIt != mapDeauth.end() ; mapIt++ ) {
          if(macDeauth == "") {
            macDeauth += String("{");
            
            macDeauth += String("\"");
            macDeauth += String(mapIt->first);
            macDeauth += String("\"");
            
            macDeauth += String(":");
            
            macDeauth += String("\"");
            macDeauth += String(mapIt->second);
            macDeauth += String("\"");
            
            macDeauth += String("}");
          } else {
            macDeauth += String(",");
            macDeauth += String("{");
            
            macDeauth += String("\"");
            macDeauth += String(mapIt->first);
            macDeauth += String("\"");
            
            macDeauth += String(":");
            
            macDeauth += String("\"");
            macDeauth += String(mapIt->second);
            macDeauth += String("\"");
            
            macDeauth += String("}");
          }
    }
    for (mapIt = mapProbe.begin() ; mapIt != mapProbe.end() ; mapIt++ ) {
          if(macProbe == "") {
            macProbe += String("{");
            
            macProbe += String("\"");
            macProbe += String(mapIt->first);
            macProbe += String("\"");
            
            macProbe += String(":");
            
            macProbe += String("\"");
            macProbe += String(mapIt->second);
            macProbe += String("\"");
            
            macProbe += String("}");
          } else {
            macProbe += String(",");
            macProbe += String("{");
            
            macProbe += String("\"");
            macProbe += String(mapIt->first);
            macProbe += String("\"");
            
            macProbe += String(":");
            
            macProbe += String("\"");
            macProbe += String(mapIt->second);
            macProbe += String("\"");
            
            macProbe += String("}");
          }
    }
    macToArduino += String("{");
    if(macDeauth != "") {
      macToArduino += String("\"");
      macToArduino += "MACDEAUTH";
      macToArduino += String("\"");
      macToArduino += String(":");
      macToArduino += String("[");
      macToArduino += String(macDeauth);
      macToArduino += String("]");
    }
    if(macProbe != "") {
      if(macDeauth != "") {
        macToArduino += String(",");
      }
      macToArduino += String("\"");
      macToArduino += "MACPROBE";
      macToArduino += String("\"");
      macToArduino += String(":");
      macToArduino += String("[");
      macToArduino += String(macProbe);
      macToArduino += String("]");
    }
    macToArduino += String("}");
    ToArduino.print(macToArduino);
    mapDeauth.clear();
    mapProbe.clear();
    beaconCount = 0;
    wifi_promiscuous_enable(true);
    input_time = current_time;
  }

}

///////////////////////////////////////////////// struct /////////////////////////////////////

typedef struct
{
  signed rssi: 8;           /**< signal intensity of packet */
  unsigned rate: 4;         /**< data rate */
  unsigned is_group: 1;
  unsigned : 1;             /**< reserve */
  unsigned sig_mode: 2;     /**< 0:is not 11n packet; 1:is 11n packet */
  unsigned legacy_length: 12;
  unsigned damatch0: 1;
  unsigned damatch1: 1;
  unsigned bssidmatch0: 1;
  unsigned bssidmatch1: 1;
  unsigned mcs: 7;          /**< if is 11n packet, shows the modulation(range from 0 to 76) */
  unsigned cwb: 1;          /**< if is 11n packet, shows if is HT40 packet or not */
  unsigned HT_length: 16;            /**< reserve */
  unsigned smoothing: 1;    /**< reserve */
  unsigned not_sounding: 1; /**< reserve */
  unsigned : 1;             /**< reserve */
  unsigned aggregation: 1;  /**< Aggregation */
  unsigned stbc: 2;         /**< STBC */
  unsigned fec_coding: 1;   /**< Flag is set for 11n packets which are LDPC */
  unsigned sgi: 1;          /**< SGI */
  unsigned rxend_state: 8;
  unsigned ampdu_cnt: 8;    /**< ampdu cnt */
  unsigned channel: 4;      /**< which channel this packet in */
  unsigned : 4;             /**< reserve */
  signed noise_floor: 8;
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
  unsigned interval: 16;
  unsigned capability: 16;
  unsigned tag_number: 8;
  unsigned tag_length: 8;
  char ssid[0];
  uint8 rates[1];
} wifi_mgmt_beacon_t;

typedef struct
{
  unsigned protocol: 2;
  unsigned type: 2;
  unsigned subtype: 4;
  unsigned to_ds: 1;
  unsigned from_ds: 1;
  unsigned more_frag: 1;
  unsigned retry: 1;
  unsigned pwr_mgmt: 1;
  unsigned more_data: 1;
  unsigned wep: 1;
  unsigned strict: 1;
} wifi_header_frame_control_t;

typedef struct
{
  wifi_header_frame_control_t frame_ctrl;
  uint8_t addr1[6]; /* receiver address */
  uint8_t addr2[6]; /* sender address */
  uint8_t addr3[6]; /* filtering address */
  unsigned sequence_ctrl: 16;
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

//////////////////////////////////////////////// sniffer /////////////////////////////////

void sniffer(uint8_t *buff, uint16_t len) {
   if (!buff || len < 28) return; // Drop packets without MAC header

  byte pkt_type = buff[12]; // second half of frame control field
  const wifi_promiscuous_pkt_t *ppkt = (wifi_promiscuous_pkt_t *)buff;
  const wifi_ieee80211_packet_t *ipkt = (wifi_ieee80211_packet_t *)ppkt->payload;
  const wifi_ieee80211_mac_hdr_t *hdr = &ipkt->hdr;

  if (pkt_type == 0xA0 || pkt_type == 0xC0){
    char addr1[] = "00:00:00:00:00:00\0";
    mac2str(hdr->addr1, addr1);
    mapDeauth[addr1] += 1;
    
  } else if(pkt_type == 0x40) {
    char addr1[] = "00:00:00:00:00:00\0";
    mac2str(hdr->addr1, addr1);
    mapProbe[addr1] += 1;
    
  } else if(pkt_type == 0x80) {
    beaconCount++;
  }
  
}
