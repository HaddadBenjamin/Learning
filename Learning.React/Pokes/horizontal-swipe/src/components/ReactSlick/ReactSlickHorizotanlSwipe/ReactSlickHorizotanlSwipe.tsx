import React, {FC} from "react";
// @ts-ignore
import styles from './ReactSlickHorizontalSwipe.module.scss'
import Slider from "react-slick";
import Card from "../../Custom/Card/Card";
import './ReactSlick.css'
import useElementSize from "../../../shared/hooks/useElementSize";

const CARD_SIZE = 295
const ReactSlickHorizontalSwipe : FC = () => {
  const { elementReference , elementSize : { width : containerWidth }} = useElementSize<HTMLDivElement>()
  const settings = {
    dots: true,
    infinite: true,
    accessibility : true,
    speed: 500,
    slidesToShow: Math.floor(containerWidth / CARD_SIZE),
    slidesToScroll: Math.floor(containerWidth / CARD_SIZE),
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