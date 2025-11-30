#!/bin/bash

set -euo pipefail

if command -v magick &> /dev/null; then
  IMAGEMAGICK_CMD="magick"
elif command -v convert &> /dev/null; then
  IMAGEMAGICK_CMD="convert"
else
  echo "Error: ImageMagick not found. Install it via: brew install imagemagick"
  exit 1
fi

rm -rf icon.iconset
mkdir icon.iconset
for i in 16 32 64 128 256 512 1024; do
  border=$((i * 1000 * 100 / 1000000))
  size=$((i - 2 * border))
  half=$((i / 2))
  if [[ $i -ne 1024 ]]; then
    ${IMAGEMAGICK_CMD} -background none icon.svg -density 400 -resize "${size}x${size}" -bordercolor transparent -border "${border}" -verbose "icon.iconset/icon_${i}x${i}.png"
  fi
  if [[ $i -ne 16 ]]; then
    ${IMAGEMAGICK_CMD} -background none icon.svg -density 400 -resize "${size}x${size}" -bordercolor transparent -border "${border}" -verbose "icon.iconset/icon_${half}x${half}@2x.png"
  fi
done
iconutil --convert icns -o icon.icns icon.iconset
rm -rf icon.iconset

