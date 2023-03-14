/* eslint-disable react/no-unescaped-entities */
import React, { ChangeEvent, useCallback, useState } from 'react';
import { throttle, debounce } from 'lodash';
import styles from './ThrottleAndDebounce.module.scss';

const ThrottleAndDebounceSample = () => {
  const [value, setValue] = useState<string|undefined>();
  const [thottleValue, setThrottleValue] = useState<string|undefined>();
  const [debounceValue, setDebounceValue] = useState<string|undefined>();

  const [debugValue, setDebugValue] = useState<string|undefined>();
  const [thottleDebugValue, setThrottleDebugValue] = useState<string|undefined>();
  const [debounceDebugValue, setDebounceDebugValue] = useState<string|undefined>();

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setDebugValue(event.target.value);
  };

  const onThrottleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThrottleValue(event.target.value);
    throttledChange(event.target.value);
  };
  const throttledChange = useCallback(throttle((value : string) => setThrottleDebugValue(value), 300), []);

  const onDebounceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDebounceValue(event.target.value);
    debouncedChange(event.target.value);
  };
  const debouncedChange = useCallback(debounce((value : string) => setDebounceDebugValue(value), 300), []);

  return (
    <div>
      <h2>Throttle VS Debounce : Voir mes hooks useThrottle & useDebounce pour simplifier</h2>

      <div className={styles.container}>
        <div>
          <p>Par défault : La fonction est appelée à chaque modification</p>
          <input type='text' value={value} onChange={onValueChange} placeholder='value without throttle or debounce' />
          <p>{debugValue}</p>
        </div>

        <div>
          <p>Avec useDefferedValue: équivalent à un debounce de 100ms, voir mes notes</p>
        </div>

        <div>
          <p>Avec du throttle : Limite l'appel de la fonction une fois tout les n temps</p>
          <input type='text' value={thottleValue} onChange={onThrottleChange} placeholder='throttle value' />
          <p>{thottleDebugValue}</p>
        </div>

        <div>
          <p>Avec du debounce : Apelle la fonction qu'une fois à la fin des actions de l'utilisateur</p>
          <input type='text' value={debounceValue} onChange={onDebounceChange} placeholder='debounce value' />
          <p>{debounceDebugValue}</p>
        </div>
      </div>
    </div>
  );
};

export default ThrottleAndDebounceSample;
