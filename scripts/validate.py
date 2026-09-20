#!/usr/bin/env python3
"""Dependency-free validation for the Kleenova static site."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [ROOT / "index.html", ROOT / "privacy.html", ROOT / "404.html"]

errors: list[str] = []

class SiteParser(HTMLParser):
    def __init__(self, file: Path) -> None:
        super().__init__(convert_charrefs=True)
        self.file = file
        self.ids: set[str] = set()
        self.refs: list[tuple[str, str]] = []
        self.anchors: list[str] = []
        self.images_without_alt: list[str] = []
        self.target_blank_without_rel: list[str] = []
        self.metas: list[dict[str, str]] = []
        self.title_seen = False

    def handle_starttag(self, tag: str, attrs_raw):
        attrs = dict(attrs_raw)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                errors.append(f"{self.file.name}: duplicate id #{attrs['id']}")
            self.ids.add(attrs["id"])

        if tag == "title":
            self.title_seen = True

        if tag == "meta":
            self.metas.append(attrs)

        if tag == "img":
            if "alt" not in attrs:
                self.images_without_alt.append(attrs.get("src", "<unknown>"))
            if attrs.get("src"):
                self.refs.append(("src", attrs["src"]))

        if tag == "script" and attrs.get("src"):
            self.refs.append(("src", attrs["src"]))

        if tag == "link" and attrs.get("href") and attrs.get("rel") != "canonical":
            href = attrs["href"]
            if not href.startswith(("http://", "https://", "mailto:", "tel:", "data:")):
                self.refs.append(("href", href))

        if tag == "a" and attrs.get("href"):
            href = attrs["href"]
            if href.startswith("#"):
                self.anchors.append(href[1:])
            elif not href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:")):
                self.refs.append(("href", href))
            if attrs.get("target") == "_blank":
                rel = set((attrs.get("rel") or "").split())
                if "noopener" not in rel:
                    self.target_blank_without_rel.append(href)

def check_file_reference(source: Path, ref: str) -> None:
    if not ref or ref.startswith("#"):
        return
    split = urlsplit(ref)
    path = split.path
    if path.startswith("/Kleenova/"):
        path = path[len("/Kleenova/"):]
        target = ROOT / path
    elif path.startswith("/"):
        return
    else:
        target = source.parent / path

    # Directories are allowed when they contain an index file.
    if target.is_dir():
        target = target / "index.html"

    if not target.exists():
        errors.append(f"{source.name}: missing local reference: {ref}")

for html_file in HTML_FILES:
    if not html_file.exists():
        errors.append(f"Missing required HTML file: {html_file.name}")
        continue
    parser = SiteParser(html_file)
    parser.feed(html_file.read_text(encoding="utf-8"))

    if not parser.title_seen:
        errors.append(f"{html_file.name}: missing <title>")
    for src in parser.images_without_alt:
        errors.append(f"{html_file.name}: image missing alt attribute: {src}")
    for href in parser.target_blank_without_rel:
        errors.append(f"{html_file.name}: target=_blank without rel=noopener: {href}")
    for anchor in parser.anchors:
        if anchor and anchor not in parser.ids and html_file.name == "index.html":
            errors.append(f"{html_file.name}: unresolved anchor: #{anchor}")
    for _, ref in parser.refs:
        check_file_reference(html_file, ref)

index_text = (ROOT / "index.html").read_text(encoding="utf-8") if (ROOT / "index.html").exists() else ""
required_fragments = [
    'name="description"',
    'rel="canonical"',
    'application/ld+json',
    'data-quote-form',
    'Content-Security-Policy'
]
for fragment in required_fragments:
    if fragment not in index_text:
        errors.append(f"index.html: required metadata/feature missing: {fragment}")

expected = [
    "robots.txt",
    "sitemap.xml",
    "site.webmanifest",
    "assets/css/styles.css",
    "assets/js/main.js",
    "assets/images/hero-cleaning.svg",
    "assets/icons/favicon.svg",
    "SECURITY.md",
]
for rel in expected:
    if not (ROOT / rel).exists():
        errors.append(f"Missing required project file: {rel}")

# Prevent accidental secret-like material in published frontend.
secret_patterns = [
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"ghp_[A-Za-z0-9]{30,}"),
    re.compile(r"sk-[A-Za-z0-9]{20,}"),
]
for path in [ROOT / "index.html", ROOT / "assets/js/main.js", ROOT / "assets/css/styles.css"]:
    if path.exists():
        text = path.read_text(encoding="utf-8", errors="ignore")
        for pattern in secret_patterns:
            if pattern.search(text):
                errors.append(f"{path.relative_to(ROOT)}: possible secret pattern found")

if errors:
    print("Validation failed:")
    for err in errors:
        print(f" - {err}")
    sys.exit(1)

print("Validation passed.")
