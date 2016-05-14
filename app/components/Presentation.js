var React = require('react');
var PropTypes = React.PropTypes;
var Slide = require('./Slide');
var PresentationNav = require('./PresentationNav');

require('../scss/Presentation.scss');

function getSlideListStyle(visibleSlideNumber) {
    var marginLeft = (-100 * visibleSlideNumber + 100) + '%';
    return {
        marginLeft: marginLeft
    }
}

function Presentation(props) {

    var slideList = props.slideList.map(function(slide) {

        return <Slide
                      key={ slide.id }
                      id={ slide.id }
                      title={ slide.title }
                      subTitle={ slide.subTitle }
                      bulletList={ slide.bulletList } />;
    });

    return (
        <div className="presentation">
          <div
               className="slide-list"
               style={ getSlideListStyle(props.visibleSlideId) }>
            { slideList }
          </div>
          <PresentationNav
                           onNextSlide={ props.handleNextSlide }
                           onPrevSlide={ props.handlePrevSlide } />
        </div>
    )
}

Presentation.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slideList: PropTypes.array.isRequired, // validate object in array is of type slide
    visibleSlideId: PropTypes.number.isRequired,
    handleNextSlide: PropTypes.func.isRequired,
    handlePrevSlide: PropTypes.func.isRequired
}

module.exports = Presentation;