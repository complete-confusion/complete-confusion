# Complete Confusion

A simple call to visualize performance metrics for classification and regression models.

Comprehensive documentation, including demos, can be found at [https://complete-confusion.github.io/complete-confusion/](https://complete-confusion.github.io/complete-confusion/).

## Installation

```bash
pip install complete-confusion
```

## Usage

```python
import complete_confusion as cc

# Example data
predictions = [0, 1, 0, 2, 1, 2, 0]
trues = [0, 1, 0, 2, 0, 2, 2]
classes = ["Class 0", "Class 1", "Class 2"]

cc.save_performance_metrics_to_html(predictions, trues, classes)
```


## Development

```bash
poetry install
poetry run pytest
```

## Documentation

The documentation is built using Sphinx and includes API reference, examples, and Jupyter notebooks.

### Building Documentation Locally

To build the documentation locally:

```bash
# Install documentation dependencies
poetry install --with docs

# Build documentation
./build_docs.sh
```

The built documentation will be available in `docs/build/html/index.html`.

### Live Documentation Server

For development with auto-reload:

```bash
cd docs
poetry run sphinx-autobuild source build/html
```

### GitHub Pages

Documentation is automatically built and deployed to GitHub Pages on every push to the main branch. Visit [https://complete-confusion.github.io/complete-confusion/](https://complete-confusion.github.io/complete-confusion/) to view the live documentation.
