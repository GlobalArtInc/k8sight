#!/bin/bash

set -euo pipefail

if command -v magick &> /dev/null; then
  IMAGEMAGICK_CMD="magick"
elif command -v convert &> /dev/null; then
  IMAGEMAGICK_CMD="convert"
else
  echo "Error: ImageMagick not found. Please install ImageMagick."
  exit 1
fi

for i in 16 22 24 32 36 48 64 72 96 128 192 256 512; do
  border=$((i * 1000 * 38 / 1000000))
  size=$((i - 2 * border))
  ${IMAGEMAGICK_CMD} -background none icon.svg -density 400 -resize "${size}x${size}" -bordercolor transparent -border "${border}" -verbose "icons/${i}x${i}.png"
done

