// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录验证码 GET /v1/captcha/get */
export async function getCaptcha(options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: API.GetCaptchaResp }>('/v1/captcha/get', {
    method: 'GET',
    ...(options || {}),
  });
}
