const express = require("express");
const router = express.Router();
const admin = {
  username: "atonarp@atonarp.com",
  password: "atonarp"
};

var rooms = [];

var users = [];

router.get("/", (req, res) => {
  res.send({ response: "server is runnning " }).status(200);
});

router.get("/api/admin", (req, res) => {
  res.send(admin).status(200);
});

router.post("/api/rooms", (req, res) => {
  const newroom = {
    roomname: req.body.roomname,
    history: req.body.history,
    createdAt: new Date().toISOString()
  };
  let flag = false;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].roomname == newroom.roomname) {
      flag = true;
      break;
    }
  }
  if (flag) {
    console.log("room already exist");
    return res.status(400).send("room already exist");
  } else {
    rooms.push(newroom);
    console.log("new room is created");
    return res.status(200).send("new room is created");
  }
});

router.get("/api/rooms", (req, res) => {
  let roooms1 = [];
  for (var k = 0; k < rooms.length; k++) {
    console.log(rooms[k]);
    roooms1.push(rooms[k].roomname);
  }
  res.send(rooms);
});

router.post("/api/users", (req, res) => {
  const newuser = {
    username: req.body.username,
    userid: req.body.userid,
    createdAt: new Date().toISOString()
  };
  let flag = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].userid == newuser.userid) {
      flag = true;
      break;
    }
  }
  if (flag) {
    console.log("user already exist");
    res.status(400).json("user already exist");
  } else {
    console.log("new user is created");
    users.push(newuser);
    res.send(200);
  }
});

router.get("/api/users", (req, res) => {
  let users1 = [];
  for (var k = 0; k < users.length; k++) {
    /* console.log(users[k]); */
    users1.push(users[k].roomid);
  }
  res.send(users);
});

//delete room
router.delete("/api/rooms/:id", (req, res) => {
  var roomid = req.params.id;
  let index;
  let flag = false;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].roomid == roomid) {
      index = i;
      flag = true;
      break;
    }
  }
  if (flag) {
    rooms.splice(index, 1);
    return res.status(200).send("room deleted succesfully");
  } else {
    return res.status(400).send("room does not exist");
  }
});

//delete user
router.delete("/api/users/:id", (req, res) => {
  var userid = req.params.id;
  let index;
  let flag = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].userid == userid) {
      index = i;
      flag = true;
      break;
    }
  }
  if (flag) {
    users.splice(index, 1);
    return res.status(200).send("user deleted succesfully");
  } else {
    return res.status(400).send("user does not exist");
  }
});

module.exports = router;
