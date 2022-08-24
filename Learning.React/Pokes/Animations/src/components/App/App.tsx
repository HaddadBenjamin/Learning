import React, {useState} from 'react';
import OnVisibleAnimations from "../OnVisibleAnimations/OnVisibleAnimations";
import styles from './App.module.scss'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineAnimations from "../TimelineAnimations/TimelineAnimations";
import TweenAnimations from "../TweenAnimations/TweenAnimations";
import AnimationsWithoutGSAP from "../AnimationsWithoutGSAP/AnimationsWithoutGSAP";
import ScrollTriggerAnimations from "../ScrollTriggerAnimations/ScrollTriggerAnimations";

gsap.registerPlugin(ScrollTrigger);

type Tab =
  'Animations sans GSAP' |
  'Les tweens' |
  'Déclencher une animation quand un élément est visible' |
  'timeline & enchainement danimation' |
  'scroll & slider & carrousel'
const App = () => {
  const [tabVisible, setTabVisible] = useState<Tab>('Animations sans GSAP')

  return <div className={styles.container}>
    <h2>Animation choisi : {tabVisible}</h2>
    <div className={styles.buttonContainer}>
      <button onClick={() => setTabVisible('Animations sans GSAP')}>Animations sans GSAP</button>
      <button onClick={() => setTabVisible('Les tweens')}>Les tweens</button>
      <button onClick={() => setTabVisible('timeline & enchainement danimation')}>Timelines : enchainer les animations</button>
      <button onClick={() => setTabVisible('Déclencher une animation quand un élément est visible')}>Déclencher une animation quand un élément est visible</button>
      <button onClick={() => setTabVisible('scroll & slider & carrousel')}>Gestion du scroll ave ScrollTrigger : slider & carrousel</button>
    </div>

    { tabVisible === 'Animations sans GSAP' && <AnimationsWithoutGSAP/> }
    { tabVisible === 'Les tweens' && <TweenAnimations/> }
    { tabVisible === 'Déclencher une animation quand un élément est visible' && <OnVisibleAnimations/> }
    { tabVisible === 'timeline & enchainement danimation' && <TimelineAnimations/> }
    { tabVisible === 'scroll & slider & carrousel' && <ScrollTriggerAnimations/>}
  </div>;
}

export default App;
