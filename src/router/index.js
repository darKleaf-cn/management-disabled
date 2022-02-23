import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
import Home from '../views/home/Home';

import Login from '../views/login/Login';
import Register from '../views/login/Register';
import UserList from '../views/user/UserList';

import Supplier from '../views/supplier/Supplier';

import CommodityManage from '../views/commodity/CommodityManage';
import CommodityClassify from '../views/commodity/CommodityClassify';
import CommodityCreate from '../views/commodity/CommodityCreate';

import OrderManage from '../views/order/OrderManage';

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
    redirect: 'home',
    hidden: true
  },
  {
    path: '/',
    component: Index,
    isSingle: true,
    icon: 'el-icon-s-home',
    children: [
      {
        path: '/home',
        component: Home,
        name: '我的主页'
      }
    ]
  },
  {
    path: '/commodity',
    component: Index,
    name: '我的商品',
    icon: 'el-icon-s-goods',
    children: [
      {
        path: 'commodityManage',
        name: '商品管理',
        component: CommodityManage
      },
      {
        path: 'commodityClassify',
        name: '商品分类',
        component: CommodityClassify
      },
      {
        path: 'commodityCreate',
        name: '创建商品',
        component: CommodityCreate
      }
    ]
  },
  {
    path: '/order',
    component: Index,
    name: '我的订单',
    icon: 'el-icon-s-order',
    children: [
      {
        path: 'orderManage',
        name: '订单管理',
        component: OrderManage
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
