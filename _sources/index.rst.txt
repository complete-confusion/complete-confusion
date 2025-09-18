Complete Confusion Documentation
================================

A simple call to visualize performance metrics for classification and regression models.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   installation
   quickstart
   api
   notebooks
   examples
   examples_interactive

.. toctree::
   :maxdepth: 1
   :caption: Development:

   assets_guide

Installation
============

You can install Complete Confusion via pip:

.. code-block:: bash

   pip install complete-confusion

Quick Start
===========

Here's a simple example to get you started:

.. code-block:: python

   import complete_confusion as cc

   # Example data
   predictions = [0, 1, 0, 2, 1, 2, 0]
   trues = [0, 1, 0, 2, 0, 2, 2]
   classes = ["Class 0", "Class 1", "Class 2"]

   cc.save_performance_metrics_to_html(predictions, trues, classes)

This will generate an interactive HTML report with confusion matrices and performance metrics.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
