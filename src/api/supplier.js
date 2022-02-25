import {
  post
} from './index';

// 供应商列表
export const supplierList = params => post('/supplier/list', params);

// 添加供应商
export const supplierAdd = params => post('/supplier/add', params);

// 删除供应商
export const supplierDelete = params => post('/supplier/delete', params);

// 修改供应商
export const supplierUpdate = params => post('/supplier/update', params);