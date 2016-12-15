uv.data.prototype.groupBy = function (dataset, column) {
	if(!dataset) return;

	if(dataset.data === undefined) {
		for(key in dataset) {
			this.groupBy(dataset[key], column);
		}
	} else {
		for(value in this.KeySet[column]){
			dataset[value] = {}; 
			dataset[value].data = [];
		}
		
		for(var i=0, length=dataset.data.length; i<length; i++){
			var value = dataset.data[i][column];
			dataset[value].data.push(dataset.data[i]);
		}
		
		dataset.data = undefined;
	}
};

uv.data.prototype.groupby = function (columns) {
	if(!(columns instanceof Array)) {
		if(this.Dimensions[columns] === true) {
			this.Dimensions[columns] = false; 
			this.dimensions.push(columns);
			this.groupBy(this.dataset, columns);
		}
	} else {
		for(var i=0, length=columns.length; i<length; i++) {
			if(this.Dimensions[columns[i]] === true) {
				this.Dimensions[columns[i]] = false; 
				this.dimensions.push(columns[i]);
				this.groupBy(this.dataset, columns[i]);
			}
		}
	}
};