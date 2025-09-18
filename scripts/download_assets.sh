#!/bin/bash

# Script to download notebook assets from GitHub releases

set -e

echo "📦 Downloading notebook assets from GitHub releases..."

# Parse command line arguments
RELEASE_TAG=""
TARGET_DIR=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --tag)
            RELEASE_TAG="$2"
            shift 2
            ;;
        --target)
            TARGET_DIR="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [--tag RELEASE_TAG] [--target TARGET_DIR]"
            echo ""
            echo "Options:"
            echo "  --tag TAG     Download specific release tag (default: latest assets release)"
            echo "  --target DIR  Target directory (default: docs/build/html/notebooks)"
            echo "  --help        Show this help message"
            exit 0
            ;;
        *)
            echo "❌ Unknown option: $1"
            exit 1
            ;;
    esac
done

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

# Set default target directory
if [ -z "$TARGET_DIR" ]; then
    TARGET_DIR="docs/build/html/notebooks"
fi

# Get latest assets release if no tag specified
if [ -z "$RELEASE_TAG" ]; then
    echo "🔍 Finding latest assets release..."
    RELEASE_TAG=$(gh release list --json tagName,name --jq '.[] | select(.tagName | startswith("assets-")) | .tagName' | head -n 1)
    
    if [ -z "$RELEASE_TAG" ]; then
        echo "❌ No assets releases found"
        echo "💡 Run ./scripts/upload_assets.sh first to create an assets release"
        exit 1
    fi
    
    echo "📦 Latest assets release: $RELEASE_TAG"
else
    echo "📌 Using specified release: $RELEASE_TAG"
fi

# Create target directory
mkdir -p "$TARGET_DIR"

# Create temporary download directory
TEMP_DIR="temp_download"
mkdir -p "$TEMP_DIR"

echo "⬇️  Downloading assets from release: $RELEASE_TAG"

# Download the assets archive
if gh release download "$RELEASE_TAG" --pattern 'notebook-assets.tar.gz' --dir "$TEMP_DIR"; then
    echo "✅ Downloaded: $TEMP_DIR/notebook-assets.tar.gz"
else
    echo "❌ Failed to download assets"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Extract to target directory
echo "📂 Extracting assets to: $TARGET_DIR"
if tar -xzf "$TEMP_DIR/notebook-assets.tar.gz" -C "$TARGET_DIR"; then
    # List extracted contents
    echo "📁 Extracted directories:"
    find "$TARGET_DIR" -maxdepth 1 -type d ! -path "$TARGET_DIR" -exec basename {} \; | sort | sed 's/^/  - /'
    
    echo "✅ Assets extracted successfully!"
else
    echo "❌ Failed to extract assets"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "📁 Assets available in: $TARGET_DIR"
echo "💡 You can now:"
echo "   - Build documentation: cd docs && sphinx-build source build/html"
echo "   - View reports locally: open $TARGET_DIR/*/complete-confusion.html"
