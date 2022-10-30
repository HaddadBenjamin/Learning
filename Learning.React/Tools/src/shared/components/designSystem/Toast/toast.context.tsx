import React, { createContext, FC, useState } from 'react';
import { IToast, IToastContextState, ToastType } from './toast.model';
import styles from './toast.context.module.scss';
import newGuid from '../../../utilities/type/string/newGuid';
import Toast from './Toast';

export const ToastContext = createContext<IToastContextState>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  success: () => { }, warning: () => {}, error: () => { }, toast: () => { },
});

const ToastContextProvider: FC = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const success = (text: string, duration? : number, callback?: () => void) => toast(text, 'success', duration, callback);
  const warning = (text: string, duration? : number, callback?: () => void) => toast(text, 'warning', duration, callback);
  const error = (text: string, duration? : number, callback?: () => void) => toast(text, 'error', duration, callback);
  const toast = (text : string, type : ToastType = 'success', duration = 4, callback?: () => void) => {
    const id = newGuid();

    setToasts([...toasts, {
      text, type, duration, id,
    }]);
    setTimeout(() => {
      removeToast(id);
      callback?.();
    }, duration * 1000);
  };

  const removeToast = (id: string) => setToasts((previousToasts) => previousToasts.filter((toast) => toast.id !== id));

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ToastContext.Provider value={{
      error, success, warning, toast,
    }}
    >
      {children}
      <div className={styles.container}>
        {toasts.map((toast) => <Toast key={toast.id} {...toast} onClickCross={() => removeToast(toast.id)} />)}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
