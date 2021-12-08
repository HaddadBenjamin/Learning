import { useEffect, useState} from "react";
import styles from './useEffect.module.css'

const UseEffect = () =>
{
    const [dependency, setDependency] = useState('')
    const [otherDependency, setOtherDependency] = useState('')

    useEffect(() =>
    {
        console.log("useEffect : [] as dependency is called when the component is mounted")
        return () => console.log("useEffect : returned function is called when the component is unmounted");
    }, [])
    useEffect(() => console.log("useEffect : [dependency] as dependency is called when " +
        "the component is mounted and when the dependency are updated"), [dependency])
    useEffect(() => console.log("useEffect : none dependency is called when the component is mounted and at each rerender"))

    const onDependencyChange = event => setDependency(event.target.value)
    const onOtherDependencyChange = event => setOtherDependency(event.target.value)

    return <>
        <h2>Use effect</h2>

        <div>Use effect with an empty array dependencies is called when component is mounted</div>
        <div>Use effect with an element in the array dependency is called when component is mounted and when is updated</div>
        <div>Use effect with none dependencies is called on each render (mounted & updated)</div>
        <div>When use effect return a function, that's mean it will be called when the component is unmounted</div>

        <div className={styles.inputs}>
            <input
                className={styles.input}
                value={dependency}
                onChange={onDependencyChange}
                placeholder="A dependency, should call [dependency]"/>
            <input
                className={styles.input}
                value={otherDependency}
                onChange={onOtherDependencyChange}
                placeholder="Other dependency, should not call [dependency]"/>
        </div>
    </>
}

export default UseEffect