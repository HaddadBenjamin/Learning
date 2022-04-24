import { MutableRefObject } from 'react';
import useDoesElementIsVisible from './useDoesElementIsVisible';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (ref: MutableRefObject<any>): boolean => useDoesElementIsVisible(() => ref.current);
