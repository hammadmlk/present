var React = require('react');

var slideTitleStyle = {
	display: 'flex',
	flexGrow: 1,
	flexBasis: '0px',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
};

function SlideTitle () {
  return (
	<div className="slideTitle" style={slideTitleStyle}> Slide title </div>
	)
}

module.exports = SlideTitle;