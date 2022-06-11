import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SLIDER_ROUTER } from "../../../constants/backend";
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from "../../../constants/slider";
import { sliderActions } from "../slider-slice.ts";

export const adminDeleteSlider = (
  token: string, 
  _id: string,
  index: number
  ) => async (dispatch: Dispatch) => {
  
  dispatch(sliderActions.delete({type: SLIDER_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const deleteSliderRequest = async () => {
    return await axios.delete(`${BACKEND_SLIDER_ROUTER}/${_id}`, config);
  }

  try {
    await deleteSliderRequest();

    dispatch(sliderActions.delete({
      type: SLIDER_SUCCESS,
      payload: '',
      index
    }));
  } catch (error: any) {
    dispatch(sliderActions.delete({
      type: SLIDER_FAIL,
      payload: error.response.data.message
    }));
  }

}