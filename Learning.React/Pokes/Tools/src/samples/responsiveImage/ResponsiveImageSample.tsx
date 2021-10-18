import ResponsiveImage from '../../shared/domains/image/responsiveImage/components/reponsiveImage';
import { responsiveImageDatasMock } from './responsiveImage.mock';

const ResponsiveImageSample = () =>
  <div>
    <h2>Responsive Images</h2>

    <ResponsiveImage images={responsiveImageDatasMock} alt="diablo background"/>
  </div>

export default ResponsiveImageSample