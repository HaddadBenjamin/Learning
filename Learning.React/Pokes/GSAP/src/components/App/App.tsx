import React, {useState} from 'react';
import MacbookOutsideToInsideAnimation from "../MacbookOutsideToInsideAnimation/MacbookOutsideToInsideAnimation";
import OnVisibleAndTweenAnimations from "../OnVisibleAndTweenAnimations/OnVisibleAndTweenAnimations";
import styles from './App.module.scss'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineAnimations from "../TimelineAnimations/TimelineAnimations";

gsap.registerPlugin(ScrollTrigger);

type Tab = 'tween' | 'onVisible[FirstTime]' | 'timeline & enchainement danimation' | 'scroll & slider & carrousel'
const App = () => {
  const [tabVisible, setTabVisible] = useState<Tab>('onVisible[FirstTime]')

  return <>
    <h2>Animation choisi : {tabVisible}</h2>
    <div className={styles.container}>
      <button onClick={() => setTabVisible('tween')}>Les tweens</button>
      <button onClick={() => setTabVisible('onVisible[FirstTime]')}>Déclencher une animation quand un élément est visible</button>
      <button onClick={() => setTabVisible('timeline & enchainement danimation')}>Timelines : enchainer les animations</button>
      <button onClick={() => setTabVisible('scroll & slider & carrousel')}>Gestion du scroll ave ScrollTrigger : slider & carrousel</button>
    </div>

    {/*{ tabVisible === 'onVisible[FirstTime]' && <OnVisibleAndTweenAnimations/> }*/}
    { tabVisible === 'onVisible[FirstTime]' && <OnVisibleAndTweenAnimations/> }
    { tabVisible === 'timeline & enchainement danimation' && <TimelineAnimations/> }
    { tabVisible === 'scroll & slider & carrousel' && <MacbookOutsideToInsideAnimation/> }
  </>;
}

export default App;
