import React, { Component } from "react";
import ReactDOM from "react-dom";

class Admindashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: "",
      roomid: "",
      username: "",
      userid: "",
      iserror: false,
      isloading: false
    };
  }

  handleroomname = event => {
    this.setState({ roomname: event.target.value });
  };
  handleroomid = event => {
    this.setState({ roomid: event.target.value });
  };
  handleusername = event => {
    this.setState({ username: event.target.value });
  };
  handleuserid = event => {
    this.setState({ userid: event.target.value });
  };

  handlesubmit1() {}
  handlesubmit2() {}

  render() {
    return (
      <div>
        <h1>I am Admindashboard</h1>
        <div>
          <form onSubmit={this.handlesubmit1}>
            <input
              type="text"
              name="roomn"
              placeholder="Enter roomname"
              onChange={this.handleroomname}
              required
              autoFocus
            ></input>
            <input
              type="text"
              name="roomi"
              placeholder="Enter roomid"
              onChange={this.handleroomname}
              required
              autoFocus
            ></input>
            <button>create room</button>
          </form>
        </div>
        <br />

        <div></div>
        <div>
          <form onSubmit={this.handlesubmit2}>
            <input
              type="text"
              name="roomn"
              placeholder="Enter roomname"
              onChange={this.handleroomname}
              required
              autoFocus
            ></input>
            <input
              type="text"
              name="roomi"
              placeholder="Enter roomid"
              onChange={this.handleroomname}
              required
              autoFocus
            ></input>
            <button>create room</button>
          </form>
        </div>
        <div>delete user</div>
      </div>
    );
  }
}

export default Admindashboard;
