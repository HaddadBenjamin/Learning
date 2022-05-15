import React, {FC, MutableRefObject, ReactNode, useRef, useState} from "react";
// @ts-ignore
import styles from './HorizontalSlider.module.scss';
import Card from "../Card/Card";
import useElementSize from "../../../../shared/hooks/useElementSize";
import useHorizontalSliderArrows from "../../hooks/useHorizontalSliderArrows";

const SLIDER_ITEMS_COUNT = 15;
const CARD_GAP = 14
const CARD_SIZE = 295
const SLIDER_CONTAINER_LEFT_PADDING = 12
const CONTAINER_PADDING_FOR_COMPUTATION = 18
const HorizontalSlider : FC = () => {
  const { elementReference , elementSize : { width : containerWidth }} = useElementSize<HTMLDivElement>()
  const sliderElementsCountDisplayed = Math.floor((containerWidth - CONTAINER_PADDING_FOR_COMPUTATION) / (CARD_SIZE + CARD_GAP))
  const sliderElementWidth = ((containerWidth - CONTAINER_PADDING_FOR_COMPUTATION) / sliderElementsCountDisplayed) - CARD_GAP

  const sliderReference = useRef() as MutableRefObject<HTMLDivElement>
  const [sliderIndex, setSliderIndex] = useState(0)
  const { leftArrow, rightArrow } = useHorizontalSliderArrows({
    sliderReference,
    sliderIndex,
    setSliderIndex,
    sliderItemsCount : SLIDER_ITEMS_COUNT,
    sliderContainerLeftPadding : SLIDER_CONTAINER_LEFT_PADDING,
    slideWidth : (containerWidth - SLIDER_CONTAINER_LEFT_PADDING / 2) / sliderElementsCountDisplayed,
    sliderElementsCountDisplayed
  })

  return <div ref={elementReference}>
    <h2>Custom</h2>
    <div className={styles.container}>
      <div className={styles.sliderContainer} ref={sliderReference}>
        {new Array(SLIDER_ITEMS_COUNT).fill(0).map((e, i) => <Card key={i} width={sliderElementWidth}/>)}
      </div>
      {leftArrow}
      {rightArrow}
    </div>
  </div>
}

export default HorizontalSlider;