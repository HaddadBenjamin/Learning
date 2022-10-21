/* eslint-disable no-tabs,no-mixed-spaces-and-tabs */
import { MutableRefObject, useEffect, useRef } from 'react';

interface ICreatePopup {
	url: string,
	popup : {
		title?: string,
		width?: number,
		height?: number,
		centered?: boolean
	}
}

const createPopup = (
  {
    url,
    popup: {
      title = 'OAuth Popup',
      width = 600,
      height = 600,
      centered = true,
    },
  } : ICreatePopup) : Window | null => {
  const top = !centered ? 0 : window.outerHeight / 2 + window.screenY - height / 2;
  const left = !centered ? 0 : window.outerWidth / 2 + window.screenX - width / 2;

  return window.open(url, title, `height=${height},width=${width},top=${top},left=${left}`);
};

export default createPopup;

interface IListenPopupUrl {
	popup: Window | null,
	onPopupUrlChange : (url: string, intervalRef: MutableRefObject<number | undefined>) => void
}

export const useListenPopupUrl = ({ onPopupUrlChange, popup } : IListenPopupUrl) : void => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (popup) {
      intervalRef.current = window.setInterval(() => {
        // eslint-disable-next-line no-empty
        try { onPopupUrlChange(popup.location.href, intervalRef); } catch (e) { }
      }, 700);
    }
  }, [popup]);
};
