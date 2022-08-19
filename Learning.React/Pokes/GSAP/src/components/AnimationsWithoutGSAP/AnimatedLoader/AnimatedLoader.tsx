import React, {FC} from "react";
import cn from 'classnames'
import styles from './AnimatedLoader.module.scss'

const AnimatedLoader : FC = () =>
<div>
  <h3>Loader animé avec texte animé</h3>

  <div className={styles.spinnerContainer}>
    <div>Loading...</div>
    <div className={cn(styles.spinner, styles.redSpinner)}/>
    <div className={cn(styles.spinner, styles.blueSpinner)}/>
    <div className={cn(styles.spinner, styles.orangeSpinner)}/>
    <div className={cn(styles.spinner, styles.purpleSpinner)}/>
  </div>
</div>

export default AnimatedLoader;