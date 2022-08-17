import React, {FC} from "react";
import cn from 'classnames'
import styles from './AnimationsWithoutGSAP.module.scss'

const AnimationsWithoutGSAP : FC = () =>
  <div className={styles.spinnerContainer}>
    <div>Loading...</div>
    <div className={cn(styles.spinner, styles.redSpinner)}/>
    <div className={cn(styles.spinner, styles.blueSpinner)}/>
    <div className={cn(styles.spinner, styles.orangeSpinner)}/>
    <div className={cn(styles.spinner, styles.purpleSpinner)}/>
  </div>

export default AnimationsWithoutGSAP;