# Complete Confusion

A simple call to visualize performance metrics for classification and regression models.


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
