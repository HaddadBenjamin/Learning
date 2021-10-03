import React from 'react';
import { lazyImageDatas } from './shared/domains/lazyLoad/lazyImage/lazyImage.mock';
import LazyImage from "./shared/domains/lazyLoad/lazyImage/components/LazyImage";

export const App = () => <div>
    <h1>Lazy Load Images</h1>
    <section>
      { lazyImageDatas.map(data => <LazyImage key={data.id} {...data}/>) }
    </section>
  </div>
