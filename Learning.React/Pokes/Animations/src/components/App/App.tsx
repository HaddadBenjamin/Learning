import React, {useEffect, useState} from 'react';
import OnVisibleAnimations from "../GSAP/OnVisibleAnimations/OnVisibleAnimations";
import styles from './App.module.scss'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineAnimations from "../GSAP/TimelineAnimations/TimelineAnimations";
import TweenAnimations from "../GSAP/TweenAnimations/TweenAnimations";
import MyAnimations from "../MyAnimations/MyAnimations";
import ScrollTriggerAnimations from "../GSAP/ScrollTriggerAnimations/ScrollTriggerAnimations";
import AOSAnimations from "../AOS/AOSAnimations";
import 'aos/dist/aos.css';
import AOS from 'aos';

gsap.registerPlugin(ScrollTrigger);

type Tab =
  'Animations maison' |
  'Animations AOS' |
  'Les tweens' |
  'Déclencher une animation quand un élément est visible' |
  'timeline & enchainement danimation' |
  'scroll & slider & carrousel'
const App = () => {
  const [tabVisible, setTabVisible] = useState<Tab>('Animations maison')

  useEffect(() => { AOS.init(); }, []);

  return <div className={styles.container}>
    <h2>Animation choisi : {tabVisible}</h2>
    <div className={styles.buttonContainer}>
      <button onClick={() => setTabVisible('Animations maison')}>Animations maison</button>
      <button onClick={() => setTabVisible('Animations AOS')}>Animations AOS</button>
    </div>
    <div className={styles.buttonContainer}>
      <div>Animations GSAP :</div>
      <button onClick={() => setTabVisible('Les tweens')}>Les tweens</button>
      <button onClick={() => setTabVisible('timeline & enchainement danimation')}>Timelines : enchainer les animations</button>
      <button onClick={() => setTabVisible('Déclencher une animation quand un élément est visible')}>Déclencher une animation quand un élément est visible</button>
      <button onClick={() => setTabVisible('scroll & slider & carrousel')}>Gestion du scroll ave ScrollTrigger : slider & carrousel</button>
    </div>

    { tabVisible === 'Animations maison' && <MyAnimations/> }
    { tabVisible === 'Animations AOS' && <AOSAnimations/> }
    { tabVisible === 'Les tweens' && <TweenAnimations/> }
    { tabVisible === 'Déclencher une animation quand un élément est visible' && <OnVisibleAnimations/> }
    { tabVisible === 'timeline & enchainement danimation' && <TimelineAnimations/> }
    { tabVisible === 'scroll & slider & carrousel' && <ScrollTriggerAnimations/>}
  </div>;
}

export default App;
