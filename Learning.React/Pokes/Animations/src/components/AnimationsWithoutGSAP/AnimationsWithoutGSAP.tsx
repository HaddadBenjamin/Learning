import React, {FC} from "react";
import AnimatedLoader from "./AnimatedLoader/AnimatedLoader";
import AnimatedProgressBar from "./AnimatedProgressBar/AnimatedProgressBar";
import AnimatedText from "./AnimatedText/AnimatedText";
import AnimatedClock from "./AnimatedClock/AnimatedClock";
import AnimatedImages from "./AnimatedImages/AnimatedImages";
import AnimatedCurves from "./AnimatedCurve/AnimatedCurves";

const AnimationsWithoutGSAP : FC = () => <div>
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <AnimatedProgressBar/>
      <h3 style={{ marginTop: '20px' }}>Texte animé</h3>
      <AnimatedText/>
    </div>

    <AnimatedCurves/>
    <AnimatedLoader/>
    <AnimatedClock/>
  </div>

  <AnimatedImages/>
</div>

export default AnimationsWithoutGSAP;