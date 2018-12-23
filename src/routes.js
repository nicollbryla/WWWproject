import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";
import ParallaxPage from "./components/ParallaxPage";
import InfinitePage from "./components/InfinitePage";

export default () => (
  <Switch>
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/infinity" component={InfinitePage} />
    <Route exact path="/parallax" component={ParallaxPage} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />

    <Route component={ErrorPage} />
  </Switch>
);
