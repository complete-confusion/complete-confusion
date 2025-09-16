Jupyter Notebooks
=================

This project includes Jupyter notebooks that demonstrate the functionality of Complete Confusion.

Demo Notebook
-------------

A demonstration notebook is available in the project root directory:

* `demo.ipynb <https://github.com/complete-confusion/complete-confusion/blob/main/demo.ipynb>`_ - Basic usage example

This notebook shows:

- Basic usage with sample data
- How to generate HTML performance reports
- Example output interpretation

To run the notebook locally:

1. Install the package with development dependencies:

   .. code-block:: bash

      poetry install --with docs

2. Start Jupyter:

   .. code-block:: bash

      poetry run jupyter notebook

3. Open `demo.ipynb` and run the cells

Additional Examples
-------------------

For more comprehensive examples, check out the :doc:`examples` section which includes:

- Binary classification examples
- Multi-class classification examples  
- Imbalanced dataset handling
- Integration with scikit-learn
