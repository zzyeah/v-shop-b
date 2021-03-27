import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);
const asynRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'inbox',
      hidden: false,
    },
    component: Home,
    children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
        hidden: false,
      },
      component: () => import('@/views/page/productList.vue'),
    }, {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        icon: 'file-add',
        hidden: false,
      },
      component: () => import('@/views/page/productAdd.vue'),
    }, {
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        icon: 'project',
        hidden: false,
      },
      component: () => import('@/views/page/category.vue'),
    }],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'number',
        hidden: false,
      },
      // 懒加载
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

// hook
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  const userInfo = store.state.user;
  if (to.path !== '/Login') {
    if (userInfo.appkey && userInfo.username && userInfo.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(userInfo.role, asynRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/Login');
  }
  return next();
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
