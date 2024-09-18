import request from '@/axios'
import type { UserType } from './types'

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/v1/user/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.post({ url: '/v1/user/login-out' })
}

export const getNavbarMenuApi = (): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({
    url: '/v1/menu/navbar'
  })
}
