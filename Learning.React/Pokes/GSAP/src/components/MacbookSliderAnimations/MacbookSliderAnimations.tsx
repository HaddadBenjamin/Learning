import React, {MutableRefObject, useEffect, useRef} from 'react';
import styles from './MacbookSliderAnimations.module.scss';
import MacbookLeftImage from '../../images/macbook-gauche.jpg'
import MacbookRightImage from '../../images/macbook-gauche.jpg'
import useScreenSize from "../../shared/otherThanAnimation/hooks/useScreenSize";
import gsap from 'gsap'
import cn from "classnames";

const MacbookSliderAnimations = () =>
{
  const containerRef = useRef() as MutableRefObject<HTMLImageElement>
  const imageLeftRef = useRef() as MutableRefObject<HTMLImageElement>
  const imageRightRef = useRef() as MutableRefObject<HTMLImageElement>
  const { width : screenWidth } = useScreenSize()

  useEffect(() => {
    gsap.set(imageLeftRef.current, {x: -screenWidth * .2})
    gsap.set(imageRightRef.current, {x: screenWidth * .2})

    gsap.to(imageLeftRef.current, {
      duration: 1,
      x: -screenWidth * .025,
      scrollTrigger:
        {
          scrub:true,
          markers: true,
          start: "top center",
          trigger: containerRef.current,
        },
    })

    gsap.to(imageRightRef.current, {
      duration: 1,
      x: screenWidth * 0.025,
      scrollTrigger:
        {
          scrub:true,
          markers: true,
          start: "top center",
          trigger: containerRef.current,
        },
    })
  }, [])

  return <>
    <div className={styles.otherContainer}/>

    <div className={styles.container} ref={containerRef}>
      <img src={MacbookLeftImage} className={styles.image} ref={imageLeftRef}/>
      <img src={MacbookRightImage} className={cn(styles.image, styles.rightImage)} ref={imageRightRef}/>
    </div>

    <div className={styles.otherContainer}/>
  </>
}
export default MacbookSliderAnimations;
