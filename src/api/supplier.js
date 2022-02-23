import {
  post
} from './index';

// 用户列表
export const supplierList = params => post('/supplier/list', params);

// 添加用户
export const supplierAdd = params => post('/supplier/add', params);

// 删除用户
export const supplierDelete = params => post('/supplier/delete', params);

// 修改用户
export const supplierUpdate = params => post('/supplier/update', params);