import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList = [
  {
    path: '/system',
    component: '#',
    redirect: '/system/menu',
    name: 'Level',
    meta: {
      title: '系统设置',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'menu',
        name: '菜单管理',
        component: 'views/menu/index',
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'permission',
        name: '权限管理',
        component: 'views/permission/index',
        meta: {
          title: '权限管理'
        }
      }
    ]
  }
]

export default [
  // 列表接口
  {
    url: '/mock/role/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: adminList
      }
    }
  }
] as MockMethod[]
