import React, {FC} from "react";
// @ts-ignore
import styles from './HorizontalSlider.module.scss';
import Card from "../Card/Card";
import useElementSize from "../../../shared/hooks/useElementSize";

const CARD_GAP = 14
const CARD_SIZE = 295
const HORIZONTAL_CONTAINER_PADDING = 24
const CONTAINER_PADDING_FOR_COMPUTATION = 18
const HorizontalSlider : FC = () => {
  const { elementReference , elementSize : { width : containerWidth }} = useElementSize<HTMLDivElement>()
  const elementsCountDisplayed = Math.floor((containerWidth - CONTAINER_PADDING_FOR_COMPUTATION) / (CARD_SIZE + CARD_GAP))
  const elementWidth = ((containerWidth - CONTAINER_PADDING_FOR_COMPUTATION) / elementsCountDisplayed) - CARD_GAP
  console.log((containerWidth - 48)/ elementsCountDisplayed) // on décale ce ça pour chaque élément

  return <div ref={elementReference}>
    <h2>Custom</h2>
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {new Array(15).fill(0).map((e, i) => <Card key={i} width={elementWidth}/>)}
      </div>
    </div>
  </div>
}

export default HorizontalSlider;