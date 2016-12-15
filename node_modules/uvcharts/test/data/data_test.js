init = function () {
	mydata = new uv.data(dataset);
	console.log(mydata);

	mydata.fetch();
	mydata.groupby(['name', 'class']);
	mydata.category = 'year';
	mydata.measures.push('usage');
	
	mydata.graph('Area');
	mydata.log();
};