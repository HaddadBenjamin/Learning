import { useState, useEffect } from 'react';
import styles from './Messenger.module.css'
import cn from 'classnames'
import io from "socket.io-client";

const socket = io('http://localhost:8000/');

type MessageDestination = 'EVERYBODY' | 'GROUP' | 'PRIVATE'
type MessageFrom = 'USER' | 'OTHER_USER'

interface MessageProps
{
    userName : string
    content : string
    destination : MessageDestination
    from : MessageFrom
    groupName? : string
    destinationUserName? : string
}

const Message = ({userName, content, destination, from, groupName, destinationUserName} : MessageProps) =>
{
    const messageTitleFirstPart =  `${from === 'USER' ? 'You' : userName} sent a message to `
    const messageTitleSecondPart = 
        destination === 'EVERYBODY' ? 'everybody' : 
        destination === 'GROUP' ? `the group ${groupName}` :
        `the user ${destinationUserName}`
    const messageTitle = `${messageTitleFirstPart}${messageTitleSecondPart}`

    const messageClasses = cn(
        styles.message,
        destination === 'EVERYBODY' && styles.messageToEverybody,
        destination === 'GROUP' && styles.groupMessage,
        destination === 'PRIVATE' && styles.privateMessage,
        from === 'USER' && styles.messageFromUser,
        from === 'OTHER_USER' && styles.messageFromOtherUser)

    return <>
        <div className={styles.messageTitle}>{messageTitle}</div>
        <div className={messageClasses}>{content}</div>
    </>
}

const Messenger = () =>
{
    const [messages, setMessages] = useState<MessageProps[]>([
        { userName : 'Ben', content : 'lorem', destination : 'EVERYBODY', from : 'USER' },
        { userName : 'Jess', content : 'blabla', destination : 'GROUP', from : 'OTHER_USER', groupName : 'My great company' },
        { userName : 'David', content : 'lipsum', destination : 'PRIVATE', from : 'OTHER_USER', destinationUserName : 'Jess' }])
    
    useEffect(() => { socket.on("message", (message : MessageProps) => setMessages([...messages, message])) }, [socket])

    const [userName, setUserName] = useState('')
    const [everybodyMessage, setEverybodyMessage] = useState('')
    const [groupMessage, setGroupMessage] = useState('')
    const [privateMessage, setPrivateMessage] = useState('')
    const [groupName, setGroupName] = useState('')
    const [destinationUserName, setDestinationUserName] = useState('')
    const [isInAGroup, setIsInAGroup] = useState(false)

    // TODO : l'event message et ces derniers là : + joinGroup et leaveGroup + reset
    const sendMessageToEverybody = () => { socket.emit("sendMessageToEverybody", everybodyMessage); setEverybodyMessage('') }
    const sendGroupMessage = () => { socket.emit("sendRoomMessage", groupMessage); setGroupMessage('') }
    const sendPrivateMessage = () => { socket.emit("sendPrivateMessage", { content : privateMessage, userName : destinationUserName }); setPrivateMessage('') }

    const joinGroup = () => { socket.emit("userJoinRoom", { userName : userName, groupName : groupName }); setIsInAGroup(true) }
    const leaveGroup = () => { socket.emit("userLeaveRoom"); setIsInAGroup(false) }
    const joinOrLeaveGroup = () => isInAGroup ? leaveGroup() : joinGroup()

    const onUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
    const onEverybodyMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setEverybodyMessage(event.target.value)
    const onGroupMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setGroupMessage(event.target.value)
    const onPrivateMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setPrivateMessage(event.target.value)
    const onGroupNameChange = (event : React.ChangeEvent<HTMLInputElement>) => setGroupName(event.target.value)
    const onDestinationUserNameChange = (event : React.ChangeEvent<HTMLInputElement>) => setDestinationUserName(event.target.value)

    return <>
       <input placeholder="Username" onChange={onUsernameChange}/>
        <div className={styles.container}>
            {messages.map((m, i) => <Message {...m} key={i} />)} 
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