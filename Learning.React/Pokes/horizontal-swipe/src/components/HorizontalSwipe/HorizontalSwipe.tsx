import React, {FC} from "react";
// @ts-ignore
import styles from './HorizontalSwipe.module.scss';
import Card from "../Card/Card";

const HorizontalSwipe : FC = () =>
  <div className={styles.container}>
    { new Array(15).fill(0).map((e,i) => <Card key={i}/>)}
  </div>

export default HorizontalSwipe;