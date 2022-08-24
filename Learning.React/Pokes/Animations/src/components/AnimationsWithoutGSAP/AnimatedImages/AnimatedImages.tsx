import React, {FC} from "react";
import cn from 'classnames'
import styles from './AnimatedImages.module.scss'


const lorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse maiores aspernatur explicabo maxime doloremque rem porro ad in eveniet error!"
const AnimatedImages : FC = () =>
<div>
  <h3>Images animées au hover</h3>

  <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.blur)} src="https://picsum.photos/500?random=1"/>
      <div className={cn(styles.content, styles.fade)}>{`Blur image + fade content : ${`Blur image + fade content : ${lorem}`}`}</div>
    </div>

    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.blur, styles.zoom)} src="https://picsum.photos/500?random=2"/>
      <div className={cn(styles.content, styles.fade)}>{`Blur&zoom image + fade content : ${lorem}`}</div>
    </div>

    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.gray, styles.zoom)} src="https://picsum.photos/500?random=7"/>
      <div className={cn(styles.content, styles.fade)}>{`Gray&zoom image + fade content : ${lorem}`}</div>
    </div>

    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.blur, styles.zoom)} src="https://picsum.photos/500?random=5"/>
      <div className={cn(styles.content, styles.slideUp)}>{`Blur&zoom image + slide up content : ${lorem}`}</div>
    </div>

    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.blur, styles.zoom)} src="https://picsum.photos/500?random=4"/>
      <div className={cn(styles.content, styles.slideRight)}>{`Blur&zoom image + slide right content : ${lorem}`}</div>
    </div>

    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.blur, styles.zoom)} src="https://picsum.photos/500?random=6"/>
      <div className={cn(styles.content, styles.slideDown)}>{`Blur&zoom image + slide down content : ${lorem}`}</div>
    </div>

    <div className={styles.imageContainer}>
      <img className={cn(styles.image, styles.blur, styles.zoom)} src="https://picsum.photos/500?random=3"/>
      <div className={cn(styles.content, styles.slideLeft)}>{`Blur&zoom image + slide left content : ${lorem}`}</div>
    </div>
  </div>
</div>

export default AnimatedImages;