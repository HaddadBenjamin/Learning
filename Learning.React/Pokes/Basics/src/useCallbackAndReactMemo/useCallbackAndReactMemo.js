import WithoutUseCallbackAndReactMemo from "./withoutUseCallbackAndReactMemo";
import WithUseCallbackAndReactMemo from "./withUseCallbackAndReactMemo";
import styles from './useCallbackAndReactMemo.module.css'

const UseCallbackAndReactMemo = () =>
<div className={styles.container}>
    <WithoutUseCallbackAndReactMemo />
    <WithUseCallbackAndReactMemo />
</div>

export default UseCallbackAndReactMemo
