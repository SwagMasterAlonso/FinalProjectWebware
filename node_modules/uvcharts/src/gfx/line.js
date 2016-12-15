uv.LineGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  self.linegroups = {};
  self.dataset = uv.util.getDataArray(self.graphdef);

  var linegroup, linepath, linefunc, idx, len = self.categories.length,
    domainData = self.labels;

  self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

  for (idx = 0; idx < len; idx = idx + 1) {
    linepath = self.chart.append('g').classed('cg-' + uv.util.formatClassName(self.categories[idx]), true)
                        .append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true).datum(self.dataset[idx]);
    linegroup = {
      path: linepath,
      func: undefined
    };

    self['draw' + self.config.graph.orientation + 'Lines'](linegroup, idx);
    self.linegroups[self.categories[idx]] = linegroup;
  }

  self.finalize();
};

uv.LineGraph.prototype = uv.util.inherits(uv.Graph);

uv.LineGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'normal';
  self.config.scale.ordinality = 0;
  return this;
};

uv.LineGraph.prototype.drawHorizontalLines = function (linegroup, idx) {
  var self = this,
    axes = self.axes,
    config = self.config,
    color = uv.util.getColorBand(self.config, idx);

  self.axes.ver.scale.rangePoints([0, self.height()]);

  linegroup.func = d3.svg.line()
        .x(function (d) { return axes.hor.scale(d.value); })
        .y(function (d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand() / 2; })
        .interpolate(uv.config.line.interpolation);

  linegroup.path.append('path')
        .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
        .attr('d', linegroup.func)
        .style('fill', 'none')
        .style('stroke', color)
        .style('stroke-width', self.config.line.strokewidth)
        .style('stroke-opacity', self.config.line.strokeopacity)
        .transition()
          .duration(3 * self.config.effects.duration)
          .delay(2 * idx * self.config.effects.duration)
          .style('stroke-opacity', 1)
          .call(uv.util.endAll, function (d,i){
            d3.select(this.parentNode.parentNode).selectAll('path').on('mouseover', uv.effects.line.mouseover(self, idx));
            d3.select(this.parentNode.parentNode).selectAll('path').on('mouseout', uv.effects.line.mouseout(self, idx));
            d3.select(this.parentNode.parentNode).selectAll('circle').on('mouseover', uv.effects.line.mouseover(self, idx));
            d3.select(this.parentNode.parentNode).selectAll('circle').on('mouseout', uv.effects.line.mouseout(self, idx));
          });

  if (self.config.line.showcircles) {
    linegroup.path.selectAll('circle')
          .data(self.dataset[idx])
          .enter().append('circle')
          .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
          .attr('cx', linegroup.func.x())
          .attr('cy', linegroup.func.y())
          .attr('r', self.config.line.circleradius)
          .style('fill', color)
          .style('fill-opacity', self.config.line.circleopacity)
          .style('stroke', '#fff')
            .append('svg:title')
            .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});
  }

  linegroup.path.selectAll('text')
        .data(self.dataset[idx])
        .enter().append('text')
        .attr('x', function (d) { return axes.hor.scale(d.value); })
        .attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
        .attr('dx', 10)
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('opacity', 0)
        .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
        .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
        .style('font-family', self.config.line.fontfamily)
        .style('font-size', self.config.line.fontsize)
        .style('font-weight', self.config.line.fontweight)
        .text(function(d) { return uv.util.getLabelValue(self, d); })
        .transition()
          .duration(3 * self.config.effects.duration)
          .delay(2 * idx * self.config.effects.duration)
          .style('opacity', 1);

  return this;
};

uv.LineGraph.prototype.drawVerticalLines = function (linegroup, idx) {
  var self = this,
    axes = self.axes,
    config = self.config,
    color = uv.util.getColorBand(self.config, idx);

  self.axes.hor.scale.rangePoints([0, self.width()]);

  linegroup.func = d3.svg.line()
        .x(function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
        .y(function (d) { return axes.ver.scale(d.value); })
        .interpolate(uv.config.line.interpolation);

  linegroup.path.append('path')
        .attr('d', linegroup.func)
        .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
        .style('fill', 'none')
        .style('stroke', color)
        .style('stroke-width', self.config.line.strokewidth)
        .style('stroke-opacity', self.config.line.strokeopacity)
        .transition()
          .duration(self.config.effects.duration)
          .delay(2 * idx * self.config.effects.duration)
          .style('stroke-opacity', 1)
          .call(uv.util.endAll, function (d,i){
            d3.select(this.parentNode.parentNode).selectAll('path').on('mouseover', uv.effects.line.mouseover(self, idx));
            d3.select(this.parentNode.parentNode).selectAll('path').on('mouseout', uv.effects.line.mouseout(self, idx));
            d3.select(this.parentNode.parentNode).selectAll('circle').on('mouseover', uv.effects.line.mouseover(self, idx));
            d3.select(this.parentNode.parentNode).selectAll('circle').on('mouseout', uv.effects.line.mouseout(self, idx));
          });

  if (self.config.line.showcircles) {
    linegroup.path.selectAll('circle')
          .data(self.dataset[idx])
          .enter().append('circle')
          .attr('cx', linegroup.func.x())
          .attr('cy', linegroup.func.y())
          .attr('r', self.config.line.circleradius)
          .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
          .style('fill', color)
          .style('fill-opacity', self.config.line.circleopacity)
          .style('stroke', '#fff')
            .append('svg:title')
            .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});
  }

  linegroup.path.selectAll('text')
        .data(self.dataset[idx])
        .enter().append('text')
        .attr('x', function (d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand() / 2; })
        .attr('y', function (d) { return axes.ver.scale(d.value) - 20; })
        .attr('dx', 0)
        .attr('dy', '.71em')
        .attr('text-anchor', 'middle')
        .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
        .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
        .style('font-family', self.config.line.fontfamily)
        .style('font-size', self.config.line.fontsize)
        .style('font-weight', self.config.line.fontweight)
        .style('opacity', 0)
        .text(function(d) { return uv.util.getLabelValue(self, d); })
        .transition()
          .duration(3 * self.config.effects.duration)
          .delay(2 * idx * self.config.effects.duration)
          .style('opacity', 1);

  return this;
};
