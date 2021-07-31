const express = require("express")
const socket = require("socket.io")
const cors = require("cors")
const { createUser, getUser, getUserByUserName, removeUser } = require("./fakeUserManager")

const app = express()

app.use(express())
app.use(cors())

const server = app.listen(8000, console.log(`Server is running on the port 8000`))
const io = socket(server)

const createMessage = (user, message) => { return { userId: user.id, userName: user.userName, content : message } }
    
io.on("connection", socket =>
{
  socket.on("userJoinRoom", ({ userName, roomName }) =>
  {
    const user = createUser(socket.id, userName, roomName)

    socket.join(user.room)
    socket.emit("message", createMessage(user, `Welcome ${user.userName}`))
    socket.broadcast.to(user.roomName).emit("message", createMessage(user, `${user.userName} has joined the room`))
  })

  socket.on("userLeaveRoom", () =>
  {
    const user = getUser(socket.id)

    socket.leave(user.room)
    socket.broadcast.to(user.roomName).emit("message", createMessage(user, `${user.userName} has left the room`))
  })

  socket.on("sendRoomMessage", content =>
  {
    const user = getUser(socket.id)

    io.to(user.roomName).emit("message", createMessage(user, `${user.userName} : ${content} as room message`))
  })

  socket.on("sendMessageToEverybody", content =>
  {
    const user = getUser(socket.id)

    io.broadcast.emit("message", createMessage(user, `${user.userName} : ${content} as everybody message`))
  })

  socket.on("sendPrivateMessage", ({content, userName}) =>
  {
    const user = getUser(socket.id)
    const destinationUser = getUserByUserName(userName)

    io.to(destinationUser.userId).emit("message", createMessage(user, `${user.userName} : ${content} as private message`))
  })

  socket.on("disconnect", () =>
  {
    const user = removeUser(socket.id)

    if (user)
      io.to(user.roomName).emit("message", createMessage(user, `${user.userName} has been disconnected`))
  })
})