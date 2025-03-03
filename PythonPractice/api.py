import requests
import json

apiKey = env.APIKEY

city = 'Chicago'
#City2 = input(" Please insert city ")

url = "https://api.openweathermap.org/data/2.5/weather?q="

response = requests.get(url+city+"&appid="+apiKey)


response = response.json()

for value in response['main']:
 print(value)
 




"""
Temp = response['main']['temp']
Humidity = response['main']['humidity']
weather = response['weather'][0]['description']

print('Temp:', Temp)
print('Humidity:', Humidity)
print('Weather', weather)
"""