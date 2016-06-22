var React = require('react');
var PropTypes = React.PropTypes;
var TextareaAutosize = require('react-textarea-autosize').default;
const serverCommunicator = require('../utils/ServerCommunicator').getInstance();
require('../scss/SlideHeading.scss');

var SlideHeadingContainer = React.createClass({
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
            <div className="slide-heading valign-wrapper">
                <div className="valign">
                    <TextareaAutosize
                                      className="title"
                                      value={ this.state.title }
                                      placeholder={ "title here" }
                                      onChange={ this.handleTitleChange }
                                      maxRows={ 4 } />
                    <TextareaAutosize
                                      className="sub-title"
                                      value={ this.state.subTitle }
                                      placeholder={ "sub-title here" }
                                      onChange={ this.handleSubTitleChange }
                                      maxRows={ 3 } />
                </div>
            </div>
        )
    },
    componentWillReceiveProps: function(props) {
        this.setState({
            title: props.title,
            subTitle: props.subTitle
        });
    }
})

SlideHeadingContainer.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    presentationID: PropTypes.number.isRequired,
    slideID: PropTypes.string.isRequired,
}
SlideHeadingContainer.defaultProps = {
    title: "",
    subTitle: "",
}

module.exports = SlideHeadingContainer;

