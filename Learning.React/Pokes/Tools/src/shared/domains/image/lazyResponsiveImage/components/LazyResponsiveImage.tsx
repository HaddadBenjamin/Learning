import React, { FC } from 'react';
import useResponsiveImage from "../../responsiveImage/hooks/useResponsiveImage";
import LazyImage from "../../lazyImage/components/LazyImage";
import {ResponsiveImageData} from "../../responsiveImage/responsiveImage.models";

interface Props
{
  images : ResponsiveImageData[]
  alt : string
  width : number // Image width on large resolution
  height : number // Image height on on large resolution
  className?: string
}

const LazyResponsiveImage : FC<Props> = (
{
  images,
  alt,
  width,
  height,
  className
}) => {
  const { sizes, srcSet, src } = useResponsiveImage(images)
  
  return <LazyImage
    sizes={sizes}
    srcSet={srcSet}
    
    src={src}
    alt={alt}
    width={width}
    height={height}
    
    className={className}/>
};

export default LazyResponsiveImage;
