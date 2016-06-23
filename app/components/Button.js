//TODO: This class and its css needs a major refactor

var React = require('react');
var PropTypes = React.PropTypes;

require('../scss/Button.scss');

const getClassName = function(props) {

    const classes = [
        props.className,
        "button",
        "button-variant-" + props.variant,
        "button-color-" + props.color];
    return classes.join(" ");
}

const getFontAwesomeElement = function(props) {
    const clazzName = "fa " + props.fontAwesomeClassName
    return (<i className={ clazzName } />)
}

function Button(props) {

    return (
        <a className={ getClassName(props) } onClick={ props.onClick }>
            { props.label }
            { getFontAwesomeElement(props) }
        </a>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(["default", "edit-link", "edit-bullet", "edit-slide"]),
    color: PropTypes.oneOf(["default", "red", "green"]),
    fontAwesomeClassName: PropTypes.string,
    label: PropTypes.string,
}

Button.defaultProps = {
    variant: 'default',
    color: 'default',
    label: "",
    fontAwesomeClassName: "",
}

module.exports = Button;