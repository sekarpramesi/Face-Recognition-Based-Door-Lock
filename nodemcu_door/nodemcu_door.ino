#define STOP_PIN D8
#define LED_PIN D7
#define VIB_PIN D6
#define BUZ_PIN D5

int state = 0;
int val = 0;
void setup() {
  Serial.begin(9600);
  pinMode(STOP_PIN,INPUT);
  pinMode(LED_PIN,OUTPUT);
  pinMode(VIB_PIN,INPUT);
  pinMode(BUZ_PIN,OUTPUT);
}

void loop() {
  vibration();
  delay(100);
  controlFunc();
}

void controlFunc(){
  switch(val){
    case 0:
      break;
    case 1:
      switch(state){
        case 0:
          state = 1;
          break;
        case 1:
          break;
        default:
          break;
      }
      break;
    case 2:
      switch(state){
        case 0:
          break;
        case 1:
          state = 0;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  Serial.print("Val : ");
  Serial.println(val);
  Serial.print("State : ");
  Serial.println(state);
  runFunc(state);
  
}

void runFunc(int s){
  switch(s){
    case 0:
      buzzerOff();
      ledOn();
      break;
    case 1:
      ledOff();
      buzzerOn();
      break;
    default:
      break;
  }
}

void vibration(){
  if(digitalRead(STOP_PIN)==0){
    int value = digitalRead(VIB_PIN);
    val = value;
  }else{
    val=2;
  }
}

void ledOn(){
  digitalWrite(LED_PIN, HIGH);
}
void ledOff(){
  digitalWrite(LED_PIN, LOW);
}

void buzzerOn(){
  //pin, frequency,delay
  tone(BUZ_PIN, 1000, 500);
}

void buzzerOff(){
  tone(BUZ_PIN, 0, 0);
}
