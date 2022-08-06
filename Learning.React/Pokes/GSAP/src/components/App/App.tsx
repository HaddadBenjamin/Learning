import React from 'react';
import styles from './App.module.scss';
import FadeInOnVisible from "../../shared/components/FadeInOnVisible/FadeInOnVisible";
import FadeInOnVisibleFirstTime from "../../shared/components/FadeInOnFirstTimeVisible/FadeInOnVisibleFirstTime";

const App = () => <>
  <div className={styles.red}>Bloc présent pour montrer que les bloc suivants s'animent correctement</div>

  <FadeInOnVisibleFirstTime>
    <div className={styles.onVisibleFirstTime}>Animation déclenché une fois lorsque l'élément est visible</div>
  </FadeInOnVisibleFirstTime>

  <FadeInOnVisible>
    <div className={styles.onVisible}>Animation relancer à chaque fois que l'élément est visible</div>
  </FadeInOnVisible>
</>

export default App;
