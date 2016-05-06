var React = require('react');
var PropTypes = React.PropTypes;
var Slide = require('./Slide');
var PresentationNav = require('./PresentationNav');

var presentationStyle = {
	display: 'flex',
	width:'100%',
	height:'100%',
	overflow: 'hidden',

	backgroundColor: 'rgba(100, 100, 100, 0.1)'
};

var slideListStyle = {
  display: 'flex',
  flex: '0 0 100%',
  transition: 'all 0.5s ease 0s',
};

function getSlideListStyle(visibleSlideNumber) {
  var style = slideListStyle;
  style.marginLeft = (-100*visibleSlideNumber + 100) + '%';
  return style;
}

function Presentation (props) {

  var slideList = props.slideList.map(function(slide){
    
    return <Slide key={slide.id} 
                  id={slide.id} 
                  title={slide.title} 
                  subTitle={slide.subTitle} 
                  bulletList={slide.bulletList}/>;
  });
  
  return (
    <div className="presentation" style={presentationStyle}>
      <div className="slide-list" style={getSlideListStyle(props.visibleSlideId)}>
        {slideList}
      </div>
      <PresentationNav onNextSlide={props.handleNextSlide} onPrevSlide={props.handlePrevSlide}/>
    </div>
  )
}

Presentation.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slideList: PropTypes.array.isRequired,
  visibleSlideId: PropTypes.number.isRequired,
  handleNextSlide: PropTypes.func.isRequired,
  handlePrevSlide: PropTypes.func.isRequired
}

module.exports = Presentation;