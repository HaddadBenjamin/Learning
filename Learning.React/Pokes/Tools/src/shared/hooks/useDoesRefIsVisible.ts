import {MutableRefObject} from 'react';
import { useDoesElementIsVisible } from './useDoesElementIsVisible';

export const useDoesRefIsVisible = (ref : MutableRefObject<any>) =>
  useDoesElementIsVisible(() => ref.current)
