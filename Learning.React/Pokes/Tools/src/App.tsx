import React from 'react';
import InfiniteScrollingSample from './samples/infiniteScrolling/InfiniteScrollingSample';
import LazyImageSample from './samples/lazyImage/LazyImageSample';
import HightlightSample from "./samples/ui/highlight/HightlightSample";
import LazyResponsiveImageSample from './samples/lazyResponsiveImage/LazyResponsiveImageSample';
import ResponsiveImageSample from "./samples/responsiveImage/ResponsiveImageSample";
import LazyReduxSample from "./samples/lazyRedux/LazyReduxSample";

export const App = () =>
  <>
    <HightlightSample/>
	  <LazyReduxSample/>
	  <ResponsiveImageSample />
    <LazyImageSample/>
	  <LazyResponsiveImageSample/>
	  <InfiniteScrollingSample/>
 </>