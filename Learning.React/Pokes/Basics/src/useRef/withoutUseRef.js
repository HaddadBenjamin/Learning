import {useState} from "react";

const WithoutUseRef = () =>
{
    const [value, setValue] = useState('')

    const onValueChange = event => setValue(event.target.value)

    return <div>
        <h2>Without use ref</h2>
        <p>Controlled form : useState, value, onChange</p>
        <p>A new render is done when the value change</p>
        <input value={value} placeholder="Change the value" onChange={onValueChange}/>
    </div>
}

export default WithoutUseRef