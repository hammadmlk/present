var React = require('react');

var slideNavStyle = {
	display: 'flex',
	flexGrow: 1,
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)',

	position: 'absolute',
	left: '0px',
	bottom: '0px',
	height: '15%',
	width: '25%',
	overflow: 'hidden'

};

var navButtonStyle = {
	display: 'flex',
	flexGrow:1,
	justifyContent: 'center',
	alignItems: 'center',
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
};

function PresentationNav () {
	return (
  	  <div className="slideNav" style={slideNavStyle}> 
		<div className="navButton" style={navButtonStyle}> Btn </div>
		<div className="navButton" style={navButtonStyle}> Btn </div>
	  </div>
	)
};


module.exports = PresentationNav;