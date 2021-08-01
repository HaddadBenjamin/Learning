import { useState, useEffect, useCallback } from 'react';
import styles from './Messenger.module.css'
import { IMessage } from '../message.model'
import Message from '../Message/Message'

const Messenger = ({socket} : any) =>
{
    const [messages, setMessages] = useState<IMessage[]>([])
    const [userName, setUserName] = useState('')
    const [everybodyMessage, setEverybodyMessage] = useState('')
    const [groupMessage, setGroupMessage] = useState('')
    const [privateMessage, setPrivateMessage] = useState('')
    const [groupName, setGroupName] = useState('')
    const [destinationUserName, setDestinationUserName] = useState('')
    const [isInAGroup, setIsInAGroup] = useState(false)

    useEffect(() => socket.on("message", (message : IMessage) => 
        setMessages([...messages, {...message, from : userName === message.userName ? 'USER' : 'OTHER_USER' }])), 
        [socket, messages])

    const sendMessageToEverybody = () => { socket.emit("sendMessageToEverybody", everybodyMessage); setEverybodyMessage('') }
    const sendGroupMessage = () => { socket.emit("sendRoomMessage", groupMessage); setGroupMessage('') }
    const sendPrivateMessage = () => { socket.emit("sendPrivateMessage", { content : privateMessage, userName : destinationUserName }); setPrivateMessage('') }

    const joinGroup = () => { socket.emit("userJoinRoom", { userName : userName, groupName : groupName }); setIsInAGroup(true)}
    const leaveGroup = () => { socket.emit("userLeaveRoom"); setIsInAGroup(false) }
    const joinOrLeaveGroup = () => isInAGroup ? leaveGroup() : joinGroup();

    const onUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
    const onEverybodyMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setEverybodyMessage(event.target.value)
    const onGroupMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setGroupMessage(event.target.value)
    const onPrivateMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setPrivateMessage(event.target.value)
    const onGroupNameChange = (event : React.ChangeEvent<HTMLInputElement>) => setGroupName(event.target.value)
    const onDestinationUserNameChange = (event : React.ChangeEvent<HTMLInputElement>) => setDestinationUserName(event.target.value)

    return <>
       <input placeholder="Username" onChange={onUsernameChange} className={styles.username}/>
        <div className={styles.container}>
            {messages && messages.map(m => <Message {...m} key={m.id} />)} 
        </div>
       
        <div className={styles.inputContainer}>
            <input value={everybodyMessage} placeholder="Write a message" onChange={onEverybodyMessageChange}/>
            <button onClick={sendMessageToEverybody}>Send</button>
        </div>

        <div className={styles.inputContainer}>
            <input value={groupMessage} placeholder="Write a message" onChange={onGroupMessageChange}/>
            <input value={groupName} placeholder="Group name" onChange={onGroupNameChange}/>
            <button onClick={joinOrLeaveGroup}>{isInAGroup ? 'Leave Group' : 'Join Group'}</button>
            <button onClick={sendGroupMessage}>Send</button>
        </div>
    
        <div className={styles.inputContainer}>
            <input value={privateMessage} placeholder="Write a message" onChange={onPrivateMessageChange}/>
            <input value={destinationUserName} placeholder="Destination username" onChange={onDestinationUserNameChange}/>
            <button onClick={sendPrivateMessage}>Send</button>
        </div>
    </>
}

export default Messenger