var React = require('react');
var PropTypes = React.PropTypes;
var SlideTitle = require('./SlideTitle');
var SlideBody = require('./SlideBody');

require('../scss/Slide.scss');

// rotates between 1 - 6
function getSlideColorNum(id) {
    var numOfColors = 6;
    return Math.abs(id % numOfColors) + 1;
}

function Slide(props) {

    var slideClassName = "slide slide-color-" + getSlideColorNum(props.id);

    return (
        <div className={ slideClassName }>
          <div className="left-column">
            <SlideTitle
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    bulletList: PropTypes.array.isRequired // validate each object in array is a bullet
}

module.exports = Slide;