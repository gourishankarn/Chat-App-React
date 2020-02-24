const users = [];

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
  const flag = users.findIndex(user => user.id === id);
  console.log(users[flag]);
  if (flag !== -1) return users[flag];
};

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
