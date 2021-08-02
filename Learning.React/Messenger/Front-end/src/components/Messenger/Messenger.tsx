import { useState, useEffect, useCallback } from 'react';
import styles from './Messenger.module.css'
import { IMessage } from '../message.model'
import Message from '../Message/Message'
import Join from './Svg/Join.svg'
import Send from './Svg/Send.svg'

const Messenger = ({socket} : any) =>
{
    return <>
        <div className={styles.container}>
            <div className={styles.usernameContainer}>
                <div className={styles.title}>Scouting Group</div>
                <input className={styles.input} placeholder="Username"/>
            </div>

            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionTitle}>Welcome to the Streamline scouting chat</div>
                <div className={styles.description}>We can now freely colaborate regarding our current 
                Demand. Any question about the documentation or the project, please feel free to get
                in contact us.
                </div>
            </div>

            <div className={styles.messageDate}>Tuesday, April 7th at 1:21 PM</div>

            <div className={styles.messageFromOtherUser}>
                <div className={styles.messageTitle}>Jess sent a message to the group</div> 
                <div className={styles.conversationContainer}>
                    <img className={styles.profilImage}/>
                    <div>
                        <div className={styles.message}>Awesome!It's going to amazing deal!</div>
                        <div className={styles.message}>I've ran through different docs</div>
                        <div className={styles.message}>Hope for the best</div>
                    </div>
                </div>
            </div>

            <div className={styles.messageFromUser}>
                <div className={styles.messageTitle}>You sent a message to everybody</div> 
                <div className={styles.conversationContainer}>
                    <img className={styles.profilImage}/>
                    <div>
                        <div className={styles.message}>Thanks you for sending the deal, I'll review it
                        and get come back to you shortly</div>
                    </div>
                </div>
            </div>

            <div className={styles.messageFromOtherUser}>
                <div className={styles.messageTitle}>Jess sent a message to the group</div> 
                <div className={styles.conversationContainer}>
                    <img className={styles.profilImage}/>
                    <div>
                        <div className={styles.message}>Awesome!It's going to amazing deal!</div>
                    </div>
                </div>
            </div>

            <div className={styles.messageFromUser}>
                <div className={styles.messageTitle}>You sent a message to everybody</div> 
                <div className={styles.conversationContainer}>
                    <img className={styles.profilImage}/>
                    <div>
                        <div className={styles.message}>Leo, can you provide the lastest doc ?</div>
                    </div>
                </div>
            </div>

            <div className={styles.messageDestinationInputContainer}>
                <input className={styles.input} placeholder="Write a message..."/>
                <img src={Send}/>
            </div>

            <div className={styles.messageDestinationInputContainer}>
                <input className={styles.input} placeholder="Write a message..."/>
                <input className={styles.input} placeholder="Group Name"/>
                <img src={Join}/>
                <img src={Send}/>
            </div>

            <div className={styles.messageDestinationInputContainer}>
                <input className={styles.input} placeholder="Write a message..."/>
                <input className={styles.input} placeholder="Username"/>
                <img src={Send}/>
            </div>
        </div>
    </>

    // const [messages, setMessages] = useState<IMessage[]>([])
    // const [userName, setUserName] = useState('')
    // const [everybodyMessage, setEverybodyMessage] = useState('')
    // const [groupMessage, setGroupMessage] = useState('')
    // const [privateMessage, setPrivateMessage] = useState('')
    // const [groupName, setGroupName] = useState('')
    // const [destinationUserName, setDestinationUserName] = useState('')
    // const [isInAGroup, setIsInAGroup] = useState(false)

    // useEffect(() => socket.on({styles.message}, (message : IMessage) => 
    //     setMessages([...messages, {...message, from : userName === message.userName ? 'USER' : 'OTHER_USER' }])), 
    //     [socket, messages])

    // const sendMessageToEverybody = () => { socket.emit("sendMessageToEverybody", everybodyMessage); setEverybodyMessage('') }
    // const sendGroupMessage = () => { socket.emit("sendRoomMessage", groupMessage); setGroupMessage('') }
    // const sendPrivateMessage = () => { socket.emit("sendPrivateMessage", { content : privateMessage, userName : destinationUserName }); setPrivateMessage('') }

    // const joinGroup = () => { socket.emit("userJoinRoom", { userName : userName, groupName : groupName }); setIsInAGroup(true)}
    // const leaveGroup = () => { socket.emit("userLeaveRoom"); setIsInAGroup(false) }
    // const joinOrLeaveGroup = () => isInAGroup ? leaveGroup() : joinGroup();

    // const onUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
    // const onEverybodyMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setEverybodyMessage(event.target.value)
    // const onGroupMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setGroupMessage(event.target.value)
    // const onPrivateMessageChange = (event : React.ChangeEvent<HTMLInputElement>) => setPrivateMessage(event.target.value)
    // const onGroupNameChange = (event : React.ChangeEvent<HTMLInputElement>) => setGroupName(event.target.value)
    // const onDestinationUserNameChange = (event : React.ChangeEvent<HTMLInputElement>) => setDestinationUserName(event.target.value)

    // return <>
    //    <input placeholder="Username" onChange={onUsernameChange} className={styles.username}/>
    //     <div className={styles.container}>
    //         {messages && messages.map(m => <Message {...m} key={m.id} />)} 
    //     </div>
       
    //     <div className={styles.inputContainer}>
    //         <input value={everybodyMessage} placeholder="Write a message" onChange={onEverybodyMessageChange}/>
    //         <button onClick={sendMessageToEverybody}>Send</button>
    //     </div>

    //     <div className={styles.inputContainer}>
    //         <input value={groupMessage} placeholder="Write a message" onChange={onGroupMessageChange}/>
    //         <input value={groupName} placeholder="Group name" onChange={onGroupNameChange}/>
    //         <button onClick={joinOrLeaveGroup}>{isInAGroup ? 'Leave Group' : 'Join Group'}</button>
    //         <button onClick={sendGroupMessage}>Send</button>
    //     </div>
    
    //     <div className={styles.inputContainer}>
    //         <input value={privateMessage} placeholder="Write a message" onChange={onPrivateMessageChange}/>
    //         <input value={destinationUserName} placeholder="Destination username" onChange={onDestinationUserNameChange}/>
    //         <button onClick={sendPrivateMessage}>Send</button>
    //     </div>
    // </>
}

export default Messenger