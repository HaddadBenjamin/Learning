import React from 'react';
import { InfiniteScrollingSample } from './samples/infiniteScrolling/InfiniteScrollingSample';
import { LazyImageSample } from './samples/lazyImage/LazyImageSample';
import {HightlightSample} from "./samples/ui/highlight/HightlightSample";

export const App = () =>
  <>
    <HightlightSample/>
    <LazyImageSample/>
		<InfiniteScrollingSample/>
 </>