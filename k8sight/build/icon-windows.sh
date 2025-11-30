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

${IMAGEMAGICK_CMD} -background none icon.svg -density 400 -define icon:auto-resize=256,16,20,24,32,40,48,60,64,72,80,96 -verbose icon.ico

