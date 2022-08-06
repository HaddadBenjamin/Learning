import gsap from 'gsap';
import React, {FC, MutableRefObject, useRef} from 'react';
import useOnVisibleFirstTime from "../../hooks/useOnVisibleFirstTime";

interface Props {
  vars?: gsap.TweenVars
  children: React.ReactNode
}

const FadeInOnVisibleFirstTime : FC<Props> = ({ children, vars  }) =>{
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useOnVisibleFirstTime(ref, () => gsap.from(ref.current, { opacity : 0, duration : 2, ...vars }));

  return <span ref={ref}>{children}</span>;
}

export default FadeInOnVisibleFirstTime;