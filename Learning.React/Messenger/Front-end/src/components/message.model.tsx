export type MessageDestination = 'EVERYBODY' | 'ROOM' | 'PRIVATE' | 'INFO'
export type MessageFrom = 'USER' | 'OTHER_USER'

export interface IMessage
{
    userName : string
    content : string
    destination : MessageDestination
    from : MessageFrom
    groupName? : string
    destinationUserName? : string
}