import {MutableRefObject} from 'react';
import { useDoesElementIsVisible } from './useDoesElementIsVisible';

export const useDoesRefIsVisible = (ref : MutableRefObject<any>) : boolean =>
  useDoesElementIsVisible(() => ref.current)
