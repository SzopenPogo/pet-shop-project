import { Dispatch } from "@reduxjs/toolkit";
import { ISelectedAddress } from "../../../interfaces/IAddressData"
import { addressActions } from "../address-slice"

export const addressSelect = (addressData: ISelectedAddress) => (dispatch: Dispatch) => {
  dispatch(addressActions.select({
    payload: addressData
  }));
}

export const addressSelectById = (_id: string) => (dispatch: Dispatch) => {
  dispatch(addressActions.selectById(_id))
}