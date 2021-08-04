import { useState, useEffect } from 'react';
import styles from './Messenger.module.css'
import { IMessage } from '../message.model'
import Message from '../Message/Message'
import Join from './Svg/Join.svg'
import Send from './Svg/Send.svg'
import Leave from './Svg/Leave.svg'
import cn from 'classnames'

{ /* 
- Fixer from user & from other user 
- Afficher le now ?*/}
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

    useEffect(() => socket.on("message", (message : IMessage) => {
        const previousMessageUserName = messages.length > 0 ? messages[messages.length - 1].userName : ''
        const previousMessageDestination = messages.length > 0 ? messages[messages.length - 1].destination : ''

        if (!messages.some((m : IMessage) => m.id === message.id || m.content === message.content))
            setMessages([...messages, {
                ...message, 
                from : userName === message.userName ? 'USER' : 'OTHER_USER', 
                previousMessageUserName : previousMessageUserName, 
                previousMessageDestination : previousMessageDestination  
            }])
    }), 
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

    return <div className={styles.container}>
        <div className={styles.usernameContainer}>
            <div className={styles.title}>Scouting Group</div>
            <input className={cn(styles.input, styles.responsiveInput)} value={userName} onChange={onUsernameChange} placeholder="Username"/>
        </div>

        <div className={styles.descriptionContainer}>
            <div className={styles.descriptionTitle}>Welcome to the Streamline HWT chat</div>
            <div className={styles.description}>We can now freely colaborate regarding our current 
            Demand. Any question about the documentation or the project, please feel free to get
            in contact us.
            </div>
        </div>

        <div className={styles.messageDate}>Tuesday, Jully 8th at 7:37 PM</div>

        {messages && messages.map(m => <Message {...m} key={m.id} />)} 

        <div className={cn(styles.messageDestinationInputContainer, styles.spacingMd)}>
            <input className={cn(styles.input, styles.messageToEveryBodyInput)} placeholder="Write a message..." value={everybodyMessage} onChange={onEverybodyMessageChange} />
            <div className={cn(styles.imageButton, styles.imageButtonWithLeftMargin)} onClick={sendMessageToEverybody}>
                <img src={Send} alt=""/>
            </div>
        </div>

        <div className={styles.messageDestinationInputContainer}>
            <input className={styles.input} placeholder="Write a group message..." value={groupMessage} onChange={onGroupMessageChange}/>
            <input className={cn(styles.input, styles.responsiveInput)} placeholder="Group Name" value={groupName} onChange={onGroupNameChange}/>
            <div className={styles.imageButton} onClick={joinOrLeaveGroup}>
                <img src={isInAGroup ? Leave : Join} onClick={joinOrLeaveGroup} alt=""/>
            </div>
            <div className={styles.imageButton} onClick={sendGroupMessage}>
                <img src={Send} alt=""/>
            </div>
        </div>

        <div className={cn(styles.messageDestinationInputContainer, styles.lastMessageDestinationInputContainer)}>
            <input className={cn(styles.input, styles.privateMessageInput)} placeholder="Write a private message..." value={privateMessage} onChange={onPrivateMessageChange}/>
            <input className={cn(styles.input, styles.responsiveInput)} placeholder="Username" value={destinationUserName} onChange={onDestinationUserNameChange}/>
            <div className={cn(styles.imageButton, styles.imageButtonWithLeftMargin)} onClick={sendPrivateMessage}>
                <img src={Send} alt=""/>
            </div>
        </div>
    </div>
}

export default Messenger