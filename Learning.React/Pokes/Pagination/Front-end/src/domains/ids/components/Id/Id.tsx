import {FC} from "react";
import styles from './Id.module.scss';

export const Id : FC<{ id : number }> = ({ id}) =>
	<div className={styles.container}>
	<div>{id}</div>
</div>