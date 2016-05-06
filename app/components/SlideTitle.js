var React = require('react');
var PropTypes = React.PropTypes;

var slideTitleStyle = {
	display: 'flex',
	flexGrow: 1,
	flexBasis: '0px',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
};

function SlideTitle (props) {
  return (
	<div className="slideTitle" style={slideTitleStyle}>{props.title}</div>
	)
}

SlideTitle.propTypes = {
	title: PropTypes.string.isRequired
}

module.exports = SlideTitle;