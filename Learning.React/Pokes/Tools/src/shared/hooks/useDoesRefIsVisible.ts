import { MutableRefObject } from 'react';
import useDoesElementIsVisible from './useDoesElementIsVisible';

export default (ref: MutableRefObject<any>): boolean =>
  useDoesElementIsVisible(() => ref.current);
