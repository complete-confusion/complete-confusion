const confusionMatrixData = `
id,predicted,actual
0,Class A,Class A
1,Class B,Class B
2,Class A,Class A
3,Class C,Class C
4,Class B,Class A
5,Class C,Class C
6,Class A,Class C
7,Class B,Class B
8,Class C,Class B
9,Class A,Class A`;

const classMetricsData = {
    values: [{"type": "Class A", "recall": 0.75, "precision": 0.75, "f1": 0.75}, {"type": "Class B", "recall": 0.6666666666666666, "precision": 0.6666666666666666, "f1": 0.6666666666666666}, {"type": "Class C", "recall": 0.6666666666666666, "precision": 0.6666666666666666, "f1": 0.6666666666666666}]
};

const generalMetricsData = {
    values: [{"type": "accuracy", "score": 0.7}, {"type": "Krippendorff alpha", "score": 0.5681818181818181}, {"type": "f1 (micro)", "score": 0.7}, {"type": "f1 (macro)", "score": 0.6944444444444443}, {"type": "f1 (weighted)", "score": 0.7}]
};
