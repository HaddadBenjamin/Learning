import React, {FC, MutableRefObject, useEffect, useRef} from "react";
import cn from 'classnames'
import styles from './AnimatedText.module.scss'


interface ITypeWriterParameters {
  ref:  MutableRefObject<HTMLDivElement>

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
      pauseDuration
    } : ITypeWriterParameters)
  {
    this.element = ref.current

    this.loop = loop ?? true;
    this.typingSpeed = typingSpeed ?? 100
    this.deleteACharaterSpeed = deleteACharaterSpeed ?? 50
    this.deleteAllCharatersSpeed = deleteAllCharatersSpeed ?? 10
    this.pauseDuration = pauseDuration ?? 1000
  }

  typeString(text : string, speed: number = this.typingSpeed) : TypeWriter
  {
    return this.addToQueue(resolve => {
      let i = 0
      const interval = setInterval(() => {
        this.element.append(text[i++])
        if (i >= text.length) {
          clearInterval(interval)
          resolve()
        }
      }, speed)
    })
    // return this.addInQueue(resolve => {
    //   let characterIndex = 0
    //   const setIntervalId = setInterval(() => {
    //     if (text.length > characterIndex) {
    //       const character = text[characterIndex++]
    //       this.element.append(character);
    //     }
    //     else {
    //       clearInterval(setIntervalId);
    //       resolve()
    //     }
    //   }, speed);
    // })
  }

  pauseFor(pauseDuration: number = this.pauseDuration) : TypeWriter {
    return this.addToQueue(resolve => { setTimeout(resolve, pauseDuration) })
  }

  // todo simplifie
  private addToQueue(cb: (resolve: () => void) => void) {
    this.queue.push(() => new Promise<void>(cb))

    return this
  }

  async start ()
  {
    let cb = this.queue.shift()
    while (cb != null) {
      await cb()
      if (this.loop) this.queue.push(cb)
      cb = this.queue.shift()
    }

    return this

    // TODO; use looopp
    // for (let action of this.queue) await action
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
      .pauseFor(1000)
      .typeString("\n\nfunctio")
      .start();
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