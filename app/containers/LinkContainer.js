const React = require('react');
const PropTypes = React.PropTypes;
const Button = require('../components/Button');
const AutosizeInput = require('react-input-autosize');
const ToolTip = require('react-portal-tooltip'); // TODO: Is there a better/simpler alternative ?
const enhanceWithClickOutside = require('react-click-outside'); // TODO: I dont like using this. Any alternative ?
const serverCommunicator = require('../utils/ServerCommunicator').getInstance();
require('../scss/Link.scss');

var LinkContainer = React.createClass({
    handleTextChange: function(e) {
        this.setState({
            text: e.target.value
        }, function() {
            serverCommunicator.updateLinkText(
                this.props.presentationID,
                this.props.slideID,
                this.props.bulletID,
                this.props.id, // linkID
                this.state.text)
        })
    },
    handleURLChange: function(e) {

        var enteredUrl = e.target.value || "";

        if (!enteredUrl.startsWith("http://")) {
            enteredUrl = "http://"
        }

        this.setState({
            url: enteredUrl
        }, function() {
            serverCommunicator.updateLinkURL(
                this.props.presentationID,
                this.props.slideID,
                this.props.bulletID,
                this.props.id, // linkID
                this.state.url)
        })
    },
    // for enhanceWithClickOutside
    handleClickOutside: function(e) {
        // TODO: Can we do better ?
        // Dont set state if we clicked on an element with className 'link-url'. 
        // This was done to stop the tooltip showing the url from hiding when we click on the url input field
        if ("link-url" === e.target.className) {
            return
        }

        this.setState({
            isURLVisable: false
        });
    },
    handleShowURL: function() {
        this.setState({
            isURLVisable: true
        })
    },
    handleDeleteLink: function() {
        serverCommunicator.deleteLink(
            this.props.presentationID,
            this.props.slideID,
            this.props.bulletID,
            this.props.id) // linkID
    },
    // returns delete button if text is blank, otherwise returns external link anchor
    getDeleteButtonOrAnchor: function() {
        if (!this.props.text) {
            return (<Button
                            variant="edit-link"
                            color="red"
                            fontAwesomeClassName="fa-trash"
                            onClick={ this.handleDeleteLink } />)
        }
        return (<a href={ this.props.url } target="_blank"><i className="fa fa-external-link" /></a>)
    },
    getInitialState: function() {
        return {
            text: this.props.text,
            url: this.props.url,
            isURLVisable: false,
            // the ToolTip needs a unique id for each link. TODO: Any better alternate ?
            fullLinkID: "link" + this.props.presentationID + this.props.slideID + this.props.bulletID + this.props.id
        }
    },
    render: function() {
        return (
            <div className="link" id={ this.state.fullLinkID }>
                <AutosizeInput
                               inputClassName="link-text"
                               placeholder="link"
                               value={ this.state.text }
                               onChange={ this.handleTextChange }
                               onClick={ this.handleShowURL } />
                { this.getDeleteButtonOrAnchor() }
                { <ToolTip
                           active={ this.state.isURLVisable }
                           position="bottom"
                           arrow="left"
                           tooltipTimeout={ 0 }
                           parent={ "#" + this.state.fullLinkID }>
                      { <div>
                            <span>Text:</span>
                            <AutosizeInput
                                           inputClassName="link-text"
                                           placeholder="link"
                                           value={ this.state.text }
                                           onChange={ this.handleTextChange }
                                           onClick={ this.handleShowURL } />
                            <br/>
                            <span>URL:</span>
                            <AutosizeInput
                                           inputClassName="link-url"
                                           placeholder="http://diapers.com"
                                           value={ this.state.url }
                                           onChange={ this.handleURLChange } />
                        </div> }
                  </ToolTip> }
            </div>
        )
    },
    componentWillReceiveProps: function(props) {
        this.setState({
            text: props.text,
            url: props.url
        });
    },
})

LinkContainer.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    presentationID: PropTypes.number.isRequired,
    slideID: PropTypes.string.isRequired,
    bulletID: PropTypes.string.isRequired
}
LinkContainer.defaultProps = {
    text: "",
    url: "",
}

module.exports = enhanceWithClickOutside(LinkContainer);

