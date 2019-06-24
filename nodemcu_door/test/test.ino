#define RELAY_PIN D5
#define VIBR_PIN D8
#define BUZZ_PIN D6

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "niyawifi";//"KOSPUTRI2";
const char* password = "";//"meiekongagel";

int statTheft = 0;
int statReceive = 0;
int measurement = 0;
int state =0;

void readVibration() {
  delay(10);
  measurement = pulseIn(VIBR_PIN, HIGH);
}

void unlockDoor(){
  digitalWrite(RELAY_PIN, LOW);
}

void lockDoor(){
  digitalWrite(RELAY_PIN, HIGH);
}

void buzzerOn(){
  //pin, frequency,delay
  tone(BUZZ_PIN, 1000, 500);
}

void buzzerOff(){
  tone(BUZZ_PIN, 0, 0);
}

void setup() {
  pinMode(VIBR_PIN, INPUT);
  pinMode(RELAY_PIN , OUTPUT);
  pinMode(BUZZ_PIN , OUTPUT);
  Serial.begin(9600);
  lockDoor();
  //wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  //end wifi
}

void loop() {
   switch(state){
    case 0: //normal
      receiveMessage();
      lockDoor();
      readVibration();
      theftStatus();
      debug();
      checkParam();
      break;
    case 1: //theft
      receiveMessage();
      lockDoor();
      buzzerOn();
      checkParam();
      readVibration();
      debug();
      break;
    case 2://open
      buzzerOff();
      unlockDoor();
      debug();
      statTheft=0;
      receiveMessage();
      readVibration();
      checkParam();
      break;
    default:
      break;
   }
}

void checkParam(){
   if(statTheft==1 && statReceive == 0){//theft detected, door close
     state = 1;
   }else if(statTheft == 1 && statReceive == 3){//reset buzzer
     sendMessage("4");
     resetDoor();
     statTheft=0;
     state = 0;
   }//reset buzzer
   else if(statTheft== 0 && statReceive == 1){
     state = 2;
   }else if(statTheft == 0 && statReceive == 0){
     state = 0;
   }
}
void debug(){
   Serial.print("Receive Status : ");
   Serial.println(statReceive);
   Serial.print("Measurement : ");
   Serial.println(measurement);
   Serial.print("Theft Status : ");
   Serial.println(statTheft);
   Serial.print("State :");
   Serial.println(state);
   Serial.println("=====");
}

void theftStatus(){
  if(measurement > 0){
    alertTheft();
    sendMessage("3");
    statTheft = 1;
  }else{
    statTheft = 0;
  }
}

void sendMessage(String stat){
  String lastmessage = "";
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://192.168.43.70:3000/log/create/done/U000/"+stat;
    http.begin(url);
    http.addHeader("Content-Type", "text/plain");
    int httpCode = http.GET();
    String data = http.getString();
    lastmessage = data;
    http.end();
  } else {
    lastmessage = "";
  }
  Serial.println(lastmessage);
}

void resetDoor(){
      String lastmessage = "";
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://192.168.43.70:3000/doors/done/0";
    http.begin(url);
    http.addHeader("Content-Type", "text/plain");
    int httpCode = http.GET();
    String data = http.getString();
    lastmessage = data;
    http.end();
  } else {
    lastmessage = "";
  }
  Serial.println(lastmessage);
}
void alertTheft(){
    String lastmessage = "";
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://192.168.43.70:3000/doors/done/2";
    http.begin(url);
    http.addHeader("Content-Type", "text/plain");
    int httpCode = http.GET();
    String data = http.getString();
    lastmessage = data;
    http.end();
  } else {
    lastmessage = "";
  }
  Serial.println(lastmessage);
}
void receiveMessage(){
  String lastmessage = "";
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://192.168.43.70:3000/doors/state/done";
    http.begin(url);
    http.addHeader("Content-Type", "text/plain");
    int httpCode = http.GET();
    String data = http.getString();
    lastmessage = data;
    http.end();
  } else {
    lastmessage = "";
  }
  Serial.println(lastmessage.substring(39,40));
  if (lastmessage.substring(39,40)=="1") {//open
    statReceive = 1;
  }else if(lastmessage.substring(39,40)=="2"){//theft
    statReceive = 2; 
  }else if(lastmessage.substring(39,40)=="3"){//reset
    statReceive = 3; 
  }
   else{
    statReceive = 0;//close
  }
}
