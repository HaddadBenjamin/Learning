import {useState} from "react";
import {store} from "../../domains/root/root.store";

interface Props
{
    key : string
    condition : boolean
    reducer : (state : any, action : any) => any
}

// Don't work yet
export const useLazyReducer = (
    key : string,
    reducer : (state : any, action : any) => any,
    condition : boolean = true) =>
{
    const [isInjected, setIsInjected] = useState(false)

    if (condition && !isInjected)
    {
        // @ts-ignore
        store.injectReducer(key, reducer)
        setIsInjected(true)
    }

    return isInjected
}