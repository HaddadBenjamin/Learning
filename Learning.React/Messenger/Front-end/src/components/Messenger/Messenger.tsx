import styles from './Messenger.module.css'
import cn from 'classnames'


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
    const messages : MessageProps[] = [
        { userName : 'Ben', content : 'lorem', destination : 'EVERYBODY', from : 'USER' },
        { userName : 'Jess', content : 'blabla', destination : 'GROUP', from : 'OTHER_USER', groupName : 'My great company' },
        { userName : 'David', content : 'lipsum', destination : 'PRIVATE', from : 'OTHER_USER', destinationUserName : 'Jess' }]

    return <div className={styles.container}>
        {messages.map((m, i) => <Message {...m} key={i} />)}
    </div>
}

export default Messenger