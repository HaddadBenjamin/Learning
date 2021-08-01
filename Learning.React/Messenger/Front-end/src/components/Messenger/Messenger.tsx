import styles from './Messenger.module.css'
import cn from 'classnames'

const Messenger = () =>
{
    const messages = [
        { userName : 'Ben', content : 'lorem', destination : 'EVERYBODY', from : 'USER' },
        { userName : 'Jess', content : 'blabla', destination : 'GROUP', from : 'OTHER_USER', groupName : 'My great company' },
        { userName : 'David', content : 'lipsum', destination : 'PRIVATE', from : 'OTHER_USER', destinationUserName : 'Jess' }]

    return <div className={styles.container}>
        {messages.map(m => 
        <div className={styles.messageTitle}>{m.from === 'USER' ? 'You' : m.userName} sent a message to {
                m.destination === 'EVERYBODY' ? 'everybody' : 
                m.destination === 'GROUP' ? `the group ${m.groupName}` :
                `the user ${m.destinationUserName}`
                }
            <div className={cn(
                styles.message,
                m.destination === 'EVERYBODY' && styles.messageToEverybody,
                m.destination === 'GROUP' && styles.groupMessage,
                m.destination === 'PRIVATE' && styles.privateMessage,
                m.from === 'USER' && styles.messageFromUser,
                m.from === 'OTHER_USER' && styles.messageFromOtherUSer
            )}>
                {m.content}
            </div>
        </div>)}
    </div>
}

export default Messenger