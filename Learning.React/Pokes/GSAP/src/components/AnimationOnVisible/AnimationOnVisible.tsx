import React, {MutableRefObject, useRef} from 'react';
import styles from './AnimationOnVisible.module.scss';
import useOnVisible from "../../hooks/useOnVisible";
import gsap from 'gsap'

const AnimationOnVisible = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useOnVisible(ref, () => {
    gsap
    .fromTo(ref.current, { opacity : 0 }, { opacity : 1 })
    .duration(2)
  });

  return <div className={styles.container} ref={ref}>
    Animation relancer à chaque fois que l'élément est visible
  </div>
}

export default AnimationOnVisible;