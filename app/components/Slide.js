var React = require('react');
var PropTypes = React.PropTypes;
var SlideTitleContainer = require('../containers/SlideTitleContainer');
var SlideBody = require('./SlideBody');

require('../scss/Slide.scss');

// rotates between 1 - 6
function getSlideColorNum(slideId) {
    var num = parseInt(slideId.substring(1));
    var numOfColors = 6;
    return Math.abs(num % numOfColors) + 1;
}

function Slide(props) {
    var slideClassName = "slide slide-color-" + getSlideColorNum(props.id);

    return (
        <div className={ slideClassName }>
          <div className="left-column">
            <SlideTitleContainer
                                 presentationID={ props.presentationID }
                                 slideID={ props.id }
                                 title={ props.title }
                                 subTitle={ props.subTitle } />
          </div>
          <div className="right-column">
            <SlideBody bulletList={ props.bulletList } />
          </div>
        </div>
    )
}

Slide.propTypes = {
    presentationID: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    bulletList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

module.exports = Slide;
