

//#include <ArduinoSTL.h>
//#include <map>
////โคดสำหรับบอร์ด Arduino UNO
//#include "AIS_NB_BC95.h"
//String apnName = "devkit.nb";
//String serverIP = "157.230.39.47"; // Your Server IP
//String serverPort = "3000"; // Your Server Port
//AIS_NB_BC95 AISnb;
//#include <SoftwareSerial.h>
//SoftwareSerial Uno(3, 2); // RX | TX
//int led = 13;
//std::map<String, int> mapDeauth;
//std::map<String, int>::iterator mapIt;
//std::map<String, int> mapProbe;
//unsigned long update_time { 0 };  // Last update time
//unsigned long current_time { 0 };
//unsigned long last_send_time { 0 };
//int sw = 0;
//void setup()
//{
//  pinMode(3, INPUT);
//  pinMode(2, OUTPUT);
//  pinMode(led, OUTPUT);
//  Serial.begin(9600);
//  Uno.begin(9600);
////  AISnb.debug = true;
//  AISnb.setupDevice(serverPort);
//  String ip1 = AISnb.getDeviceIP();
//  delay(1000);
//  pingRESP pingR = AISnb.pingIP(serverIP);
//}
//
////int test = 0;
//String test = "";
//
//void loop() {
//  while (Uno.available() > 0) // ถ้ามีการสื่อสารทาง Serial เข้ามา
//  {
////    String val2 = Uno.readString(); // อ่านค่าที่ส่งเข้ามาแล้วแปลงเป็นตัวเลข
//test+=Uno.readString();
////    String val = val2;
////    test += val;
////    Serial.println(val);
////    if ( val.startsWith("DEAUTH")) {
////      Serial.println("IS DEAUTH");
////      for (int i = 0; i < val.length() - 6; i++) {
////        if ( val.substring(i, i + 6) == "DEAUTH" ) {
////          if ( val.substring(i + 6, i + 6 + 17) && val.substring(i + 6, i + 6 + 17).length() == 17) {
////            mapProbe[val.substring(i + 6, i + 6 + 17)] += 1;
////            Serial.println(String("DEAUTH ") + val.substring(i + 6, i + 6 + 17));
////          }
////        }
////      }
////      update_time = millis();
////      sw = 1;
////    } else if ( val.startsWith("PROBE")) {
////      Serial.println("IS PROBE");
////      for (int i = 0; i < val.length() - 5; i++) {
////        if ( val.substring(i, i + 5) == "PROBE" ) {
////          if ( val.substring(i + 5, i + 5 + 17) && val.substring(i + 5, i + 5 + 17).length() == 17) {
////            mapProbe[val.substring(i + 5, i + 5 + 17)] += 1;
////            Serial.println(String("PROBE ") + val.substring(i + 5, i + 5 + 17));
////          }
////        }
////      }
////      update_time = millis();
////      sw = 1;
////    }
//  }
//  current_time = millis();
//  if(current_time - update_time >= 60000) {
//    update_time = current_time;
//    Serial.println(test);
//    test = "";
//    Serial.println("wtf");
//  }
////  if (current_time - update_time >= 5000 && update_time != 0 && sw == 1 && current_time - last_send_time >= 60000) {
////    sw = 0;
////    update_time = current_time;
////    if(current_time - last_send_time >= 60000){
////    last_send_time = current_time;
////    String packet = "";
////    for (mapIt = mapDeauth.begin() ; mapIt != mapDeauth.end() ; mapIt++ ) {
////      if (mapIt == mapDeauth.begin()) {
////        packet += "{DEAUTH:[";
////      }
////      packet += String("{\"") + String(mapIt->first) + "\""  + String(":") + "\"" + String(mapIt->second) + "\"}";
////      if(mapIt != --mapDeauth.end()){
////        packet += ",";
////      }else {
////        packet += "]";
////      }
////    }
////    mapDeauth.clear();
////    delay(10);
////    for (mapIt = mapProbe.begin() ; mapIt != mapProbe.end() ; mapIt++ ) {
////      if (mapIt == mapProbe.begin()) {
////        packet += "{PROBE:[";
////      }
////      packet += String("{\"") + String(mapIt->first) + "\""  + String(":") + "\"" + String(mapIt->second) + "\"}";
////      if(mapIt != --mapProbe.end()){
////        packet += ",";
////      }else {
////        packet += "]";
////      }
////    }
////    mapProbe.clear();
////    if (packet.length() > 0) {
////      AISnb.sendUDPmsgStr(serverIP, serverPort, packet);
////    }
////  }
//  //  delay(5000);
//}
#include "AIS_NB_BC95.h"
#include <ArduinoSTL.h>
#include <map>
#include <SoftwareSerial.h>

String apnName = "devkit.nb";
String serverIP = "157.230.39.47"; // Your Server IP
String serverPort = "3000"; // Your Server Port
String udpData = "HelloWorld";
AIS_NB_BC95 AISnb;
const long interval = 20000;  //millisecond
unsigned long previousMillis = 0;
long cnt = 0;

SoftwareSerial Uno(3, 2); // RX | TX
std::map<String, int> mapDeauth;
std::map<String, int>::iterator mapIt;
std::map<String, int> mapProbe;
unsigned long update_time { 0 };  // Last update time
unsigned long current_time { 0 };
unsigned long last_send_time { 0 };

void setup()
{
  AISnb.debug = true;
  
  Serial.begin(9600);
  Uno.begin(9600);
  AISnb.setupDevice(serverPort);

  String ip1 = AISnb.getDeviceIP();
  delay(1000);

}
String test = "";

void loop() {
  while (Uno.available() > 0) // ถ้ามีการสื่อสารทาง Serial เข้ามา
  {
    test += Uno.readString();
  }
  current_time = millis();
  if (current_time - update_time >= 5000) {
    update_time = current_time;
    Serial.println(test);
    test = "";
    Serial.println("wtf");
  }
}
