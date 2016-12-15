describe('GraphObject', function () {	
	it('should have the default properties right after construction', function () {
		var testGraph = new r3.graph();	
		expect(testGraph.graphdef).toBeUndefined();
		expect(testGraph.config).toEqual(r3.config);
		expect(testGraph.frame).toBeUndefined();
		expect(testGraph.panel).toBeUndefined();
		expect(testGraph.bg).toBeUndefined();
		expect(testGraph.labels).toBeUndefined();
		expect(testGraph.categories).toBeUndefined();		
	});
	
	it('should have right properties on initialization', function () {
		var initGraph = new r3.graph();
		initGraph.init(r3.constants.defaultHorGraphdef);
		
		expect(initGraph.width()).toEqual(400);
		expect(initGraph.height()).toEqual(400);
		expect(initGraph.top()).toEqual(40);
		expect(initGraph.bottom()).toEqual(90);
		expect(initGraph.left()).toEqual(100);
		expect(initGraph.right()).toEqual(100);
		expect(initGraph.position()).toEqual(r3.config.meta.position);
		expect(initGraph.max()).toEqual(150);
		
		expect(initGraph.frame).toBeDefined();
		expect(initGraph.panel).toBeDefined();
		expect(initGraph.bg).toBeDefined();
		expect(initGraph.labels).toBeDefined();
		expect(initGraph.categories).toBeDefined();
	});
	
	var frameLessGraph = new r3.graph();
	frameLessGraph.init(r3.constants.defaultHorGraphdef);
	frameLessGraph.remove();
	it('should be able to remove its own frame', function () {
		//expect(frameLessGraph.frame).toBeFalsy();
	});
	
});