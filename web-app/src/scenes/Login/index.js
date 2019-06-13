import React, { Component } from "react";
import {
  Redirect,
  withRouter
} from "react-router-dom";
import { connect } from "net";

class Login extends Component {
    state = { redirectToReferrer: false };
  
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
  }

function mapStateToProps(state){
  return{
    Auth : state.auth
  };
}
export default connect(
  mapStateToProps,{login}
)(Login);