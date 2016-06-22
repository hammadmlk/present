//TODO: This class and its css needs a major refactor


var React = require('react');
var PropTypes = React.PropTypes;

require('../scss/Button.scss');

const getClassName = function(props) {
    const classes = [
        props.className,
        "button",
        "button-variant-" + props.variant,
        "button-color-" + props.color,
        "button-size-" + props.size];
    return classes.join(" ");
}

function Button(props) {

    return (
        <a className={ getClassName(props) } onClick={ props.onClick }>
            { props.children }
        </a>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(["default", "round"]),
    color: PropTypes.oneOf(["default", "red", "green"]),
    size: PropTypes.oneOf(["default", "large", "small"]),
    className: PropTypes.string
}

Button.defaultProps = {
    variant: 'default',
    color: 'default',
    size: 'default'
}

module.exports = Button;