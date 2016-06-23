/*
 * Contains an individual presentation
 */

const React = require('react');
const PropTypes = React.PropTypes;
const PresentationNav = require('../components/PresentationNav');
const Slide = require('../components/Slide');
const serverCommunicator = require('../utils/ServerCommunicator').getInstance();
require('../scss/Presentation.scss');


const PresentationContainer = React.createClass({
    handleNextSlide: function() {
        const currentVisibleSlideId = this.state.visibleSlideId;
        this.setState({
            visibleSlideId: currentVisibleSlideId + 1
        })
    },
    handlePrevSlide: function() {
        const currentVisibleSlideId = this.state.visibleSlideId;
        this.setState({
            visibleSlideId: currentVisibleSlideId - 1
        })
    },
    handleNewData: function(presentation) {
        this.setState({
            id: presentation.id,
            title: presentation.title,
            slideList: presentation.slideList
        })
    },
    getInitialState: function() {
        return {
            id: 1,
            title: '',
            slideList: [],
            visibleSlideId: 1,
        }
    },
    render: function() {
        return (
            <div className="presentation">
                <div className="slide-list" style={ this.getSlideListMargin() }>
                    { this.getSlideList() }
                </div>
                <PresentationNav
                                 onNextSlide={ this.handleNextSlide }
                                 onPrevSlide={ this.handlePrevSlide }
                                 disablePrev={ this.state.visibleSlideId <= 1 }
                                 disableNext={ this.state.visibleSlideId >= this.state.slideList.length } />
            </div>
        )
    },
    componentDidMount: function() {
        serverCommunicator.onPresentationHasNewData(this.handleNewData)
    },
    //
    // Helpers
    //
    getSlideList: function() {
        return this.state.slideList.map(function(slide) {
            return <Slide
                          key={ slide.id }
                          presentationID={ this.state.id }
                          id={ slide.id }
                          title={ slide.title }
                          subTitle={ slide.subTitle }
                          bulletList={ slide.bulletList } />;
        }.bind(this));
    },
    getSlideListMargin: function() {
        var marginLeft = (-100 * this.state.visibleSlideId + 100) + '%';
        return {
            marginLeft: marginLeft
        }
    },
});

PresentationContainer.propTypes = {}

module.exports = PresentationContainer;

