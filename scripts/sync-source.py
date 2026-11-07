"""Mirror upstream bytes without rewriting URLs or dropping app entries."""
import json
import time
import pathlib
import urllib.request

url = "https://raw.githubusercontent.com/Alaaaya/Mirsa/main/source.json"
request = urllib.request.Request(url + "?sync=" + str(time.time_ns()), headers={"Cache-Control": "no-cache"})
with urllib.request.urlopen(request, timeout=60) as response:
    data = response.read()
feed = json.loads(data)
assert isinstance(feed.get("apps"), list) and feed["apps"], "Invalid source feed"
assert any(app.get("bundleIdentifier") == "com.alaa.player.web" for app in feed["apps"]), "Missing Alaa Player"
pathlib.Path("source.json").write_bytes(data)
print("Mirrored", len(data), "bytes; apps:", [app["name"] for app in feed["apps"]])
