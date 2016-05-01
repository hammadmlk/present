var React = require('react');
var SlideTitle = require('./SlideTitle');
var SlideBody = require('./SlideBody');

var slideStyle = {
	display: 'flex',
	flexGrow: 1
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

function Slide () {
  return (
  		<div className="slide" style={slideStyle}> 
  			<div className="leftColumn" style={leftColumnStyle}> 
		      	<SlideTitle />
	      	</div>
	      	<div className="rightColumn" style={rightColumnsStyle}> 
	      		<SlideBody />
	      	</div>
  	  	</div>
  	)
}

module.exports = Slide;