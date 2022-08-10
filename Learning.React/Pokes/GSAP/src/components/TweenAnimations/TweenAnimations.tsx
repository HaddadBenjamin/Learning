import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import styles from './TweenAnimations.module.scss';
import gsap from 'gsap'
import cn from "classnames";

const TweenAnimations = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const [tween, setTween] = useState<gsap.core.Tween>()

  useEffect(() => {
    const tween = gsap.to(ref.current, { x : 500, duration : 3 })

    setTween(tween);

    return () => { tween.kill(); };
  }, [])

  const onEnter = () => gsap.to(ref.current, { backgroundColor: "#e77614" });
  const onLeave = () => gsap.to(ref.current, { backgroundColor: "#28a92b" });

  return <>
    <h2>Tweens</h2>
    <p>- Les callbacks du cycle de vie de l'animation : on[Start|Update|Complete|Reverse][Params]</p>
    <p>- Une animation peut se mettre en pause, se relancer, s'inverser, on peut modifier la timeline et la vitesse d'animation.</p>

    <div className={styles.buttonContainer}>
      <button onClick={() => tween?.pause()}>Pause</button>
      <button onClick={() => tween?.resume()}>Resume</button>
      <button onClick={() => tween?.restart()}>Restart</button>
      <button onClick={() => tween?.reverse()}>Reverse</button>
      <button onClick={() => tween?.progress(0.25)}>Progress(0.25)</button>
      <button onClick={() => tween?.progress(0.5)}>Progress(0.5)</button>
      <button onClick={() => tween?.timeScale(1)}>TimeScale(1)</button>
      <button onClick={() => tween?.timeScale(2)}>TimeScale(2)</button>
    </div>

    <div ref={ref} className={cn(styles.square, styles.red)} onMouseEnter={onEnter} onMouseLeave={onLeave}/>
  </>
}

export default TweenAnimations;
