const users = [];

const createUser = (id, userName, roomName) => 
{
    const user = { id, userName, roomName }

    return (users.push(user), user)
}

const getUser = id => users.find(user => user.id === id)

const getUserByUserName = userName => users.find(user => user.userName === userName)

const removeUser = id => users.splice(users.findIndex(user => user.id === id), 1)[0]

module.exports = { createUser, getUser, getUserByUserName, removeUser }