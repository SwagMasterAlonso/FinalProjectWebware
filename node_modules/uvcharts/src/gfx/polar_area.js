uv.PolarAreaGraph = function (graphdef, config) {
  var self = this;

  uv.Graph.call(self, graphdef, config).setDefaults().init();

  self.maxRadius = Math.min(self.height(), self.width()) * 2/5;
  self.center = {
    x : self.width() / 2,
    y : self.height() / 2
  };

  self.category = self.categories[0];

  var data = uv.util.getCategoryData(self.graphdef, [self.category]),
    dataMap = data[0].map(function(d,i){ return d; }),
    layout = d3.layout.pie().value(function(d){return self.max()/ data[0].length; }),
    tickRadius = [],
    arcfuncs = d3.svg.arc().innerRadius(0)
            .outerRadius(function(d,i){return ((dataMap[i] * self.maxRadius) / self.max());});

  for (var i=1; i<=self.config.axis.ticks; i++) {
    tickRadius[i] = (self.maxRadius/self.config.axis.ticks) * i;
  }

  self.chart.data(data);
  self.arcs = self.chart.selectAll('g.arc')
                  .data(layout).enter()
                  .append('g').classed(uv.constants.classes.arc + uv.util.formatClassName(self.category), true)
                  .attr('transform', 'translate(' + self.center.x + ',' + self.center.y + ')');

  self.arcs.append('path')
    .attr('d', arcfuncs)
    .style('fill', function (d, i) { return uv.util.getColorBand(self.config, i);})
    .style('stroke', self.config.pie.strokecolor)
    .style('stroke-width', self.config.pie.strokewidth);

  /*self.arcs.append('text')
      .attr('transform', function (d, i) { return 'translate(' + arcfuncs.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('fill', self.config.pie.fontfill)
      .style('font-family', self.config.pie.fontfamily)
      .style('font-size', self.config.pie.fontsize)
      .style('font-weight', self.config.pie.fontweight)
      .style('font-variant', self.config.pie.fontvariant)
      .text(function (d) { return uv.util.getLabelValue(self, d); }); */

  self.arcs.append('svg:title')
    .text(function (d, i) { return uv.util.getTooltipText(self, self.category, self.labels[i], d);});

  self.chart.selectAll('.' + uv.constants.classes.circleticks)
    .data(tickRadius)
    .enter().append('svg:g').classed(uv.constants.classes.circleticks, true)
    .append("svg:circle")
    .attr("r", function (d, i) { return d; })
    .style("stroke", self.config.axis.strokecolor)
    .style("opacity", self.config.axis.opacity)
    .style("fill", "none")
    .attr('transform', 'translate(' + self.center.x + ',' + self.center.y + ')');

  if (typeof self.config.graph.clickCallback === "function") {
    self.arcs.on('click', function (d) {
      self.config.graph.clickCallback.apply(null, [d]);
    });
  }
};

uv.PolarAreaGraph.prototype = uv.util.inherits(uv.Graph);

uv.PolarAreaGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'normal';
  self.config.legend.legendtype = 'labels';
  return this;
};
