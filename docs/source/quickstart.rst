Quick Start Guide
=================

This guide will help you get started with Complete Confusion quickly.

Basic Usage
-----------

The main function in Complete Confusion is ``save_performance_metrics_to_html``, which generates
a comprehensive HTML report of classification performance metrics.

Simple Example
~~~~~~~~~~~~~~

.. code-block:: python

   import complete_confusion as cc

   # Example classification data
   predictions = [0, 1, 0, 2, 1, 2, 0]
   true_labels = [0, 1, 0, 2, 0, 2, 2]
   class_names = ["Class A", "Class B", "Class C"]

   # Generate HTML report
   cc.save_performance_metrics_to_html(
       predictions, 
       true_labels, 
       class_names,
       output_file="my_performance_report.html"
   )

This will create an interactive HTML file containing:

- Confusion matrix visualization
- Classification metrics (precision, recall, F1-score)
- Per-class performance statistics
- Interactive plots for detailed analysis

Working with Real Data
~~~~~~~~~~~~~~~~~~~~~~

For real-world scenarios, you might have model predictions and ground truth labels:

.. code-block:: python

   import complete_confusion as cc
   from sklearn.model_selection import train_test_split
   from sklearn.ensemble import RandomForestClassifier
   from sklearn.datasets import load_iris

   # Load example dataset
   iris = load_iris()
   X_train, X_test, y_train, y_test = train_test_split(
       iris.data, iris.target, test_size=0.3, random_state=42
   )

   # Train a model
   model = RandomForestClassifier(random_state=42)
   model.fit(X_train, y_train)
   
   # Make predictions
   predictions = model.predict(X_test)

   # Generate performance report
   cc.save_performance_metrics_to_html(
       predictions, 
       y_test, 
       iris.target_names,
       output_file="iris_model_performance.html"
   )

Next Steps
----------

- Check out the :doc:`api` for detailed function documentation
- See :doc:`examples` for more use cases
