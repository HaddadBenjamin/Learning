import React from 'react';
import { lazyImageDatas } from './lazyImage.mock';
import LazyImage from "../../shared/domains/lazyLoad/lazyImage/components/LazyImage";

const LazyImageSample = () =>
  <div>
    <h2>Lazy Images Load</h2>

    <section>
      { lazyImageDatas.map(data => <LazyImage key={data.alt} {...data}/>) }
    </section>
  </div>

export default LazyImageSample
