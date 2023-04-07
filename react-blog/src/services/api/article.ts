// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户信息 GET /api/article/list/get */
export async function getArticleList(options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: API.GetUserInfoResp }>('/api/article/list/get', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getCategoryList(options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: API.GetUserInfoResp }>('/api/article/category/get', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getTagList(options?: { [key: string]: any }) {
  return request<API.JsonResp & { data?: API.GetUserInfoResp }>('/api/article/tag/get', {
    method: 'GET',
    ...(options || {}),
  });
}

