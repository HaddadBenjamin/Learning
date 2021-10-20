import {ApplicationState} from "./root.state";

export const selectMessage = (state : ApplicationState) : string | undefined => state?.fakeDomain?.message