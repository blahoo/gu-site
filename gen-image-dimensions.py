"""Regenerate client/src/lib/image-dimensions.json.

The markdown carries no image dimensions, so <img> has nothing to reserve space
with and the page reflows as each photo lands. This writes a path -> [w, h] map
that MarkdownView uses to emit width/height attributes.

Re-run after adding or replacing anything under client/public/images:
    python gen-image-dimensions.py
"""
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'client', 'public', 'images')
OUT = os.path.join(ROOT, 'client', 'src', 'lib', 'image-dimensions.json')

dims = {}
for dirpath, _dirnames, filenames in os.walk(SRC):
    for fn in filenames:
        if not fn.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif')):
            continue
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, os.path.join(ROOT, 'client', 'public'))
        url = '/' + rel.replace(os.sep, '/')
        try:
            with Image.open(full) as im:
                dims[url] = [im.width, im.height]
        except Exception as exc:  # unreadable file -> just omit it
            print('  skip %s (%s)' % (url, exc))

with open(OUT, 'w', encoding='utf-8') as fh:
    json.dump(dict(sorted(dims.items())), fh, indent=2)
    fh.write('\n')

print('wrote %d entries to %s' % (len(dims), OUT))
