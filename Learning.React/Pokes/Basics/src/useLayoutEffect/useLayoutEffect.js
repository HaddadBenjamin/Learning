import WithoutLayoutEffect from "./withoutLayoutEffect";
import WithLayoutEffect from "./withLayoutEffect";
import styles from './useLayoutEffect.module.css'

const UseLayoutEffect = () =>
    <div className={styles.container}>
        <WithoutLayoutEffect/>
        <WithLayoutEffect/>
    </div>

export default UseLayoutEffect