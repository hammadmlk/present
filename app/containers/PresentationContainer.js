var React = require('react');
var Presentation = require('../components/Presentation');
var mockPresentationData = require('../utils/mockData').mockPresentationData;

var PresentationContainer = React.createClass({
  getInitialState: function () {
    return {
      visibleSlideId: 1
    }
  },
  getDefaultProps: function () {
    return mockPresentationData
  },
  handleNextSlide: function () {
  	var currentVisibleSlideId = this.state.visibleSlideId;
  	this.setState({
  		visibleSlideId: currentVisibleSlideId + 1
  	})
  	// TODO: Limit to maxSlide in this.props.slideList
  },
  handlePrevSlide: function () {
  	var currentVisibleSlideId = this.state.visibleSlideId;
  	this.setState({
  		visibleSlideId: currentVisibleSlideId - 1
  	})
  	// TODO: Limit to minSlide 1
  },
  render: function () {
    return (
      <Presentation id={this.props.id} 
      				title={this.props.title} 
      				slideList={this.props.slideList}
      				visibleSlideId={this.state.visibleSlideId}
      				handleNextSlide={this.handleNextSlide}
      				handlePrevSlide={this.handlePrevSlide} />
    )
  }
});

module.exports = PresentationContainer;