from typing import Iterable, Optional, Collection

import pandas as pd
from attr import dataclass
from pathlib import Path


@dataclass
class PerformanceMetricsTestData:
    predictions: Collection[int]
    truths: Collection[int]
    probabilities: Optional[Collection[Collection[float]]]
    class_list: Optional[Collection[str]]


def get_cifar10_test_data() -> PerformanceMetricsTestData:
    """ Read cifar10 data from csv and return TestData object """
    df = pd.read_csv(Path('tests') / 'test_data' / 'cifar10_test_data.csv')

    # Extract predictions, true labels, probabilities, and class list
    predictions = df["prediction"].tolist()
    trues = df["truth"].tolist()
    class_list = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

    return PerformanceMetricsTestData(
        predictions=predictions,
        truths=trues,
        probabilities=None,
        class_list=class_list,
    )
