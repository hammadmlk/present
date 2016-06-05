const React = require('react');
const PropTypes = React.PropTypes;
const Presentation = require('../components/Presentation');
const serverCommunicator = require('../utils/ServerCommunicator').getInstance();

const PresentationContainer = React.createClass({
    handleNextSlide: function() {
        // TODO: Limit to maxSlide in this.props.slideList
        const currentVisibleSlideId = this.state.visibleSlideId;
        this.setState({
            visibleSlideId: currentVisibleSlideId + 1
        })
    },
    handlePrevSlide: function() {
        // TODO: Limit to minSlide 1
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
            <Presentation
                          id={ this.state.id }
                          title={ this.state.title }
                          slideList={ this.state.slideList }
                          visibleSlideId={ this.state.visibleSlideId }
                          onNextSlide={ this.handleNextSlide }
                          onPrevSlide={ this.handlePrevSlide } />
        )
    },
    componentDidMount: function() {
        serverCommunicator.onPresentationHasNewData(this.handleNewData)
    }
});

module.exports = PresentationContainer;