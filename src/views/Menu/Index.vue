<template>
  <el-form :model="searchForm" label-width="auto" ref="searchFormRef">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item prop="name" label="菜单名称"
          ><el-input clearable v-model="searchForm.name"
        /></el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="submitForm(searchFormRef)">查询</el-button>
          <el-button @click="resetForm(searchFormRef)">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-table
    ref="tableRef"
    :data="tableData"
    stripe
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column prop="name" label="菜单名称" />
    <el-table-column prop="component" label="组件" />
    <el-table-column prop="path" label="路径" />
    <el-table-column prop="icon" label="图标" />
    <el-table-column prop="sort" label="排序" />
    <el-table-column prop="state" label="状态">
      <template #default="scope">
        <el-tag v-if="scope.row.state === 1" type="success" disable-transitions> 启用 </el-tag>
        <el-tag v-if="scope.row.state === -1" type="success" disable-transitions> 停用 </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="创建时间" />
    <el-table-column fixed="right" label="操作" min-width="80">
      <template #default="scope">
        <el-button type="primary" size="small"> 编辑 </el-button>
        <el-button v-if="scope.row.state === 1" type="danger" size="small">停用</el-button>
        <el-button v-if="scope.row.state === -1" type="success" size="small">启用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { getMenuListApi } from '@/api/menu'
import {
  ElRow,
  ElCol,
  ElTag,
  ElInput,
  ElTable,
  ElTableColumn,
  ElButton,
  ElForm,
  ElFormItem,
  FormInstance,
  TableInstance
} from 'element-plus'
import { reactive, ref } from 'vue'

defineOptions({
  name: '菜单管理'
})

interface SearchForm {
  name: string
  state: number
}
const searchFormRef = ref<FormInstance>()
const searchForm = reactive<SearchForm>({
  name: '',
  state: 0
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      getMenuListApi({
        pageIndex: 1,
        pageSize: 10
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const tableRef = ref<TableInstance>()

interface Menu {
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

const tableData: Menu[] = [
  {
    id: 1,
    parent_id: 0,
    name: '系统设置',
    component: '#',
    path: '/system',
    icon: '',
    sort: 1,
    state: 1,
    created_at: '2024-08-01 17:20:00',
    children: [
      {
        id: 2,
        parent_id: 1,
        name: '菜单管理',
        component: 'views/menu/index',
        path: 'menu',
        icon: '',
        sort: 1,
        state: 1,
        created_at: '2024-08-01 17:20:00'
      },
      {
        id: 3,
        parent_id: 1,
        name: '权限管理',
        component: 'views/permission/index',
        path: 'permission',
        icon: '',
        sort: 1,
        state: 1,
        created_at: '2024-08-01 17:20:00'
      }
    ]
  }
]
</script>
