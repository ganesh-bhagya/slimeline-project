#!/bin/bash

# Script to convert all images to WebP format with compression
# Usage: ./convert-to-webp.sh

ASSETS_DIR="src/assets/images"
QUALITY=85  # WebP quality (0-100, lower = smaller file)

echo "Starting WebP conversion..."

# Function to convert a single image
convert_image() {
    local input_file="$1"
    # Handle files with extensions properly
    local base_name="${input_file%.*}"
    local output_file="${base_name}.webp"
    
    # Skip if already a webp file
    if [[ "$input_file" == *.webp ]]; then
        return
    fi
    
    # Skip if output already exists
    if [ -f "$output_file" ]; then
        echo "Skipping $input_file (WebP already exists)"
        return
    fi
    
    echo "Converting: $input_file -> $output_file"
    
    # Convert based on file extension
    if [[ "$input_file" == *.png ]]; then
        cwebp -q $QUALITY -lossless "$input_file" -o "$output_file" 2>/dev/null || cwebp -q $QUALITY "$input_file" -o "$output_file"
    else
        cwebp -q $QUALITY "$input_file" -o "$output_file"
    fi
    
    if [ $? -eq 0 ]; then
        # Compare sizes
        old_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
        new_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
        reduction=$((100 - (new_size * 100 / old_size)))
        echo "  ✓ Converted (reduced by ~${reduction}%)"
    else
        echo "  ✗ Failed to convert"
    fi
}

# Find and convert all images
find "$ASSETS_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.JPG" -o -name "*.JPEG" -o -name "*.PNG" \) | while read -r file; do
    convert_image "$file"
done

echo ""
echo "WebP conversion complete!"
echo ""
echo "To see file size comparison, run:"
echo "find $ASSETS_DIR -name '*.webp' -exec sh -c 'echo \"\${1%.webp}.*\" && ls -lh \"\${1%.webp}\".* 2>/dev/null | awk \"{print \\\$5, \\\$9}\"' _ {} \\;"

