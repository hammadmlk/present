
var React = require('react');
var PropTypes = React.PropTypes;

require('../scss/SlideTitle.scss');

function SlideTitle(props) {
    return (
        <div className="slide-title">
          <div className="title">
            { props.title }
          </div>
          <div className="sub-title">
            { props.subTitle }
          </div>
        </div>
    )
}

SlideTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
}

module.exports = SlideTitle;