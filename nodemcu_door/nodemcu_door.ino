#define RELAY_PIN D5
#define VIBR_PIN D8
#define BUZZ_PIN D6

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "SweetPea";
const char* password = "Kejaput31";

void setup() {
  pinMode(VIBR_PIN, INPUT);
  pinMode(RELAY_PIN , OUTPUT);
  pinMode(BUZZ_PIN , OUTPUT);
  Serial.begin(9600);

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
   long measurement =TP_init();
   delay(50);
   Serial.println(measurement);
   if (measurement > 0){
     tone(BUZZ_PIN, 1000, 500);
     sendMessage("1");
   }
   else{
     tone(BUZZ_PIN,0,0);
   }

}

void buzzerOn(){
  //pin, frequency,delay
  tone(BUZ_PIN, 1000, 500);
}

void buzzerOff(){
  tone(BUZ_PIN, 0, 0);
}

void sendMessage(String stat){
  String lastmessage = "";
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://common-id.com/hiority/control.php?"+stat+"&node=2&dir=W";
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
    String url = "http://common-id.com/hiority/control.php?pole=1";
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
  if (lastmessage.indexOf("1") >= 0) {
    Serial.println("Success");
    digitalWrite(RELAY_PIN, LOW);
  }else{
    digitalWrite(RELAY_PIN, HIGH);
  }
}

long TP_init() {
  delay(10);
  long measurement = pulseIn(VIBR_PIN, HIGH); //wait for the pin to get HIGH and returns measurement
  return measurement;
}