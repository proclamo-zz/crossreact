var alt = require('../alt');
var AppActions = require('../actions/AppActions');
var crossfilter = require('crossfilter');

var cross, byDistrict, groupByDistrict, people;

var AppStore = alt.createStore({

	displayName: 'AppStore',

	bindListeners: {
		init: AppActions.INIT,
		update: AppActions.UPDATE
	},

	state: {
		districts: [],
		people: 0
	},

	init: function() {	
		
		var data = require('dsv?delimiter=;!../../barcelona.csv'); // loaded via dsv-loader

		data.forEach(function(d) {
			d.HABITANTS = parseFloat(d.HABITANTS);
			d.NUM_VIVENDES = parseFloat(d.NUM_VIVENDES);
		});

		cross = crossfilter(data);

		byDistrict = cross.dimension(function(d) { return d.NOM_DISTRICTE; });

		groupByDistrict = byDistrict.group();

		people = cross.dimension(function(d) { return d.HABITANTS; });

		var districts = groupByDistrict.top(Infinity);

		var count = people.groupAll().reduceSum(function(d) { return d.HABITANTS; }).value();

		this.setState({
			districts: districts,
			people: count
		});
	},

	update: function(district) {

		byDistrict.filterAll();
		people.filterAll();

		if (district) {
			byDistrict.filterExact(district);
		}

		var count = people.groupAll().reduceSum(function(d) { return d.HABITANTS; }).value();

		this.setState({			
			people: count
		});
	}
});

module.exports = AppStore;