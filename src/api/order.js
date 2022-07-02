import {
  post
} from './index';

// 订单列表
export const orderList = params => post('/order/list', params);

// 订单列表
export const orderSuccess = params => post('/order/success', params);
// 订单列表
export const orderFail = params => post('/order/fail', params);
