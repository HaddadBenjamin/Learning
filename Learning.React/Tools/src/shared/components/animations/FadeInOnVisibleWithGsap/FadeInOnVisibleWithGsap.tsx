import gsap from 'gsap';
import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  fromVars?: gsap.TweenVars
  toVars?: gsap.TweenVars
  children: React.ReactNode
}

const FadeInOnVisibleWithGsap : FC<Props> = (
  {
    children,
    fromVars,
    toVars,
  }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const tween = gsap.fromTo(ref.current.children,
      { opacity: 0, ...fromVars },
      {
        opacity: 1,
        duration: 2,
        ...toVars,
        scrollTrigger:
        {
          trigger: ref.current.children,
          toggleActions: 'restart none none none',
        },
      });

    return () => { tween.kill(); };
  }, []);

  return <span ref={ref}>{children}</span>;
};

export default FadeInOnVisibleWithGsap;
