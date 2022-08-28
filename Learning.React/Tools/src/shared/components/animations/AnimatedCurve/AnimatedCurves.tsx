/* eslint-disable no-new */
import React, {
  FC, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import AnimatedCurve from './AnimatedCurve';

const AnimatedCurves : FC = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animationHasEnded, setAnimationHasEnded] = useState(false);
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    new AnimatedCurve({
      duration: 5,
      startValue: animatedValue,
      endValue: 10000,
      timingFunction: 'easeOutQuint',
      onAnimatedValueChange: setAnimatedValue,
      onAnimationEnd: () => {
        new AnimatedCurve({
          duration: 5,
          startValue: 0,
          endValue: 150,
          timingFunction: 'easeInElastic',
          onAnimatedValueChange: (newXPosition) => { ref.current.style.marginLeft = `${newXPosition}px`; },
          onAnimationEnd: () => setAnimationHasEnded(true),
        });
      },
    });
  }, []);

  return (
    <div>
      <h3>Courbe animée : nombre et position animée</h3>
      <p>On utilise des courbes animées en JS</p>
      <p>
        Nombre animée:
        {animatedValue}
      </p>
      <div ref={ref} style={{ color: animationHasEnded ? 'red' : 'black' }}>
        Position animée
        {animationHasEnded ? ' terminée' : ''}
      </div>
    </div>
  );
};

export default AnimatedCurves;
