import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';
import TypeWriter, {ITypeWriterParameters} from "./TyperWriter";

interface Props {
  className? : string
}

const AnimatedText : FC<Props & Omit<ITypeWriterParameters, 'ref'>> = (props) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    new TypeWriter({ ...props, ref })
      .typeCharaters("This is my incredible typing animation ! let's pause 1s")
      .pauseFor(1000)
      .typeCharaters("\n\nLet's type a bit faster then remove characters slowly", 10)
      .pauseFor(350)
      .deleteCharacters(7, 500)
      .deleteCharacters(2)
      .typeCharaters("\n\nNice it's look to work well, let's pause 350ms")
      .pauseFor(350)
      .typeCharaters("\n\nIt's time to delete every characters, thank you for being here !")
      .pauseFor(500)
      .deleteAllCharacters(10)
      .start();
  }, []);

  return <div>
    <h3>Texte animé</h3>
    <div ref={ref} className={props.className} style={{ whiteSpace: 'pre-wrap' }} />
  </div>
};

export default AnimatedText;
