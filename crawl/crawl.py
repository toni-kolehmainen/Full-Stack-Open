import requests
from bs4 import BeautifulSoup
import queue
import re

robots = "/robots.txt"


# https://restaurants.subway.com/fi



# urls = queue.PriorityQueue()
# urls.put((0.5, "https://scrapeme.live/shop/"))

link = "https://burgerking.fi"
user_agents = []
disallows = []
Sitemaps = []
allows = []
content_examble = ['# START YOAST BLOCK', '# ---------------------------', 'User-agent: *', 'Disallow:', '', 
 'Sitemap: https://burgerking.fi/sitemap_index.xml', '# ---------------------------', '# END YOAST BLOCK']


# robots_data =requests.get(url=link+robots)
# print(robots_data.status_code)
# print(robots_data.text)
# space = robots_data.text.split("\n")
# print(space)
for line in content_examble :
    if 'User-agent' in line :
        user_agents.append(line.split(":", 1)[1])
    elif 'Disallow' in line :
        disallows.append(line.split(":", 1)[1])
    elif 'Allow' in line :
        allows.append(line.split(":", 1)[1])
    elif 'Sitemap' in line :
        Sitemaps.append(line.split(":", 1)[1])
    

print(user_agents)
print(disallows)
print(allows)
print(Sitemaps)



# [lambda space=line]
# dump = space.





# while not urls.empty():

#         time.sleep(1) 