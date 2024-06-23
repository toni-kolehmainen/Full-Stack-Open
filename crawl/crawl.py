import requests
from bs4 import BeautifulSoup
import queue
import re
import xml.etree.ElementTree as ET
import xmltodict
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

test = "https://burgerking.fi/restaurant-sitemap.xml"

robots_data =requests.get(test)
data = xmltodict.parse(robots_data.content)


url = ""
for data_url in data["urlset"]["url"] :
    # print(data_url["loc"])
    url = data_url["loc"]

result = requests.get(url)
content = result.text
soup = BeautifulSoup(content, 'lxml')

name = soup.find('div', class_='header')
print(name.text)

address = soup.find('p', class_='address')
print(address.text)

features = soup.find('div', class_='restaurant-features')
print(address.text)

# transcript = box.find('div', class_='full-script')

# while not urls.empty():

#         time.sleep(1) 