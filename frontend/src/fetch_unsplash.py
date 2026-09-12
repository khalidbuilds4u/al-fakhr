import urllib.request
import re
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://unsplash.com/s/photos/luxury-perfume',
    headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
)

try:
    html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    # Unsplash image URLs usually start with https://images.unsplash.com/photo-
    urls = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
    # Filter out duplicates and small sizes
    unique_urls = list(set(urls))
    if len(unique_urls) >= 3:
        for i in range(3):
            img_url = unique_urls[i] + "?w=800&q=80"
            print(f"Downloading {img_url}")
            urllib.request.urlretrieve(img_url, f"../public/real_perfume_{i+1}.jpg")
        print("Success")
    else:
        print("Not enough URLs found:", unique_urls)
except Exception as e:
    print("Error:", e)
