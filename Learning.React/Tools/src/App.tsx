import React from 'react';
import { Provider } from 'react-redux';
import {QueryClient, QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import InfiniteScrollingSample from './samples/infiniteScrolling/InfiniteScrollingSample';
import LazyImageSample from './samples/lazyImage/LazyImageSample';
import HightlightSample from './samples/ui/highlight/HightlightSample';
import LazyResponsiveImageSample from './samples/lazyResponsiveImage/LazyResponsiveImageSample';
import ResponsiveImageSample from './samples/responsiveImage/ResponsiveImageSample';
import LazyReduxSample from './samples/lazyRedux/LazyReduxSample';
import BreakpointsSample from './samples/breakpoints/BreakpointsSample';
import ResponsiveNavigationSample
    from './samples/ui/responsiveNavigation/ResponsiveNavigationSample/ResponsiveNavigationSample';
import LazyPaginationSample from './samples/lazyPagination/LazyPaginationSample';
import SimplePaginationSample from './samples/lazyPagination/SimplePaginationSample';
import store from './samples/lazyRedux/root.store';
import LocalizationSample from "./samples/localization/LocalizationSample";

const queryClient = new QueryClient()
export default () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        
        <ResponsiveNavigationSample />
        <HightlightSample />
        <LocalizationSample/>
        <SimplePaginationSample/>
        <LazyPaginationSample />
        <LazyReduxSample />
        <LazyImageSample />
        <LazyResponsiveImageSample />
        <ResponsiveImageSample />
        <InfiniteScrollingSample />
        <BreakpointsSample />
    </QueryClientProvider>
  </Provider>
);
