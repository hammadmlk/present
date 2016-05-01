var React = require('react');

var mainStyle = {
	height: '100%',
	width: '100%',
	backgroundColor: 'rgba(0, 0, 0, 0.1)'
}

var Main = React.createClass({
  render: function () {
    return (
      <div className='main-container' style={mainStyle}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Main;