/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";
import AboutPage from "./AboutPage";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import HomePage from "./HomePage";
import Register from "./Register";
import Chat from "./Chat";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path ="/register" component={Register} />
                    <Route exact path="/chat" component={Chat} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default hot(module)(App);
