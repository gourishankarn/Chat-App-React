const http = require("http");
const express = require("express");
const socketio = require("socket.io");
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3").verbose();
/* let db = new sqlite3.Database(":memory:", err => {
  if (err) {
    console.log("failed to connect to the sqlite database");
  }
  console.log("successfully connected to the sqlite db");
}); */
const cors = require("cors");

const app = express();

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

var history = [];

const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    let flag11;
    for (var i = 0; i < history.length; i++) {
      if (history[i].room == user.room && history[i].name == user.name) {
        flag11 = i;
        break;
      }
    }

    let oldmessage = [];
    //getmesseges(user.room);
    for (var i = 0; i < history.length; i++) {
      if (history[i].room === user.room) {
        let obj = {
          name: history[i].name,
          mess: history[i].mess
        };
        oldmessage.push(obj);
      } else continue;
    }
    /* 
    for (var i = 0; i < oldmessage.length; i++) {
      console.log(i);
      console.log(oldmessage);
      let user1 = oldmessage[i].name;
      let newm = oldmessage[i].mess;
      //setTimeout(fun1(), 100);
      socket.emit("message", {
        user: user1 === user.name ? user.name : user1,
        text: `${newm}`
      });
    } */
    oldmessage.forEach(ele => {
      let user1 = ele.name;
      let newm = ele.mess;
      //setTimeout(fun1(), 100);
      socket.emit("message", {
        user: user1 === user.name ? user.name : user1,
        text: `${newm}`
      });
    });
    /* socket.emit("message", {
      user: user.name,
      data: oldmessage
    }); */

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const message1 = {
      name: user.name,
      room: user.room,
      mess: message
    };
    history.push(message1);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

const os = require("os");
const host1 = os.hostname();

server.listen(5000, () => console.log(`${host1} Server has started.`));

fun1 = function() {
  console.log("test");
};
