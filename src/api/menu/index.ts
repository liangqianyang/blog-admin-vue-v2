import request from '@/axios'
import { MenuListParams } from './types'
export const getMenuListApi = (params: MenuListParams) => {
  return request.get({ url: '/v1/menu/list', params })
}

export const getMenuSelectListApi = () => {
  return request.get({ url: '/v1/menu/select-list' })
}

export const createMenuApi = (data: any): Promise<IResponse> => {
  return request.post({ url: '/v1/menu/store', data })
}
