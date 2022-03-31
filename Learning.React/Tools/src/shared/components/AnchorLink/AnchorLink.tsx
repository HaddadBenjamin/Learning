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
  scrollOnMount?: boolean
}

// Redirige vers une ancre de façon fluide.
const AnchorLink : FC<Props> = ({
  anchor,
  text,
  offsetY = 0,
  className,
  scrollOnMount,
}) => {
  const [clicked, setClicked] = useState(false);
  const [targetPositionY, setTargetPositionY] = useState<number | null>(null);

  const getTargetPositionY = () : number | null => {
    if (!document || !window) return null;

    const targetHtmlElement = document.getElementById(anchor);

    if (!targetHtmlElement) return null;

    return targetHtmlElement.getBoundingClientRect().top + window.pageYOffset + offsetY;
  };

  const onClick = (event? : React.MouseEvent<HTMLAnchorElement>) : void => {
    event?.preventDefault();

    const newTargetPositionY = getTargetPositionY();

    if (!newTargetPositionY) return;

    window.scrollTo({ top: newTargetPositionY, behavior: 'smooth' });

    setClicked(true);
    setTargetPositionY(newTargetPositionY);
  };

  useEffect(() => {
    if (scrollOnMount) onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollOnMount]);

  useEffect(() => {
    if (clicked && targetPositionY && scrollOnMount) onClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPositionY, clicked, scrollOnMount]);

  useEffect(() => {
    const updateTargetPositionY = () => setTargetPositionY(getTargetPositionY());
    const updateTargetPositionYInterval = setInterval(() => updateTargetPositionY(), 1000);

    return () => clearInterval(updateTargetPositionYInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
