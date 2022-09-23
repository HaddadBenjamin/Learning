import React, {FC, useEffect, useRef, useState} from "react";
import styles from './AnimatedProgressBar..module.scss'
import useElementSize from "../../../shared/otherThanAnimation/hooks/useElementSize";

//Todo animated percentage + text
const INITIAL_FILLED_PERCENTAGE = 50
const LOADING_BAR_WIDTH = 400
const AnimatedProgressBar : FC = () => {
  const [filledPercentage, setFilledPercentage] = useState(INITIAL_FILLED_PERCENTAGE)
  const [filledPercentageEase, setFilledPercentageEase] = useState(INITIAL_FILLED_PERCENTAGE)
  const { elementReference: ref, elementSize : { width }} = useElementSize<HTMLDivElement>()

  useEffect(() => { ref.current.style.width = filledPercentage.toString() + '%'; }, [filledPercentage])
  useEffect(() => { setFilledPercentageEase(width / LOADING_BAR_WIDTH * 100) },[width])

  return <div>
    <h3>Barre de progression animée avec un texte animée</h3>
    <div className={styles.buttonContainer}>
      <button onClick={() => { if (filledPercentage > 0) setFilledPercentage(filledPercentage - 25)} }>-25%</button>
      <button onClick={() => { if (filledPercentage < 100) setFilledPercentage(filledPercentage + 25)} }>+25%</button>
    </div>

    <div>
      <div className={styles.loadingBarContainerWithoutBorder}>
        <div className={styles.loadingBar} ref={ref}/>
        <div className={styles.filledPercentageText}>{filledPercentageEase.toFixed(2)}%</div>
        <div className={styles.loadingBarContainer}/>
      </div>
    </div>
  </div>;
}

export default AnimatedProgressBar;