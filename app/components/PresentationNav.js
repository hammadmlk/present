var React = require('react');
var PropTypes = React.PropTypes;

var slideNavStyle = {
	display: 'flex',
	flexGrow: 1,
	flexBasis: '0px',


	position: 'absolute',
	left: '0px',
	bottom: '0px',
	height: '10%',
	width: '25%',
	overflow: 'hidden'

};

var navButtonStyle = {
	display: 'flex',
	flex: '1 1 0px',
	justifyContent: 'center',
	alignItems: 'center',

	color: 'black',
	fontSize: '2em',

	margin: '0 1% 0 1%',

	cursor: 'pointer',

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