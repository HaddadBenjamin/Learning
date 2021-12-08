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
        <h2>With useRef : uncontrolled form</h2>

        <div>Component is NOT rerender on each change, we can get the value during the onSubmit event</div>
        <div>Using of useRef and the following input properties : ref, defaultValue</div>
        <div>To get the value of our input at any time : inputRef.current.value</div>

        <form onSubmit={onSubmit}>
            <input ref={inputRef} placeholder="any value"/>
            <button>Send the form</button>
            Current value is : {value}
        </form>
    </div>
}

export default WithUseRef