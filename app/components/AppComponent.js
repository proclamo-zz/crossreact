var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AppComponent = React.createClass({

	getInitialState: function() {
		return AppStore.getState();
	},

	componentDidMount: function() {
		AppStore.listen(this.onChange);

		AppActions.init();
	},

	componentWillUnmount: function() {
		AppStore.unlisten(this.onChange);
	},

	onChange: function(state) {
		this.setState(state);
	},

	update: function(el) {
		AppActions.update(el.target.value);
	},

	render: function() {

		var districts = this.state.districts.map(function(item) {
			return <option key={item.key} value={item.key}>District {item.key} ({item.value} blocks)</option>;
		});

		return (
			<div>
				<div>
					<h1>Districts of Barcelona</h1>
					<label>Disctrict</label>
					<select onChange={this.update}>
						<option value="">Please, select a district</option>
						{ districts }
					</select>
				</div>
				<div>
					<label>People: { this.state.people }</label>
				</div>
			</div>
		);
	}

});

module.exports = AppComponent;