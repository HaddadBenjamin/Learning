import React, {FC} from 'react';
import gsap from 'gsap';
import OnVisible from "../OnVisible/OnVisible";

interface Props {
  fromVars?: gsap.TweenVars
  toVars?: gsap.TweenVars
  children?: React.ReactNode
}

const FadeInOnVisible : FC<Props> = ({ children,fromVars, toVars }) =>
  <OnVisible
    fromVars={{ opacity: 0, duration : 2, ...fromVars }}
    toVars={{ opacity : 1, duration : 2, ...toVars}}>{children}</OnVisible>

export default FadeInOnVisible;