export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAIL = 'ORDER_FAIL';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

export const ORDER_PENDING_STATUS = 'Pending';
export const ORDER_SHIPPING_STATUS = 'Shipping';
export const ORDER_COMPLETE_STATUS = 'Complete';
export const ORDER_CANCELED_STATUS = 'Canceled';

export const ORDER_STATUS_OPTIONS = [{
  title: ORDER_PENDING_STATUS,
  value: ORDER_PENDING_STATUS
}, {
  title: ORDER_SHIPPING_STATUS,
  value: ORDER_SHIPPING_STATUS
}, {
  title: ORDER_COMPLETE_STATUS,
  value: ORDER_COMPLETE_STATUS
}, {
  title: ORDER_CANCELED_STATUS,
  value: ORDER_CANCELED_STATUS
}];