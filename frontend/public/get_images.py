import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_image(query, filename):
    url = f"https://html.duckduckgo.com/html/?q={query.replace(' ', '+')}+perfume+bottle+unsplash"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    links = re.findall(r'//external-content\.duckduckgo\.com/iu/\?u=([^"&]+)', html)
    if links:
        img_url = urllib.parse.unquote(links[0])
        print(f"Downloading {img_url} to {filename}")
        try:
            req_img = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req_img, context=ctx) as response, open(filename, 'wb') as out_file:
                out_file.write(response.read())
            return True
        except Exception as e:
            print("Failed to download:", e)
    return False

fetch_image("saffron perfume bottle dark", "perfume_1.jpg")
fetch_image("leather perfume bottle black", "perfume_2.jpg")
fetch_image("bergamot perfume bottle green", "perfume_3.jpg")
