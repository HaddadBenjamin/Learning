import React, {
  FC,
  useEffect,
  useState,
} from 'react';

interface Props
{
  anchor : string,
  text : string,
  offsetY? : number,
  className? : string,
  scrollOnMouth?: boolean
}

// Redirige vers une ancre de façon fluide.
const AnchorLink : FC<Props> = ({
  anchor,
  text,
  offsetY = 0,
  className,
  scrollOnMouth,
}) => {
  const [anchorTarget, setAnchorTarget] = useState<HTMLElement | null>(null);

  const onClick = (event? : React.MouseEvent<HTMLAnchorElement>) : void => {
    event?.preventDefault();

    if (!anchorTarget) return;

    const positionY = anchorTarget!.getBoundingClientRect().top + window.pageYOffset + offsetY;

    window.scrollTo({ top: positionY, behavior: 'smooth' });
  };

  useEffect(() => setAnchorTarget(document.getElementById(anchor)), [anchor]);
  useEffect(() => {
    if (scrollOnMouth && anchorTarget) onClick();
  }, [scrollOnMouth, anchorTarget]);


  return (
    <a
      href={`#${anchor}`}
      className={className}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export default AnchorLink;
