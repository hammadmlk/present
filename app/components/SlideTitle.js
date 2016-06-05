
var React = require('react');
var PropTypes = React.PropTypes;

require('../scss/SlideTitle.scss');

function SlideTitle(props) {
    return (
        <div className="slide-title">
          <textarea
                    className="title"
                    type="text"
                    value={ props.title }
                    onChange={ props.onTitleChange } />
          <textarea
                    className="sub-title"
                    type="text"
                    value={ props.subTitle }
                    onChange={ props.onSubTitleChange } />
        </div>
    )
}

SlideTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    onTitleChange: PropTypes.func.isRequired,
    onSubTitleChange: PropTypes.func.isRequired
}

module.exports = SlideTitle;
