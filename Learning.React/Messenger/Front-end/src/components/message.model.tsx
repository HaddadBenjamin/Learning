export type MessageDestination = 'EVERYBODY' | 'ROOM' | 'PRIVATE' | 'INFO'
export type MessageFrom = 'USER' | 'OTHER_USER'

export interface IMessage
{
    id : string,
    userName : string
    content : string
    destination : MessageDestination
    from : MessageFrom
    groupName? : string
    destinationUserName? : string
    previousMessageUserName : string
}