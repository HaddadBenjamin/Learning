import {User} from "./users.model";

export interface UserState
{
    users : User[]
}

export const initialUserState : UserState = {
    users : [
        { id : '1', username : 'firefouks', mail : 'firefouks@gmail.com' },
        { id : '2', username : 'bloody', mail : 'bloody@gmail.com' },
    ]
}