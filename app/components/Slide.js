var React = require('react');
var PropTypes = React.PropTypes;
var SlideTitle = require('./SlideTitle');
var SlideBody = require('./SlideBody');

var slideStyle = {
	display: 'flex',
	flex: '0 0 100%',
}

var leftColumnStyle = {
	display: 'flex',
	flexGrow: 1,
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
};

var rightColumnsStyle = {
	display:'flex',
	flexGrow: 3,
	flexBasis: '0px',
	backgroundColor: 'rgba(0, 0, 0, 0.1)'

};

function Slide (props) {

  return (
  		<div className="slide" style={slideStyle} > 
  			<div className="leftColumn" style={leftColumnStyle}> 
		      	<SlideTitle title={props.title}/>
	      	</div>
	      	<div className="rightColumn" style={rightColumnsStyle}> 
	      		<SlideBody />
	      	</div>
  	  	</div>
  	)
}

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  bulletList: PropTypes.array.isRequired
}

module.exports = Slide;