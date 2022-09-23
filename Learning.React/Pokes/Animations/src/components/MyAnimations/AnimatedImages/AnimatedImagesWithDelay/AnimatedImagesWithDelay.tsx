import React, {FC} from "react";
import styles from './AnimatedImagesWithDelay.module.scss'

const AnimatedImagesWithDelay : FC = () =>
<div>
  <h3>Images animées les unes à la suite des autres</h3>
  <p>Chaque animation est cumulable avec les autres</p>

  <div className={styles.container}>
    <img className={styles.image} src="https://picsum.photos/100?random=1"/>
    <img className={styles.image} src="https://picsum.photos/100?random=2"/>
    <img className={styles.image} src="https://picsum.photos/100?random=3"/>
    <img className={styles.image} src="https://picsum.photos/100?random=4"/>
    <img className={styles.image} src="https://picsum.photos/100?random=5"/>
    <img className={styles.image} src="https://picsum.photos/100?random=6"/>
  </div>
</div>

export default AnimatedImagesWithDelay;