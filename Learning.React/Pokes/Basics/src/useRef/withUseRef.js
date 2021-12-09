import {useRef, useState} from "react";

const WithUseRef = () =>
{
    const inputRef = useRef()
    const [value, setValue] = useState('')

    const onSubmit = event =>
    {
        event.preventDefault()

        setValue(inputRef.current.value)
    }

    return <div>
        <h2>With useRef</h2>

        <div>Uncontrolled form : useRef, ref, defaultValue, onSubmit</div>
        <div>Get input value : inputRef.current.value</div>
        <div>Component is NOT rerender on each change, we can get the value during the onSubmit event</div>

        <form onSubmit={onSubmit}>
            <input ref={inputRef} placeholder="any value"/>
            <button>Send the form</button>
            Current value is : {value}
        </form>
    </div>
}

export default WithUseRef