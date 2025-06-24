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


def _calculate_performance_metrics(truths: Collection[int],
                                   predictions: Collection[int],
                                   probabilities: Collection[float],
                                   class_list: Collection[str]):
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
    is_binary_classification = len(class_list) == 2

    class_metrics_data = {'recall': recall_score(truth_labels, prediction_labels, average=None),
                          'precision': precision_score(truth_labels, prediction_labels, average=None),
                          'f1': f1_score(truth_labels, prediction_labels, average=None)}
    class_metrics = df(class_metrics_data, index=list(class_list))

    if probabilities is not None:
        from sklearn.metrics import roc_auc_score, roc_curve
        fpr, tpr, thresholds = roc_curve(y_true=truth_labels, y_score=probabilities, pos_label=(class_list[0]))
        roc = df({'fpr': fpr, 'tpr': tpr})
        roc_auc = (roc_auc_score(truth_labels, probabilities))
    else:
        roc = None
        roc_auc = None

    i_set = np.unique(list(truths) + list(predictions))

    f1_scores = {
        'f1 (micro)': [f1_score(truth_labels, prediction_labels, average="micro")],
        'f1 (macro)': [f1_score(truth_labels, prediction_labels, average="macro")],
        'f1 (weighted)': [f1_score(truth_labels, prediction_labels, average="weighted")],
    }
    if is_binary_classification:
        f1_scores.update({
            'f1 (binary)': [f1_score(truth_labels, prediction_labels, average="binary")],
        })

    general_metrics_data = {'auc': [roc_auc],
                            'accuracy': [accuracy_score(truth_labels, prediction_labels)],
                            'Krippendorff alpha': [krippendorff.alpha(reliability_data=[truths, predictions],
                                                                      level_of_measurement='nominal',
                                                                      value_domain=i_set)],
                            **f1_scores,
                            }
    general_metrics = df.from_dict(general_metrics_data, orient='index', columns=['score'])

    conf_matrix = pd.DataFrame(confusion_matrix(truth_labels, prediction_labels),
                               index=pd.MultiIndex.from_product([['True:'], class_list]),
                               columns=pd.MultiIndex.from_product([['Predicted:'], class_list]))

    return class_metrics, general_metrics[general_metrics['score'].notna()], roc, conf_matrix


def save_performance_metrics_to_html(
        predictions: Collection[int],
        truths: Collection[int],
        classes: Collection[str] = None,
        output_path: Union[str, Path] = ".",
        probabilities: Optional[Collection[float]] = None
):
    """
    Creates a confusion matrix and exports it to an HTML file.

    Args:
        predictions: The predicted class labels.
        truths: The true class labels.
        probabilities: The predicted probabilities for each class.
        classes: List of class names corresponding to labels.
        output_path: Path to a folder to save the output files to.
    """
    output_path = Path(output_path)
    resources = Path(__file__).resolve().parent / 'resources'

    unique_class_indices = sorted(set(list(truths) + list(predictions)))
    classes = classes if classes is not None else unique_class_indices

    confusion_matrix_js_str = _create_confusion_matrix_js_str(predictions, truths, probabilities, classes)

    class_metrics_df, general_metrics_df, _, _ = _calculate_performance_metrics(truths, predictions, probabilities,
                                                                                classes)
    class_metrics_js_str = _table_df_to_str(class_metrics_df, "classMetricsData")
    general_metrics_js_str = _table_df_to_str(general_metrics_df, "generalMetricsData")

    # Save the data to a JavaScript file
    with open(output_path / 'complete-confusion-data.js', 'w') as f:
        f.write('\n'.join([confusion_matrix_js_str, class_metrics_js_str, general_metrics_js_str]))

    shutil.copy(resources / 'complete-confusion.html', output_path)
    shutil.copy(resources / 'complete-confusion.css', output_path)
    shutil.copy(resources / 'complete-confusion.js', output_path)


def _table_df_to_str(class_metrics_df, variable_name):
    """Convert the dataframe to a list of dicts for JavaScript"""
    class_metrics_values = [
        {"type": idx, **{col: float(class_metrics_df.loc[idx, col]) for col in class_metrics_df.columns}}
        for idx in class_metrics_df.index
    ]
    class_metrics_js_str = "const " + variable_name + " = {\n    values: " + str(class_metrics_values).replace("'",
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
