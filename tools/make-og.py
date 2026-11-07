import os
from PIL import Image

ROOT = r"C:\Users\alexe\Desktop\Lavanda"
src = Image.open(os.path.join(ROOT, "assets", "src", "garden_3.jpg")).convert("RGB")
w, h = src.size

# Crop to 1200x630 (1.904:1), keeping the lavender band that carries the brand.
target = 1200 / 630
crop_h = int(w / target)
top = int(h * 0.34)
top = max(0, min(h - crop_h, top))
og = src.crop((0, top, w, top + crop_h)).resize((1200, 630), Image.LANCZOS)
og.save(os.path.join(ROOT, "public", "og.jpg"), quality=86, optimize=True, progressive=True)
print("og.jpg", og.size, round(os.path.getsize(os.path.join(ROOT, "public", "og.jpg")) / 1024), "KB")

# Root favicon so /favicon.ico is not a 404 on the deployed origin.
import shutil
shutil.copyfile(os.path.join(ROOT, "public", "brand", "favicon.ico"),
                os.path.join(ROOT, "public", "favicon.ico"))
print("favicon.ico copied to public root")
