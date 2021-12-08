import WithUseMemo from "./withUseMemo";
import WithoutUseMemo from "./withoutUseMemo";
import styles from './useMemo.module.css'

const UseMemo = () =>
<div className={styles.container}>
    <WithoutUseMemo />
    <WithUseMemo />
</div>

export default UseMemo
