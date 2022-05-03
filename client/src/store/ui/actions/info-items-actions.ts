import { IInfoMessage } from "../../../interfaces/IInfoMessage";
import { uiActions } from "../ui-slice"

export const addInfoMessage = (infoMessage: IInfoMessage) => (dispatch: any) => {
  dispatch(uiActions.addInfoMessage({payload: infoMessage}));
}

export const removeInfoMessage = (index: number) => (dispatch: any) => {
  dispatch(uiActions.removeInfoMessage({payload: index}));
}