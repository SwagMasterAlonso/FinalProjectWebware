/**
* A waterfall chart capable of being rendered in horizontal and vertical manner
* @param {Object} graphdef Definition of the graph being rendered
* @param {Object} config   Configuration of the graph being rendered
*/
uv.WaterfallGraph = function (graphdef, config) {
  var self = this;
  uv.Graph.call(self, graphdef, config).setDefaults().init();

  self.bargroups = {};

  self.axes[self.config.graph.orientation === 'Horizontal' ? 'ver' : 'hor'].scale.domain(self.labels);

  var idx, length = self.categories.length, category;

  category = self.categories[0];
  self.bargroups[category] = self.chart.append('g').classed('cg-' + uv.util.formatClassName(category), true);
  self['draw' + self.config.graph.orientation + 'Bars'](0);

  self.finalize();
};

uv.WaterfallGraph.prototype = uv.util.inherits(uv.Graph);

uv.WaterfallGraph.prototype.setDefaults = function () {
  var self = this;
  self.graphdef.stepup = 'waterfall';
  self.config.legend.showlegends = false;
  return this;
};

uv.WaterfallGraph.prototype.drawHorizontalBars = function (idx) {
  var self = this, len = self.categories.length,
    color = uv.util.getColorBand(self.config, idx),
    bargroup = self.bargroups[self.categories[idx]];
  var  csum = 0, tsum =0;

  var bars = bargroup.selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter().append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);
  bars.append('rect')
    .attr('height', (self.axes.ver.scale.rangeBand() / len)-2)
    .attr('width', 0)
    .attr('x', function (d, i) {
      var value = (d.value < 0) ? csum + d.value : csum;
      csum += d.value;
      return self.axes.hor.scale(value); })
    .attr('y', function (d) {return self.axes.ver.scale(d.name); })
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('stroke', 'none')
    .style('fill', color)
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('width', function (d) { return  self.axes.hor.scale(Math.abs(d.value)); })
      .call(uv.util.endAll, function (d,i){
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx));
        d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx));
      });

  bars.append('text')
    .attr('y', function(d) { return self.axes.ver.scale(d.name) + (self.axes.ver.scale.rangeBand()/len)/2; })
    .attr('dx', 4)
    .attr('dy', '.35em')
    .attr('text-anchor', 'start')
    .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
    .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
    .style('font-family', self.config.bar.fontfamily)
    .style('font-size', self.config.bar.fontsize)
    .style('font-weight', self.config.bar.fontweight)
    .text(function(d) { return uv.util.getLabelValue(self, d); })
    .transition()
      .duration(self.config.effects.duration)
      .delay(idx * self.config.effects.duration)
      .attr('x', function (d, i) {
        var value = d.value < 0 ? tsum : tsum + d.value;
        tsum += d.value;
        return self.axes.hor.scale(value);
      });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});

  bargroup.attr('transform', 'translate(0,' + idx * self.axes.ver.scale.rangeBand() / len + ')');
};

uv.WaterfallGraph.prototype.drawVerticalBars = function (idx) {
  var self = this,
    color = uv.util.getColorBand(this.config, idx),
    len = self.categories.length;
  var csum =0, tsum = 0;

  var bars = self.bargroups[self.categories[idx]].selectAll('g').data(self.graphdef.dataset[self.categories[idx]]).enter()
      .append('g').classed('cge-' + uv.util.formatClassName(self.categories[idx]), true);

  bars.append('rect')
      .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
      .attr('height', 0)
      .attr('width', 0)
      .attr('x', function (d) {return self.axes.hor.scale(d.name); })
      .attr('y', function(d) {
        var value = (d.value < 0) ? csum + d.value : csum;
        csum += d.value;
        return self.height() - self.axes.ver.scale(value);
      })
      .style('stroke', self.config.bar.strokecolor).style('fill', color)
      .transition()
        .duration(self.config.effects.duration)
        .delay(idx * self.config.effects.duration)
        .attr('height', function (d) {  return self.height() - self.axes.ver.scale(Math.abs(d.value)); })
        .attr('width', (self.axes.hor.scale.rangeBand() / len)-2)
        .call(uv.util.endAll, function (d,i){
          d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseover', uv.effects.bar.mouseover(self, idx));
          d3.select(this.parentNode.parentNode).selectAll('rect').on('mouseout', uv.effects.bar.mouseout(self, idx));
        });


  bars.append('text').attr('transform','scale(1,-1)')
      .attr('x', function(d) { return self.axes.hor.scale(d.name) + (self.axes.hor.scale.rangeBand()/len)/2; })
      .attr('y', -10)
      .attr('dx', 0)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .classed('cr-' + uv.util.formatClassName(self.categories[idx]), true)
      .style('fill', self.config.label.showlabel ? uv.util.getColorBand(self.config, idx) : 'none')
      .style('font-family', self.config.bar.fontfamily)
      .style('font-size', self.config.bar.fontsize)
      .style('font-weight', self.config.bar.fontweight)
      .text(function(d) { return uv.util.getLabelValue(self, d); })
      .transition()
        .duration(self.config.effects.duration)
        .delay(idx * self.config.effects.duration)
        .attr('y', function (d) {
          tsum += d.value;
          var value = d.value < 0 ? tsum - d.value : tsum;
          return -(self.height() - self.axes.ver.scale(value)) - 10; });

  bars.append('svg:title')
    .text( function (d, i) { return uv.util.getTooltipText(self, self.categories[idx], self.labels[i], d);});

  self.bargroups[self.categories[idx]].attr('transform', 'translate(' + idx * self.axes.hor.scale.rangeBand() / len + ',' + self.height() + ') scale(1,-1)');
};
