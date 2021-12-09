import {useEffect, useState} from "react";

const WithoutLayoutEffect = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (value === 0) setValue(10 + Math.random() * 200);
    }, [value]);

    return <div>
        <h2>Without useLayoutEffect</h2>
        <div>The component is blinking because 2 renders are done succesively</div>
        <div>useEffect runs asynchronously and after a render is painted to the screen.</div>

        <button onClick={() => setValue(0)}>click to update the value: {value}</button>
    </div>
}

export default WithoutLayoutEffect