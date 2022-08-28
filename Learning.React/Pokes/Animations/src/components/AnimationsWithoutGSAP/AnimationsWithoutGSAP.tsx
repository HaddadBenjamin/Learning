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

const AnimationsWithoutGSAP : FC = () => <div>
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <AnimatedProgressBar/>
      <AnimatedLoader/>
      <AnimatedClock/>
      <AnimatedText/>
    </div>

    <div>
      <RevealContent/>
      <RotateContent/>
    </div>

    <div>
      <SlideContent/>
      <AnimatedCurves/>
    </div>
  </div>

  <AnimatedImages/>
</div>

export default AnimationsWithoutGSAP;