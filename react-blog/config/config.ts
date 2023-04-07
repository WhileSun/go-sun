import { defineConfig } from "@umijs/max";

export default defineConfig({
  request: {},
  lessLoader: {
    modifyVars: {
      // ten: '100px'
      hack: 'true; @import "@/assets/css/variables.less";',
    }
  },
  routes: [
    { path: "/", component: "index/index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
});
