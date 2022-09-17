import React, {MutableRefObject, useEffect, useRef} from 'react';
import styles from './TimelineAnimations.module.scss';
import gsap from 'gsap'
import cn from 'classnames'

const TimelineAnimations = () => {
  const timelineRef = useRef() as MutableRefObject<HTMLDivElement>
  const keyframesRef = useRef() as MutableRefObject<HTMLDivElement>
  const timelineWithTimeLine = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const timeline = gsap.timeline()
      .to(timelineRef.current, { x : 400 })
      .to(timelineRef.current, { y : 400 })
      .to(timelineRef.current, { x : 0 })
      .to(timelineRef.current, { y : 0 })
      .repeat(-1)

    const tweenKeyframes = gsap
      .to(keyframesRef.current, {
        keyframes : [{ x : 400 }, { y : 400 }, { x : 0 }, { y : 0 }],
        // on peut aussi utiliser des % et +=, ex : "25%" : { x : 400, onComplete: () => console.log("test") }
        repeat : -1,
        repeatDelay: 0.5,
        yoyo: true
      })

    // Timeline composé d'autres timelines : gsap.timeline().add(timeline).add(tweenKeyframes)

    return () => { tweenKeyframes.kill(); };
  },[])

  return <>
    <div className={styles.gridWith2Elements}>
      <div>
        <h2>Timeline : animations composés de tweens ou d'autres timelines</h2>
        <div className={cn(styles.square, styles.red)} ref={timelineRef}></div>
      </div>

      <div>
        <h2>Il est également possible de simplifier en utilisant des keyframes</h2>
        <div className={cn(styles.square, styles.pink)} ref={keyframesRef}></div>
      </div>
    </div>
  </>;
}

export default TimelineAnimations;
