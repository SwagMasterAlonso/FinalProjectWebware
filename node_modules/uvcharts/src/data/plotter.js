uv.data.prototype.graph = function (graphtype) {
	if( this.measures.length > 0 && this.category ) {
		var path = [];
		this.plot(this.dataset, path, graphtype);
	};
};

uv.data.prototype.plot = function (dataset, path, graphtype) {
	
	if (dataset && dataset.data && dataset.data.length > 0) {
		var graphdef = { 'categories' : [], 'dataset' : undefined }
		
		dataset.plotData = {};
		for (var category in this.KeySet[this.category] ) {
			graphdef.categories.push(category);
			dataset.plotData[category] = [];
			for (var i = 0, length = this.measures.length; i<length; i = i + 1) {
				dataset.plotData[category].push({ 'name' : this.measures[i], 'value' : +0});
			}
		}
		
		for (var i = 0, length = dataset.data.length; i<length; i = i + 1) {
			var category = dataset.data[i][this.category];
			for (var j =0, jlength = dataset.plotData[category].length; j < jlength; j = j + 1) {
				var measure = dataset.plotData[category][j]['name'];
				dataset.plotData[category][j].value += (+dataset.data[i][measure]);
			}
		}
		
		graphdef.dataset = dataset.plotData;
		
		graphdef.stepup = false; graphdef.orientation = 'ver'; graphdef.pos = 'body';
		uv.util.transposeData(graphdef);
		d3.select('#uv-div').append('div').text(path.join(' || ')); 
		d3.select('#uv-div').append('hr');
		var plotgraph = uv.chart(graphtype, graphdef, {});
		console.log(plotgraph);
		
		delete dataset.plotData;
		delete graphdef;		
		return;
	} else {
		for (var key in dataset) {
			path.push(key);
			this.plot (dataset[key], path, graphtype);
			path.pop();
		}
		
		return;
	}
};