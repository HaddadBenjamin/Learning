import React, { createContext, FC, useState } from 'react';
import { IToast, IToastContextState, ToastType } from './toast.model';
import styles from './toast.context.module.scss';
import newGuid from '../../utilities/newGuid';
import Toast from './Toast';

export const ToastContext = createContext<IToastContextState>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  success: () => { }, warning: () => {}, error: () => { }, toast: () => { },
});

const ToastContextProvider: FC = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const success = (text: string) => toast(text);
  const warning = (text: string) => toast(text, 'warning');
  const error = (text: string) => toast(text, 'error');
  const toast = (text : string, type : ToastType = 'success') => {
    const id = newGuid();

    setToasts([...toasts, {
      text, type, duration: 4, id,
    }]);
    setTimeout(() => removeToast(id), 4000);
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
