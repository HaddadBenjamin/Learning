export type ToastType = 'success' | 'warning' | 'error'

export interface IToast {
  text: string,
  type: ToastType,
  id: string,
  duration: number
}

export interface IToastContextState {
  toast : (message : string, type? : ToastType, duration?: number, callback?: () => void) => void,
  success : (message : string, duration?: number, callback?: () => void) => void,
  warning : (message : string, duration?: number, callback?: () => void) => void,
  error : (message : string, duration?: number, callback?: () => void) => void,
}
