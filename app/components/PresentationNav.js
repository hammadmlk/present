var React = require('react');
var PropTypes = React.PropTypes;
require('../scss/PresentationNav.scss');

function PresentationNav(props) {

    const prevText = props.disablePrev ? "" : "Prev";
    const nextText = props.disableNext ? "" : "Next";

    return (
        <div className="slide-nav row valign-wrapper">
            <div className="slide-nav-button col s6 valign center-align" onClick={ props.onPrevSlide }>
                { prevText }
            </div>
            <div className="slide-nav-button col s6 valign center-align" onClick={ props.onNextSlide }>
                { nextText }
            </div>
        </div>
    )
}
;

PresentationNav.propTypes = {
    disablePrev: PropTypes.bool,
    disableNext: PropTypes.bool,
    onPrevSlide: PropTypes.func.isRequired,
    onNextSlide: PropTypes.func.isRequired,
}

module.exports = PresentationNav;