import styles from './Message.module.css'
import cn from 'classnames'
import { IMessage } from '../message.model'

const Message = ({userName, content, destination, from, groupName, destinationUserName, previousMessageUserName, previousMessageDestination} : IMessage) =>
{
    const previousMessageUserNameAndDestinationAreTheSame = 
    previousMessageUserName === userName && 
    previousMessageDestination === destination
    const messageTitleFirstPart =  `${from === 'USER' ? 'You' : userName} sent a message to `
    const messageTitleSecondPart = 
        destination === 'EVERYBODY' ? 'everybody' : 
        destination === 'ROOM' ? `the group "${groupName}"` :
        destination === 'PRIVATE' ? `"${destinationUserName}"` : ''
    const messageTitle = `${messageTitleFirstPart}${messageTitleSecondPart}`
    const messageFrom = cn(
        from === 'USER' && styles.messageFromUser,
        from === 'OTHER_USER' && styles.messageFromOtherUser,
        previousMessageUserNameAndDestinationAreTheSame && styles.messageFromSameUser)
    const messageTitleClasses = cn(
        styles.messageTitle,
        destination === 'EVERYBODY' && styles.messageTitleToEverybody,
        destination === 'ROOM' && styles.groupMessageTitle,
        destination === 'PRIVATE' && styles.privateMessageTitle)

    // Problème ici, on devrai utiliser messagesClasses plutôt ici j'ai l'impression
    return <div className={messageFrom} >
        { !previousMessageUserNameAndDestinationAreTheSame && <div className={messageTitleClasses}>{destination === 'INFO' ? '' : messageTitle}</div> }
        <div className={styles.conversationContainer}>
            {!previousMessageUserNameAndDestinationAreTheSame && <img className={styles.profilImage} alt="" style={{backgroundImage: `url(${userName}.jpg)`}}/>}
            <div>
                <div className={styles.message}>{content}</div>
            </div>
        </div>
    </div>
}

export default Message