import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const RoutePrivate = (props) => {
  const { currentUser } = useAuth();
  const user = currentUser();
  return user ? (
    <Route {...props} component={props.component} />
  ) : (
    <Redirect to={"/auth/login"} />
  );
};

export default RoutePrivate;
