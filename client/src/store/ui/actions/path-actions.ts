import { Dispatch } from "@reduxjs/toolkit";
import { IPatch } from "../../../interfaces/IPath";
import { uiActions } from "../ui-slice";

export const resetPath = () => (dispath: Dispatch) => {
  dispath(uiActions.resetPath());
}

export const addToPath = (pathes: Array<IPatch>) => (dispath: Dispatch) => {
  dispath(uiActions.addToPath(pathes));
}