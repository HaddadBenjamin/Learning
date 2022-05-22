import {useContext} from "react";
import {ToastContext} from "./toast.context";
import {IToastContextState} from "./toast.model";

const useToast = () : IToastContextState => useContext(ToastContext);

export default useToast;