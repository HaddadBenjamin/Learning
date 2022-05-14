import React, {FC} from "react";
// @ts-ignore
import styles from './HorizontalSlider.module.scss';
import Card from "../Card/Card";
import useElementSize from "../../../shared/hooks/useElementSize";

const CARD_GAP = 12
const CARD_SIZE = 295
const HORIZONTAL_CONTAINER_PADDING = 12 * 2
const HorizontalSlider : FC = () => {
  const { elementReference , elementSize : { width : containerWidth }} = useElementSize<HTMLDivElement>()
  const elementsCountDisplayed = Math.floor((containerWidth - HORIZONTAL_CONTAINER_PADDING) / (CARD_SIZE + CARD_GAP))
  const elementWidth = ((containerWidth - HORIZONTAL_CONTAINER_PADDING) / elementsCountDisplayed) - CARD_GAP

  console.log(elementWidth)
  return <div ref={elementReference}>
    <h2>Custom</h2>
    <div className={styles.container}>
      {new Array(15).fill(0).map((e, i) => <Card key={i} width={elementWidth}/>)}
    </div>
  </div>
}

export default HorizontalSlider;