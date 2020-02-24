import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Join.css";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
      name: "",
      newroom: "",
      newroomid: "",
      rooms: [],
      history: false
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }

  handleEmailChange = event => {
    this.setState({ newroom: event.target.value });
  };
  handlePwdChange = event => {
    this.setState({ newroomid: event.target.value });
  };
  handlerooms = event => {
    this.setState({ room: event.target.value });
  };
  toggleChange = event => {
    this.setState({
      history: !this.state.history
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const loc = window.location.hostname;
    const rooms = "http://" + loc + ":5000/api/rooms";
    console.log(rooms);
    const roomname = this.state.newroom;
    const history = this.state.history;
    console.log(history);

    axios
      .post(
        rooms,
        { roomname: roomname, history: history },

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,  POST",
            "Content-Type": "application/json"
          }
        }
      )
      .then(result => {
        //console.log(result);
        if (result.status == 200) {
          console.log(result.status);
          alert("new room is created");
        }
      })
      .catch(error => {
        alert("Room already exist!");
        console.log(error);
      });
  };

  handleChange(event) {
    this.setState({
      history: event.target.value
    });
  }

  componentDidMount() {
    let currentComponent = this;
    let data1 = this.state.rooms;
    const loc = window.location.hostname;
    const rooms = "http://" + loc + ":5000/api/rooms";
    axios.get(rooms).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        data1.push(response.data[i].roomname);
      }

      console.log(this);
      currentComponent.setState({ rooms: data1 });
    });
    console.log(this.state.rooms);
  }

  render() {
    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Chat@Work</h1>
          <div>
            <input
              placeholder="Username"
              className="joinInput"
              type="text"
              onChange={event => this.setState({ name: event.target.value })}
            />
            <select className="joinInput mt-20" onChange={this.handlerooms}>
              <option value="">Select Room</option>
              {this.state.rooms.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <Link
              onClick={e =>
                !this.state.name || !this.state.room ? e.preventDefault() : null
              }
              to={`/chat?name=${this.state.name}&room=${this.state.room}`}
            >
              <button className={"button mt-20"} type="submit">
                Join Room
              </button>
            </Link>
          </div>

          <form className="createroom" onSubmit={this.handleSubmit}>
            <input
              className="joinInput"
              id="inputEmail"
              placeholder="Roomname"
              type="text"
              name="email"
              onChange={this.handleEmailChange}
              autoFocus
              required
            />

            {/*  <input
              className="joinInput"
              id="inputPassword"
              placeholder="roomid"
              type="text"
              name="roomid"
              onChange={this.handlePwdChange}
              autoFocus
              required
            /> */}

            <div className="label">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.history}
                  onChange={this.toggleChange}
                />
                Room History
              </label>
            </div>

            <button
              onClick={() => window.location.reload(false)}
              className={"button mt-20"}
              type="submit"
            >
              create room
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Join;
