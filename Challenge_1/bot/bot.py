import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome('./chromedriver',options=options)

print("First failed ping")

driver.get("http://127.0.0.1:3000/")
driver.add_cookie({"name" : "AUTH_COOKIE", "value" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsImlhdCI6MTY3ODc2OTYyNCwiZXhwIjoxNjc4ODU2MDI0fQ.GMJeLwxcROVx-0YTjsaQg3mP7L_mUuCam-PCeGU9z-o", "domain": "127.0.0.1"})

print("Start spam")

while True :
    print("Ping server")
    driver.get("http://127.0.0.1:3000/")
    time.sleep(15)

driver.close()