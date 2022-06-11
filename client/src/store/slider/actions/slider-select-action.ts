import { Dispatch } from "@reduxjs/toolkit";
import { ISelectedSlider } from "../../../interfaces/ISlider";
import { sliderActions } from "../slider-slice.ts";

export const selectSlider = ({_id, index}: ISelectedSlider) => (dispatch: Dispatch) => {
  dispatch(sliderActions.select({_id, index}));
}