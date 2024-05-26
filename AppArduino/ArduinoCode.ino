#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

//  Wi-Fi
const char* ssid = "KuDo-2003";
const char* password = "01022003";

// Tạo một đối tượng WebServer (port 80)
WebServer server(80);

// GPIO pin mà LED được kết nối
const int ledPin = 2;

void handleToggle() {
  if (server.hasArg("plain")) {
    DynamicJsonDocument doc(1024);//Tạo một tài liệu JSON động với kích thước 1024 byte.
    deserializeJson(doc, server.arg("plain"));
    bool state = doc["state"];// lấy giá trị state từ json
    digitalWrite(ledPin, state ? HIGH : LOW);// bật tắt đèn dựa vào state 
    server.send(200, "application/json", "{\"status\":\"success\"}");//ok
  } else {
    server.send(400, "application/json", "{\"status\":\"error\"}");// lỗi
  }
}

void setup() {
  pinMode(ledPin, OUTPUT);// đặt giá trị cho đèn là output
  digitalWrite(ledPin, LOW);// tắt đèn ban đầu

  // Kết nối với Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {// đợi wifi kết nối time 5s
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected.");// kết nối thành công
  Serial.println(WiFi.localIP());

  // Định nghĩa các route cho web server
  server.on("/toggle", HTTP_POST, handleToggle);// định nghãi router toggle để xử lý yêu cầu post của hàm handleToggle

  // Bắt đầu server
  server.begin();
}

void loop() {
  server.handleClient();// hàm sử lí yêu cầu từ client
} 