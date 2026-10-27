#!/bin/sh
# Wraps app.html (the page body used for the hosted artifact) into a full index.html for GitHub Pages / local use.
cd "$(dirname "$0")/.." || exit 1
{ printf '<!doctype html>\n<html lang="th">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
  sed -n '1,/<link rel="stylesheet" href="css\/style.css">/p' app.html
  printf '</head>\n<body>\n'
  sed '1,/<link rel="stylesheet" href="css\/style.css">/d' app.html
  printf '</body>\n</html>\n'; } > index.html
