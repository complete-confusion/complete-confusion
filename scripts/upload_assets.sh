#!/bin/bash

# Script to upload notebook assets to GitHub releases

set -e

echo "🚀 Uploading notebook assets to GitHub releases..."

# Check if we're in the right directory
if [ ! -f "pyproject.toml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

NOTEBOOKS_DIR="docs/source/notebooks"
TEMP_DIR="temp_assets"
ARCHIVE_NAME="notebook-assets.tar.gz"

# Check if notebooks directory exists
if [ ! -d "$NOTEBOOKS_DIR" ]; then
    echo "❌ Error: Notebooks directory not found: $NOTEBOOKS_DIR"
    exit 1
fi

# Find output directories
echo "📁 Looking for output directories in $NOTEBOOKS_DIR..."
OUTPUT_DIRS=($(find "$NOTEBOOKS_DIR" -maxdepth 1 -type d -name "*_output" -o -name "*_performance" -o -name "*_results" -o -name "*_demo"))

# Also find directories with HTML files
while IFS= read -r -d '' dir; do
    if [ -n "$(find "$dir" -maxdepth 1 -name "*.html" -print -quit)" ]; then
        OUTPUT_DIRS+=("$dir")
    fi
done < <(find "$NOTEBOOKS_DIR" -maxdepth 1 -type d -print0)

# Remove duplicates and filter out the notebooks dir itself
UNIQUE_DIRS=($(printf '%s\n' "${OUTPUT_DIRS[@]}" | sort -u | grep -v "^$NOTEBOOKS_DIR$"))

if [ ${#UNIQUE_DIRS[@]} -eq 0 ]; then
    echo "❌ No output directories found"
    echo "💡 Make sure you have run the demo notebooks and generated outputs"
    exit 1
fi

echo "📊 Found ${#UNIQUE_DIRS[@]} output directories:"
for dir in "${UNIQUE_DIRS[@]}"; do
    echo "  - $(basename "$dir")"
done

# Create temporary directory
mkdir -p "$TEMP_DIR"

# Create archive
echo "📦 Creating archive: $TEMP_DIR/$ARCHIVE_NAME"
tar -czf "$TEMP_DIR/$ARCHIVE_NAME" -C "$NOTEBOOKS_DIR" $(printf '%s ' "${UNIQUE_DIRS[@]#$NOTEBOOKS_DIR/}")

# Get archive size
ARCHIVE_SIZE=$(du -h "$TEMP_DIR/$ARCHIVE_NAME" | cut -f1)
echo "✅ Archive created: $ARCHIVE_SIZE"

# Generate tag name with timestamp
TAG_NAME="assets-$(date +%Y%m%d-%H%M%S)"

# Create release
echo "🚀 Creating GitHub release: $TAG_NAME"

RELEASE_NOTES="# Documentation Assets Release

Generated on: $(date '+%Y-%m-%d %H:%M:%S')

This release contains the Complete Confusion demo outputs, including images.

## Usage

Download the assets:

\`\`\`bash
# Download and extract assets
./scripts/download_assets.sh

# Or manually:
gh release download $TAG_NAME --pattern 'notebook-assets.tar.gz'
tar -xzf notebook-assets.tar.gz -C docs/build/html/notebooks/
\`\`\`
"

if gh release create "$TAG_NAME" "$TEMP_DIR/$ARCHIVE_NAME" \
    --title "Documentation Assets $TAG_NAME" \
    --notes "$RELEASE_NOTES"; then
    echo "✅ Release created successfully!"
    echo "🏷️  Tag: $TAG_NAME"
    echo "🔗 View at: $(gh repo view --web --json url --jq .url)/releases/tag/$TAG_NAME"
else
    echo "❌ Failed to create release"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "💡 To download assets locally:"
echo "   ./scripts/download_assets.sh"
