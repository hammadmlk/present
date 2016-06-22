var React = require('react');
var PropTypes = React.PropTypes;
var TextareaAutosize = require('react-textarea-autosize').default;
const AutosizeInput = require('react-input-autosize');
var Button = require('../components/Button');
var LinkContainer = require('./LinkContainer');
var Utils = require('../utils/Utils');

require('../scss/Bullet.scss');

const serverCommunicator = require('../utils/ServerCommunicator').getInstance();

var BulletContainer = React.createClass({
    handleTextChange: function(e) {
        this.setState({
            text: e.target.value
        }, function() {
            serverCommunicator.updateBulletText(
                this.props.presentationID,
                this.props.slideID,
                this.props.id, // bulletID
                this.state.text)
        })
    },
    handleTagChange: function(e) {
        this.setState({
            tag: e.target.value
        }, function() {
            serverCommunicator.updateBulletTag(
                this.props.presentationID,
                this.props.slideID,
                this.props.id, // bulletID
                this.state.tag)
        })
    },
    handleDelete: function() {
        serverCommunicator.deleteBullet(
            this.props.presentationID,
            this.props.slideID,
            this.props.id) // bulletID
    },
    handleAddLink: function() {
        serverCommunicator.addLink(
            this.props.presentationID,
            this.props.slideID,
            this.props.id) // bulletID
    },
    getInitialState: function() {
        return {
            text: this.props.text,
            tag: this.props.tag,
            opacityClass: (Utils.isTouchDevice()) === true ? 'full-opacity' : ''
        }
    },
    render: function() {
        return (
            <div className="bullet row valign-wrapper">
                <div className="col s2 valign">
                    { this.getDeleteButtonIfNeeded() }
                </div>
                <div className="col s10">
                    <AutosizeInput
                                   className="tag"
                                   placeholder="your name"
                                   value={ this.state.tag }
                                   onChange={ this.handleTagChange } />
                    <TextareaAutosize
                                      className="text"
                                      value={ this.state.text }
                                      onChange={ this.handleTextChange }
                                      placeholder={ "some thing you wanna share here?" } />
                    <div className="link-list">
                        { this.getLinkList() }
                        <Button className="add-link-button" label="" onClick={ this.handleAddLink }>
                            <i className="fa fa-plus" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    },
    componentWillReceiveProps: function(props) {
        this.setState({
            text: props.text,
            tag: props.tag,
        });
    },
    //
    // Helpers
    //
    getLinkList: function() {
        return this.props.linkList.map(function(link) {
            return <LinkContainer
                                  key={ link.id }
                                  id={ link.id }
                                  text={ link.text }
                                  url={ link.url }
                                  presentationID={ this.props.presentationID }
                                  slideID={ this.props.slideID }
                                  bulletID={ this.props.id } />; // bulletID
        }.bind(this));
    },
    getDeleteButtonIfNeeded: function() {
        // returns button if text is blank
        if (!this.state.text) {
            return (<Button size="large" color="red" onClick={ this.handleDelete }>
                        <i className="fa fa-trash" />
                    </Button>)
        }
        return (<i/>)
    }
})


BulletContainer.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    linkList: PropTypes.arrayOf(PropTypes.object).isRequired, // validate each object in array is a Link
    presentationID: PropTypes.number.isRequired,
    slideID: PropTypes.string.isRequired
}
BulletContainer.defaultProps = {
    text: "",
    tag: "",
    linkList: [],
}


module.exports = BulletContainer;