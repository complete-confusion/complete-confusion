Examples
========

This section contains various examples showing how to use Complete Confusion in different scenarios.

Binary Classification
----------------------

.. code-block:: python

   import complete_confusion as cc
   import numpy as np

   # Generate synthetic binary classification data
   np.random.seed(42)
   n_samples = 1000
   
   # Simulate predictions and true labels
   true_labels = np.random.choice([0, 1], size=n_samples, p=[0.7, 0.3])
   # Add some noise to create realistic predictions
   predictions = true_labels.copy()
   noise_indices = np.random.choice(n_samples, size=int(0.1 * n_samples), replace=False)
   predictions[noise_indices] = 1 - predictions[noise_indices]

   class_names = ["Negative", "Positive"]
   
   cc.save_performance_metrics_to_html(
       predictions,
       true_labels,
       class_names,
       output_file="binary_classification_example.html"
   )

Multi-class Classification
--------------------------

.. code-block:: python

   import complete_confusion as cc
   from sklearn.datasets import make_classification
   from sklearn.ensemble import GradientBoostingClassifier
   from sklearn.model_selection import train_test_split

   # Generate multi-class dataset
   X, y = make_classification(
       n_samples=1000,
       n_features=20,
       n_informative=10,
       n_redundant=5,
       n_classes=5,
       random_state=42
   )

   # Split and train
   X_train, X_test, y_train, y_test = train_test_split(
       X, y, test_size=0.3, random_state=42
   )

   model = GradientBoostingClassifier(random_state=42)
   model.fit(X_train, y_train)
   predictions = model.predict(X_test)

   class_names = [f"Class {i}" for i in range(5)]
   
   cc.save_performance_metrics_to_html(
       predictions,
       y_test,
       class_names,
       output_file="multiclass_example.html"
   )

Imbalanced Dataset
------------------

.. code-block:: python

   import complete_confusion as cc
   import numpy as np

   # Create highly imbalanced dataset
   np.random.seed(42)
   n_samples = 1000
   
   # 95% class 0, 5% class 1
   true_labels = np.random.choice([0, 1], size=n_samples, p=[0.95, 0.05])
   
   # Simulate a model that struggles with minority class
   predictions = true_labels.copy()
   
   # Model misses 50% of positive cases (high false negative rate)
   positive_indices = np.where(true_labels == 1)[0]
   missed_positives = np.random.choice(
       positive_indices, 
       size=int(0.5 * len(positive_indices)), 
       replace=False
   )
   predictions[missed_positives] = 0
   
   # Model has some false positives
   negative_indices = np.where(true_labels == 0)[0]
   false_positives = np.random.choice(
       negative_indices,
       size=int(0.02 * len(negative_indices)),
       replace=False
   )
   predictions[false_positives] = 1

   class_names = ["Majority Class", "Minority Class"]
   
   cc.save_performance_metrics_to_html(
       predictions,
       true_labels,
       class_names,
       output_file="imbalanced_example.html"
   )
