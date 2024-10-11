<template>
  <el-dialog title="新增菜单" width="600">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="auto">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.menu_type" @change="handleMenuTypeChange">
          <el-radio-button label="目录" value="1" />
          <el-radio-button label="菜单" value="2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级菜单" prop="parent_id">
        <el-tree-select
          v-model="form.parent_id"
          :data="data"
          check-strictly
          filterable
          :render-after-expand="false"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="组件" prop="component">
        <el-input v-model="form.component" :disabled="form.menu_type === '1'" />
      </el-form-item>
      <el-form-item label="路径" prop="path">
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
import { ref, reactive, defineEmits, onMounted } from 'vue'
import { getMenuSelectListApi, createMenuApi } from '@/api/menu'
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadioButton,
  ElTreeSelect,
  ElInput,
  ElMessage,
  FormRules
} from 'element-plus'

interface RuleForm {
  name: string
  parent_id: number
  menu_type: string
  component: string
  path: string
  icon: boolean
  sort: number
}

const form = reactive({
  name: '',
  parent_id: '',
  menu_type: '1',
  component: '#',
  path: '',
  icon: '',
  sort: ''
})

const data = ref<any[]>([])

const formRef = ref<InstanceType<typeof ElForm>>()

const rules = reactive<FormRules<RuleForm>>({
  parent_id: [{ required: true, message: '请选择父级菜单', trigger: 'blur' }],
  name: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
    { min: 1, max: 64, message: 'Length should be 1 to 64', trigger: 'blur' }
  ],
  component: [
    { required: true, message: '请输入组件名称', trigger: 'blur' },
    { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' }
  ],
  path: [
    { required: true, message: '请输入路径', trigger: 'blur' },
    { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' }
  ]
})

// 获取菜单列表
const fetchMenuSelectData = () => {
  getMenuSelectListApi().then((res) => {
    data.value = res.data
  })
}

// 菜单类型变化时触发
const handleMenuTypeChange = (val: string) => {
  if (val === '2') {
    form.component = ''
  }
}

// 创建菜单
const createMenu = (data: any) => {
  return createMenuApi(data)
}

const emit = defineEmits(['close', 'refreshMenu'])

// 关闭弹窗并重置表单
const closeDialog = () => {
  formRef.value?.resetFields()
  emit('close')
}

// 提交表单
const submit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      createMenu(form).then((res) => {
        if (res.code === 0) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          closeDialog()
          emit('refreshMenu') // 刷新菜单列表
        } else {
          ElMessage({
            message: res.message,
            type: 'error'
          })
        }
      })
    } else {
      ElMessage({
        message: '表单验证失败',
        type: 'error'
      })
    }
  })
}

onMounted(() => {
  // 获取菜单下拉框列表
  fetchMenuSelectData()
})
</script>
