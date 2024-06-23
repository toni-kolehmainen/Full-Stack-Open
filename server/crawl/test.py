import requests
from bs4 import BeautifulSoup
import queue
import re
import xml.etree.ElementTree as ET
import xmltodict
import json
import sys
from geopy.geocoders import Nominatim
import time
# tarvittavat name, location, menu, link, features
robots = "/robots.txt"

# https://restaurants.subway.com/fi

# urls = queue.PriorityQueue()
# urls.put((0.5, "https://scrapeme.live/shop/"))

link = "https://burgerking.fi"
user_agents = []
disallows = []
Sitemaps = []
allows = []

# robots_data =requests.get(url=link+robots)
# print(robots_data.status_code)
# space = robots_data.text.split("\n")
# for line in space :
#     if 'User-agent' in line :
#         user_agents.append(line.split(":", 1)[1])
#     elif 'Disallow' in line :
#         disallows.append(line.split(":", 1)[1])
#     elif 'Allow' in line :
#         allows.append(line.split(":", 1)[1])
#     elif 'Sitemap' in line :
#         Sitemaps.append(line.split(":", 1)[1])



# print(user_agents)
# print(disallows)
# print(allows)
# print(Sitemaps)

# for site in Sitemaps :
#     robots_data =requests.get(site)
#     data = xmltodict.parse(robots_data.content)
#     # print(data)
#     for key in data["sitemapindex"]["sitemap"] :
#         if "restaurant" in key["loc"] :
#             print(key["loc"])
locator = Nominatim(user_agent="myApp")

test = "https://burgerking.fi/restaurant-sitemap.xml"

robots_data = requests.get(test)
data = xmltodict.parse(robots_data.content)

url = ""
url_list = []
for data_url in data["urlset"]["url"] :
    url = data_url["loc"]
    url_list.append(url)

# print(url_list)
# limit = 5
# i = 0
list_to_json = []
for url in url_list :

    dict_to_json = {}
    result = requests.get(url)
    content = result.text
    soup = BeautifulSoup(content, 'lxml')

    name = soup.find('div', class_='header')
    dict_to_json["name"] = name.text

    address = soup.find('p', class_='address')
    dict_to_json["address"] = address.text
    # loc = locator.geocode(dict_to_json["address"], addressdetails=True)
    # if loc != None :
    #     print(loc.raw)
    #     dict_to_json["city"] = loc.raw['address']['city']
    #     dict_to_json["longitude"] = loc.raw["lon"]
    #     dict_to_json["latitude"] = loc.raw["lat"]

    features = soup.find('div', class_='restaurant-features')
    dict_to_json["features"] = features.text.replace('\n', '').strip()
        
    list_to_json.append(dict_to_json)
    # i+=1
    # if limit == i :
    #     break
    time.sleep(1)

myJson = json.dumps(list_to_json)
print(myJson)
sys.stdout.flush()

# transcript = box.find('div', class_='full-script')

# while not urls.empty():

#         time.sleep(1) 