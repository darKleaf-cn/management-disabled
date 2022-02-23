import {
  get,
  post
} from './index';

// 订单列表
export const orderQueryList = params => get('/order/queryList', params);

// 删除商品
export const orderDelete = params => post('/order/delete', params);

// // 修改商品
// export const commodityUpdate = params => post('/commodity/update', params);

// // 类目列表
// export const catalogQueryList = params => get('/catalog/queryList', params);
