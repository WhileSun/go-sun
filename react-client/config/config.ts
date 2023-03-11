import { defineConfig } from '@umijs/max';
import proxy from './proxy';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  plugins: [
    "@umijs/max-plugin-openapi"
  ],
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max';",
      // 或者使用在线的版本
      schemaPath: "http://localhost:3000/swagger/doc.json",
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
      projectName: "api",
      mock: false,
    }
  ],
  proxy: proxy['dev'],
  routes: [
    {
      name: ' CRUD 示例',
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
    },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
  ],
  npmClient: 'pnpm',
});