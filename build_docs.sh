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

# Copy notebook outputs to the built documentation
echo "Copying notebook outputs..."
NOTEBOOKS_DIR="docs/source/notebooks"
DOCS_STATIC_DIR="docs/build/html/notebooks"
cd ..
if [ -d "${NOTEBOOKS_DIR}" ]; then
    echo "Copying all notebook outputs..."
    mkdir -p "${DOCS_STATIC_DIR}"
    cp -r "${NOTEBOOKS_DIR}"/*/ "${DOCS_STATIC_DIR}/" 2>/dev/null || echo "No subdirectories found to copy"
else
    echo "Warning: Notebooks directory ${NOTEBOOKS_DIR} not found"
fi
cd docs

# Create .nojekyll file for GitHub Pages
touch build/html/.nojekyll

echo ""
echo "Documentation built successfully!"
echo "Open docs/build/html/index.html in your browser to view it."
echo ""
echo "To serve locally with live reload, run:"
echo "  cd docs && poetry run sphinx-autobuild source build/html"
