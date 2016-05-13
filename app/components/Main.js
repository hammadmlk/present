// This wraps the entire Application. Perhaps a better name will be AppContainer
var React = require('react');

require('../scss/Main.scss');

var Main = React.createClass({
  render: function () {
    return (
      <div className='main' >
        {this.props.children}
      </div>
    )
  }
});

module.exports = Main;