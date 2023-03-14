// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户信息 GET /v1/user/info/get */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: API.GetUserInfoResp }>('/v1/user/info/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户列表 GET /v1/user/list/get */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListParams,
  options?: { [key: string]: any },
) {
  return request<API.JsonResp & { data?: API.GetUserListResp[] }>('/v1/user/list/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /v1/user/login */
export async function userLogin(body: API.UserLoginReq, options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: API.UserLoginResp }>('/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户退出接口 GET /v1/user/out.login */
export async function userOutLogin(options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: string[] }>('/v1/user/out.login', {
    method: 'GET',
    ...(options || {}),
  });
}
