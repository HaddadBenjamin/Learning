import { responsiveImageDatasMock } from './lazyResponsiveImage.mock';
import LazyResponsiveImage from "../../shared/domains/lazyLoad/lazyResponsiveImage/components/LazyResponsiveImage";

const LazyResponsiveImageSample = () =>
  <div>
    <h2>Lazy Responsive Image</h2>

    <LazyResponsiveImage
      images={responsiveImageDatasMock}
      alt="diablo background"
      width={1400}
      height={788}
    />
  </div>

export default LazyResponsiveImageSample