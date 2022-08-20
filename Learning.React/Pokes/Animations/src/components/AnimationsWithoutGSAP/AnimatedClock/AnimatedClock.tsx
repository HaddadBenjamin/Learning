/* eslint-disable no-plusplus, no-await-in-loop, react/destructuring-assignment, no-param-reassign */
import React, { FC } from 'react';
import styles from './AnimatedClock.module.scss'

const AnimatedClock : FC = () => {
  return <div>
    <h3>Une horloge animée</h3>
    <div className={styles.clock}>
    {[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,].map(hour =>

      <div className={styles.hour} key={`clock-hour-${hour}`} style={{
        transform: `rotate(${(hour * 30).toString()}deg)`,
      }}>{hour}</div>)}
  </div>
  </div>
};

export default AnimatedClock;
