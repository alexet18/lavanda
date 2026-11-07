"""
Derives the brand assets from the supplied logo: a transparent sprig mark and
a transparent full lockup. The supplied file is a JPEG on white; on our paper
background a white box would be visible, so the white is keyed out.

    python tools/make-logo.py
"""

import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "src", "logo.jpg")
OUT = os.path.join(ROOT, "public", "brand")
os.makedirs(OUT, exist_ok=True)

im = Image.open(SRC).convert("RGBA")
w, h = im.size
px = im.load()

# 1. Key out the white background with a soft ramp so edges do not alias.
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum > 246:
            px[x, y] = (r, g, b, 0)
        elif lum > 226:
            # fade the antialiased fringe instead of cutting it
            px[x, y] = (r, g, b, int(255 * (246 - lum) / 20))

# 2. Isolate the sprig: it is the only purple element in the mark.
mask = Image.new("L", (w, h), 0)
mp = mask.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a and b > g + 8 and r > g - 6:
            mp[x, y] = 255

bbox = mask.getbbox()
print("sprig bbox:", bbox)

if bbox:
    pad = 6
    l, t, r_, b_ = bbox
    l, t = max(0, l - pad), max(0, t - pad)
    r_, b_ = min(w, r_ + pad), min(h, b_ + pad)
    sprig = im.crop((l, t, r_, b_))

    # pad to a square so it can be centred at any size
    side = max(sprig.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(sprig, ((side - sprig.size[0]) // 2, (side - sprig.size[1]) // 2))

    for size in (64, 128, 256):
        canvas.resize((size, size), Image.LANCZOS).save(
            os.path.join(OUT, f"sprig-{size}.png"), optimize=True)
    print("wrote sprig-64/128/256.png")

# 3. Full lockup, trimmed to its own content box.
full_box = im.getbbox()
lock = im.crop(full_box)
pad = 8
padded = Image.new("RGBA", (lock.size[0] + pad * 2, lock.size[1] + pad * 2), (0, 0, 0, 0))
padded.paste(lock, (pad, pad))
padded.save(os.path.join(OUT, "lockup.png"), optimize=True)
print("lockup:", padded.size)

# 4. Touch icons on a solid brand background (transparency vanishes on iOS).
for size, name in ((180, "apple-touch-icon.png"), (512, "icon-512.png")):
    plate = Image.new("RGBA", (size, size), (250, 248, 244, 255))
    inner = int(size * 0.62)
    mark = Image.open(os.path.join(OUT, "sprig-256.png")).resize((inner, inner), Image.LANCZOS)
    plate.paste(mark, ((size - inner) // 2, (size - inner) // 2), mark)
    plate.convert("RGB").save(os.path.join(OUT, name), optimize=True)
    print("wrote", name)

# 5. favicon.ico - browsers still ask for /favicon.ico regardless of <link>.
ico = Image.open(os.path.join(OUT, "sprig-256.png")).convert("RGBA")
ico.save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("wrote favicon.ico")
