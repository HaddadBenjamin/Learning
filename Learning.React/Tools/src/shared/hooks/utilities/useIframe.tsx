import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styles from './useIframe.module.scss';

const useIframe = (url : string, title : string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  const iframe = (
    <div className={styles.iframeContainer}>
      <iframe
        className={styles.iframe}
        ref={ref}
        src={url}
        title={title}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  );

  const onIframeLoad = useCallback(() => {
    const error404 = ref?.current?.contentDocument?.body?.getElementsByTagName('h1');

    if (error404) {
      if (ref?.current?.style) ref.current.style.display = 'none';
      setError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    ref.current?.addEventListener('load', onIframeLoad);
    return () => { // eslint-disable-next-line
      ref.current?.removeEventListener('load', onIframeLoad);
    };
  }, [onIframeLoad]);

  return { iframe, error, isLoading };
};

export default useIframe;
