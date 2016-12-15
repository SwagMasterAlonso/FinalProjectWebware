## uvCharts
A JavaScript charting library built on top of d3.js to let people build visualisations on the web without having to worry about coding any of it using d3.js. Its easy to use and master the library as it has a **single function API**. Yes, one simple function to rule them all.

```
uv.chart(chartType, graphdef, config); 
```

### Output
The API call returns a uvChart object which exposes certain aspects of the graph as d3 selections which can be used by the user to add functionality if necessary.

### Params
**chartType** : String

Charttype defines the type of chart that should be drawn to represent the data provided as the parameter.

More about supported charttypes can be found [here](http://www.github.com/todo).

**Graphdef** : Object

This parameter defines the data that is being visually represented in the chart.
It consists of 2 key-value pairs.

A list of *categories* and a object containing the *dataset*. Graphdef example: 

 	{
		categories: ['Apples', 'Oranges', 'Mangoes', 'Strawberries'],
		dataset : {
			'Apples' : [
				{ label : '2000', value : 50 },
				{ label : '2001', value : 75 },
				{ label : '2002', value : 100 },
				{ label : '2003', value : 125 }
			],
			'Oranges' : [
				{ label : '2000', value : 120 },
				{ label : '2001', value : 110 },
				{ label : '2002', value : 90 },
				{ label : '2003', value : 115 }
			],
			'Mangoes' : [
				{ label : '2000', value : 75 },
				{ label : '2001', value : 150 },
				{ label : '2002', value : 90 },
				{ label : '2003', value : 100 }
			],
			'Strawberries' : [
				{ label : '2000', value : 100 },
				{ label : '2001', value : 75 },
				{ label : '2002', value : 120 },
				{ label : '2003', value : 125 }
			]
		}
	}

More about graphdef can be found [here](http://www.github.com/todo).

**Config** : Object

This parameter defines the configuration of the graph ranging from the margins, backgrounds, line widths, fonts, text placement .... lets say everything you can think of.

More about configuration can be found [here](http://www.github.com/todo).