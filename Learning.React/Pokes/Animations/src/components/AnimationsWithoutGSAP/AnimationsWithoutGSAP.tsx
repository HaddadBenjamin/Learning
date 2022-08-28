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

const AnimationsWithoutGSAP : FC = () => <div>
  <div style={{ display: 'flex', gap: '20px' }}>
    <FadeInOnVisible>
      <AnimatedProgressBar/>
      <AnimatedLoader/>
      <AnimatedClock/>
      <AnimatedText/>
    </FadeInOnVisible>

    <div>
      <SlideOnVisible duration={1500} animatedOnce={false} distance={'200px'} direction='right'>
        <RevealContent/>
      </SlideOnVisible>
      <SlideOnVisible duration={1500} animatedOnce={false} direction='up'>
        <RotateContent/>
      </SlideOnVisible>
    </div>

    <div>
      <SlideOnVisible duration={1500} animatedOnce={false} distance={'200px'} direction='left'>
        <SlideContent/>
      </SlideOnVisible>
      <SlideOnVisible duration={1500} animatedOnce={false} direction='down'>
        <AnimatedCurves/>
      </SlideOnVisible>
    </div>
  </div>

  <AnimatedImages/>
</div>

export default AnimationsWithoutGSAP;