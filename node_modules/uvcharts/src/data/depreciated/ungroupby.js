uv.data.prototype.merge = function () {
	
};

uv.data.prototype.ungroupBy = function (dataset, column, depth, level) {
	if( dataset === undefined )
		return;
	
	if( level === undefined)
		level = 0;
	
	if( depth === level ) {
		dataset._tmp = {};
		
		//this.merge(dataset, column);
	} else {
		//console.log(dataset);
		for(var property in dataset) {
			this.ungroupBy(dataset[property], column, depth, level+1);
		}
	}
}

uv.data.prototype.ungroupby = function (columns) {
	if(!(columns instanceof Array)) {
		if(this._dimensions[columns] === false) {
			this._dimensions[columns] = true;
			if(this.dimensions.indexOf(columns) != -1){
				this.ungroupBy(this.dataset, columns, this.dimensions.indexOf(columns));
				this.dimensions.splice(this.dimensions.indexOf(columns),1);
			}
		}
	} else {
		for(var i=0, length=columns.length; i<length; i++) {
			if(this._dimensions[columns[i]] === false) {
				this._dimensions[columns[i]] = true; this.dimensions.push(columns[i]);
				if(this.dimensions.indexOf(columns[i]) != -1){
					this.ungroupBy(this.dataset, columns[i], this.dimension.indexOf(columns[i]));
					this.dimensions.splice(this.dimensions.indexOf(columns[i]),1);
				}
			}
		}
	}
};