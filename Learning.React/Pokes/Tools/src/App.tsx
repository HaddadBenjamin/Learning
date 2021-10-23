import React from 'react';
import InfiniteScrollingSample from './samples/infiniteScrolling/InfiniteScrollingSample';
import LazyImageSample from './samples/lazyImage/LazyImageSample';
import HightlightSample from "./samples/ui/highlight/HightlightSample";
import LazyResponsiveImageSample from './samples/lazyResponsiveImage/LazyResponsiveImageSample';
import ResponsiveImageSample from "./samples/responsiveImage/ResponsiveImageSample";
import LazyReduxSample from "./samples/lazyRedux/LazyReduxSample";
import BreakpointsSample from "./samples/breakpoints/BreakpointsSample";
import store from "./samples/lazyRedux/root.store"
import {Provider} from "react-redux";

export const App = () =>
	<Provider store={store}>
    <HightlightSample/>
		<BreakpointsSample/>
	  <LazyReduxSample/>
	  <ResponsiveImageSample />
    <LazyImageSample/>
	  <LazyResponsiveImageSample/>
	  <InfiniteScrollingSample/>
  </Provider>