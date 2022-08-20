import React, { MutableRefObject, useRef } from 'react';
import gsap from 'gsap';
import styles from './AnimationSample.module.scss';
import useScreenSize from '../../shared/hooks/styles/useScreenSize';
import FadeInOnVisibleFirstTime
  from '../../shared/components/animations/FadeInOnFirstTimeVisible/FadeInOnVisibleFirstTime';
import FadeInOnVisible from '../../shared/components/animations/FadeInOnVisible/FadeInOnVisible';
import useOnVisibleFirstTime from '../../shared/hooks/styles/useOnVisibleFirstTime';

const AnimationSample = () => {
  const { screenWidth: screenWidth } = useScreenSize();

  const severalAnimationsRef = useRef() as MutableRefObject<HTMLDivElement>;
  useOnVisibleFirstTime(severalAnimationsRef, () => {
    gsap.timeline()
      .to(severalAnimationsRef.current, { x: 100, duration: 2 })
      .to(severalAnimationsRef.current, { rotate: '+=360', duration: 1 })
      .to(severalAnimationsRef.current, { background: 'red', duration: 0.5 })
      .to(severalAnimationsRef.current, { background: 'blue', duration: 1 })
      .to(severalAnimationsRef.current, { background: 'yellow', duration: 0.5 })
      .to(severalAnimationsRef.current, { x: 0, duration: 2 });
  });

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
      <div>Several animations</div>
      <div ref={severalAnimationsRef}>Several animation ref</div>
    </>
  );
};

export default AnimationSample;