import {
  get,
  post
} from './index';

// 商品列表
export const commodityQueryList = params => get('/commodity/queryList', params);

// 删除商品
export const commodityDelete = params => post('/commodity/delete', params);

// 修改商品
export const commodityUpdate = params => post('/commodity/update', params);

// 类目列表
export const catalogQueryList = params => get('/catalog/queryList', params);
