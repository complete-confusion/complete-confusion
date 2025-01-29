const spec = {
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
