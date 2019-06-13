import React, { Component } from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route,Redirect} from "react-router-dom";
import asyncComponent from "./helpers/asyncFunc";

const PublicRoutes = ({ history, isLoggedIn }) => {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route
            exact
            path="/public" 
            component={asyncComponent(()=>import("./scenes/Public"))} 
          />
          <Route
            exact
            path="/login"
            component={asyncComponent(()=>import("./scenes/Login"))}
          />
          <PrivateRoute 
            path="/protected"
            component={asyncComponent(()=>import("./scenes/Protected"))}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </ConnectedRouter>
    );
}
const PrivateRoutes=({ component: Component,isLoggedIn,...rest })=>{
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

export default connect(state => ({
    isLoggedIn: state.Auth.idToken !== null
  }))(PublicRoutes);