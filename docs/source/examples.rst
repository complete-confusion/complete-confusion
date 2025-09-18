Examples
========

This section provides various examples showing how to use Complete Confusion in different scenarios.

For hands-on examples with executable code, see the :doc:`notebooks` section which includes a comprehensive Jupyter notebook with interactive examples.

Quick Reference Examples
------------------------

Binary Classification
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

   import complete_confusion as cc

   # Your binary classification results
   predictions = [0, 1, 0, 1, 0, 1, 1, 0]
   true_labels = [0, 1, 0, 0, 0, 1, 1, 1]
   class_names = ["Negative", "Positive"]
   
   cc.save_performance_metrics_to_html(
       predictions,
       true_labels,
       class_names,
       output_path="binary_results"
   )

Multi-class Classification
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

   import complete_confusion as cc

   # Your multi-class classification results
   predictions = [0, 1, 2, 1, 0, 2, 1, 0]
   true_labels = [0, 1, 2, 2, 0, 1, 1, 0]
   class_names = ["Class A", "Class B", "Class C"]
   
   cc.save_performance_metrics_to_html(
       predictions,
       true_labels,
       class_names,
       output_path="multiclass_results"
   )

Integration with Scikit-learn
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

   import complete_confusion as cc
   from sklearn.ensemble import RandomForestClassifier
   from sklearn.model_selection import train_test_split
   from sklearn.datasets import load_iris

   # Load and split data
   iris = load_iris()
   X_train, X_test, y_train, y_test = train_test_split(
       iris.data, iris.target, test_size=0.3, random_state=42
   )

   # Train model
   model = RandomForestClassifier(random_state=42)
   model.fit(X_train, y_train)
   predictions = model.predict(X_test)

   # Generate performance report
   cc.save_performance_metrics_to_html(
       predictions,
       y_test,
       iris.target_names,
       output_path="iris_results"
   )

Working with Imbalanced Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Complete Confusion automatically handles imbalanced datasets and provides relevant metrics:

.. code-block:: python

   import complete_confusion as cc
   import numpy as np

   # Highly imbalanced dataset (95% class 0, 5% class 1)
   np.random.seed(42)
   true_labels = np.random.choice([0, 1], size=1000, p=[0.95, 0.05])
   
   # Simulate model predictions with some errors
   predictions = true_labels.copy()
   # Add some misclassifications
   error_indices = np.random.choice(1000, size=50, replace=False)
   predictions[error_indices] = 1 - predictions[error_indices]

   class_names = ["Majority Class", "Minority Class"]
   
   cc.save_performance_metrics_to_html(
       predictions,
       true_labels,
       class_names,
       output_path="imbalanced_results"
   )

The generated HTML reports include:

- **Interactive confusion matrix** with hover details
- **Per-class metrics** (precision, recall, F1-score)
- **Overall performance** statistics
- **Support information** (number of samples per class)

Including Images in Reports
---------------------------

Complete Confusion supports including images alongside predictions for visual analysis:

.. code-block:: python

   import complete_confusion as cc
   import base64
   from io import BytesIO
   from PIL import Image
   import numpy as np
   
   def create_image_data_uri(img_array):
       """Convert image array to base64 data URI for embedding."""
       # Convert to PIL Image (assuming img_array is HxWxC format)
       img = Image.fromarray((img_array * 255).astype(np.uint8))
       img = img.resize((64, 64), Image.NEAREST)  # Resize for visibility
       
       # Convert to base64 data URI
       buffer = BytesIO()
       img.save(buffer, format='PNG')
       img_b64 = base64.b64encode(buffer.getvalue()).decode()
       return f"data:image/png;base64,{img_b64}"
   
   # Create image data URIs (one per prediction)
   image_uris = []
   for i, img in enumerate(your_image_data):
       if i < 100:  # Limit to avoid huge HTML files
           image_uris.append(create_image_data_uri(img))
       else:
           image_uris.append("")  # Empty string = no image
   
   # Generate report with embedded images
   cc.save_performance_metrics_to_html(
       predictions,
       true_labels,
       class_names,
       image_representations=image_uris,  # Add images!
       output_path="visual_results"
   )

**Image Benefits:**

- **Visual error analysis** - See exactly which images were misclassified
- **Data quality checks** - Spot corrupted or mislabeled images  
- **Self-contained reports** - Images embedded as data URIs
- **Stakeholder demos** - Show real examples with predictions

For more detailed, executable examples, see the :doc:`notebooks` section.
