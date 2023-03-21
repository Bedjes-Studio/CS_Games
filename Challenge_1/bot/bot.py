import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome('./chromedriver',options=options)

print("First failed ping")
driver.get("http://54.224.199.209")
driver.add_cookie({"name" : "AUTH_COOKIE", "value" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjc5MTUyMjQzLCJleHAiOjE2NzkyMzg2NDN9.CheD3GBRTIP71_BvijVPgJT35bxJI6WwH8WRN13Vku8", "domain": "54.224.199.209"})

print("Start spam")

while True :
    print("Ping server")
    driver.get("http://54.224.199.209")
    time.sleep(15)

driver.close()