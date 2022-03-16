import { MutableRefObject, useMemo, useRef } from 'react';
import useElementSize from './useElementSize';

interface IUseComputeTheNumberOfElementsThatCanFitInAContainerResponse
{
  numberOfElementsThatCanFitInAContainer: number,
  containerReference : MutableRefObject<HTMLElement>
}

const useComputeTheNumberOfElementsThatCanFitInAContainer = <T extends HTMLElement, >(elementWidth : number) : IUseComputeTheNumberOfElementsThatCanFitInAContainerResponse => {
  const containerReference = useRef() as MutableRefObject<T>;
  const { width: containerWidth } = useElementSize(containerReference);
  // eslint-disable-next-line
  const numberOfElementsThatCanFitInAContainer = useMemo(() => Math.floor(containerWidth / elementWidth), [containerWidth]);

  return { numberOfElementsThatCanFitInAContainer, containerReference };
};

export default useComputeTheNumberOfElementsThatCanFitInAContainer;
