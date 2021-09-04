import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Addpost from "./Components/Addpost";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Notfound from "./Components/Notfound";
import Protected from "./Components/Auth/Protected";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Protected path="/add" exact component={Addpost} />
        <Route path="*" exact component={Notfound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
