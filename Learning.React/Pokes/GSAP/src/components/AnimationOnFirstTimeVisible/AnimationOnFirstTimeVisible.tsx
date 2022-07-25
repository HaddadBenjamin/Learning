import React, {MutableRefObject, useRef} from 'react';
import styles from './AnimationOnFirstTimeVisible.module.scss';
import useOnVisibleFirstTime from "../../hooks/useOnVisibleFirstTime";
import gsap from "gsap";

const AnimationOnFirstTimeVisible = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useOnVisibleFirstTime(ref, () => {
    gsap
      .fromTo(ref.current, { opacity : 0 }, { opacity : 1 })
      .duration(2)
  });

  return <div className={styles.container} ref={ref}>
    Animation lancer qu'une fois et quand l'élément est visible
  </div>;
}

export default AnimationOnFirstTimeVisible;