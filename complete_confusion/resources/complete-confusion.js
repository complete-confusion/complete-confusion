const confusionMatrixSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Confusion Matrix from CSV",
  data: { values: [] },
  width: 400,
  height: 400,
  params: [
    {
      name: "colorScheme",
      value: "Blues",
      bind: {
        input: "select",
        options: ["Turbo", "Viridis", "Magma", "Inferno", "Plasma", "Cividis", "DarkBlue", "DarkGold", "DarkGreen", "DarkMulti", "DarkRed", "LightGreyRed", "LightGreyTeal", "LightMulti", "LightOrange", "LightTealBlue", "Blues", "Browns", "Greens", "Greys", "Oranges", "Purples", "Reds", "TealBlues", "Teals", "WarmGreys", "BlueOrange", "BrownBlueGreen", "PurpleGreen", "PinkYellowGreen", "PurpleOrange", "RedBlue", "RedGrey", "RedYellowBlue", "RedYellowGreen", "BlueGreen", "BluePurple", "GoldGreen", "GoldOrange", "GoldRed", "GreenBlue", "OrangeRed", "PurpleBlueGreen", "PurpleBlue", "PurpleRed", "RedPurple", "YellowGreenBlue", "YellowGreen", "YellowOrangeBrown", "YellowOrangeRed"]
      }
    }
  ],
  layer: [
      {
          mark: "rect",
          encoding: {
              x: { field: "predicted", type: "nominal", axis: { title: "Predicted Class", orient: "top" } },
              y: { field: "actual", type: "nominal", axis: { title: "Actual Class" } },
              color: {
                field: "value",
                type: "quantitative",
                scale: { scheme: { expr: "colorScheme" } },
                legend: { title: "Count" }
              },
              tooltip: [
                  { field: "actual", type: "nominal", title: "Actual Class" },
                  { field: "predicted", type: "nominal", title: "Predicted Class" },
                  { field: "value", type: "quantitative", title: "Count" }
              ]
          }
      },
      {
          mark: {
              type: "text",
              align: "center",
              baseline: "middle",
              fontSize: 14,
              fontWeight: "bold"
          },
          encoding: {
              x: { field: "predicted", type: "nominal" },
              y: { field: "actual", type: "nominal" },
              text: { field: "value", type: "quantitative" },
              color: { value: "black" }
          }
      }
  ],
  selection: {
    cell: {
        type: "single",
        fields: ["actual", "predicted"],
        on: "click"
    }
  },
  config: {
      view: { stroke: "transparent" },
      axis: { domain: false },
      title: { fontSize: 22},
      axis: { labelFontSize: 16, titleFontSize: 18},
      legend: { labelFontSize: 16, titleFontSize: 18},
      style: {
        ['guide-label']: {fontSize: 16},
        ['guide-title']: {fontSize: 18},
        ['group-title']: {fontSize: 22}
      }
  }
};

const classMetricsSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: classMetricsData,
  params: [
    {
      name: "colorScheme",
      value: "Blues",
      bind: {
        input: "select",
        options: [
          "Turbo", "Viridis", "Magma", "Inferno", "Plasma", "Cividis", "DarkBlue", "DarkGold", "DarkGreen", "DarkMulti", "DarkRed", "LightGreyRed", "LightGreyTeal", "LightMulti", "LightOrange", "LightTealBlue", "Blues", "Browns", "Greens", "Greys", "Oranges", "Purples", "Reds", "TealBlues", "Teals", "WarmGreys", "BlueOrange", "BrownBlueGreen", "PurpleGreen", "PinkYellowGreen", "PurpleOrange", "RedBlue", "RedGrey", "RedYellowBlue", "RedYellowGreen", "BlueGreen", "BluePurple", "GoldGreen", "GoldOrange", "GoldRed", "GreenBlue", "OrangeRed", "PurpleBlueGreen", "PurpleBlue", "PurpleRed", "RedPurple", "YellowGreenBlue", "YellowGreen", "YellowOrangeBrown", "YellowOrangeRed"
        ]
      }
    }
  ],
  transform: [
    { fold: ["recall", "precision", "f1"], as: ["metric", "value"] }
  ],
  layer: [
    {
      mark: "rect",
      encoding: {
        x: { field: "metric", type: "nominal", title: null, axis: { labelAngle: 0, orient: "top" } },
        y: { field: "type", type: "nominal", title: "Class"},
        color: {
          field: "value",
          type: "quantitative",
          scale: { domain: [0, 1], scheme: { expr: "colorScheme" } },
          legend: { title: "Ratio" }
        }
      }
    },
    {
      mark: {
        type: "text",
        align: "center",
        baseline: "middle",
        fontSize: 14,
        fontWeight: "bold"
      },
      encoding: {
        x: { field: "metric", type: "nominal" },
        y: { field: "type", type: "nominal" },
        text: { field: "value", type: "quantitative", format: ".2f" },
        fontSize: { value: 14 }
      }
    }
  ],
  width: 200,
  height: 350,
  config: {
    title: { fontSize: 22},
    axis: { labelFontSize: 16, titleFontSize: 18},
    legend: { labelFontSize: 16, titleFontSize: 18},
    style: {
      ['guide-label']: {fontSize: 16},
      ['guide-title']: {fontSize: 18},
      ['group-title']: {fontSize: 22}
    }
  }
};

const generalMetricsSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: generalMetricsData,
  params: [
    {
      name: "colorScheme",
      value: "Blues",
      bind: {
        input: "select",
        options: [
          "Turbo", "Viridis", "Magma", "Inferno", "Plasma", "Cividis", "DarkBlue", "DarkGold", "DarkGreen", "DarkMulti", "DarkRed", "LightGreyRed", "LightGreyTeal", "LightMulti", "LightOrange", "LightTealBlue", "Blues", "Browns", "Greens", "Greys", "Oranges", "Purples", "Reds", "TealBlues", "Teals", "WarmGreys", "BlueOrange", "BrownBlueGreen", "PurpleGreen", "PinkYellowGreen", "PurpleOrange", "RedBlue", "RedGrey", "RedYellowBlue", "RedYellowGreen", "BlueGreen", "BluePurple", "GoldGreen", "GoldOrange", "GoldRed", "GreenBlue", "OrangeRed", "PurpleBlueGreen", "PurpleBlue", "PurpleRed", "RedPurple", "YellowGreenBlue", "YellowGreen", "YellowOrangeBrown", "YellowOrangeRed"
        ]
      }
    }
  ],
  transform: [
    { fold: ["score"], as: ["metric", "value"] }
  ],
  layer: [
    {
      mark: "rect",
      encoding: {
        x: { field: "metric", type: "nominal", title: null, axis: { labelAngle: 0, orient: "top" } },
        y: { field: "type", type: "nominal", title: "Metric"},
        color: {
          field: "value",
          type: "quantitative",
          scale: { domain: [0, 1], scheme: { expr: "colorScheme" } },
          legend: { title: "Ratio" }
        }
      }
    },
    {
      mark: {
        type: "text",
        align: "center",
        baseline: "middle",
        fontSize: 14,
        fontWeight: "bold"
      },
      encoding: {
        x: { field: "metric", type: "nominal" },
        y: { field: "type", type: "nominal" },
        text: { field: "value", type: "quantitative", format: ".2f" },
        fontSize: { value: 14 }
      }
    }
  ],
  width: 200,
  height: 350,
  config: {
    title: { fontSize: 22},
    axis: { labelFontSize: 16, titleFontSize: 18},
    legend: { labelFontSize: 16, titleFontSize: 18},
    style: {
      ['guide-label']: {fontSize: 16},
      ['guide-title']: {fontSize: 18},
      ['group-title']: {fontSize: 22}
    }
  }
};

let rocCurveSpec = null;

if (typeof rocCurveData !== 'undefined') {
  const aucItem = generalMetricsData.values.find(item => item.type === 'auc');
  const rocTitleText = aucItem ?
      `ROC Curve (AUC = ${aucItem.score.toFixed(3)})` :
      'ROC Curve';

  rocCurveSpec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "ROC Curve",
    "width": 500,
    "height": 500,
    "padding": 5,
    "config": {
      "title": {
        "fontSize": 16
      }
    },

    "title": {
      "text": rocTitleText
    },

    "signals": [
      {
        "name": "hideSymbols",
        "value": true
      }
    ],

    "data": [
      {
        "name": "table",
        "values": rocCurveData["values"],
        "transform": [
          {
            "type": "extent",
            "field": "fpr",
            "signal": "fprs"
          }
        ]
      },
    ],

    "scales": [
      {
        "name": "x",
        "type": "linear",
        "range": "width",
        "nice": true,
        "zero": false,
        "domain": {"data": "table", "field": "fpr"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "nice": true,
        "zero": true,
        "domain": {"data": "table", "field": "tpr"}
      },
    ],

    "axes": [
      {
        "orient": "left",
        "scale": "y",
        "title": "True Positive Rate",
        "titlePadding": 10,
        "grid": true
      },
      {
        "orient": "bottom",
        "scale": "x",
        "title": "False Positive Rate",
        "tickCount": 10
      }
    ],

    "marks": [
      {
        "type": "line",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "interpolate": {"value": "monotone"},
            "x": {"scale": "x", "field": "fpr"},
            "y": {"scale": "y", "field": "tpr"},
            "stroke": {"value": "steelblue"},
            "strokeWidth": {"value": 3}
          }
        }
      },
      {
        "type": "symbol",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "x": {"scale": "x", "field": "fpr"},
            "y": {"scale": "y", "field": "tpr"},
            "stroke": {"value": "steelblue"},
            "strokeWidth": {"value": 1.5},
            "fill": {"value": "white"},
            "size": {"value": 30},
            "tooltip": {
              "signal": "{'Threshold': format(datum.threshold, '.8f'), 'FPR': format(datum.fpr, '.2f'), 'TPR': format(datum.tpr, '.2f')}"
            }
          },
          "update": {
            "opacity": {"signal": "hideSymbols ? 0 : 1"}
          }
        }
      }
    ],
  }
}