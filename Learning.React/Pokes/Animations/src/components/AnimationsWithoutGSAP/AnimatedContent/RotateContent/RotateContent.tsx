import React, {FC} from 'react';
import styles from './RotateContent.module.scss'
import cn from "classnames";

const RotateContent : FC = (props) =>
  <div>
    <h3>Contenus animés</h3>
    <h5>Rotate animations</h5>
    <div className={cn(styles.rotateContainer)}>
      <h4 className={cn(styles.text, styles.rotateUp)}>Rotate Up</h4>
    </div>
    <div className={cn(styles.rotateContainer)}>
      <h4 className={cn(styles.text, styles.rotateRight)}>Rotate right</h4>
    </div>
    <div className={cn(styles.rotateContainer)}>
      <h4 className={cn(styles.text, styles.rotateDown)}>Rotate down</h4>
    </div>
    <div className={cn(styles.rotateContainer)}>
      <h4 className={cn(styles.text, styles.rotateLeft)}>Rotate left</h4>
    </div>

  </div>

export default RotateContent;
