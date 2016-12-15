var sample = {};

sample.Graphdef = function(){
	this.categories = ['IE', 'Chrome', 'Firefox', 'Opera', 'Safari'];
	this.dataset = {
		'IE' : [
			{name: '2001', value: 60},
			{name: '2002', value: 70},
			{name: '2003', value: 80},
			{name: '2004', value: 90},
			{name: '2005', value: 20}
		],
		'Chrome' : [
			{name: '2001', value: 10},
			{name: '2002', value: 30},
			{name: '2003', value: 50},
			{name: '2004', value: 90},
			{name: '2005', value: 70}
		],
		'Firefox': [
			{name: '2001', value: 50},
			{name: '2002', value: 150},
			{name: '2003', value: 20},
			{name: '2004', value: 80},
			{name: '2005', value: 40}
		],
		'Opera': [
			{name: '2001', value: 90},
			{name: '2002', value: 60},
			{name: '2003', value: 30},
			{name: '2004', value: 10},
			{name: '2005', value: 70}
		],
		'Safari' : [
			{name: '2001', value: 30},
			{name: '2002', value: 10},
			{name: '2003', value: 60},
			{name: '2004', value: 90},
			{name: '2005', value: 40}
		]
	};
	return this;
};

sample.WaterfallGraphdef = function() {
	this.categories = ['data'];
	this.dataset = {
    'data' : [
        {
            "name": "2005 Actual",
            "value": 90
        },
        {
            "name": "Price",
            "value": 15
        },
        {
            "name": "Volume",
            "value": 21
        },
        {
            "name": "Fixes",
            "value": -37
        },
        {
            "name": "Taxation",
            "value": -43
        },
        {
            "name": "Escalation",
            "value": -40
        },
        {
            "name": "Mix",
            "value": 46
        },
        {
            "name": "Market Effect",
            "value": 91
        },
        {
            "name": "Partners",
            "value": 61
        }
    ]
  }

  return this;
};
