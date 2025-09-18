Jupyter Notebooks
=================

This section contains interactive Jupyter notebooks that demonstrate the functionality of Complete Confusion.

Demo Notebook
-------------

The main demonstration notebook shows comprehensive examples of Complete Confusion usage:

**View Online:** `demo_notebook.ipynb on GitHub <https://github.com/complete-confusion/complete-confusion/blob/main/docs/source/notebooks/demo_notebook.ipynb>`_

**Local Path:** ``docs/source/notebooks/demo_notebook.ipynb``

The notebook demonstrates:

1. **Basic usage** - minimal example with predefined data
2. **Multi-class classification** - with synthetic data and Random Forest  
3. **Binary classification** - another realistic example

CIFAR-10 CNN Demo
-----------------

A comprehensive real-world example using deep learning on the CIFAR-10 dataset:

**View Online:** `cifar10_demo.ipynb on GitHub <https://github.com/complete-confusion/complete-confusion/blob/main/docs/source/notebooks/cifar10_demo.ipynb>`_

**Local Path:** ``docs/source/notebooks/cifar10_demo.ipynb``

This advanced demo shows:

1. **Data loading** - downloading and preprocessing CIFAR-10 dataset
2. **CNN architecture** - building a convolutional neural network
3. **Training loop** - training the model with proper validation
4. **Performance evaluation** - using Complete Confusion for comprehensive analysis
5. **Image integration** - embedding actual CIFAR-10 images in the report

**Advanced Features:**
- **Base64 image embedding** - CIFAR-10 images included directly in HTML reports
- **Misclassification analysis** - focused reports on classification errors
- **Self-contained reports** - no external dependencies, works offline
- **Multiple report types** - full dataset and error-focused versions

**Features:**
- Downloads CIFAR-10 automatically (60,000 images, 10 classes)
- Implements a modern CNN with batch normalization and dropout
- Trains for multiple epochs with learning rate scheduling
- Generates detailed performance reports for all 10 classes
- **Embeds actual CIFAR-10 images** using base64 data URIs
- Creates focused misclassification reports with images
- Includes visualizations of training progress and sample data

Each example generates an HTML report containing:

- Interactive confusion matrix
- Performance metrics (precision, recall, F1-score)
- Per-class statistics
- Detailed visualizations

Running the Notebooks Locally
-----------------------------

To run the notebooks locally:

1. **Install the package with development dependencies:**

   .. code-block:: bash

      poetry install --with docs

2. **Start Jupyter:**

   .. code-block:: bash

      poetry run jupyter notebook

3. **Navigate to and open the desired notebook:**
   
   - ``docs/source/notebooks/demo_notebook.ipynb`` - Basic examples
   - ``docs/source/notebooks/cifar10_demo.ipynb`` - CNN/CIFAR-10 example

4. **Run the cells** to generate the HTML reports

.. note::
   
   The CIFAR-10 demo requires PyTorch and will download ~170MB of data on first run.
   Training time depends on your hardware (CPU: ~10-15 minutes, GPU: ~2-3 minutes).

Interactive Output Examples
---------------------------

The notebooks generate interactive HTML reports that you can view:

- :doc:`examples_interactive` - Links to the actual generated HTML files

The generated HTML files are self-contained and include:

- **complete-confusion.html**: Main interactive report
- **complete-confusion.css**: Styling and layout  
- **complete-confusion.js**: Interactive functionality
- **complete-confusion-data.js**: Performance data and metrics
