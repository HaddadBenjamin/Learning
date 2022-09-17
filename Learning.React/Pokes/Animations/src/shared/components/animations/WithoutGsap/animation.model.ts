import React from 'react';

export type AnimationEase =
  'linear' |

  'ease' |
  'ease-in' |
  'ease-out' |
  'ease-in-out' |

  'ease-in-back' |
  'ease-out-back' |
  'ease-in-out-back' |

  'ease-in-sine' |
  'ease-out-sine' |
  'ease-in-out-sine' |

  'ease-in-quad' |
  'ease-out-quad' |
  'ease-in-out-quad' |

  'ease-in-cubic' |
  'ease-out-cubic' |
  'ease-in-out-cubic' |

  'ease-in-quart' |
  'ease-out-quart' |
  'ease-in-out-quart';

export interface IBaseAnimationsProps {
  children?: React.ReactNode,
  className?: string,

  duration?: number,
  delay?: number,
  offset?: number,
  ease?: AnimationEase,

  animatedOnce?: boolean,
}
