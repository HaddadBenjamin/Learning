import gsap from 'gsap';
import React, {FC} from 'react';
import OnVisibleFirstTime from "../OnVisibleFirstTime/OnVisibleFirstTime";

interface Props {
  vars?: gsap.TweenVars
  children: React.ReactNode
}

const FadeInOnVisibleFirstTime : FC<Props> = ({ children, vars }) =>
  <OnVisibleFirstTime vars={{ opacity: 0, duration : 2, ...vars }}>{children}</OnVisibleFirstTime>

export default FadeInOnVisibleFirstTime;