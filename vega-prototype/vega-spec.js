const   confusionMatrixSpec = {
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
  data: {
values: [
    { type: "0", recall: 0.73, precision: 0.65, f1: 0.69 },
  { type: "1", recall: 0.29, precision: 0.52, f1: 0.37 },
  { type: "2", recall: 0.85, precision: 0.69, f1: 0.76 },
  { type: "3", recall: 0.45, precision: 0.63, f1: 0.52 },
  { type: "4", recall: 0.78, precision: 0.54, f1: 0.64 },
  { type: "5", recall: 0.62, precision: 0.71, f1: 0.66 },
  { type: "6", recall: 0.33, precision: 0.48, f1: 0.39 },
  { type: "7", recall: 0.57, precision: 0.68, f1: 0.62 },
  { type: "8", recall: 0.81, precision: 0.77, f1: 0.79 },
  { type: "9", recall: 0.49, precision: 0.59, f1: 0.53 }
]
  },
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
        y: { field: "type", type: "nominal", title: null },
        color: {
          field: "value",
          type: "quantitative",
          scale: { domain: [0, 1], scheme: { expr: "colorScheme" } },
          legend: null
        }
      }
    },
    {
      mark: "text",
      encoding: {
        x: { field: "metric", type: "nominal", title: null },
        y: { field: "type", type: "nominal", title: null },
        text: { field: "value", type: "quantitative", format: ".2f" },
        fontSize: { value: 14 }
      }
    }
  ],
  width: 200,
  height: 250
};
