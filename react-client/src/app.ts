// 运行时配置
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { LOGIN_PATH, AUTH_FAIL } from '@/constants';
import { getUserInfo } from '@/services/api/user';
import { getToken, setToken, deleteToken } from '@/utils/token';
import { message } from 'antd';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  fetchUserInfo?: () => Promise<API.GetUserInfoResp | undefined>,
  settings?: {},
  currentUser?: API.GetUserInfoResp|undefined
}> {
  console.log('initstate');
  const fetchUserInfo = async () => {
    try {
      const resp = await getUserInfo();
      return resp.data;
    } catch (error) {
      history.push(LOGIN_PATH);
    }
    return undefined;
  };

  // // 如果是登录页面，不执行
  if (history.location.pathname !== LOGIN_PATH) {
    const currentUser = await fetchUserInfo();
    //   //获取菜单权限
    //   const menuData = await fetchMenuData(currentUser?.name);
    return {
      fetchUserInfo,
      // fetchMenuData,
      settings: {},
      currentUser,
      // menuData,
    };
  }
  return {
    fetchUserInfo,
    // fetchMenuData,
    currentUser: undefined,
    settings: {},
  };
}

//request配置
export const request: RequestConfig = {
  baseURL: "/api",
  timeout: 5000,
  requestInterceptors: [
    (url, options) => {
      let token = getToken()
      if (token != "") {
        options['headers']['Authorization'] = "Bearer " + token;
      }
      return { url, options }
    },
  ],
  responseInterceptors: [
    (response) => {
      //重新续期
      let newtoken = response.headers?.newtoken
      if (newtoken != null) {
        setToken(newtoken)
      }
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      const { data = {} as any } = response;
      if (data.code == AUTH_FAIL) {
        //失效先删除
        deleteToken();
        message.success('请您先登录');
        history.push(LOGIN_PATH);
      }
      return response
    },
  ]
}