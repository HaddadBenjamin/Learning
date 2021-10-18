import { FC } from 'react';
import { ResponsiveImageData } from "../responsiveImage.models";

interface Props 
{
  images : ResponsiveImageData[]
  alt : string
  className?: string
}

const ResponsiveImage : FC<Props> = ({ images, alt, className }) => {
  const largestImage = images.reduce((previous, current) => current.width > previous.width ? current : previous)
  const sizes = `(max-width: ${largestImage.width}px) 100vw, ${largestImage.width}px`
  const srcSet = images.map(i => `${i.url} ${i.width}w`).join(',\n')

  return <img
    sizes={sizes}
    srcSet={srcSet}
    src={largestImage.url}
    alt={alt}
    className={className}/>
}

export default ResponsiveImage