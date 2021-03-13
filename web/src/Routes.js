import React from "react";
import { Route, Switch } from "react-router";

import RoutePrivate from "./components/RoutePrivate";

import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

export default (
  <Switch>
    <RoutePrivate path="/" exact component={Dashboard} />
    <RoutePrivate path="/users" exact component={UsersList} />
    <Route path="/auth/login" exact component={Login} />
    <Route path="/auth/signup" exact component={Signup} />
    <Route path="/401" component={Unauthorized} />
    <Route component={NotFound} />
  </Switch>
);
