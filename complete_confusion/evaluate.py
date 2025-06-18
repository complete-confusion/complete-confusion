import shutil
from pathlib import Path
from typing import Union, Collection, Optional

import numpy as np
import pandas as pd
from krippendorff import krippendorff
from pandas import DataFrame as df
from sklearn.metrics import confusion_matrix, recall_score, precision_score, f1_score, accuracy_score


def print_performance_metrics(trues, predicted, probs, class_list):
    class_metrics, general_metrics, roc, conf_matrix = _calculate_performance_metrics(trues, predicted, probs,
                                                                                      class_list)
    print(class_metrics.round(2))
    print(general_metrics.round(2))
    # if roc is not None:
    # print(roc)
    print(conf_matrix)


def _calculate_performance_metrics(truths:Collection[int],
                                   predictions:Collection[int],
                                   probabilities:Collection[float],
                                   class_list:Collection[str]):
    """
    Calculates some performance metrics given a list of ground truth values and a list of predictions to be compared.
    :param truths: list of ground truths
    :param predictions: list of model predictions
    :param probabilities: list of model predicted probabilities
    :param class_list: the set of all possible labels
    :return: a dataframe with class level metrics and a dataframe with general metrics and a one with ROC values
    """
    truth_labels = [list(class_list)[i] for i in truths]
    prediction_labels = [list(class_list)[i] for i in predictions]

    class_metrics_data = {'recall': recall_score(truth_labels, prediction_labels, average=None),
                          'precision': precision_score(truth_labels, prediction_labels, average=None),
                          'f1': f1_score(truth_labels, prediction_labels, average=None)}
    class_metrics = df(class_metrics_data, index=list(class_list))

    if probabilities is not None:
        from sklearn.metrics import roc_auc_score, roc_curve
        positive_label = positive_label or class_list[0]  # Default to the first class if not provided
        fpr, tpr, thresholds = roc_curve(y_true=truth_labels, y_score=probabilities, pos_label=positive_label)
        roc = df({'fpr': fpr, 'tpr': tpr})
        roc_auc = (roc_auc_score(truth_labels, probabilities))
    else:
        roc = None
        roc_auc = None

    i_set = np.unique(list(truths) + list(predictions))
    general_metrics_data = [roc_auc,
                            accuracy_score(truth_labels, prediction_labels),
                            krippendorff.alpha(reliability_data=[truths, predictions],
                                               level_of_measurement='nominal', value_domain=i_set)]
    general_metrics = df(general_metrics_data, index=['auc', 'accuracy', 'krippendorff alpha'], columns=['score'])

    conf_matrix = pd.DataFrame(confusion_matrix(truth_labels, prediction_labels),
                               index=pd.MultiIndex.from_product([['True:'], class_list]),
                               columns=pd.MultiIndex.from_product([['Predicted:'], class_list]))

    return class_metrics, general_metrics[general_metrics['score'].notna()], roc, conf_matrix


def save_performance_metrics_to_html(predictions: Collection[int],
                                     truths: Collection[int],
                                     output_path: Union[str, Path],
                                     classes:Collection[str]=None,
                                     probabilities:Optional[Collection[float]]=None):
    """
    Creates a confusion matrix and exports it to an HTML file.

    Args:
        predictions (list or np.ndarray): The predicted class labels.
        truths (list or np.ndarray): The true class labels.
        probabilities: (list or np.ndarray, optional): The predicted probabilities for each class.
        classes (list of str): List of class names corresponding to labels.
        output_path (str): Path to the output HTML file.
    """
    output_path = Path(output_path)
    resources = Path(__file__).resolve().parent / 'resources'

    unique_class_indices = sorted(set(list(truths) + list(predictions)))
    classes = classes if classes is not None else unique_class_indices

    confusion_matrix_js_str = _create_confusion_matrix_js_str(predictions, truths, probabilities, classes)
    class_metrics_js_str = _create_class_metrics_js_str(predictions, truths, probabilities, classes)

    # Save the data to a JavaScript file
    with open(output_path / 'complete-confusion-data.js', 'w') as f:
        f.write('\n'.join([confusion_matrix_js_str, class_metrics_js_str]))

    shutil.copy(resources / 'complete-confusion.html', output_path)
    shutil.copy(resources / 'complete-confusion.css', output_path)
    shutil.copy(resources / 'complete-confusion.js', output_path)


def _create_class_metrics_js_str(
        predictions: Collection[int],
        truths: Collection[int],
        probabilities: Collection[float],
        classes: Collection[str]) -> str:
    class_metrics_df, _, _, _ = _calculate_performance_metrics(truths, predictions, probabilities, classes)
    # Convert the dataframe to a list of dicts for JavaScript
    class_metrics_values = [
        {"type": idx, **{col: float(class_metrics_df.loc[idx, col]) for col in class_metrics_df.columns}}
        for idx in class_metrics_df.index
    ]
    class_metrics_js_str = "const classMetricsData = {\n    values: " + str(class_metrics_values).replace("'",
                                                                                                          '"') + "\n};\n"
    return class_metrics_js_str


def _create_confusion_matrix_js_str(
        predictions: Collection[int],
        truths: Collection[int],
        probabilities: Collection[float],
        classes: Collection[str]) -> str:
    ids = [str(i) for i in range(len(truths))]
    class_list = list(classes)
    headers = ['id', 'predicted', 'actual']
    columns = [ids, [class_list[class_id] for class_id in predictions], [class_list[class_id] for class_id in truths]]
    if probabilities is not None:
        headers.append('confidence_score')
        columns.append(probabilities)
    data_csv_str = '\n'.join([','.join([str(e) for e in data_point]) for data_point in zip(*columns)])
    confusion_matrix_js_str = "const confusionMatrixData = `\n" + ','.join(headers) + "\n" + data_csv_str + "`;\n"
    return confusion_matrix_js_str
