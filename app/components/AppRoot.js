/* 
 * This element wraps the entire Application. 
 * Perhaps a better name will be AppContainer
 */
var React = require('react');

require('../scss/helpers.scss');
require('../scss/AppRoot.scss');

var AppRoot = React.createClass({
    render: function() {
        return (
            <div className='app-root'>
                { this.props.children }
            </div>
        )
    }
});

module.exports = AppRoot;