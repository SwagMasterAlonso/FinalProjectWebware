uv.types = {};

uv.addChart = function (type, functionName) {
  uv.types[type] = functionName;
};

uv.addChart('bar','BarGraph');
uv.addChart('line','LineGraph');
uv.addChart('stackedbar','StackedBarGraph');
uv.addChart('stepupbar','StepUpBarGraph');
uv.addChart('area','AreaGraph');
uv.addChart('stackedarea','StackedAreaGraph');
uv.addChart('percentbar','PercentBarGraph');
uv.addChart('percentarea','PercentAreaGraph');
uv.addChart('pie','PieGraph');
uv.addChart('donut','DonutGraph');
uv.addChart('waterfall','WaterfallGraph');
uv.addChart('polararea','PolarAreaGraph');

uv.chart = function (type, graphdef, config) {
  type = type.toLowerCase()
  if (uv.types[type] !== undefined) {
    return new uv[uv.types[type]](graphdef, config);
  }
};
