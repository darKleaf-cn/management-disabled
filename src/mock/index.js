import Mock from 'mockjs'; // 引入mockjs
import { commodityQueryList } from './commodity';
import { catalogQueryList } from './catalog';
import { register, login, logout, userList, userDelete, userUpdate, userAdd } from './user';
import { uploadImage } from './image';
import { orderQueryList } from './order';
import { supplierAdd, supplierDelete, supplierList, supplierUpdate } from './supplier';
import { goodsAdd } from './goods';

Mock.setup({
  timeout: '300-600'
})

// 商品相关
Mock.mock(/\/commodity\/queryList/, 'get', commodityQueryList);

// 类目相关
Mock.mock(/\/catalog\/queryList/, 'get', catalogQueryList);

// 用户相关
Mock.mock(/\/register/, 'post', register);
Mock.mock(/\/login/, 'post', login);
Mock.mock(/\/logout/, 'post', logout);

Mock.mock(/\/user\/list/, 'post', userList);
Mock.mock(/\/user\/delete/, 'post', userDelete);
Mock.mock(/\/user\/update/, 'post', userUpdate);
Mock.mock(/\/user\/add/, 'post', userAdd);

Mock.mock(/\/supplier\/list/, 'post', supplierList);
Mock.mock(/\/supplier\/delete/, 'post', supplierDelete);
Mock.mock(/\/supplier\/update/, 'post', supplierUpdate);
Mock.mock(/\/supplier\/add/, 'post', supplierAdd);

Mock.mock(/\/goods\/add/, 'post', goodsAdd);

// 图片相关
Mock.mock(/\/upload-img/, 'post', uploadImage);

// 订单相关
Mock.mock(/\/order\/queryList/, 'get', orderQueryList);

export default Mock;