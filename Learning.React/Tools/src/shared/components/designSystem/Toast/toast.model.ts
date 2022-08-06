export type ToastType = 'success' | 'warning' | 'error'

export interface IToast {
  text: string,
  type: ToastType,
  id: string,
  duration: number
}

export interface IToastContextState {
  toast : (message : string, type? : ToastType) => void,
  success : (message : string) => void,
  warning : (message : string) => void,
  error : (message : string) => void,
}
