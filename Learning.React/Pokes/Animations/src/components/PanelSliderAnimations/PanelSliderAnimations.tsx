import React, {MutableRefObject, useEffect, useRef} from 'react';
import styles from './PanelSliderAnimations.module.scss';
import cn from "classnames";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger);

const PanelSliderAnimations = () =>
{
  const panelContainerRef = useRef() as MutableRefObject<HTMLImageElement>
  const purpleRef = useRef() as MutableRefObject<HTMLImageElement>
  const orangeRef = useRef() as MutableRefObject<HTMLImageElement>
  const yellowRef = useRef() as MutableRefObject<HTMLImageElement>
  const greyRef = useRef() as MutableRefObject<HTMLImageElement>

  useEffect(() => {
    const timeline = gsap
      .timeline()
      .to(purpleRef.current, { xPercent: -100 })
      .to(greyRef.current, { yPercent: -100 })
      .to(yellowRef.current, { xPercent: 100 })
      .to(orangeRef.current, { xPercent: -100 })

    ScrollTrigger.create({
      animation: timeline,
      trigger: panelContainerRef.current,
      markers: true,
      id: "panel-container",
      scrub: 3, // lorsque l'on scroll vers le haut ça inverse l'animation.
      pin: true, // l'animation suit l'écran
    })
  }, [])

  return <>
    <h2>Affichage de plusieurs composants différent au scroll.</h2>

    <div className={styles.container} ref={panelContainerRef}>
      <div className={cn(styles.panel, styles.orange)} ref={orangeRef}/>
      <div className={cn(styles.panel, styles.yellow)} ref={yellowRef}/>
      <div className={cn(styles.panel, styles.grey)} ref={greyRef}/>
      <div className={cn(styles.panel, styles.purple)} ref={purpleRef}/>
    </div>

    <div className={styles.otherContainer}/>
  </>
}
export default PanelSliderAnimations;
