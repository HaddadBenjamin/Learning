import WithoutUseRef from "./withoutUseRef";
import WithUseRef from "./withUseRef";
import styles from './useRef.module.css'

const UseRef = () =>
    <div className={styles.container}>
        <WithoutUseRef/>
        <WithUseRef/>
    </div>

export default UseRef