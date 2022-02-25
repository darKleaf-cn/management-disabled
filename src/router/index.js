import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';

import Login from '../views/login/Login';
import Register from '../views/login/Register';
import UserList from '../views/user/UserList';

import Supplier from '../views/supplier/Supplier';

import GoodsAdd from '../views/goods/GoodsAdd';
import Goods from '../views/goods/Goods';

import Sku from '../views/sku/Sku';

import Order from '../views/order/Order';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login,
    hidden: true
  },
  {
    path: '/register',
    name: '注册',
    component: Register,
    hidden: true
  },
  {
    path: '/',
    redirect: 'goods',
    hidden: true
  },
  {
    path: '/',
    component: Index,
    isSingle: true,
    icon: 'el-icon-s-goods',
    children: [
      {
        path: '/goods',
        component: Goods,
        name: '商品列表'
      }
    ]
  },
  {
    path: '/',
    component: Index,
    isSingle: true,
    icon: 'el-icon-s-order',
    children: [
      {
        path: '/order',
        name: '订单管理',
        component: Order
      }
    ]
  },
  {
    path: '/',
    component: Index,
    icon: 'el-icon-upload2',
    isSingle: true,
    children: [
      {
        path: '/goodsAdd',
        name: '创建商品',
        component: GoodsAdd
      }
    ]
  },
  {
    path: '/',
    component: Index,
    icon: 'el-icon-s-shop',
    isSingle: true,
    children: [
      {
        path: '/sku',
        name: '库存管理',
        component: Sku
      }
    ]
  },
  {
    path: '/',
    component: Index,
    icon: 'el-icon-user-solid',
    isSingle: true,
    children: [
      {
        path: '/user',
        name: '用户管理',
        component: UserList
      }
    ]
  },
  {
    path: '/',
    component: Index,
    icon: 'el-icon-truck',
    isSingle: true,
    children: [
      {
        path: '/supplier',
        name: '供应商管理',
        component: Supplier
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
