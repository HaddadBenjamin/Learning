import React, {FC} from "react";
import AnimatedLoader from "./AnimatedLoader/AnimatedLoader";
import AnimatedProgressBar from "./AnimatedProgressBar/AnimatedProgressBar";
import AnimatedText from "./AnimatedText/AnimatedText";
import AnimatedClock from "./AnimatedClock/AnimatedClock";
import AnimatedImages from "./AnimatedImages/AnimatedImages";
import AnimatedCurves from "./AnimatedCurve/AnimatedCurves";
import AnimatedContent from "./AnimatedContent/AnimatedContent";

const AnimationsWithoutGSAP : FC = () => <div>
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <AnimatedProgressBar/>
      <AnimatedCurves/>
      <AnimatedLoader/>
      <AnimatedClock/>
    </div>

    <AnimatedContent/>
    <AnimatedText/>

    <div>

    </div>
  </div>

  <AnimatedImages/>
</div>

export default AnimationsWithoutGSAP;