// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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
