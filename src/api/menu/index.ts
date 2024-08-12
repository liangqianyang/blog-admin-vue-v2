import request from '@/axios'
import { MenuListParams, MenuListResponse } from './types'
export const getMenuListApi = (params: MenuListParams) => {
  return request.get<MenuListResponse>({ url: '/v1/menu/list', params })
}
