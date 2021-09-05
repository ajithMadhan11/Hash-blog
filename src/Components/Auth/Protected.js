import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Loader from "../Loader";
const Protected = ({ component: Component, auth, ...rest }) => {
  const { isLoaded, authenticated } = auth;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoaded ? (
          <Loader />
        ) : authenticated ? (
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
