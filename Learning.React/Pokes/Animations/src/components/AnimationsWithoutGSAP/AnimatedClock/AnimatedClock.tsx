/* eslint-disable no-plusplus, no-await-in-loop, react/destructuring-assignment, no-param-reassign */
import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import styles from './AnimatedClock.module.scss'

const AnimatedClock : FC = () => {
  const [date, setDate] = useState(new Date())
  const hourTickRef = useRef() as MutableRefObject<HTMLDivElement>
  const minuteTickRef = useRef() as MutableRefObject<HTMLDivElement>
  const secondTickRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      let hourWithDecimal = (newDate.getMinutes() / 60 + newDate.getSeconds() / 3600) + newDate.getHours()

      hourWithDecimal = hourWithDecimal > 12 ? hourWithDecimal - 12 : hourWithDecimal

      hourTickRef.current.style.transform = `translateX(-50%) rotate(${hourWithDecimal * 30}deg)`
      minuteTickRef.current.style.transform = `translateX(-50%) rotate(${newDate.getMinutes() * 6}deg)`
      secondTickRef.current.style.transform = `translateX(-50%) rotate(${newDate.getSeconds()  * 6}deg)`
      setDate(newDate);
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  return <div>
    <h3>Une horloge animée</h3>
    <div style={{textAlign: 'center', marginBottom:'8px'}}>{`${date.getHours()}:${date.getMinutes()} ${date.getSeconds()}`}</div>

    <div className={styles.clock}>
      {[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,].map(hour =>
        <div className={styles.hour} key={`clock-hour-${hour}`} style={{ transform: `rotate(${(hour * 30).toString()}deg)` }}>{hour}</div>)}

      <div className={styles.hourTick} ref={hourTickRef}/>
      <div className={styles.minuteTick} ref={minuteTickRef}/>
      <div className={styles.secondTick} ref={secondTickRef}/>
      <div className={styles.circleInClockCenter}/>
    </div>
  </div>
};

export default AnimatedClock;
