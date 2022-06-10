import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SLIDER_ROUTER } from "../../../constants/backend";
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from "../../../constants/slider";
import { ISlider } from "../../../interfaces/ISlider";
import { sliderActions } from "../slider-slice.ts";

export const adminCreateSlider = (
  token: string, 
  image: File, 
  { title,
  description,
  pageUrl,
  color
  }: ISlider) => async (dispatch: Dispatch) => {
  
  dispatch(sliderActions.create({type: SLIDER_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const formData = new FormData();
  formData.append('image', image, image.name);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('pageUrl', pageUrl);
  formData.append('color', color);

  const createSliderRequest = async () => {
    return await axios.post(BACKEND_SLIDER_ROUTER, formData, config);
  }

  try {
    const { data } = await createSliderRequest();

    dispatch(sliderActions.create({
      type: SLIDER_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    dispatch(sliderActions.create({
      type: SLIDER_FAIL,
      payload: error.response.data.message
    }));
  }
}