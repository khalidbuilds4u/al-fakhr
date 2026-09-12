import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Query Wikimedia Commons for files matching "perfume glass"
url = "https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=filetype:bitmap+perfume+bottle&utf8=&format=json&srlimit=10"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    response = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    data = json.loads(response)
    
    count = 1
    for item in data['query']['search']:
        title = item['title']
        # Now get the image URL for this file
        img_url_req = urllib.request.Request(f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json", headers={'User-Agent': 'Mozilla/5.0'})
        img_resp = urllib.request.urlopen(img_url_req, context=ctx).read().decode('utf-8')
        img_data = json.loads(img_resp)
        
        pages = img_data['query']['pages']
        for page_id in pages:
            if 'imageinfo' in pages[page_id]:
                img_url = pages[page_id]['imageinfo'][0]['url']
                # Download it
                if not img_url.lower().endswith('.svg'):
                    print(f"Downloading {img_url}")
                    urllib.request.urlretrieve(img_url, f"../public/real_perfume_{count}.jpg")
                    count += 1
        if count > 3:
            break
except Exception as e:
    print("Error:", e)
