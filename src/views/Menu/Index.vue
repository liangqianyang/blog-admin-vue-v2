<template>
  <el-form :model="ruleForm" label-width="auto" ref="ruleFormRef">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item prop="name" label="菜单名称"
          ><el-input clearable v-model="ruleForm.name"
        /></el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">查询</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-table :data="tableData" ref="multipleTableRef" border style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="date" label="Date" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :size="size"
    :background="background"
    layout="->,prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="margin-top: 5px"
  />
</template>

<script lang="ts" setup>
import {
  ElRow,
  ElCol,
  ElInput,
  ElTable,
  ElTableColumn,
  ElButton,
  ElForm,
  ElFormItem,
  FormInstance,
  ElPagination,
  ComponentSize
} from 'element-plus'
import { reactive, ref } from 'vue'

defineOptions({
  name: '菜单管理'
})

interface RuleForm {
  name: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: ''
})

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(10000)
const size = ref<ComponentSize>('default')
const background = ref(true)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
