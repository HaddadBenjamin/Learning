import React, {FC} from "react";
import AnimatedLoader from "./AnimatedLoader/AnimatedLoader";
import AnimatedProgressiveLoadingBar from "./AnimatedProgressiveLoadingBar/AnimatedProgressiveLoadingBar";
import AnimatedText from "./AnimatedText/AnimatedText";

const AnimationsWithoutGSAP : FC = () => <div style={{ display: 'flex', gap: '20px' }}>
  <div>
    <AnimatedProgressiveLoadingBar/>
    <h3 style={{ marginTop: '20px' }}>Texte animé</h3>
    <AnimatedText/>
  </div>

  <AnimatedLoader/>
</div>

export default AnimationsWithoutGSAP;