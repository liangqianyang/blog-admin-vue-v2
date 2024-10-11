<template>
  <el-dialog title="新增菜单" width="600">
    <el-form :model="form" label-width="auto">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.menu_type">
          <el-radio-button label="目录" value="1" />
          <el-radio-button label="菜单" value="2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级菜单">
        <el-tree-select
          v-model="form.parent_id"
          :data="data"
          check-strictly
          filterable
          :render-after-expand="false"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="组件">
        <el-input v-model="form.component" :disabled="form.menu_type === '1'" />
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input type="number" min="1" v-model="form.sort" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, defineEmits, onMounted } from 'vue'
import { getMenuSelectListApi, createMenuApi } from '@/api/menu'
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadioButton,
  ElTreeSelect,
  ElInput
} from 'element-plus'

const form = reactive({
  name: '',
  parent_id: '',
  menu_type: '1',
  component: '#',
  path: '',
  icon: '',
  sort: ''
})

let data = []

// 获取菜单列表
const fetchMenuSelectData = () => {
  getMenuSelectListApi().then((res) => {
    data = res.data
  })
}

const createMenu = (data: any) => {
  return createMenuApi(data)
}

const emit = defineEmits(['close'])

const closeDialog = () => {
  emit('close')
}

const submit = () => {
  createMenu(form)
  console.log('submit!')
}

onMounted(() => {
  fetchMenuSelectData()
})
</script>
