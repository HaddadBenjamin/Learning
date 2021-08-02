import styles from './Message.module.css'
import cn from 'classnames'
import { IMessage } from '../message.model'

const Message = ({userName, content, destination, from, groupName, destinationUserName} : IMessage) =>
{
    const messageTitleFirstPart =  `${from === 'USER' ? 'You' : userName} sent a message to `
    let messageTitleSecondPart = 
        destination === 'EVERYBODY' ? 'everybody' : 
        destination === 'ROOM' ? `the group "${groupName}"` :
        destination === 'PRIVATE' ? `the user ${destinationUserName}` : ''
    const messageTitle = `${messageTitleFirstPart}${messageTitleSecondPart}`
    const messageClasses = cn(
        styles.message,
        from === 'USER' && styles.messageFromUser,
        from === 'OTHER_USER' && styles.messageFromOtherUser)
    const messageTitleClasses = cn(
        styles.messageTitle,
        destination === 'EVERYBODY' && styles.messageTitleToEverybody,
        destination === 'ROOM' && styles.groupMessageTitle,
        destination === 'PRIVATE' && styles.privateMessageTitle)

    return <div className={styles.messageFromOtherUser}>
        <div className={messageTitleClasses}>{destination === 'INFO' ? '' : messageTitle}</div> 
        <div className={styles.conversationContainer}>
            <img className={styles.profilImage} alt=""/>
            <div>
                <div className={messageClasses}>{content}</div>
            </div>
        </div>
    </div>
}

export default Message