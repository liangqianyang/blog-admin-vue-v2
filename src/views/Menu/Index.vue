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
  <div class="mb-4">
    <el-button type="primary" @click="addDalogVisible = true">新增</el-button>
  </div>
  <el-table
    v-loading="loading"
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
  <add-dialog v-model="addDalogVisible" @close="addDalogVisible = false" />
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
import { reactive, ref, onMounted } from 'vue'
import { Menu } from '../../api/menu/types'
import AddDialog from './Add.vue'

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
const tableRef = ref<TableInstance>()

const addDalogVisible = ref(false)

let loading = ref(false)
let tableData: Menu[] = []

/**
 * 获取表格数据
 */
const fetchTableData = () => {
  loading.value = true
  getMenuListApi({
    name: searchForm.name
  })
    .then((res) => {
      loading.value = false
      tableData = res.data
      if (tableRef.value) {
        tableRef.value.doLayout()
      }
    })
    .catch(() => {
      loading.value = false
    })
}

/**
 * 查询
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      fetchTableData()
    }
  })
}

/**
 * 重置
 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  fetchTableData()
})
</script>
