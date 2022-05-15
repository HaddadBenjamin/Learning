import React, {FC} from "react";
// @ts-ignore
import styles from './HorizontalSlider.module.scss'
import Slider from "react-slick";
import Card from "../../Custom/components/Card/Card";
import './HorizontalSlider.css'
import useElementSize from "../../../shared/hooks/useElementSize";
import useBreakpoints from "../../../shared/hooks/useBreakpoints";

const CARD_GAP = 16
const CARD_SIZE = 295
const ReactSlickHorizontalSwipe : FC = () => {
  const { elementReference , elementSize : { width : containerWidth }} = useElementSize<HTMLDivElement>()
  const { isMobile } = useBreakpoints()
  const settings = {
    dots: isMobile,
    infinite: false,
    speed: 1000,
    slidesToShow: Math.floor(containerWidth / (CARD_SIZE + CARD_GAP)),
    slidesToScroll: Math.floor(containerWidth / (CARD_SIZE + CARD_GAP)),
  };

  return (
    <div ref={elementReference}>
      <h2>React Slick</h2>
      <Slider {...settings} className={styles.container}>
        {new Array(15).fill(0).map((e, i) => <Card key={i} className={styles.card}/>)}
      </Slider>
    </div>
  );
}

export default ReactSlickHorizontalSwipe;