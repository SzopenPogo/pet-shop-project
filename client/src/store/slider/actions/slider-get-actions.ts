import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SLIDER_ROUTER } from "../../../constants/backend";
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from "../../../constants/slider";
import { sliderActions } from "../slider-slice.ts";

export const sliderGet = () => async (dispatch: Dispatch) => {
  sliderActions.get({type: SLIDER_REQUEST});

  const sliderGetRequest = async () => {
    return await axios.get(BACKEND_SLIDER_ROUTER);
  }

  try {
    const { data } = await sliderGetRequest();
    
    dispatch(sliderActions.get({
      type: SLIDER_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(sliderActions.get({
      type: SLIDER_FAIL,
      payload: error.response.data.message
    }))
  }
}