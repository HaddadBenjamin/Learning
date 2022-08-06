import React from 'react';
import styles from './AnimationSample.module.scss';
import useScreenSize from '../../shared/hooks/styles/useScreenSize';
import FadeInOnVisibleFirstTime
  from '../../shared/components/animations/FadeInOnFirstTimeVisible/FadeInOnVisibleFirstTime';
import FadeInOnVisible from '../../shared/components/animations/FadeInOnVisible/FadeInOnVisible';

const AnimationSample = () => {
  const { width: screenWidth } = useScreenSize();

  return (
    <>
      <h2>Animation réutilisable avec gsap</h2>
      <div>FadeIn</div>
      <div className={styles.container}>
        <FadeInOnVisibleFirstTime vars={{ x: -screenWidth / 4, duration: 2 }}>
          <div className={styles.onVisibleFirstTime}>
            Animation qui se déclenche la première fois qu&apos;un élément est
            visible
          </div>
        </FadeInOnVisibleFirstTime>

        <FadeInOnVisible fromVars={{ x: screenWidth / 4, duration: 2 }} toVars={{ x: 0, duration: 2 }}>
          <div className={styles.onVisible}>Animation qui se déclenche à chaque fois qu&apos;un élément est visible</div>
        </FadeInOnVisible>
      </div>
    </>
  );
};

export default AnimationSample;
