import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from './App';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Notfound from './Components/Notfound';

const Routes = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="*" exact component={Notfound} />
          </Switch>
        </BrowserRouter>
    );
}

export default Routes;
