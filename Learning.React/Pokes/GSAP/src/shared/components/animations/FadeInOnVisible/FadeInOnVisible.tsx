import React, {FC} from 'react';
import gsap from 'gsap';
import OnVisible from "../OnVisible/FadeInOnVisible";

interface Props {
  vars?: gsap.TweenVars
  children?: React.ReactNode
}

const FadeInOnVisible : FC<Props> = ({ children, vars }) =>
  <OnVisible vars={{ opacity: 0, duration : 2, ...vars }}>{children}</OnVisible>

export default FadeInOnVisible;