import {
  post
} from './index';

// 商品列表
export const goodsList = params => post('/goods/list', params);

// 添加商品
export const goodsAdd = params => post('/goods/add', params);

// 购买商品
export const goodsBuy = params => post('/goods/buy', params);

// 商品入库
export const goodsSkuAdd = params => post('/goods/skuAdd', params);

// 商品出库
export const goodsSkuCut = params => post('/goods/skuCut', params);