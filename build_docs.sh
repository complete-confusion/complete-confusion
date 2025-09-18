#!/bin/bash

# Script to build documentation locally

set -e

echo "Building Complete Confusion documentation..."

# Check if we're in the right directory
if [ ! -f "pyproject.toml" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Install documentation dependencies if needed
echo "Installing documentation dependencies..."
poetry install --with docs

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf docs/build/*

# Build documentation
echo "Building HTML documentation..."
cd docs
poetry run sphinx-build -b html source build/html

# Download demo assets from GitHub releases
echo "Downloading demo assets..."
if command -v gh &> /dev/null; then
    if ./scripts/download_assets.sh; then
        echo "✅ Demo assets downloaded"
    else
        echo "ℹ️  No assets found, will use local outputs if available"
    fi
else
    echo "ℹ️  GitHub CLI not found, will use local outputs if available"
fi

# Copy any local notebook outputs as fallback
echo "Copying local notebook outputs (fallback)..."
cd ..
./copy_notebook_outputs.sh
cd docs

# Create .nojekyll file for GitHub Pages
touch build/html/.nojekyll

echo ""
echo "Documentation built successfully!"
echo "Open docs/build/html/index.html in your browser to view it."
echo ""
echo "To serve locally with live reload, run:"
echo "  cd docs && poetry run sphinx-autobuild source build/html"
