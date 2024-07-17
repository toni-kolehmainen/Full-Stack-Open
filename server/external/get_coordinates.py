from geopy.geocoders import Nominatim
import sys
import json
locator = Nominatim(user_agent="myApp")

args = sys.argv[1]
# print(sys.argv)

# print(args)
json_dict = json.loads(args)
# print(json_dict)

for item in json_dict :
    # print(item["address"])
    address = item["address"] + ", " + item["postcodeName"]
    location = locator.geocode(address)
    if location != None :
        lat, lon = location.latitude, location.longitude
        # print(lat, lon)
        item["location"] = {"latitude":lat, "longitude":lon}
    else :
        item["location"] = {"latitude":0, "longitude":0}

print(json.dumps(json_dict))