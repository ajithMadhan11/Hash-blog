import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loader from "../Loader";
const Protected = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isLoaded ? (
          <Loader />
        ) : auth.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Protected);
