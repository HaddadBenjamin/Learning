import {useLayoutEffect, useState} from "react";

const WithLayoutEffect = () => {
    const [value, setValue] = useState(0);

    useLayoutEffect(() => {
        if (value === 0) setValue(10 + Math.random() * 200);
    }, [value]);

    return <div>
        <h2>With useLayoutEffect</h2>
        <div>The component is NOT blinking and there are still 2 renders done succesively</div>
        <div>useLayoutEffect runs synchronously after a render but before the screen is updated.</div>
        <button onClick={() => setValue(0)}>click to update the value: {value}</button>
    </div>
}

export default WithLayoutEffect