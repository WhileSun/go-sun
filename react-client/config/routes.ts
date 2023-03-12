const routes = {
  path: '/',
  // component: '@/layouts/index',
  routes: [
    {
      path: '/login',
      component: './Login',
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
      routes: [
        {
          name: '首页',
          path: '/access/home',
          component: './Home',
        }
      ]
    },
    {
      path: 'http://localhost:8000/umi/plugin/openapi',
      name: 'openapi',
    },
  ]
}

export default routes;