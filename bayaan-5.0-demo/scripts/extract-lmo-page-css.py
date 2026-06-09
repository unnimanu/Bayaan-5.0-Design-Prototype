#!/usr/bin/env python3
"""Extract page-specific CSS from LMO HTML files (skip shared sections)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LMO = ROOT / "lmo"
OUT = ROOT / "css" / "pages"

# Section headers that live in lmo-common.css (skip these blocks)
COMMON_SECTIONS = {
    "design tokens",
    "reset",
    "topnav",
    "left sidebar",
    "layout",
    "page head",
    "section",
    "chat panel",
    "anims",
    "embed mode",
    "embed",
    "motion",
}

PAGE_SKIP = {
    "lmo-briefing-desk.html": COMMON_SECTIONS,
    "lmo-forecasting_v2.html": COMMON_SECTIONS | {"horizon tabs"},
    "lmo-forecasting-v3.html": COMMON_SECTIONS,
    "lmo-observe.html": COMMON_SECTIONS | {"summary box"},
    "lmo-diagnose.html": COMMON_SECTIONS
    | {"summary box", "section headers", "tags", "split layout", "risk register", "emiratisation", "shared ai"},
}


def extract_page_css(html_path: Path, skip_sections: set) -> str:
    text = html_path.read_text(encoding="utf-8")
    m = re.search(r"<style>(.*?)</style>", text, re.DOTALL)
    if not m:
        return ""
    css = m.group(1)
    lines = css.splitlines()
    out = []
    skip = False
    for line in lines:
        header = re.match(r"/\*\s*=+\s*(.+?)\s*=+\s*\*/", line.strip(), re.I)
        if header:
            name = header.group(1).strip().lower()
            skip = any(s in name for s in skip_sections)
            if not skip:
                out.append(line)
            continue
        if not skip:
            out.append(line)
    # Strip leading/trailing blank lines
    body = "\n".join(out).strip()
    if body:
        body = f"/* Page-specific: {html_path.name} */\n{body}\n"
    return body


def update_html(html_path: Path, page_css_name: str, extra_class: str = "") -> None:
    text = html_path.read_text(encoding="utf-8")
    links = (
        '<link rel="stylesheet" href="../css/pages/lmo-common.css">\n'
        f'<link rel="stylesheet" href="../css/pages/{page_css_name}">'
    )
    text = re.sub(r"<style>.*?</style>\s*", links + "\n", text, count=1, flags=re.DOTALL)
    if 'class="lmo' not in text[:2000]:
        if extra_class:
            text = re.sub(r"<body([^>]*)>", f'<body class="lmo {extra_class}"\\1>', text, count=1)
        else:
            text = re.sub(r"<body([^>]*)>", '<body class="lmo"\\1>', text, count=1)
    html_path.write_text(text, encoding="utf-8")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    mapping = {
        "lmo-briefing-desk.html": ("lmo-briefing.css", ""),
        "lmo-forecasting_v2.html": ("lmo-forecast-v2.css", ""),
        "lmo-forecasting-v3.html": ("lmo-forecast-v3.css", ""),
        "lmo-observe.html": ("lmo-observe.css", ""),
        "lmo-diagnose.html": ("lmo-diagnose.css", "lmo--diagnose"),
    }
    for fname, (css_name, body_extra) in mapping.items():
        path = LMO / fname
        skip = PAGE_SKIP.get(fname, COMMON_SECTIONS)
        page_css = extract_page_css(path, skip)
        (OUT / css_name).write_text(page_css, encoding="utf-8")
        update_html(path, css_name, body_extra)
        print(f"{fname} -> {css_name} ({len(page_css.splitlines())} lines)")


if __name__ == "__main__":
    main()
