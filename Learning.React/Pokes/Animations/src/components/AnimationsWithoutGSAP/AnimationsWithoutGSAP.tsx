import React, {FC} from "react";
import AnimatedLoader from "./AnimatedLoader/AnimatedLoader";
import AnimatedProgressBar from "./AnimatedProgressBar/AnimatedProgressBar";
import AnimatedText from "./AnimatedText/AnimatedText";
import AnimatedClock from "./AnimatedClock/AnimatedClock";
import AnimatedImages from "./AnimatedImages/AnimatedImages";
import AnimatedCurves from "./AnimatedCurve/AnimatedCurves";
import RevealContent from "./AnimatedContent/RevealContent/RevealContent";
import SlideContent from "./AnimatedContent/SlideContent/SlideContent";
import RotateContent from "./AnimatedContent/RotateContent/RotateContent";
import FadeInOnVisible from "../../shared/components/animations/WithoutGsap/components/FadeInOnVisible/FadeInOnVisible";
import SlideOnVisible from "../../shared/components/animations/WithoutGsap/components/SlideOnVisible/SlideOnVisible";
import RevealOnVisible from "../../shared/components/animations/WithoutGsap/components/ReveaOnVisible/RevealOnVisible";
import ZoomOnVisible from "../../shared/components/animations/WithoutGsap/components/ZoomOnVisible/ZoomOnVisible";

const AnimationsWithoutGSAP : FC = () => <div>
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <RevealOnVisible duration={3000} animatedOnce={false} direction='down' backgroundColor='#84CC7D' delay={0} ease='ease-in'>
        <AnimatedProgressBar/>
        <AnimatedLoader/>
      </RevealOnVisible>

      <ZoomOnVisible duration={1500} animatedOnce={false}>
        <AnimatedClock/>
        <AnimatedText/>
      </ZoomOnVisible>
    </div>

    <div>
      <SlideOnVisible duration={2000} animatedOnce={false}  direction='right'>
        <RevealContent/>
      </SlideOnVisible>
      <SlideOnVisible duration={2000} animatedOnce={false} direction='up'>
        <RotateContent/>
      </SlideOnVisible>
    </div>

    <div>
      <SlideOnVisible duration={2000} animatedOnce={false}  direction='left'>
        <SlideContent/>
      </SlideOnVisible>
      <SlideOnVisible duration={2000} animatedOnce={false} direction='down' distance='200px'>
        <AnimatedCurves/>
      </SlideOnVisible>
    </div>
  </div>

  <FadeInOnVisible duration={3000} animatedOnce={false} offset={-200}>
    <AnimatedImages/>
  </FadeInOnVisible>
</div>

export default AnimationsWithoutGSAP;