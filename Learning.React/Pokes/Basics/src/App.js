import UseCallbackAndReactMemo from "./useCallbackAndReactMemo/useCallbackAndReactMemo";
import UseMemo from "./useMemo/useMemo";
import UseEffect from "./useEffect/useEffect";
import {useState} from "react";

const App = () =>
{
    const [useEffectIsVisible, setUseEffectIsVisible] = useState(true)
    const hideUseEffect = () => setUseEffectIsVisible(false)

    return <>
        <UseCallbackAndReactMemo/>
        <UseMemo/>
        { useEffectIsVisible &&
        <>
            <UseEffect/>
            <button onClick={() => hideUseEffect()}>Hide use effect</button>
        </>}
    </>
}

export default App