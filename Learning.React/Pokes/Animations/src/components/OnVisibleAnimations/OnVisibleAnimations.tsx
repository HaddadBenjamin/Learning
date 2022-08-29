import React from 'react';
import styles from './OnVisibleAnimations.module.scss';
import FadeInOnVisible from "../../shared/components/animations/WithGsap/FadeInOnVisible/FadeInOnVisible";
import FadeInOnVisibleWithGsap
  from "../../shared/components/animations/WithGsap/FadeInOnVisibleWithGsap/FadeInOnVisibleWithGsap";
import FadeInOnVisibleOnceWithGsap
  from "../../shared/components/animations/WithGsap/FadeInOnVisibleOnceWithGsap/FadeInOnVisibleOnceWithGsap";
import FadeInOnVisibleOnce from "../../shared/components/animations/WithGsap/FadeInOnVisibleOnce/FadeInOnVisibleOnce";

const OnVisibleAnimations = () => <>
  <h2>Animation qui se déclenche la première fois qu'un élément est visible</h2>
  <div className={styles.gridWith2Elements}>
    <FadeInOnVisibleOnceWithGsap fromVars={{ x: 400 }} toVars={{ x: 0 }}>
      <div className={styles.onVisibleFirstTime}>Avec GSAP</div>
    </FadeInOnVisibleOnceWithGsap>

    <FadeInOnVisibleOnce vars={{ x: -400 }}>
      <div className={styles.onVisibleFirstTime}>Avec GSAP ET mes hooks</div>
    </FadeInOnVisibleOnce>
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
