/* eslint-disable no-new */
import React, {
  FC, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import AnimationCurve from '../../../shared/components/animations/WithoutGsap/AnimationCurve';

const AnimatedCurves : FC = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animationHasEnded, setAnimationHasEnded] = useState(false);
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    new AnimationCurve({
      duration: 5,
      startValue: 0,
      endValue: 10000,
      timingFunction: 'easeOutQuint',
      onAnimatedValueChange: setAnimatedValue,
      onAnimationEnd: () => {
        new AnimationCurve({
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
      <h3>Courbes animées en JS : nombre et position animées</h3>
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
