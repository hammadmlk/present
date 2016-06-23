var React = require('react');
var PropTypes = React.PropTypes;
var SlideHeadingContainer = require('../containers/SlideHeadingContainer');
var SlideBodyContainer = require('../containers/SlideBodyContainer');
require('../scss/Slide.scss');

// rotates between 1 - 8
function getSlideColorNum(slideId) {
    var num = parseInt(slideId.substring(1));
    var numOfColors = 8;
    return Math.abs(num % numOfColors) + 1;
}

function Slide(props) {
    var slideClassName = "slide slide-color-" + getSlideColorNum(props.id) + " row";

    return (
        <div className={ slideClassName }>
            <div className="heading-wrapper col s3 no-padding">
                <SlideHeadingContainer
                                       presentationID={ props.presentationID }
                                       slideID={ props.id }
                                       title={ props.title }
                                       subTitle={ props.subTitle } />
            </div>
            <div className="body-wrapper col s9 no-padding">
                <SlideBodyContainer presentationID={ props.presentationID } slideID={ props.id } bulletList={ props.bulletList } />
            </div>
        </div>
    )
}

Slide.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    bulletList: PropTypes.arrayOf(PropTypes.object).isRequired,
    presentationID: PropTypes.number.isRequired,
}
Slide.defaultProps = {
    title: "",
    subTitle: "",
}

module.exports = Slide;
