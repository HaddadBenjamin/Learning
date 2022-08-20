import React, {FC, MutableRefObject, useEffect, useRef} from "react";
import cn from 'classnames'
import styles from './AnimatedText.module.scss'


interface ITypeWriterParameters {
  ref:  MutableRefObject<HTMLDivElement>

  loop? : boolean,
  typingSpeed?: number
  deleteACharaterSpeed?: number
  deleteAllCharatersSpeed?: number
}

class TypeWriter {
  element: HTMLElement
  queue: Promise<void>[]; // permet chacune des actions de typing les unes à la suite des autres.

  loop: boolean;
  typingSpeed: number
  deleteACharaterSpeed: number
  deleteAllCharatersSpeed: number

  constructor(
    {
      ref,

      loop,
      typingSpeed,
      deleteACharaterSpeed,
      deleteAllCharatersSpeed
    } : ITypeWriterParameters)
  {
    this.element = ref.current
    this.queue = []

    this.loop = loop ?? true;
    this.typingSpeed = typingSpeed ?? 100
    this.deleteACharaterSpeed = deleteACharaterSpeed ?? 50
    this.deleteAllCharatersSpeed = deleteAllCharatersSpeed ?? 10
  }

  typeString(text : string, speed: number = this.typingSpeed) : TypeWriter
  {
    return this.addInQueue((resolve) => {
      let characterIndex = 0
      let refreshIntervalId = setInterval(() => {
        if (text.length > characterIndex) {
          let character = text[characterIndex++]
          this.element.textContent = this.element.textContent + character;
        }
        else {
          clearInterval(refreshIntervalId);
          resolve()
        }
      }, speed);
    })
  }

  private addInQueue(callback : (resolve: () => void) => void) : TypeWriter
  {
    this.queue.push(new Promise(callback))

    return this;
  }

  async start ()
  {
    for (let action of this.queue) await action()
  }
}

interface Props {
  className? : string
}

const AnimatedText : FC<Props & Omit<ITypeWriterParameters, 'ref'>> = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    new TypeWriter({ loop : true, ref })
      .typeString("Where Do I Start?")
      .start();
    // .pauseFor(1000)
    // .typeString("\n\nfunctio")
    // .deleteChars(7)
    // .typeString("const temp")
    // .pauseFor(150)
    // .deleteAll(10)
    // .start()

  }, [])
  return <div ref={ref}></div>;
}

export default AnimatedText;