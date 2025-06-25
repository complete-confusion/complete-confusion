import itertools
from pathlib import Path

import pytest

from complete_confusion.evaluate import save_performance_metrics_to_html
from tests.performance_metrics_test_data import get_cifar10_test_data, get_eulaw_test_data

expected_files = [
    "complete-confusion.html",
    "complete-confusion.css",
    "complete-confusion.js",
    "complete-confusion-data.js",
]

test_cases = [
    get_cifar10_test_data(),
    get_eulaw_test_data(),
]


@pytest.mark.parametrize(
    "test_case, expected_output_file",
    list(itertools.product(test_cases, expected_files)),
    ids=lambda x: str(x),
)
def test_evaluate_file_created(tmpdir, test_case, expected_output_file):
    print(f"Using test case {test_case.name} Testing for file: {expected_output_file} in {tmpdir}")
    expected_output_path = Path(tmpdir) / expected_output_file

    save_performance_metrics_to_html(test_case.predictions, test_case.truths, classes=test_case.class_list,
                                     output_path=tmpdir)

    assert expected_output_path.exists(), "Performance metrics HTML file was not created."
