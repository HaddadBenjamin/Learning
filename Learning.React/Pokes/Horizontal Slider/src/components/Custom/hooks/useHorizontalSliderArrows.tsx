import React, {ReactNode, RefObject, useEffect} from "react";
// @ts-ignore
import styles from './SliderArrow.module.scss'

interface IUseHorizontalSliderArrowsParameters
{
  sliderIndex : number,
  setSliderIndex : (sliderIndex : number) => void
  sliderReference : RefObject<HTMLDivElement>
  sliderItemsCount : number,
  sliderContainerLeftPadding : number,
  slideWidth : number,
  sliderElementsCountDisplayed : number,
}

interface IUseHorizontalSliderArrowsResponse
{
  leftArrow : ReactNode,
  rightArrow : ReactNode
}

const useHorizontalSliderArrows = ({
  sliderIndex,
  setSliderIndex,
  sliderReference,
  sliderItemsCount,
  sliderContainerLeftPadding,
  slideWidth,
  sliderElementsCountDisplayed
} : IUseHorizontalSliderArrowsParameters) : IUseHorizontalSliderArrowsResponse => {
  useEffect(() => {
    if (sliderReference?.current) sliderReference.current.style.left = `-${(sliderIndex * slideWidth) - sliderContainerLeftPadding}px`
  }, [sliderReference, sliderIndex, slideWidth, sliderElementsCountDisplayed])

  const canScrollLeft = sliderIndex > 0
  const canScrollRight = (sliderIndex + sliderElementsCountDisplayed) < sliderItemsCount

  const onLeftArrowClick = () => { if (canScrollLeft) setSliderIndex(sliderIndex - 1); }
  const onRightArrowClick = () => { if (canScrollRight) setSliderIndex(sliderIndex + 1); }

  return {
    leftArrow : !canScrollLeft ? <div/> : <div className={styles.leftArrow} onClick={onLeftArrowClick}>{'<'}</div>,
    rightArrow : !canScrollRight ? <div/> : <div className={styles.rightArrow} onClick={onRightArrowClick}>{'>'}</div>,
  }
}

export default useHorizontalSliderArrows