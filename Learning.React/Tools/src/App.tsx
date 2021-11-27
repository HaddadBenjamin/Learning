import React from 'react';
import { Provider } from 'react-redux';
import InfiniteScrollingSample from './samples/infiniteScrolling/InfiniteScrollingSample';
import LazyImageSample from './samples/lazyImage/LazyImageSample';
import HightlightSample from './samples/ui/highlight/HightlightSample';
import LazyResponsiveImageSample from './samples/lazyResponsiveImage/LazyResponsiveImageSample';
import ResponsiveImageSample from './samples/responsiveImage/ResponsiveImageSample';
import LazyReduxSample from './samples/lazyRedux/LazyReduxSample';
import BreakpointsSample from './samples/breakpoints/BreakpointsSample';
import ConfigurationSample from './samples/configuration/ConfigurationSample';
import ResponsiveNavigationSample from './samples/ui/responsiveNavigation/ResponsiveNavigationSample/ResponsiveNavigationSample';
import LazyPaginationSample from './samples/pagination/components/LazyPaginationSample/LazyPaginationSample';
import store from './samples/lazyRedux/root.store';

export default () => (
  <Provider store={store}>
    <ResponsiveNavigationSample />
    <HightlightSample />
    <ConfigurationSample />
    <LazyPaginationSample />
    <LazyReduxSample />
    <LazyImageSample />
    <LazyResponsiveImageSample />
    <ResponsiveImageSample />
    <InfiniteScrollingSample />
    <BreakpointsSample />
  </Provider>
);
