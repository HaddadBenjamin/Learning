import {useContext, useState} from "react";
import {UserContext} from "./context";
import {addUserAction, deleteUserAction} from "./action";
import styles from './useContextAndReducer.module.css'

const UseContextAndReducer = () =>
{
	const { users, dispatch } = useContext(UserContext)

    const addUser = name => dispatch(addUserAction(name))
    const deleteUser = id => dispatch(deleteUserAction(id))

    return <div>
        <h2>UseContext, useReducer </h2>
        <AddUser addUser={addUser}/>
        {users.map(u => <User {...u} deleteUser={deleteUser} key={u.id}/>)}
    </div>
}

const AddUser = ({addUser}) =>
{
    const [name, setName] = useState('')
    const onNameChange = event => setName(event.target.value)

    return <>
        <input value={name} onChange={onNameChange} placeholder="User name"/>
        <button onClick={() => addUser(name)}>Add User</button>
    </>
}

const User = ({ id, name, deleteUser }) =>
<div div className={styles.container}>
    <div>{name}</div>
    <button onClick={() => deleteUser(id)}>Remove user</button>
</div>


export default UseContextAndReducer