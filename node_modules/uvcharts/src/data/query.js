uv.data.prototype.query = function (selection, filters, groups, groupfilters) {
	uv.data.filter(filters);
	uv.data.groupby(groups);
	uv.data.having(groupfilters);
	uv.data.select(selections);
};