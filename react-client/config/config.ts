import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes  from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  publicPath: '/dist/',
  outputPath:"../web-server/dist", //打包输出地址
  history: {
    type: 'hash', //带有 # 的 URL
  },
  plugins: [
    "@umijs/max-plugin-openapi"
  ],
  // alias:{
  //   '@static': require('path').resolve(__dirname, '../public/static'),
  //   '@config':  require('path').resolve(__dirname, '../config'),
  // },
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
  routes: [routes],
  npmClient: 'pnpm',
});