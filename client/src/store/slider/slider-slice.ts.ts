import { createSlice } from "@reduxjs/toolkit";
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from "../../constants/slider";
import { ISlider } from "../../interfaces/ISlider";

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    slider: {
      loading: false,
      error: null,
      data: [] as Array<ISlider>
    },
  },
  reducers: {
    create(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case SLIDER_REQUEST:
          state.slider.loading = true;
          state.slider.error = null;
          break;
        case SLIDER_SUCCESS:
          state.slider.loading = false;
          state.slider.error = null;
          state.slider.data.push(payload);
          break;
        case SLIDER_FAIL:
          state.slider.loading = false;
          state.slider.error = payload;
          break;
      }
    },
    get(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case SLIDER_REQUEST:
          state.slider.loading = true;
          state.slider.error = null;
          break;
        case SLIDER_SUCCESS:
          state.slider.loading = false;
          state.slider.error = null;
          state.slider.data = payload;
          break;
        case SLIDER_FAIL:
          state.slider.loading = false;
          state.slider.error = payload;
          break;
      }
    }
  }
});

export const sliderActions = sliderSlice.actions;
export default sliderSlice;