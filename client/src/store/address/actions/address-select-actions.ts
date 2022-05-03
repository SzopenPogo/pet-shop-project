import { ISelectedAddress } from "../../../interfaces/IAddressData"
import { addressActions } from "../address-slice"

export const addressSelect = (addressData: ISelectedAddress) => (dispatch: any) => {
  dispatch(addressActions.select({
    payload: addressData
  }));
}