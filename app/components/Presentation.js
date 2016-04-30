var React = require('react');


var presentationStyle = {
	display: 'flex',
	flexDirection: 'row',
	width:'100%',
	height:'100%',
	backgroundColor: 'rgba(100, 100, 100, 0.1)'
};

var leftColumnStyle = {
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
};

var slideTitleStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	flexGrow: 6,
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
};

var slideNavStyle = {
	display: 'flex',
	flexGrow: 1,
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'

};

var navButtonStyle = {
	display: 'flex',
	flexGrow:1,
	justifyContent: 'center',
	alignItems: 'center',
	flexBasis: '0px',
	backgroundColor: 'rgba(222, 0, 0, 0.1)'
}

var rightColumnsStyle = {
	display:'flex',
	flexGrow: 3,		
	flexBasis: '0px',
	backgroundColor: 'rgba(0, 0, , 0.1)'

};

var slideBodyStyle = {
	display: 'flex',
	flexGrow:1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'rgba(0, 0, 0, 0.1)'
}

function Presentation () {
  return (
    <div className = "presentation" style={presentationStyle}>

      <div className="leftColumn" style={leftColumnStyle}> 
      	
      	<div className="slideTitle" style={slideTitleStyle}> Slide title </div>

      	<div className="slideNav" style={slideNavStyle}> 
      		<div className="navButton" style={navButtonStyle}> Btn </div>
      		<div className="navButton" style={navButtonStyle}> Btn </div>
      	</div>

      </div>

      <div className="rightColumn" style={rightColumnsStyle}> 
      	<div className="slideBody" style={slideBodyStyle}> Slide body</div>
      </div>

    </div>
  )
}

module.exports = Presentation;