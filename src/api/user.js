import {
  post
} from './index';

// 管理员注册
export const register = params => post('/register', params);

// 管理员登录
export const login = params => post('/login', params);

// 退出登录
export const logout = params => post('/logout', params);

// 用户列表
export const userList = params => post('/user/list', params);

// 添加用户
export const userAdd = params => post('/user/add', params);

// 删除用户
export const userDelete = params => post('/user/delete', params);

// 修改用户
export const userUpdate = params => post('/user/update', params);