require('./css/base.css');
var React = require('react');
var ReactDom = require('react-dom');
var AppComponent = require('./components/AppComponent.js');

ReactDom.render(<AppComponent/>, document.getElementById("main"));