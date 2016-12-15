uv.StackedBarGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  self.bargroups = {};

  var bargroup, bars, idx, len, color,
    domainData = self.labels,
    csum = domainData.map(function (d) {return 0; }),
    tsum = domainData.map(function (d) {return 0; });

  self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(domainData);

  for (idx = 0, len = self.categories.length; idx < len; idx = idx + 1) {
    self.bargroups[self.categories[idx]] = self.chart.append('g').classed('cg-' + uv.util.formatClassName(self.categories[idx]), true);
    self['draw' + self.config.graph.orientation + 'Bars'](idx, csum, tsum);
  }

  self.finalize();
};

uv.StackedBarGraph.prototype = uv.util.inherits(uv.Graph);

uv.StackedBarGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'stepup';
  return this;
};

uv.StackedBarGraph.prototype.drawHorizontalBars = function (idx, csum, tsum) {
  var self = this,
    axes = this.axes,
    color = uv.util.getColorBand(this.config, idx),
    config = this.config,
    bargroup = this.bargroups[this.categories[idx]];

  var bars = bargroup.selectAll('g').data(this.graphdef.dataset[self.categories[idx]])
        .enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);

  bars.append('rect')
    .attr('height', axes.ver.scale.rangeBand())
    .attr('width', 0)
    .attr('x', function (d, i) { var value = axes.hor.scale(csum[i]); csum[i] += d.value; return value; })
    .attr('y', function (d) {return axes.ver.scale(d.name); })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('width', function (d,i) { return axes.hor.scale(csum[i]) - axes.hor.scale(csum[i]-d.value); })
      .each("end", function (d,i){
        d3.select(this).on('mouseover', uv.effects.bar.mouseover(self, idx, self.config.effects.textcolor));
        d3.select(this).on('mouseout', uv.effects.bar.mouseout(self, idx, self.config.effects.textcolor));
        if(typeof self.config.graph.clickCallback === "function") {
          d3.select(this).on('click', function(_d){
              self.config.graph.clickCallback.apply(null, [_d]);
          });
        }
      });


  bars.append('text')
    .attr('y', function(d) { return axes.ver.scale(d.name) + axes.ver.scale.rangeBand()/2; })
    .attr('dx', 0)
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? self.config.effects.textcolor : 'none')
    .style('font-family', config.bar.fontfamily)
    .style('font-size', config.bar.fontsize)
    .style('font-weight', config.bar.fontweight)
    .style('opacity', 0)
    .text(function(d) { return ( axes.hor.scale(d.value) > 15 ) ? uv.util.getLabelValue(self, d) : null; })
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .style('opacity', 1)
      .attr('x', function (d, i) { tsum[i] += d.value; return axes.hor.scale(tsum[i]) - 5; });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});
};

uv.StackedBarGraph.prototype.drawVerticalBars = function (idx, csum, tsum) {
  var self = this,
    height = this.height(),
    axes = this.axes,
    color = uv.util.getColorBand(this.config, idx),
    config = this.config,
    bargroup = this.bargroups[self.categories[idx]];

  var bars = bargroup.selectAll('g').data(this.graphdef.dataset[self.categories[idx]])
        .enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);

  bars.append('rect')
    .attr('height', 0)
    .attr('width', axes.hor.scale.rangeBand())
    .attr('x', function (d) { return axes.hor.scale(d.name); })
    .attr('y', function (d, i) { var value = axes.ver.scale(csum[i]); csum[i] -= d.value; return value; })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('height', function (d,i) { return -(axes.ver.scale(-csum[i]) - axes.ver.scale(-csum[i]-d.value)); })
      .each("end", function (d,i){
        d3.select(this).on('mouseover', uv.effects.bar.mouseover(self, idx, self.config.effects.textcolor));
        d3.select(this).on('mouseout', uv.effects.bar.mouseout(self, idx, self.config.effects.textcolor));
        if(typeof self.config.graph.clickCallback === "function") {
          d3.select(this).on('click', function(_d){
            self.config.graph.clickCallback.apply(null, [_d]);
          });
        }
      });


  bars.append('text').attr('transform','scale(1,-1)')
    .attr('x', function(d) { return axes.hor.scale(d.name) + axes.hor.scale.rangeBand()/2; })
    .attr('y', -height + 5)
    .attr('dy', '.71em')
    .attr('text-anchor', 'middle')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? self.config.effects.textcolor : 'none')
    .style('font-family', config.bar.fontfamily)
    .style('font-size', config.bar.fontsize)
    .style('font-weight', config.bar.fontweight)
    .style('opacity', 0)
    .text(function(d) { return ( height - axes.ver.scale(d.value) > 15) ? uv.util.getLabelValue(self, d) : null; })
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .style('opacity', 1)
      .attr('y', function (d, i) { tsum[i] += d.value; return -(2*height - axes.ver.scale(tsum[i])) + 5; });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});

  bargroup.attr('transform', 'translate(0,' + 2 * this.height() + ') scale(1,-1)');
};
