from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "optimized"
OUT_DIR.mkdir(parents=True, exist_ok=True)


TARGETS = {
    "hero": (ROOT / "Website_Images" / "bnc model.png", [640, 1100]),
    "about-main": (ROOT / "Website_Images" / "RCF model.png", [480, 900]),
    "process-forging": (ROOT / "Website_Images" / "Forging Process.png", [520, 900]),
    "process-machining": (ROOT / "Website_Images" / "PD Model.png", [520, 900]),
    "process-finishing": (ROOT / "Website_Images" / "Finishiing Process.png", [520, 900]),
    "finish-chrome": (ROOT / "assets" / "finishes" / "chrome.png", [420, 760]),
    "finish-ced": (ROOT / "assets" / "finishes" / "ced-coating.png", [420, 760]),
    "finish-zinc-yellow": (ROOT / "assets" / "finishes" / "zinc-yellow.png", [420, 760]),
    "finish-zinc-white": (ROOT / "assets" / "finishes" / "zinc-white.png", [420, 760]),
    "product-bnc": (ROOT / "Website_Images" / "bnc model.png", [360, 700]),
    "product-rcf": (ROOT / "Website_Images" / "RCF model.png", [360, 700]),
    "product-pd": (ROOT / "Website_Images" / "PD Model.png", [360, 700]),
    "product-plain": (ROOT / "Website_Images" / "Plain Model.png", [360, 700]),
    "product-rcf-light": (ROOT / "Website_Images" / "RCF Light.png", [360, 700]),
    "product-ss": (ROOT / "Website_Images" / "SS_model.png", [360, 700]),
    "product-jumbo": (ROOT / "Website_Images" / "Jumbo Model.png", [360, 700]),
    "product-2-side": (ROOT / "Website_Images" / "2 side pole.png", [360, 700]),
    "product-radial-fin": (ROOT / "Website_Images" / "Radial Fin Model.png", [360, 700]),
    "product-flower": (ROOT / "Website_Images" / "Flower Model.png", [360, 700]),
    "product-double": (ROOT / "Website_Images" / "Double magnet.png", [360, 700]),
    "product-u-yoke": (ROOT / "Website_Images" / "U Yoke.png", [360, 700]),
}


def save_webp(src: Path, out_base: str, widths: list[int]) -> None:
    with Image.open(src) as im:
        im = im.convert("RGB")
        for w in widths:
            ratio = w / im.width
            h = int(im.height * ratio)
            resized = im.resize((w, h), Image.Resampling.LANCZOS)
            out_path = OUT_DIR / f"{out_base}-{w}.webp"
            resized.save(out_path, "WEBP", quality=80, method=6)


for name, (src, widths) in TARGETS.items():
    if src.exists():
        save_webp(src, name, widths)
    else:
        print(f"Missing source: {src}")

print("optimized images generated")
