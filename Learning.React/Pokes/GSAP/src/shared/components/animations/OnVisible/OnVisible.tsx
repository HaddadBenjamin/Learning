import React, {FC, MutableRefObject, useRef} from 'react';
import useOnVisible from "../../../hooks/useOnVisible";
import gsap from 'gsap';

interface Props {
  fromVars: gsap.TweenVars
  toVars: gsap.TweenVars
  children?: React.ReactNode
}

const OnVisible : FC<Props> = ({ children, fromVars, toVars }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useOnVisible(ref, () => gsap.fromTo(ref.current.children, fromVars, toVars));

  return <span ref={ref}>{children}</span>;
}

export default OnVisible;