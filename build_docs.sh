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

# Create .nojekyll file for GitHub Pages
touch build/html/.nojekyll

echo ""
echo "Documentation built successfully!"
echo "Open docs/build/html/index.html in your browser to view it."
echo ""
echo "To serve locally with live reload, run:"
echo "  cd docs && poetry run sphinx-autobuild source build/html"
