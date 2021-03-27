// 权限关系
/**
 * 存储的是 角色对应的权限名称
 */
const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }],
};

/**
 * 过滤没有权限的路由
 * @param {String} role
 * @param {Array} routes
 */
export default function getMenuRoute(role, routes) {
  const allowRouteName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRouteName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRouteName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
