import { createSlice } from "@reduxjs/toolkit";
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from "../../constants/slider";
import { ISelectedSlider, ISlider } from "../../interfaces/ISlider";

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    slider: {
      loading: false,
      error: null,
      data: [] as Array<ISlider>
    },
    selectedSlider: {} as ISelectedSlider
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
    },
    edit(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case SLIDER_REQUEST:
          state.slider.loading = true;
          state.slider.error = null;
          break;
        case SLIDER_SUCCESS:
          state.slider.loading = false;
          state.slider.error = null;
          state.slider.data[index] = payload;
          break;
        case SLIDER_FAIL:
          state.slider.loading = false;
          state.slider.error = payload;
          break;
      }
    },
    delete(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case SLIDER_REQUEST:
          state.slider.loading = true;
          state.slider.error = null;
          break;
        case SLIDER_SUCCESS:
          state.slider.loading = false;
          state.slider.error = null;
          state.slider.data.splice(index ,1);;
          break;
        case SLIDER_FAIL:
          state.slider.loading = false;
          state.slider.error = payload;
          break;
      }
    },
    select(state, action) {
      const {_id, index} = action.payload;
      state.selectedSlider = {
        _id,
        index
      };
    }
  }
});

export const sliderActions = sliderSlice.actions;
export default sliderSlice;