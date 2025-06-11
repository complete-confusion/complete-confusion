import shutil
from pathlib import Path
from typing import Union, Collection

import numpy as np
import pandas as pd
from krippendorff import krippendorff
from pandas import DataFrame as df
from sklearn.metrics import confusion_matrix, recall_score, precision_score, f1_score, accuracy_score


def print_performance_metrics(trues, predicted, probs, class_list):
    class_metrics, general_metrics, roc, conf_matrix = calculate_performance_metrics(trues, predicted, probs,
                                                                                     class_list)
    print(class_metrics.round(2))
    print(general_metrics.round(2))
    # if roc is not None:
    # print(roc)
    print(conf_matrix)


def calculate_performance_metrics(truths, predictions, probabilities, class_list):
    """
    Calculates some performance metrics given a list of ground truth values and a list of predictions to be compared.
    :param truths: list of ground truths
    :param predictions: list of model predictions
    :param probabilities: list of model predicted probabilities
    :param class_list: the set of all possible labels
    :return: a dataframe with class level metrics and a dataframe with general metrics and a one with ROC values
    """
    class_metrics_data = {'recall': recall_score(truths, predictions, average=None),
                          'precision': precision_score(truths, predictions, average=None),
                          'f1': f1_score(truths, predictions, average=None)}
    class_metrics = df(class_metrics_data, index=class_list)

    i_trues = [list(class_list).index(label) for label in truths]
    i_predicted = [list(class_list).index(label) for label in predictions]
    i_set = np.unique(i_trues + i_predicted)

    if probabilities is not None:
        from sklearn.metrics import roc_auc_score, roc_curve
        fpr, tpr, thresholds = roc_curve(y_true=truths, y_score=probabilities, pos_label='pathogen disgust')
        roc = df({'fpr': fpr, 'tpr': tpr})
        roc_auc = (roc_auc_score(truths, probabilities))
    else:
        roc = None
        roc_auc = None

    general_metrics_data = [roc_auc,
                            accuracy_score(truths, predictions),
                            krippendorff.alpha(reliability_data=[i_trues, i_predicted],
                                               level_of_measurement='nominal', value_domain=i_set)]
    general_metrics = df(general_metrics_data, index=['auc', 'accuracy', 'krippendorff alpha'], columns=['score'])

    conf_matrix = pd.DataFrame(confusion_matrix(truths, predictions),
                               index=pd.MultiIndex.from_product([['True:'], class_list]),
                               columns=pd.MultiIndex.from_product([['Predicted:'], class_list]))

    return class_metrics, general_metrics[general_metrics['score'].notna()], roc, conf_matrix


def save_performance_metrics_to_html(predictions: Collection[int], truths: Collection[int],
                                     output_path: Union[str, Path], classes=None, probabilities=None):
    """
    Creates a confusion matrix and exports it to an HTML file.

    Args:
        predictions (list or np.ndarray): The predicted class labels.
        truths (list or np.ndarray): The true class labels.
        classes (list of str): List of class names corresponding to labels.
        template_path (str): Path to the template HTML file.
        output_path (str): Path to the output HTML file.
    """
    output_path = Path(output_path)
    resources = Path(__file__).resolve().parent / 'resources'

    unique_class_indices = sorted(set(list(truths) + list(predictions)))
    classes = classes if classes is not None else unique_class_indices

    confusion_matrix_js_str = _create_confusion_matrix_js_str(predictions, probabilities, truths)
    class_metrics_js_str = _create_class_metrics_js_str(classes, predictions, probabilities, truths)

    # Save the data to a JavaScript file
    with open(output_path / 'complete-confusion-data.js', 'w') as f:
        f.write('\n'.join([confusion_matrix_js_str, class_metrics_js_str]))

    shutil.copy(resources / 'complete-confusion.html', output_path)
    shutil.copy(resources / 'complete-confusion.css', output_path)
    shutil.copy(resources / 'complete-confusion.js', output_path)


def _create_class_metrics_js_str(classes, predictions, probabilities, truths):
    class_metrics_df, _, _, _ = calculate_performance_metrics(truths, predictions, probabilities, classes)
    # Convert the dataframe to a list of dicts for JavaScript
    class_metrics_values = [
        {"type": str(idx), **{col: float(class_metrics_df.loc[idx, col]) for col in class_metrics_df.columns}}
        for idx in class_metrics_df.index
    ]
    class_metrics_js_str = "const classMetricsData = {\n    values: " + str(class_metrics_values).replace("'",
                                                                                                          '"') + "\n};\n"
    return class_metrics_js_str


def _create_confusion_matrix_js_str(predictions, probabilities, truths):
    ids = [str(i) for i in range(len(truths))]
    headers = ['id', 'predicted', 'actual']
    columns = [ids, predictions, truths]
    if probabilities is not None:
        headers.append('confidence_score')
        columns.append(probabilities)
    data_csv_str = '\n'.join([','.join([str(e) for e in data_point]) for data_point in zip(*columns)])
    confusion_matrix_js_str = "const confusionMatrixData = `\n" + ','.join(headers) + "\n" + data_csv_str + "`;\n"
    return confusion_matrix_js_str
