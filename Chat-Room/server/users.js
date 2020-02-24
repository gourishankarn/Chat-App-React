const users = [];
const rooms = [];
//console.log(rooms1);

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = id => {
  /*   console.log(rooms1);
  const flag = users.findIndex(user => user.id === id);
  let rooms = "http://localhost:5000/api/rooms";
  const temp = users[flag].room;
  var history;

  axios.get(rooms).then(function(response) {
    console.log("called");
    let res = response.data;
    const flag3 = res.findIndex(data => data.roomname === temp);
    console.log(flag3);
    console.log(res[flag3]);
    history = res[flag3].history;
    console.log(history);
  });

  console.log("me");
  console.log(history);
  console.log(users[flag]); */
  console.log(rooms);
  const flag = users.findIndex(user => user.id === id);
  const temp = users[flag].room;
  let history;

  const flag3 = rooms.findIndex(data => data.roomname === temp);

  history = rooms[flag3].history;
  console.log(history);

  const result = {
    name: users[flag].name,
    room: users[flag].room,
    priv: history
  };

  console.log(result);

  if (flag !== -1) return result;
};

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, rooms };
