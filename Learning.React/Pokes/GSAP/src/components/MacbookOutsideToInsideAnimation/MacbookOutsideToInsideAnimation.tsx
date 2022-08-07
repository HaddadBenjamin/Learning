import React, {MutableRefObject, useEffect, useRef} from 'react';
import styles from './MacbookOutsideToInsideAnimation.module.scss';
import MacbookLeftImage from '../../images/macbook-gauche.jpg'
import MacbookRightImage from '../../images/macbook-gauche.jpg'
import useScreenSize from "../../shared/otherThanAnimation/hooks/useScreenSize";
import useVisibleHeightAndPercentage from "../../shared/otherThanAnimation/hooks/useVisibleHeightAndPercentage";

const MacbookOutsideToInsideAnimation = () =>
{
  const imageLeftRef = useRef() as MutableRefObject<HTMLImageElement>
  const imageRightRef = useRef() as MutableRefObject<HTMLImageElement>
  const { width : screenWidth } = useScreenSize()
  const {visiblePercentNormalized, elementReference } = useVisibleHeightAndPercentage<HTMLDivElement>()

  useEffect(() => {
    imageLeftRef.current.style.left = -screenWidth * .2 + 'px';
    imageRightRef.current.style.right = -screenWidth * .2 + 'px';

    imageLeftRef.current.style.transition = 'left 1s'
    imageRightRef.current.style.transition = 'right 1s'
  }, [])

  useEffect(() => {
    let offset = screenWidth * (.8 - visiblePercentNormalized)
    if (offset < screenWidth * .525) offset = screenWidth * .525
    if (offset > screenWidth * .8) offset = screenWidth * .8

    imageLeftRef.current.style.left = -offset + 'px';
    imageRightRef.current.style.right = -offset + 'px';
  }, [visiblePercentNormalized])

  return <div className={styles.container} ref={elementReference}>
    <img src={MacbookLeftImage} className={styles.image} ref={imageLeftRef}/>
    <img src={MacbookRightImage} className={styles.image} ref={imageRightRef}/>
  </div>
}
export default MacbookOutsideToInsideAnimation;
