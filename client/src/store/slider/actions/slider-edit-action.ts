import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SLIDER_ROUTER } from "../../../constants/backend";
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from "../../../constants/slider";
import { ISlider } from "../../../interfaces/ISlider";
import { sliderActions } from "../slider-slice.ts";

export const adminEditSlider = (
  token: string,
  index: number,
  image: File,
  {
    _id,
    title,
    description,
    color,
    pageUrl
  }:ISlider) => async (dispatch: Dispatch) => {
  
    dispatch(sliderActions.edit({type: SLIDER_REQUEST}));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('color', color);
    formData.append('description', description);
    formData.append('pageUrl', pageUrl);
    if(image) {
      formData.append('image', image, image.name);
    }
    
    const editSliderRequest = async () => {
      return await axios.patch(`${BACKEND_SLIDER_ROUTER}/${_id}`, formData, config);
    }

    try {
      const { data } = await editSliderRequest();
  
      dispatch(sliderActions.edit({
        type: SLIDER_SUCCESS,
        payload: data,
        index
      }));
    } catch (error: any) {
      dispatch(sliderActions.edit({
        type: SLIDER_FAIL,
        payload: error.response.data.message
      }));
    }
}