uv.TableGraph = function (graphdef, config) {
  uv.Table.apply(this, [graphdef]);
  this.init(graphdef, config);

  if (this.config.graph.orientation === 'Horizontal') {
    this.setHorTable();
  } else {
    this.setVerTable();
  }

  this.finalize();
};

uv.TableGraph.prototype = uv.util.inherits(uv.Table);

uv.TableGraph.prototype.setHorTable = function () {
  var categories = this.graphdef.categories, tableData = uv.util.getTabularArray(this.graphdef);

  categories.unshift('');
  this.header.append('tr').selectAll('td').data(categories).enter().append('td').text(function (d) { return d; });
  categories.shift();

  this.bodyrows = this.body.selectAll('tr').data(tableData)
          .enter().append('tr');

  this.bodyrows.selectAll('td').data(function (d, i) { return tableData[i]; })
          .enter().append('td')
          .attr('class', function (d, i) {
            var classNameString = (i === 0) ? 'chart3rtablelabel' : 'chart3rtabledata';
            return d3.select(this).attr('class') + classNameString;
          })
          .text(function (d) {return d; });
};

uv.TableGraph.prototype.setVerTable = function () {
  var labels = uv.util.getLabelArray(this.graphdef), dataset = this.graphdef.dataset;

  labels.unshift('');
  this.header.append('tr').selectAll('td').data(labels).enter().append('td').text(function (d) { return d; });
  labels.shift();

  this.bodyrows = this.body.selectAll('tr').data(this.graphdef.categories)
          .enter().append('tr');

  this.bodyrows.selectAll('td')
    .data(function (d) {
      var arr = [], i, len;
      arr.push(d);
      for (i = 0, len = dataset[d].length; i < len; i = i + 1) { arr.push(dataset[d][i].value); }
      return arr;
    }).enter().append('td')
      .attr('class', function (d, i) {
        var classNameString = (i === 0) ? 'chart3rtablelabel' : 'chart3rtabledata';
        return d3.select(this).attr('class') + classNameString;
      })
      .text(function (d) {return d; });
};
