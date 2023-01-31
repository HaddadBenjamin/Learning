import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import styles from './App.module.scss';
import useScreenSize from "./hooks/useScreenSize";

const getValueWithoutPxPrefix = (value : string) : number => parseInt(value.substring(0, value.length -2))

const BALL_SIZE = 20
let lastTime : number|undefined= undefined;
const App = () => {
  const [deltaTime, setDeltaTime] = useState(0)
  const { width: screenWidth, height: screenHeight } = useScreenSize()

  const [playerScore, setPlayerScore] = useState(0)
  const [IAScore, setIAScore] = useState(0)

  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 })
  const [ballSpeed, setBallSpeed] = useState(0.28)
  const [ballDirection, setBallDirection] = useState({ x : -1, y : -1 });

  const ballRef = useRef() as MutableRefObject<HTMLDivElement>

  const updateDeltaTime = (currentTime?: number) : void =>
  {
    if (!!lastTime) setDeltaTime(currentTime! - lastTime)

    lastTime = currentTime
    // Fonctionne en SSR car le composant est monté à ce moment
    window.requestAnimationFrame(updateDeltaTime)
  }
  useEffect(() => { updateBallAtEachFrame(deltaTime) /* boucle de jeu */}, [deltaTime])
  useEffect(() => {
    window.requestAnimationFrame(updateDeltaTime)
    setBallPosition({ x : screenWidth/2 - BALL_SIZE, y: screenHeight/2 - BALL_SIZE })
  }, [])

  const updateBallAtEachFrame = (deltaTime: number) => {
    setBallPosition({
      x: ballPosition.x + (deltaTime * ballSpeed * ballDirection.x),
      y: ballPosition.y + (deltaTime * ballSpeed * ballDirection.y)
    })

    const leftBallValue = getValueWithoutPxPrefix(ballRef.current.style.left)
    const topBallValue = getValueWithoutPxPrefix(ballRef.current.style.top)
    setBallDirection({
      x: leftBallValue < 0 ? Math.abs(ballDirection.x) : leftBallValue > screenWidth - BALL_SIZE ? -Math.abs(ballDirection.x): ballDirection.x,
      y: topBallValue < 0  ? Math.abs(ballDirection.y) : topBallValue > screenHeight - BALL_SIZE? -Math.abs(ballDirection.y): ballDirection.y
    })

    setBallSpeed(ballSpeed * (1 + deltaTime * 0.00005))
  }

  // movePaddle
  // collissionBall :!
  return <div className={styles.screen}>
    <div className={styles.score}>{`WORK IN PROGRESS: ${playerScore} | ${IAScore}`}</div>
    <div className={styles.leftPaddle}/>
    <div className={styles.rightPaddle}/>
    <div
      className={styles.ball}
      ref={ballRef}
      style={{ left: `${ballPosition.x}px`, top :`${ballPosition.y}px` }}
    />
  </div>
}
export default App;
