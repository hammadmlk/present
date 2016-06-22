var React = require('react');
var PropTypes = React.PropTypes;
require('../scss/PresentationNav.scss');

function PresentationNav(props) {
    return (
        <div className="slide-nav row valign-wrapper">
            <div className="slide-nav-button col s6 valign center-align" onClick={ props.onPrevSlide }>
                Prev
            </div>
            <div className="slide-nav-button col s6 valign center-align" onClick={ props.onNextSlide }>
                Next
            </div>
        </div>
    )
}
;

PresentationNav.propTypes = {
    onPrevSlide: PropTypes.func.isRequired,
    onNextSlide: PropTypes.func.isRequired,
}

module.exports = PresentationNav;