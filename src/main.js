import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getStore } from '@/util/storage';

process.env.VUE_APP_MOCK === 'true' && require('./mock/index');

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach(function (to, from, next) {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    const admin = getStore('admin') ? getStore('admin') : '';
    if (admin) {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
