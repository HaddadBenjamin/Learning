import React, {FC} from 'react';
import styles from './RevealContent.module.scss'
import cn from "classnames";

const RevealContent : FC = (props) =>
  <div>
    <h3>Contenus animés</h3>
    <h5>Reveal animations</h5>

    <div className={cn(styles.revealDown)}>
      <h4 className={styles.text}>Reveal down with content</h4>
      <img src="https://picsum.photos/50?random=1" className={styles.image}/>
    </div>

    <div className={cn(styles.revealRight)}>
      <h4 className={styles.text}>Reveal right with content</h4>
      <img src="https://picsum.photos/50?random=2" className={styles.image}/>
    </div>

    <div className={cn(styles.revealUp)}>
      <h4 className={styles.text}>Reveal up with content</h4>
      <img src="https://picsum.photos/50?random=3" className={styles.image}/>
    </div>

    <div className={cn(styles.revealLeft)}>
      <h4 className={styles.text}>Reveal left with content</h4>
      <img src="https://picsum.photos/50?random=4" className={styles.image}/>
    </div>
  </div>

export default RevealContent;
