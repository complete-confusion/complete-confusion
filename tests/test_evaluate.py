from pathlib import Path

import pytest

from complete_confusion.evaluate import save_performance_metrics_to_html
from tests.performance_metrics_test_data import get_cifar10_test_data


@pytest.mark.parametrize("expected_output_file", [
    "complete-confusion.html",
    "complete-confusion.css",
    "complete-confusion.js",
    "complete-confusion-data.js",
])
def test_evaluate_file_created(tmpdir, expected_output_file):
    print(f"Testing for file: {expected_output_file} in {tmpdir}")
    expected_output_path = Path(tmpdir) / expected_output_file
    test_case = get_cifar10_test_data()

    save_performance_metrics_to_html(test_case.predictions, test_case.truths, tmpdir, classes=test_case.class_list)

    assert expected_output_path.exists(), "Performance metrics HTML file was not created."
