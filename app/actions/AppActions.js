var alt = require('../alt');

var AppActions = alt.createActions({

	displayName: 'AppActions',

	init: function() {
		this.dispatch();
	},

	update: function(val) {
		this.dispatch(val);
	}
});

module.exports = AppActions;