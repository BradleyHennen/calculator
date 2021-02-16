import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Calculator from "./features/calculator/views/Calculator";

export default function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Calculator />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}
