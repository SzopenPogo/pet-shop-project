import { CARD_PAYMENT_METHOD, DELIVERY_PAYMENT_METHOD } from "../../constants/paymentMethod";

export const setPaymentMethodName = (paymentMethod: string) => {

  let paymentMethodValue = '';

  switch (paymentMethod) {
    case CARD_PAYMENT_METHOD:
      paymentMethodValue = 'Card'
      break;
    case DELIVERY_PAYMENT_METHOD:
      paymentMethodValue = 'On delivery'
      break;
    default:
      break;
  }

  return paymentMethodValue;
}