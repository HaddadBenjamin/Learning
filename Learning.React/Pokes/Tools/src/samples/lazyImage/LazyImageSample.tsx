import React from 'react';
import { lazyImageDatas } from './lazyImage.mock';
import LazyImage from "../../shared/domains/lazyLoad/lazyImage/components/LazyImage";

export const LazyImageSample = () =>
  <div>
    <h1>Lazy Load Images</h1>
    <section>
      { lazyImageDatas.map(data => <LazyImage key={data.id} {...data}/>) }
    </section>
  </div>
