var React = require('react');
var PropTypes = React.PropTypes;

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

function PresentationNav (props) {
	return (
  	  <div className="slideNav" style={slideNavStyle}> 
		<div className="navButton" style={navButtonStyle} onClick={props.onPrevSlide}> Prev </div>
		<div className="navButton" style={navButtonStyle} onClick={props.onNextSlide}> Next </div>
	  </div>
	)
};

PresentationNav.propTypes = {
  onPrevSlide: PropTypes.func.isRequired,
  onNextSlide: PropTypes.func.isRequired,
}

module.exports = PresentationNav;