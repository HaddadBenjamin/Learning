import {useState} from "react";
import UseEffectDemo from "./useEffectDemo";

const UseEffect = () =>
{
    const [useEffectIsVisible, setUseEffectIsVisible] = useState(true)
    const hideUseEffect = () => setUseEffectIsVisible(false)

    return <>
        { useEffectIsVisible &&
        <>
            <UseEffectDemo/>
            <button onClick={() => hideUseEffect()}>Hide use effect</button>
        </>}
    </>
}

export default UseEffect