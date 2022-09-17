import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Aos from 'aos';
import InfiniteScrollingSample from './samples/infiniteScrolling/InfiniteScrollingSample';
import LazyImageSample from './samples/lazyImage/LazyImageSample';
import HightlightSample from './samples/ui/highlight/HightlightSample';
import LazyResponsiveImageSample from './samples/lazyResponsiveImage/LazyResponsiveImageSample';
import ResponsiveImageSample from './samples/responsiveImage/ResponsiveImageSample';
import LazyReduxSample from './samples/lazyRedux/LazyReduxSample';
import BreakpointsSample from './samples/breakpoints/BreakpointsSample';
import ResponsiveNavigationSample
  from './samples/ui/responsiveNavigation/ResponsiveNavigationSample/ResponsiveNavigationSample';
import LazyPaginationSample from './samples/pagination/lazyPagination/LazyPaginationSample';
import SimplePaginationSample from './samples/pagination/lazyPagination/SimplePaginationSample';
import store from './samples/lazyRedux/root.store';
import LocalizationSample from './samples/localization/LocalizationSample';
import WebSocketSample from './samples/websocket/WebSocketSample';
import FrontEndPaginationSample from './samples/pagination/frontEndPagination/FrontEndPagination';
import BackEndPaginationSample from './samples/pagination/backEndPagination/BackEndPagination';
import AnimationSample from './samples/animations/AnimationSample';
import ThrottleAndDebounceSample from './samples/throttleAndDebounce/ThrottleAndDebounceSample';
import LazyComponentSample from './samples/lazyComponent/LazyComponentSample';

import 'aos/dist/aos.css';

const queryClient = new QueryClient();
export default () => {
  useEffect(() => { Aos.init(); }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <ThrottleAndDebounceSample />

        <FrontEndPaginationSample />
        <BackEndPaginationSample />

        <ResponsiveNavigationSample />
        <HightlightSample />
        <LocalizationSample />
        <AnimationSample />
        <SimplePaginationSample />
        <LazyPaginationSample />
        <LazyReduxSample />
        <LazyComponentSample />
        <LazyImageSample />
        <LazyResponsiveImageSample />
        <ResponsiveImageSample />
        <InfiniteScrollingSample />
        <BreakpointsSample />

        <WebSocketSample />
      </QueryClientProvider>
    </Provider>
  );
};
