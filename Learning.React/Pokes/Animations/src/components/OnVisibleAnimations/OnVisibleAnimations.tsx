import React from 'react';
import styles from './OnVisibleAnimations.module.scss';
import FadeInOnVisible from "../../shared/components/animations/FadeInOnVisible/FadeInOnVisible";
import FadeInOnVisibleFirstTime from "../../shared/components/animations/FadeInOnFirstTimeVisible/FadeInOnVisibleFirstTime";
import FadeInOnVisibleFirstTimeWithGsap
  from "../../shared/components/animations/FadeInOnFirstTimeVisibleWithGsap/FadeInOnVisibleFirstTimeWithGsap";
import FadeInOnVisibleWithGsap
  from "../../shared/components/animations/FadeInOnVisibleWithGsap/FadeInOnVisibleWithGsap";

const OnVisibleAnimations = () => <>
  <h2>Animation qui se déclenche la première fois qu'un élément est visible</h2>
  <div className={styles.gridWith2Elements}>
    <FadeInOnVisibleFirstTimeWithGsap fromVars={{ x: 400 }} toVars={{ x: 0 }}>
      <div className={styles.onVisibleFirstTime}>Avec GSAP</div>
    </FadeInOnVisibleFirstTimeWithGsap>

    <FadeInOnVisibleFirstTime vars={{ x: -400 }}>
      <div className={styles.onVisibleFirstTime}>Avec GSAP ET mes hooks</div>
    </FadeInOnVisibleFirstTime>
  </div>

  <h2>Animation qui se déclenche à chaque fois qu'un élément est visible</h2>
  <div className={styles.gridWith2Elements}>
    <FadeInOnVisibleWithGsap fromVars={{ x: 400 }} toVars={{ x: 0 }}>
      <div className={styles.onVisible}>Avec GSAP</div>
    </FadeInOnVisibleWithGsap>

    <FadeInOnVisible fromVars={{ x: -400 }} toVars={{ x: 0 }}>
      <div className={styles.onVisible}>Avec GSAP ET mes hooks</div>
    </FadeInOnVisible>
  </div>
</>

export default OnVisibleAnimations;
