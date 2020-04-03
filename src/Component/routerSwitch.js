import { Route, Switch } from "react-router-dom";
import React from "react";

import KpaBoard from "./board";
import Dashboard from "./dashboard";

const AppRouter = () => {
  return (
    <div style={style}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/kpa-profile" component={KpaBoard} />
      </Switch>
    </div>
  );
};

const style = {
  marginTop: "20px"
};

export default AppRouter;
