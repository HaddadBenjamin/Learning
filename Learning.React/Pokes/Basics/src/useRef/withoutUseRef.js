import {useState} from "react";

const WithoutUseRef = () =>
{
    const [value, setValue] = useState('')

    const onValueChange = event => setValue(event.target.value)

    return <div>
        <h2>Without use ref : controlled form</h2>
        <p>Using a state and those inputs properties : onChange, value</p>
        <p>A new render is done when the value change</p>
        <input value={value} placeholder="Change the value" onChange={onValueChange}/>
    </div>
}

export default WithoutUseRef