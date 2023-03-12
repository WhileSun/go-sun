# README


### 开启openApi
- 安装
pnpm add @umijs/max-plugin-openapi 
pnpm add swagger-ui-dist
- 在config/config.ts中添加配置
plugins: [
    "@umijs/max-plugin-openapi"
],
openAPI: {
    requestLibPath: "import { request } from '@umijs/max';",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
    mock: false,
},
- 在package.json的scripts中添加
"openapi" : "max openapi"
- 网址查看
http://localhost:8000/umi/plugin/openapi

### location 中的 query 不再支持了，后续推荐用 search
+ import { parse } from 'query-string';
+ const query = parse(history.location.search);

### react cookie包
import cookie from 'react-cookies'