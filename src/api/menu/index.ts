import request from '@/axios'
import { MenuListParams } from './types'
export const getMenuListApi = (params: MenuListParams) => {
  return request.get({ url: '/v1/menu/list', params })
}
