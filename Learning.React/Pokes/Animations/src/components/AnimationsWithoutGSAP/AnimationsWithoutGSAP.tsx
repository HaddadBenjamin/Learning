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
import FadeInOnVisible from "../../shared/components/animations/WithoutGsap/FadeInOnVisible/FadeInOnVisible";
import SlideOnVisible from "../../shared/components/animations/WithoutGsap/SlideOnVisible/SlideOnVisible";
import RevealOnVisible from "../../shared/components/animations/WithoutGsap/ReveaOnVisible/RevealOnVisible";

const AnimationsWithoutGSAP : FC = () => <div>
  <div style={{ display: 'flex', gap: '20px' }}>
    <RevealOnVisible duration={3000} animatedOnce={false} direction='down' backgroundColor='#84CC7D'>
      <AnimatedProgressBar/>
      <AnimatedLoader/>
      <AnimatedClock/>
      <AnimatedText/>
    </RevealOnVisible>

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

  <FadeInOnVisible duration={3000} animatedOnce={false}>
    <AnimatedImages/>
  </FadeInOnVisible>
</div>

export default AnimationsWithoutGSAP;