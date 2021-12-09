import UseCallbackAndReactMemo from "./useCallbackAndReactMemo/useCallbackAndReactMemo";
import UseMemo from "./useMemo/useMemo";
import UseEffect from "./useEffect/useEffect";
import UseRef from "./useRef/useRef";
import UserContextProvider from "./useContextAndReducer/context";
import UseContextAndReducer from "./useContextAndReducer/useContextAndReducer";
import styles from './App.module.css'
import UseLayoutEffect from "./useLayoutEffect/useLayoutEffect";

const App = () =>
    <>
        <div className={styles.container}>
            <UseEffect/>
            <UserContextProvider>
                <UseContextAndReducer/>
            </UserContextProvider>
        </div>

        <UseRef/>
        <UseLayoutEffect/>
        <UseCallbackAndReactMemo/>
        <UseMemo/>
    </>

export default App