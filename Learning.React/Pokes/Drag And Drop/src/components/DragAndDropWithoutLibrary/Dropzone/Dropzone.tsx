import styles from "./Dropzone.module.css";
import {FC} from "react";

const Dropzone : FC = ({children}) =>
  <div className={styles.dropzone}>{children}</div>

export default Dropzone
