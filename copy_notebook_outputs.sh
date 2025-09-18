#!/bin/bash

# Script to copy notebook outputs to documentation structure

set -e

echo "Copying notebook outputs to documentation..."

# Source and destination paths
NOTEBOOKS_DIR="docs/source/notebooks"
DOCS_STATIC_DIR="docs/build/html/notebooks"

# Check if we're in the right directory
if [ ! -f "pyproject.toml" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Copy all subdirectories from notebooks to the built docs
if [ -d "${NOTEBOOKS_DIR}" ]; then
    echo "Copying all notebook outputs..."
    mkdir -p "${DOCS_STATIC_DIR}"
    cp -r "${NOTEBOOKS_DIR}"/*/ "${DOCS_STATIC_DIR}/" 2>/dev/null || echo "No subdirectories found to copy"
else
    echo "Warning: Notebooks directory ${NOTEBOOKS_DIR} not found"
fi

echo "Notebook outputs copied successfully!"
