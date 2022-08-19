import React, {FC} from "react";
import AnimatedLoader from "./AnimatedLoader/AnimatedLoader";
import AnimatedProgressiveLoadingBar from "./AnimatedProgressiveLoadingBar/AnimatedProgressiveLoadingBar";

const AnimationsWithoutGSAP : FC = () => <div style={{ display: 'flex', gap: '20px' }}>
  <AnimatedProgressiveLoadingBar/>
  <AnimatedLoader/>
</div>

export default AnimationsWithoutGSAP;