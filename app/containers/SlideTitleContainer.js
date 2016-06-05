var React = require('react');
var SlideTitle = require('../components/SlideTitle');
var PropTypes = React.PropTypes;

const serverCommunicator = require('../utils/ServerCommunicator').getInstance();

var SlideTitleContainer = React.createClass({
    handleTitleChange: function(e) {
        this.setState({
            title: e.target.value
        }, function() {
            serverCommunicator.updateSlideTitle(
                this.props.presentationID,
                this.props.slideID,
                this.state.title)
        })
    },
    handleSubTitleChange: function(e) {
        this.setState({
            subTitle: e.target.value
        }, function() {
            serverCommunicator.updateSlideSubTitle(
                this.props.presentationID,
                this.props.slideID,
                this.state.subTitle)
        })
    },
    getInitialState: function() {
        return {
            title: this.props.title,
            subTitle: this.props.subTitle
        }
    },
    render: function() {
        return (
            <SlideTitle
                        title={ this.state.title }
                        subTitle={ this.state.subTitle }
                        onTitleChange={ this.handleTitleChange }
                        onSubTitleChange={ this.handleSubTitleChange } />
        )
    },
    componentWillReceiveProps: function(props) {
        this.setState({
            title: props.title,
            subTitle: props.subTitle
        });
    }
})

SlideTitleContainer.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    presentationID: PropTypes.number.isRequired,
    slideID: PropTypes.string.isRequired
}

module.exports = SlideTitleContainer;

