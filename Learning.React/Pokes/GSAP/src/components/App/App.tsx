import React from 'react';
import styles from './App.module.scss';
import AnimationOnVisible from "../AnimationOnVisible/AnimationOnVisible";
import AnimationOnFirstTimeVisible from "../AnimationOnFirstTimeVisible/AnimationOnFirstTimeVisible";

const App = () => <>
  <div className={styles.container}/>
  <AnimationOnVisible/>
  <AnimationOnFirstTimeVisible/>
</>

export default App;
