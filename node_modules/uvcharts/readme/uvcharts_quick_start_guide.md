##uvCharts Quick Start Guide
This guide is to help you begin using uvCharts to build charts on the web. uvCharts uses d3.js and SVG/HTML5 to build charts henceforth IE8 and below aren't supported.

### Adding the library to your page
d3.js being the only dependency for uvCharts, has to be included along with your other scripts before harnessing the power of uvCharts on your webpages. d3.js is available on cdn henceforth you can directly include it using the following code in your webpage.

	<script type="text/javascript" src-"http://cdnjs.cloudflare.com/ajax/libs/d3/3.2.2/d3.v3.min.js"></script>
	
Download the latest version of uvCharts (either minified or unminified) from ```http://www.github.com/imaginea/uvCharts/dist``` and include it too in your webpage.

	<script type="text/javascript" src=path/to/uvCharts.js></script>

### Using the library
Keeping simplicity as our first priority, we've ensured that we build a single function API which adheres to all your charting requirements.

	 var chartObject = uv.chart(chartType, graphDefinition, optionalConfiguration);

Lets get started and start with a simple example, lets say we want to plot no.of users using a certain product for the past 5 years. We need to now represent this data in a form which uvCharts understands. **Graph definition** which uvCharts understands is a simple JSON object with 2 key value pairs.

```
{
	categories: [],
	dataset : {

	}
}
```

Since we want to just plot data corresponding to one product, say 'uvCharts' itself, the categories array consists of 1 element.

```
{
	categories: ['uvCharts'],
	dataset : {

	}
}
```

But we haven't provided the data corresponding to this category yet and that is where the dataset part comes in. Lets set some data for uvCharts so we can plot it.

```
var graphdef = {
	categories : ['uvCharts'],
	dataset : {
		'uvCharts' : [
			{ name : '2009', value : 32 },
			{ name : '2010', value : 60 },
			{ name : '2011', value : 97 },
			{ name : '2012', value : 560 },
			{ name : '2013', value : 999 }
		]
	}
}
```

That is a nice dataset we have there for uvCharts. Lets go ahead and plot this in a DOM element using the uvCharts library. All you need to do is call the uv.chart function from within the JavaScript runtime in your page.

	var chart = uv.chart('Bar', graphdef);

Thats it, your chart is ready. The chart is by default placed in a DOM element with id 'uv-div' and this can be overridden (more on it later).

Here is the interesting part, no matter which chart you want to represent your data in, the graph definition doesn't change. So if you want to represent the data in the form of a line chart.

	var chart = uv.chart('Line', graphdef);

More:

	var chart = uv.chart('Area', graphdef);
	var chart = uv.chart('StackedBar', graphdef);

The same applies for all 12 chart types that we support at the current moment.

Now you're wondering where do you get to customize the chart in the 100 ways we claim you can. Well, the uv.chart function takes in a 3rd optional parameter, **Configuration** which overrides the default configuration thus letting you build your own unique charts.

If you've noticed the chart created above doesn't have captions and axis labels, thus looks like a dumb representation of some random data. Lets add them rightaway:

```
var chart = uv.chart ('Bar', graphdef, {
	meta : {
		caption : 'Usage over years',
		subcaption : 'among Imaginea OS products',
		hlabel : 'Years',
		vlabel : 'Number of users',
		vsublabel : 'in thousands'
	}
})

```

You can read more about the configuration options, their defaults, ranges, definitions here.

Wait a second, we've a lot more open source projects at Imaginea, lets compare their usage with uvCharts across the same years.

```
var graphdef = {
	categories : ['uvCharts', 'matisse', 'bot-bot', 'SocialByWay'],
	dataset : {
		'uvCharts' : [
			{ name : '2009', value : 32 },
			{ name : '2010', value : 60 },
			{ name : '2011', value : 97 },
			{ name : '2012', value : 560 },
			{ name : '2013', value : 999 }
		],
		
		'matisse' : [
			{ name : '2009', value : 58 },
			{ name : '2010', value : 75 },
			{ name : '2011', value : 90 },
			{ name : '2012', value : 740 },
			{ name : '2013', value : 890 }		
		],
		
		'bot-bot' : [
			{ name : '2009', value : 43 },
			{ name : '2010', value : 88 },
			{ name : '2011', value : 100 },
			{ name : '2012', value : 420 },
			{ name : '2013', value : 769 }	
		],
		
		'SocialByWay' : [
			{ name : '2009', value : 88 },
			{ name : '2010', value : 120 },
			{ name : '2011', value : 157 },
			{ name : '2012', value : 450 },
			{ name : '2013', value : 1024 }	
		],
		
		'WaveMaker' : [
			{ name : '2009', value : 32 },
			{ name : '2010', value : 60 },
			{ name : '2011', value : 97 },
			{ name : '2012', value : 560 },
			{ name : '2013', value : 999 }	
		]
	}
}
```
Notice that the graphdef has 4 categories in the categories array but data for 5 categories in the dataset. The series corresponding to WaveMaker isn't rendered as it is not part of the *categories* array. The *categories* array not only defines which series are drawn in the chart, but also the order in which the series are drawn.

Lets plot this multiseries bar chart on our webpage,

```
var chart = uv.chart ('Bar', graphdef, {
	meta : {
		caption : 'Usage over years',
		subcaption : 'among Imaginea OS products',
		hlabel : 'Years',
		vlabel : 'Number of users',
		vsublabel : 'in thousands'
	}
})

```

The graph definition defines whether the chart is multiseries or single series based on the no.of elements in the categories array and thus has a uniform representation throughout.

We hope the tutorial was helpful enough to get you to begin using uvCharts.
