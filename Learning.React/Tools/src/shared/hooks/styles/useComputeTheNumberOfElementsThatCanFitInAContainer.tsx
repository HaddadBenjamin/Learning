import { MutableRefObject, useMemo } from 'react';
import useElementSize from './useElementSize';

interface IUseComputeTheNumberOfElementsThatCanFitInAContainerResponse
{
  numberOfElementsThatCanFitInAContainer: number,
  containerReference : MutableRefObject<HTMLElement>
}

const useComputeTheNumberOfElementsThatCanFitInAContainer = <T extends HTMLElement, >(elementWidth : number) : IUseComputeTheNumberOfElementsThatCanFitInAContainerResponse => {
  const { elementSize: { width: containerWidth }, elementReference: containerReference } = useElementSize<T>();
  // eslint-disable-next-line
  const numberOfElementsThatCanFitInAContainer = useMemo(() => Math.floor(containerWidth / elementWidth), [containerWidth]);

  return { numberOfElementsThatCanFitInAContainer, containerReference };
};

export default useComputeTheNumberOfElementsThatCanFitInAContainer;
