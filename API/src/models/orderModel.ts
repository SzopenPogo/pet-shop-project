import mongoose from "mongoose";
import { ORDER_PENDING_STATUS } from "../constants/order/order";
import { IOrder } from "../interfaces/order/IOrder";

const orderSchema = new mongoose.Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },

  country: {
    type: String,
    trim: true,
    required: true
  },

  postalCode: {
    type: String,
    trim: true,
    required: true
  },

  city: {
    type: String,
    trim: true,
    required: true
  },

  street: {
    type: String,
    trim: true,
    required: true
  },

  homeNumber: {
    type: String,
    trim: true,
    required: true
  },

  phoneNumber: {
    type: Number,
    trim: true,
    required: true
  },

  paymentMethod: {
    type: String,
    trim: true,
    required: true
  },

  status: {
    type: String,
    trim: true,
    default: ORDER_PENDING_STATUS
  },

  products: [{
    _id: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      trim: true
    }
  }],

  totalPrice: {
    type: Number,
    required: true,
    trim: true
  },

  totalAmount: {
    type: Number,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;