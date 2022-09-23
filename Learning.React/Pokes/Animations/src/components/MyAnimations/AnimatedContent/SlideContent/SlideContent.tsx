import React, {FC} from 'react';
import styles from './SlideContent.module.scss'
import cn from "classnames";

const SlideContent : FC = (props) =>
  <div>
    <h3>Contenus animés</h3>
    <h5>Slide animations</h5>
    <div className={styles.slideContainer}>
      <div className={styles.slideUp}>
        <h4 className={styles.text}>Slide up with content</h4>
        <img src="https://picsum.photos/50?random=5" className={styles.image}/>
      </div>
    </div>
    <div className={styles.slideContainer}>
      <div className={styles.slideRight}>
        <h4 className={styles.text}>Slide right with content</h4>
        <img src="https://picsum.photos/50?random=6" className={styles.image}/>
      </div>
    </div>

    <div className={styles.slideContainer}>
      <div className={styles.slideDown}>
        <h4 className={styles.text}>Slide down with content</h4>
        <img src="https://picsum.photos/50?random=7" className={styles.image}/>
      </div>
    </div>

    <div className={styles.slideContainer}>
      <div className={styles.slideLeft}>
        <h4 className={styles.text}>Slide left with content</h4>
         <img src="https://picsum.photos/50?random=8" className={styles.image}/>
      </div>
    </div>
  </div>

export default SlideContent;
