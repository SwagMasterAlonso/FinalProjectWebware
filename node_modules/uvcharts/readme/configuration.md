# Configuration
The third and optional parameter of **```uv.chart```** is probably the most interesting one of them, as it lets you transform and make your chart look entirely different from the ones others would, from the same set of 1st two parameters.

Configuration is a plain javascript object which is divided into groups based on which part of the chart those values affect. In general, configuration follows a structure like: 

```
var config = {
	groupname1 : {
		property1 : value1,
		property2 : value2,
	},

	groupname2 : {
		property1 : value1,
		property2 : value2 
	},
	
	groupname3 : {
		property1: value1,
		property2: value2,
		property3: value3
	}
}
```

We're close to having 100 configuration properties at the time of writing this article. Let us take you through the set of groups, properties, defaults and ranges. 

As long as no specific value is set through the configuration, the defaults which are mentioned here are used.

### List of groups within configuration
- graph
- meta
- axis
- dimension
- margin
- frame
- label
- bar
- area
- pie
- donut
- caption
- subCaption
- legend
- effects

Let us dig into individual properties within each of these groups and see how they affect the graph

## Graph
- background **```Color String/Color Hex Code```** ```#FFFFFF```

This property defines the background color of the chart (not the entire frame though)

- palette **```String```** ```'Brink'```

This property defines the color scheme used across different series within the same graph. There are about 12 predefined set of palettes to choose from. If you want to set your own custom palette, refer to the property ```custompalette```

- orientation **```String```** ```Horizontal```

This property defines the orientation of the chart, can be set to 'Horizontal' or 'Vertical'.

- opacity **```decimal```** ```1```

This property sets the opacity of all the chart elements. It can be set to any decimal value between 0 and 1.