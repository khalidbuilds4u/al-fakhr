import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_image(query, filename):
    try:
        url = f"https://html.duckduckgo.com/html/?q={query.replace(' ', '+')}+perfume+bottle+unsplash"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        
        # DuckDuckGo HTML doesn't show direct images easily, let's just search for unsplash links
        links = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
        if links:
            img_url = links[0] + "?w=800&q=80"
            print(f"Downloading {img_url} to {filename}")
            urllib.request.urlretrieve(img_url, filename)
            return True
    except Exception as e:
        print(e)
    return False

download_image("dark luxury", "../public/perfume_1.jpg")
download_image("black leather", "../public/perfume_2.jpg")
download_image("green fresh", "../public/perfume_3.jpg")
