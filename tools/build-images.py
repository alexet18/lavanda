"""
Generates the web image ladder from the master photographs.

    python tools/build-images.py

For every file in assets/src/ it writes:

    public/media/<id>/<id>-<w>.avif
    public/media/<id>/<id>-<w>.webp
    public/media/<id>/<id>-<w>.jpg      (single fallback, 1280 or native)

Widths are capped at the file's real width - nothing is ever upscaled.
A manifest with the true dimensions is written for build.mjs.
"""

import json
import os
import time
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "src")
OUT = os.path.join(ROOT, "public", "media")

LADDER = [400, 640, 960, 1280, 1600, 2000, 2400]

AVIF_Q = 52
WEBP_Q = 72
JPEG_Q = 82

# Hard ceilings per file. When an encode overshoots, it is re-encoded at a
# lower quality rather than at a lower resolution - sharpness matters more
# than a few pixels of width on a phone.
AVIF_MAX = 250 * 1024
WEBP_MAX = 200 * 1024


def save_capped(img, path, fmt, quality, ceiling, retry):
    """Save, and if the file is over budget, re-save at `retry` quality."""
    img.save(path, format=fmt, quality=quality,
             **({"method": 6} if fmt == "WEBP" else {}))
    if os.path.getsize(path) > ceiling:
        img.save(path, format=fmt, quality=retry,
                 **({"method": 6} if fmt == "WEBP" else {}))

os.makedirs(OUT, exist_ok=True)

manifest = {}
t0 = time.time()

SKIP = {"logo"}  # the logo has its own transparent treatment

for name in sorted(os.listdir(SRC)):
    if not name.lower().endswith((".jpg", ".jpeg", ".png")):
        continue

    ident = os.path.splitext(name)[0]
    if ident in SKIP:
        continue
    src_path = os.path.join(SRC, name)
    out_dir = os.path.join(OUT, ident)
    os.makedirs(out_dir, exist_ok=True)

    with Image.open(src_path) as im:
        im = im.convert("RGB")
        w, h = im.size
        widths = [x for x in LADDER if x <= w]
        if not widths:
            widths = [w]
        if widths[-1] != w and w < LADDER[-1]:
            widths.append(w)

        made = []
        for target in widths:
            resized = im if target == w else im.resize(
                (target, round(h * target / w)), Image.LANCZOS
            )

            save_capped(resized, os.path.join(out_dir, f"{ident}-{target}.avif"),
                        "AVIF", AVIF_Q, AVIF_MAX, 42)
            save_capped(resized, os.path.join(out_dir, f"{ident}-{target}.webp"),
                        "WEBP", WEBP_Q, WEBP_MAX, 60)
            made.append(target)

        fallback = 1280 if 1280 in widths else widths[-1]
        (im if fallback == w else im.resize(
            (fallback, round(h * fallback / w)), Image.LANCZOS
        )).save(os.path.join(out_dir, f"{ident}-{fallback}.jpg"),
                format="JPEG", quality=JPEG_Q, optimize=True, progressive=True)

    manifest[ident] = {
        "w": w,
        "h": h,
        "ratio": round(w / h, 4),
        "widths": made,
        "fallback": fallback,
    }
    print(f"{ident:<24} {w}x{h}  widths={made}")

with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2, sort_keys=True)

print(f"\n{len(manifest)} images in {time.time() - t0:.1f}s")
