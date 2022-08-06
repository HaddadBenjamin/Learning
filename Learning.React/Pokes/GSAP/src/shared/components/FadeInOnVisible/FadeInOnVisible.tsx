import React, {FC, MutableRefObject, useRef} from 'react';
import useOnVisible from "../../hooks/useOnVisible";
import gsap from 'gsap';

interface Props {
  vars?: gsap.TweenVars
  children?: React.ReactNode
}

const FadeInOnVisible : FC<Props> = ({ children, vars }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useOnVisible(ref, () => gsap.from(ref.current, { opacity : 0, duration : 2, ...vars }));

  return <span ref={ref}>{children}</span>;
}

export default FadeInOnVisible;