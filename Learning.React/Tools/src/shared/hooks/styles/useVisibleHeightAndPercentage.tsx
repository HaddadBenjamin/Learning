import { MutableRefObject, useEffect, useState } from 'react';
import useElementSize, { ElementSize } from './useElementSize';
import useScrollPosition from './useScrollPosition';

interface IUseVisiblePercentageResponse<THTMLElement extends HTMLElement> {
  elementReference : MutableRefObject<THTMLElement>
  visiblePercent : number
  visiblePercentNormalized : number
  visibleHeight: number

  elementSize : ElementSize
  scrollPosition : number
}

// Calcul le pourcentage de hauteur visible et la hauteur visible.
const useVisibleHeightAndPercentage = <THTMLElement extends HTMLElement>() : IUseVisiblePercentageResponse<THTMLElement> => {
  const [visibleHeight, setVisibleHeight] = useState(0);
  const [visiblePercent, setVisiblePercent] = useState(0);
  const [visiblePercentNormalized, setVisiblePercentNormalized] = useState(0);

  const { elementSize, elementReference } = useElementSize<THTMLElement>();
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    let visibleHeight = elementSize.height - elementReference.current.getBoundingClientRect().y;
    if (visibleHeight < 0 || Number.isNaN(visibleHeight)) visibleHeight = 0;

    let visiblePercentNormalized = visibleHeight / elementSize.height;
    if (Number.isNaN(visiblePercentNormalized)) visiblePercentNormalized = 0;

    setVisibleHeight(visibleHeight);
    setVisiblePercentNormalized(visiblePercentNormalized);
    setVisiblePercent(visiblePercentNormalized * 100);
  }, [scrollPosition, elementReference.current, elementSize.height]);

  return {
    visibleHeight,
    visiblePercent,
    visiblePercentNormalized,
    elementReference,

    elementSize,
    scrollPosition,
  } as const;
};

export default useVisibleHeightAndPercentage;
