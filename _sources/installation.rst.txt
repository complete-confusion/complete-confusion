Installation
============

Complete Confusion can be installed via pip or from source.

Via pip
-------

The easiest way to install Complete Confusion is via pip:

.. code-block:: bash

   pip install complete-confusion

From source
-----------

You can also install from source using Poetry:

.. code-block:: bash

   git clone https://github.com/complete-confusion/complete-confusion.git
   cd complete-confusion
   poetry install

For development with documentation dependencies:

.. code-block:: bash

   poetry install --with docs

Requirements
------------

Complete Confusion requires Python 3.10 or later and the following dependencies:

- numpy >= 2.2.2
- plotly >= 5.24.1
- scikit-learn >= 1.6.1
- pandas >= 2.3.0
- chardet >= 5.2.0
- krippendorff >= 0.8.1
