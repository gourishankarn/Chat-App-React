import React, { useState, Component } from "react";
import "./Admin.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      lusername: "",
      lpassword: "",
      login: false
    };
  }

  redirect() {
    if (this.state.login) {
      return <Redirect to="/admin-dashboard" />;
    }
  }

  handleusername = event => {
    this.setState({ lusername: event.target.value });
    console.log(this.state.lusername);
  };

  handlepassword = event => {
    this.setState({ lpassword: event.target.value });
    console.log(this.state.lpassword);
  };
  handlesubmit = event => {
    event.preventDefault();
    if (
      this.state.username == this.state.lusername &&
      this.state.lpassword == this.state.password
    ) {
      console.log("succeful login");
      this.setState({ login: true });
    } else {
      console.log("please provide the valid credentials");
      this.setState({ iserror: true });
    }
  };
  componentDidMount() {
    let reference = this;
    var loc = window.location.hostname;
    const admin = "http://" + loc + ":5000/api/admin";
    axios.get(admin).then(response => {
      console.log(response);
      reference.setState({ username: response.data.username });

      reference.setState({ password: response.data.password });
    });
    console.log(this.state.username);

    console.log(this.state.password);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlesubmit} className="login">
          <div className="login-triangle"></div>

          <h2 className="login-header">Admin LogIn</h2>

          <div className="login-container">
            <p>
              <input
                type="email"
                id="email"
                ref="email"
                onChange={this.handleusername}
                placeholder="username"
              />
            </p>
            <p>
              <input
                type="password"
                id="pass"
                ref="pass"
                onChange={this.handlepassword}
                placeholder="Password"
              />
            </p>
            <p>
              <button className={"button mt-20"} type="submit">
                LOG IN
              </button>
            </p>
          </div>
        </form>
        {this.redirect()}
      </div>
    );
  }
}

export default Admin;
