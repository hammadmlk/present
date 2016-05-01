var React = require('react');

var slideBodyStyle = {
	display: 'flex',
	flexGrow:1,
	flexBasis: '0px',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'rgba(0, 0, 0, 0.1)'
};

function SlideBody () {
  return (
	<div className="slideBody" style={slideBodyStyle}> Slide body </div>
  )
}

module.exports = SlideBody;
