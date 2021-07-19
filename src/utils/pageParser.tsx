import React from "react";
import { Route, Switch } from "react-router-dom";

interface RouteType {
  path: string;
  component: React.FC<any>;
  exact?: boolean;
}

//takes an array of objects with each depicting a component and path details and makes a full fledged component from it
export const convertRoutesToComponents = (routes: RouteType[]) => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
};