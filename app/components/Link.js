var React = require('react');
var PropTypes = React.PropTypes;

require('../scss/Link.scss');

function Link(props) {
    return (
        <a
           className="link"
           href={ props.url }
           target="_blank">
          { props.text } <i className="fa fa-external-link" /></a>
    )
}

Link.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

module.exports = Link;
