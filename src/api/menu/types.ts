export interface MenuListParams {
  name?: string
  state?: number
}

export interface Menu {
  id: number
  parent_id: number
  name: string
  component: string
  path: string
  icon: string
  sort: number
  state: number
  created_at: string
  hasChildren?: boolean
  children?: Menu[]
}

export interface MenuListResponse {
  list: Menu[]
}
