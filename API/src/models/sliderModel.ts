import mongoose from "mongoose";
import { ISlider } from "../interfaces/slider/ISlider";

const sliderSchema = new mongoose.Schema<ISlider>({
  title: {
    type: String,
    trim: true,
    default: ''
  },

  description: {
    type: String,
    trim: true,
    default: ''
  },

  color: {
    type: String,
    trim: true,
    default: ''
  },

  pageUrl: {
    type: String,
    trim: true,
    default: ''
  },

  imageUrl: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

const Slider = mongoose.model<ISlider>('Slider', sliderSchema);
export default Slider;