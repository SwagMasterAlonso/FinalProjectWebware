uv.PercentBarGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  self.bargroups = [];

  var bargroup, bars, idx, len, color,
    domainData = self.labels,
    csum = domainData.map(function (d) {return 0; }),
    tsum = domainData.map(function (d) {return 0; });

  self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

  for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
    color = uv.util.getColorBand(self.config, idx);
    bargroup = self.chart.append('g').classed('cg-' + self.categories[idx], true);
    bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);

    self['draw' + uv.util.getPascalCasedName(self.config.graph.orientation) + 'Bars'](bars, csum, tsum, idx);

    if (self.config.graph.orientation === 'Vertical') {
      bargroup.attr('transform', 'translate(0,' + 2 * self.height() + ') scale(1,-1)');
    }

    self.bargroups.push(bargroup);
  }

  self.finalize();
};

uv.PercentBarGraph.prototype = uv.util.inherits(uv.Graph);

uv.PercentBarGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'percent';
  self.config.scale.ordinality = 0;
  return this;
};

uv.PercentBarGraph.prototype.drawHorizontalBars = function (bars, csum, tsum, idx) {
  var self = this,
    axes = this.axes,
    color = uv.util.getColorBand(this.config, idx),
    config = this.config,
    sumMap = uv.util.getSumUpArray(this.graphdef);

  bars.append('rect')
    .attr('height', axes.ver.scale.rangeBand())
    .attr('width', 0)
    .attr('x', function (d, i) { var value = axes.hor.scale(uv.util.getPercentage(csum[i], sumMap[i])); csum[i] += d.value; return value; })
    .attr('y', function (d) {return axes.ver.scale(d.name); })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('width', function (d, i) { return axes.hor.scale(uv.util.getPercentage(d.value, sumMap[i]));})
      .call(uv.util.endAll, function (d,i){
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx, self.config.effects.textcolor));
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx, self.config.effects.textcolor));
      });


  bars.append('text')
    .attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
    .attr('dx', 0)
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? self.config.effects.textcolor : 'none')
    .style('font-family', this.config.bar.fontfamily)
    .style('font-size', this.config.bar.fontsize)
    .style('font-weight', this.config.bar.fontweight)
    .text(function(d, i) { return ( axes.hor.scale(uv.util.getPercentage(csum[i], sumMap[i])) > 15 ) ? String(Math.round(uv.util.getPercentage(d.value, sumMap[i]))) : null; })
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(uv.util.getPercentage(tsum[i], sumMap[i])) - 5; });
};

uv.PercentBarGraph.prototype.drawVerticalBars = function (bars, csum, tsum, idx) {
  var self = this,
    height = this.height(),
    axes = this.axes,
    color = uv.util.getColorBand(this.config, idx),
    config = this.config,
    sumMap = uv.util.getSumUpArray(this.graphdef);

  bars.append('rect')
    .attr('height', 0)
    .attr('width', axes.hor.scale.rangeBand())
    .attr('x', function (d) { return axes.hor.scale(d.name); })
    .attr('y', function (d, i) { var value = axes.ver.scale(uv.util.getPercentage(csum[i], sumMap[i])); csum[i] -= d.value; return value; })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('height', function (d, i) { return height - axes.ver.scale(uv.util.getPercentage(d.value, sumMap[i])); })
      .call(uv.util.endAll, function (d,i){
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx, self.config.effects.textcolor));
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx, self.config.effects.textcolor));
      });

  bars.append('text').attr('transform','scale(1,-1)')
    .attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
    .attr('y', -height + 5)
    .attr('dy', '.71em')
    .attr('text-anchor', 'middle')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? self.config.effects.textcolor : 'none')
    .style('font-family', this.config.bar.fontfamily)
    .style('font-size', this.config.bar.fontsize)
    .style('font-weight', this.config.bar.fontweight)
    .text(function(d, i) { return ( height - axes.ver.scale(uv.util.getPercentage(d.value, sumMap[i])) > 15) ? String(Math.round(uv.util.getPercentage(d.value, sumMap[i]))) : null; })
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(uv.util.getPercentage(tsum[i], sumMap[i]))) + 5; });
};
