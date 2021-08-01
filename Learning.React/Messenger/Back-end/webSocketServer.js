const express = require("express")
const socket = require("socket.io")
const { createUser, getUser, getUserByUserName, removeUser } = require("./fakeUserManager")

const app = express();
const server = app.listen(8000);
const io = new socket.Server(server, { cors: { origin: '*' } });

const createMessage = (user, message, destination, otherParameters = {}) => { return {
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

  socket.on("userJoinRoom", ({ userName, roomName }) =>
  {
    const user = createUser(socket.id, userName, roomName)

    socket.join(user.roomName)
    socket.emit("message", createMessage(user, `Welcome ${user.userName}`))
    socket.to(user.roomName).emit("message", createMessage(user, `${user.userName} has joined the room "${user.roomName}"`, 'ROOM', { groupName : user.roomName }))
  })

  socket.on("userLeaveRoom", () =>
  {
    const user = getUser(socket.id)

    socket.leave(user.roomName)
    socket.to(user.roomName).emit("message", createMessage(user, `${user.userName} has left the room "${user.roomName}"`, 'ROOM', { groupName : user.roomName }))
  })

  socket.on("sendRoomMessage", content =>
  {
    const user = getUser(socket.id)

    socket.to(user.roomName).emit("message", createMessage(user, content, 'ROOM', { groupName : user.roomName }))
  })

  socket.on("sendMessageToEverybody", content =>
  {
    const user = getUser(socket.id)

    socket.broadcast.emit("message", createMessage(user, content, 'EVERYBODY'))
  })

  socket.on("sendPrivateMessage", ({content, userName}) =>
  {
    const user = getUser(socket.id)
    const destinationUser = getUserByUserName(userName)

    io.to(destinationUser.userId).emit("message", createMessage(user, content, 'PRIVATE', { destinationUserName : destinationUser.userName }))
  })

  socket.on("disconnect", () =>
  {
    const user = removeUser(socket.id)

    if (user)
      io.broadcast.emit("message", createMessage(user, `${user.userName} has left the chat`, 'EVERYBODY'))
  })
})