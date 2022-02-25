import {
  post
} from './index';

// 订单列表
export const orderList = params => post('/order/list', params);
