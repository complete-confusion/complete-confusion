from dataclasses import dataclass
from pathlib import Path
from typing import Optional, Collection

import pandas as pd


@dataclass
class PerformanceMetricsTestData:
    name: str
    predictions: Collection[int]
    truths: Collection[int]
    probabilities: Optional[Collection[Collection[float]]] = None
    class_list: Optional[Collection[str]] = None
    text_representations: Optional[Collection[str]] = None
    image_representations: Optional[Collection[str]] = None

    def __str__(self):
        return self.name


def get_cifar10_test_data() -> PerformanceMetricsTestData:
    """ Read cifar10 data from csv and return TestData object """
    test_data_path = Path('tests') / 'test_data'
    df = pd.read_csv(test_data_path / 'cifar10_test_data.csv')

    # Extract predictions, true labels, probabilities, and class list
    predictions = df["prediction"].tolist()
    trues = df["truth"].tolist()
    class_list = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

    return PerformanceMetricsTestData(
        name="cifar10",
        predictions=predictions,
        truths=trues,
        probabilities=None,
        class_list=class_list,
        image_representations=[str(Path(test_data_path / "dummy_image.jpg").absolute().as_uri()) for _ in predictions]
    )


def get_eulaw_test_data() -> PerformanceMetricsTestData:
    """ Read eulaw data from csv and return TestData object. See https://zenodo.org/records/8200001"""
    df = pd.read_csv(Path('tests') / 'test_data' / 'eulaw_testset_data.csv')

    # Extract predictions, true labels, probabilities, and class list
    predictions = df["prediction"].tolist()
    trues = df["true"].tolist()
    class_list = ["regulatory", "non-regulatory"]
    probabilities = df["prob_0"].tolist()
    return PerformanceMetricsTestData(
        name="eulaw",
        predictions=predictions,
        truths=trues,
        probabilities=probabilities,
        class_list=class_list,
        text_representations=df["sentence"].tolist(),
    )
