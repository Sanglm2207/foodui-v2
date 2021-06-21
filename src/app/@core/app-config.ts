export const CONFIG: any = {
  API_PATH: {
    'categories': '/categories',
    'products': '/product',
    'order': '/order',
    'customer': '/customer',
    'order.detail': '/order/detail',
    'options.size': '/options/size',
    'options.ice': '/options/ice',
    'options.topping': '/options/topping',
    'city': '/city',
    'store': '/store',
    'customer.travel': '/customer/travel',
    'customer.postal': '/customer/postal',
  },
};

export const DEFAULT_MODAL_OPTIONS: any = {
  backdrop: 'static',
  keyboard: false,
  size: 'lg',
  centered: true,
};
export const SMALL_MODAL_OPTIONS: any = {
  size: 'md',
  keyboard: true,
};
export const MEDIUM_MODAL_OPTIONS: any = {
  size: 'md',
  keyboard: true,
  backdrop: 'static',
};
export const LARGE_MODAL_OPTIONS: any = {
  size: 'lg',
  backdrop: 'static',
  windowClass: 'modal-xxl',
  keyboard: false,
};
