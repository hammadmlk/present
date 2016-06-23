var React = require('react');
var PropTypes = React.PropTypes;
var BulletContainer = require('./BulletContainer');
var Button = require('../components/Button');
const serverCommunicator = require('../utils/ServerCommunicator').getInstance();
require('../scss/SlideBody.scss');

const SlideBodyContainer = React.createClass({

    handleAddBullet: function() {
        //TODO: show loading indication between addBullet press and new bullet reception ?
        serverCommunicator.addBullet(
            this.props.presentationID,
            this.props.slideID)
    },
    render: function() {
        return (
            <div className="slide-body valign-wrapper">
                <div className="bullet-list valign center-block">
                    { this.getBulletList() }
                    <div className="center-align">
                        <Button variant="edit-slide" fontAwesomeClassName="fa-plus-circle" onClick={ this.handleAddBullet } />
                    </div>
                </div>
            </div>
        )
    },
    //
    // Helpers
    //
    getBulletList: function() {
        return this.props.bulletList.map(function(bullet) {
            return <BulletContainer
                                    key={ bullet.id }
                                    id={ bullet.id }
                                    text={ bullet.text }
                                    tag={ bullet.tag }
                                    linkList={ bullet.linkList }
                                    presentationID={ this.props.presentationID }
                                    slideID={ this.props.slideID } />;
        }.bind(this));
    }
})

SlideBodyContainer.propTypes = {
    presentationID: PropTypes.number.isRequired,
    slideID: PropTypes.string.isRequired,
    bulletList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

module.exports = SlideBodyContainer;
