var React = require('react');

var Slide = require('./Slide');
var PresentationNav = require('./PresentationNav');

var presentationStyle = {
	display: 'flex',
	width:'100%',
	height:'100%',
	backgroundColor: 'rgba(100, 100, 100, 0.1)'
};

function Presentation () {
  return (
    <div className = "presentation" style={presentationStyle}>
      <Slide />
      <PresentationNav />
    </div>
  )
}

module.exports = Presentation;