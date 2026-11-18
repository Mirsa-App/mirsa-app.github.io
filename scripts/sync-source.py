"""Mirror upstream bytes without rewriting URLs or dropping app entries."""
import json
import time
import pathlib
import urllib.request

url = "https://github.com/Alaaaya/Mirsa/releases/download/setup/source.json"
request = urllib.request.Request(url + "?sync=" + str(time.time_ns()), headers={"Cache-Control": "no-cache"})
with urllib.request.urlopen(request, timeout=60) as response:
    data = response.read()
feed = json.loads(data)
assert isinstance(feed.get("apps"), list) and feed["apps"], "Invalid source feed"
assert any(app.get("bundleIdentifier") == "com.alaa.player.web" for app in feed["apps"]), "Missing Alaa Player"
# Always overlay durable repository-owned presentation, even when the release asset is stale.
branding_url = "https://raw.githubusercontent.com/Alaaaya/Mirsa/main/branding.json"
branding_request = urllib.request.Request(branding_url + "?sync=" + str(time.time_ns()), headers={"Cache-Control": "no-cache"})
with urllib.request.urlopen(branding_request, timeout=60) as response:
    branding = json.load(response)
from source_branding import apply_branding
feed = apply_branding(feed, branding)
data = (json.dumps(feed, ensure_ascii=False, indent=2) + "\n").encode()
pathlib.Path("source.json").write_bytes(data)
print("Mirrored", len(data), "bytes; apps:", [app["name"] for app in feed["apps"]])
