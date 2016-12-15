uv.PercentAreaGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  var stacklayout = d3.layout.stack().offset('zero')(
    self.categories.map(function (d) {
      return graphdef.dataset[d].map(function (d) {
        return {x: d.name, y: +d.value};
      });
    })
  );

  var areagroup, areapath, areafunc,
    domainData = self.labels,
    categories = self.categories;

  self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);
  self.areagroup = self.chart.selectAll('g.areagroup').data(stacklayout).enter().append('g')
                .attr('class', function (d,i) {
                  return uv.util.getClassName(this, 'cge-' + self.categories[i]);
                });

  self['draw' + self.config.graph.orientation + 'Area']();

  self.finalize();
};

uv.PercentAreaGraph.prototype = uv.util.inherits(uv.Graph);

uv.PercentAreaGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'percent';
  return this;
};

uv.PercentAreaGraph.prototype.drawHorizontalArea = function () {
  var self = this, axes = self.axes,
    categories = self.categories,
    config = self.config,
    sumMap = uv.util.getSumUpArray(self.graphdef);

  axes.ver.scale.rangePoints([0, self.height()]);

  for(var i = 0; i < categories.length; i = i + 1) {
    uv.effects.area.mouseover(self, i);
    uv.effects.area.mouseout(self,i);
  }

  self.areagroup.append('path')
      .attr('class', function (d, i) {
        return uv.util.getClassName(this, uv.constants.classes.area + uv.util.formatClassName(categories[i]));
      })
      .style('fill', function (d, i) { return uv.util.getColorBand(config, i); })
      .attr('d', d3.svg.area()
        .y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
        .x0(function (d, i) { return axes.hor.scale(uv.util.getPercentage(d.y0, sumMap[i])); })
        .x1(function (d, i) { return axes.hor.scale(uv.util.getPercentage(d.y0 + d.y, sumMap[i])); })
        .interpolate(self.config.area.interpolation)
    )
    .on('mouseover', function (d,i) { self.effects[categories[i]].mouseover(); })
    .on('mouseout', function (d,i) { self.effects[categories[i]].mouseout(); });

  self.areagroup.append('path')
    .attr('class', function (d, i) {
      return uv.util.getClassName(this, uv.constants.classes.line + uv.util.formatClassName(categories[i]));
    })
    .style('stroke', 'white')
    .style('fill', 'none')
    .style('stroke-width', 2)
    .attr('d', d3.svg.line()
        .y(function (d) { return axes.ver.scale(d.x) + axes.ver.scale.rangeBand() / 2; })
        .x(function (d, i) { return axes.hor.scale(uv.util.getPercentage(d.y0 + d.y, sumMap[i])); })
        .interpolate(self.config.area.interpolation)
    );
};

uv.PercentAreaGraph.prototype.drawVerticalArea = function () {
  var self = this, axes = self.axes,
    categories = self.categories,
    config = self.config,
    sumMap = uv.util.getSumUpArray(self.graphdef);

  axes.hor.scale.rangePoints([0, self.width()]);

  for(var i = 0; i < categories.length; i = i + 1){
    uv.effects.area.mouseover(self, i);
    uv.effects.area.mouseout(self,i);
  }

  self.areagroup.append('path')
      .attr('class', function (d, i) {
        return uv.util.getClassName(this, uv.constants.classes.area + uv.util.formatClassName(categories[i]));
      })
      .style('fill', function (d, i) { return uv.util.getColorBand(config, i); })
      .attr('d', d3.svg.area()
        .x(function (d) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
        .y0(function (d, i) { return axes.ver.scale(uv.util.getPercentage(d.y0, sumMap[i])); })
        .y1(function (d, i) { return axes.ver.scale(uv.util.getPercentage(d.y0 + d.y, sumMap[i])); })
        .interpolate(self.config.area.interpolation)
      )
    .on('mouseover', function (d,i) {self.effects[categories[i]].mouseover(); })
    .on('mouseout', function (d,i) { self.effects[categories[i]].mouseout(); });

  self.areagroup.append('path')
      .attr('class', function (d, i) {
        return uv.util.getClassName(this, uv.constants.classes.line + uv.util.formatClassName(categories[i]));
      })
      .style('stroke', 'white')
      .style('fill', 'none')
      .style('stroke-width', 2)
      .attr('d', d3.svg.line()
        .x(function (d, i) { return axes.hor.scale(d.x) + axes.hor.scale.rangeBand() / 2; })
        .y(function (d, i) { return axes.ver.scale(uv.util.getPercentage(d.y0 + d.y, sumMap[i])); })
        .interpolate(self.config.area.interpolation)
      );
};
