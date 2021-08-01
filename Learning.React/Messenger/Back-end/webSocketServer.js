const express = require("express")
const socket = require("socket.io")
const { createUser, getUser, getUserByUserName, removeUser } = require("./fakeUserManager")

const app = express();
const server = app.listen(8000);
const io = new socket.Server(server, { cors: { origin: '*' } });

const newGuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
const createMessage = (user, message, destination, otherParameters = {}) => { return {
  id : newGuid(),
  userId: user.id,
  userName: user.userName,
  content : message,
  destination : destination,
  ...otherParameters
} }

io.on("connection", socket =>
{
  console.log(`connection`)
  socket.on("connect_error", error => console.log(`connect_error due to ${error.message}`))

  socket.on("userJoinRoom", ({ userName, groupName }) =>
  {
    const user = createUser(socket.id, userName, groupName)

    socket.join(user.roomName)
    io.sockets.in(user.roomName).emit("message", createMessage(user, `${user.userName} has joined the room "${user.roomName}"`, 'ROOM', { groupName : user.roomName }))
    socket.emit("message", createMessage(user, `Welcome ${user.userName}`, 'INFO', { groupName : user.roomName }))
  })

  socket.on("userLeaveRoom", () =>
  {
    const user = getUser(socket.id)

    io.sockets.in(user.roomName).emit("message", createMessage(user, `${user.userName} has left the room "${user.roomName}"`, 'ROOM', { groupName : user.roomName }))
    socket.leave(user.roomName)
  })

  socket.on("sendRoomMessage", content =>
  {
    const user = getUser(socket.id)

    io.sockets.in(user.roomName).emit("message", createMessage(user, content, 'ROOM', { groupName : user.roomName }))
  })

  socket.on("sendMessageToEverybody", content =>
  {
    const user = getUser(socket.id)

    io.sockets.emit("message", createMessage(user, content, 'EVERYBODY'))
  })

  socket.on("sendPrivateMessage", ({content, userName}) =>
  {
    const user = getUser(socket.id)
    const destinationUser = getUserByUserName(userName)

    io.sockets.to(destinationUser.id).emit("message", createMessage(user, content, 'PRIVATE', { destinationUserName : destinationUser.userName }))
    socket.emit("message", createMessage(user, content, 'INFO'))
  })

  socket.on("disconnect", () =>
  {
    const user = removeUser(socket.id)

    if (user)
      io.sockets.emit("message", createMessage(user, `${user.userName} has left the chat`, 'EVERYBODY'))
  })
})