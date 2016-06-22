var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var AppRoot = require('../components/AppRoot');
var PresentationContainer = require("../containers/PresentationContainer");

var routes = (
<Router history={ hashHistory }>
    <Route path='/' component={ AppRoot }>
        <IndexRoute component={ PresentationContainer } />
    </Route>
</Router>
);

module.exports = routes;