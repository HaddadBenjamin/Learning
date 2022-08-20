/* eslint-disable no-plusplus, no-await-in-loop, react/destructuring-assignment, no-param-reassign */
import React, {
  FC, MutableRefObject, useEffect, useRef,
} from 'react';

interface ITypeWriterParameters {
  ref: MutableRefObject<HTMLDivElement>

  loop? : boolean,
  typingSpeed?: number
  deleteACharaterSpeed?: number
  deleteAllCharatersSpeed?: number
  pauseDuration?: number
}

class TypeWriter {
  element: HTMLElement

  queue: (() => Promise<void>)[] = []; // permet chacune des actions de typing les unes à la suite des autres.

  loop: boolean;

  typingSpeed: number

  deleteACharaterSpeed: number

  deleteAllCharatersSpeed: number

  pauseDuration: number

  constructor(
    {
      ref,

      loop,
      typingSpeed,
      deleteACharaterSpeed,
      deleteAllCharatersSpeed,
      pauseDuration,
    } : ITypeWriterParameters) {
    this.element = ref.current;

    this.loop = loop ?? true;
    this.typingSpeed = typingSpeed ?? 50;
    this.deleteACharaterSpeed = deleteACharaterSpeed ?? 25;
    this.deleteAllCharatersSpeed = deleteAllCharatersSpeed ?? 10;
    this.pauseDuration = pauseDuration ?? 1000;
  }

  typeCharaters(text : string, typingSpeed: number = this.typingSpeed) : TypeWriter {
    return this.addToQueue((resolve) => {
      let characterIndex = 0;

      const intervalId = setInterval(() => {
        this.element.append(text[characterIndex++]);

        if (characterIndex >= text.length) {
          clearInterval(intervalId);
          resolve();
        }
      }, typingSpeed);
    });
  }

  deleteCharacters(toDeleteCount: number, deleteACharaterSpeed : number = this.deleteACharaterSpeed) : TypeWriter {
    return this.addToQueue((resolve) => {
      const intervalId = setInterval(() => {
        this.element.innerText = this.element.innerText.substring(0, this.element.innerText.length - 1);

        if (toDeleteCount-- <= 0) {
          clearInterval(intervalId);
          resolve();
        }
      }, deleteACharaterSpeed);
    });
  }

  deleteAllCharacters(deleteAllCharatersSpeed : number = this.deleteAllCharatersSpeed) : TypeWriter {
    return this.addToQueue((resolve) => {
      const intervalId = setInterval(() => {
        this.element.innerText = this.element.innerText.substring(0, this.element.innerText.length - 1);

        if (this.element.innerText.length <= 0) {
          clearInterval(intervalId);
          resolve();
        }
      }, deleteAllCharatersSpeed);
    });
  }

  pauseFor(pauseDuration: number = this.pauseDuration) : TypeWriter {
    return this.addToQueue((resolve) => { setTimeout(resolve, pauseDuration); });
  }

  private addToQueue(queueAction: (resolve: () => void) => void) {
    this.queue.push(() => new Promise<void>(queueAction));

    return this;
  }

  async start() {
    let queueAction = this.queue.shift();

    while (queueAction != null) {
      await queueAction();

      if (this.loop) this.queue.push(queueAction);

      queueAction = this.queue.shift();
    }
  }
}

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
  return <div ref={ref} className={props.className} style={{ whiteSpace: 'pre-wrap' }} />;
};

export default AnimatedText;
