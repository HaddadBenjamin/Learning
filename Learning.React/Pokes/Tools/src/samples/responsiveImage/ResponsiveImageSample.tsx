import { responsiveImageDatasMock } from './responsiveImage.mock';
import ResponsiveImage from "../../shared/domains/image/responsiveImage/components/reponsiveImage";

const ResponsiveImageSample = () =>
  <div>
    <h2>Responsive Image</h2>

    <ResponsiveImage
      images={responsiveImageDatasMock}
      alt="diablo background"/>
  </div>

export default ResponsiveImageSample