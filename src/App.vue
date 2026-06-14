<template>
  <div class="table-box">
    <h2>用户数据管理表格</h2>

    <!-- 顶部操作栏：搜索 + 新增按钮 -->
    <div class="top-bar">
      <input 
        v-model="searchKey" 
        placeholder="根据姓名搜索"
        class="search-input"
      >
      <button @click="openDialog('add')">新增用户</button>
    </div>

    <!-- 数据表格 -->
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>编号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <!-- 循环渲染过滤后的列表 -->
        <tr v-for="(item, index) in filterList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.gender }}</td>
          <td>
            <button @click="openDialog('edit', item)">编辑</button>
            <button class="del" @click="delData(item.id)">删除</button>
          </td>
        </tr>
        <!-- 无数据提示 -->
        <tr v-if="filterList.length === 0">
          <td colspan="5" align="center">暂无数据</td>
        </tr>
      </tbody>
    </table>

    <!-- 新增/编辑 弹窗 -->
    <div class="dialog" v-if="dialogVisible">
      <div class="dialog-content">
        <h3>{{ dialogType === 'add' ? '新增用户' : '编辑用户' }}</h3>
        
        <div class="form-item">
          <label>姓名：</label>
          <input v-model="form.name" placeholder="请输入姓名">
        </div>
        <div class="form-item">
          <label>年龄：</label>
          <input v-model.number="form.age" type="number" placeholder="请输入年龄">
        </div>
        <div class="form-item">
          <label>性别：</label>
          <select v-model="form.gender">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>

        <div class="btn-group">
          <button @click="dialogVisible = false">取消</button>
          <button class="save" @click="submitForm">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 1. 原始模拟数据（模拟后端返回的数据）
const tableData = ref([
  { id: 1, name: '张三', age: 20, gender: '男' },
  { id: 2, name: '李四', age: 22, gender: '女' },
  { id: 3, name: '王五', age: 25, gender: '男' }
])

// 2. 搜索关键词
const searchKey = ref('')

// 3. 弹窗相关状态
const dialogVisible = ref(false) // 弹窗显示/隐藏
const dialogType = ref('add')    // 区分：add新增 / edit编辑
const editId = ref('')           // 编辑时记录当前数据id

// 4. 表单数据（新增/编辑共用）
const form = ref({
  name: '',
  age: '',
  gender: '男'
})

// 5. 计算属性：根据关键词过滤数据（搜索功能）
const filterList = computed(() => {
  return tableData.value.filter(item => {
    // 姓名包含搜索关键词则展示
    return item.name.includes(searchKey.value.trim())
  })
})

// 6. 打开弹窗：区分新增、编辑
const openDialog = (type, row = {}) => {
  dialogType.value = type
  dialogVisible.value = true

  // 编辑状态：把当前行数据赋值给表单
  if (type === 'edit') {
    editId.value = row.id
    form.value.name = row.name
    form.value.age = row.age
    form.value.gender = row.gender
  } else {
    // 新增状态：清空表单
    form.value = {
      name: '',
      age: '',
      gender: '男'
    }
  }
}

// 7. 提交表单（新增 / 编辑 共用逻辑）
const submitForm = () => {
  // 简单表单校验
  if (!form.value.name || !form.value.age) {
    alert('姓名和年龄不能为空！')
    return
  }

  if (dialogType.value === 'add') {
    // 新增逻辑：生成新id，推入数组
    const newId = tableData.value.length ? tableData.value[tableData.value.length - 1].id + 1 : 1
    tableData.value.push({
      id: newId,
      ...form.value // 解构赋值
    })
  } else {
    // 编辑逻辑：遍历数组，修改对应数据
    tableData.value.forEach(item => {
      if (item.id === editId.value) {
        item.name = form.value.name
        item.age = form.value.age
        item.gender = form.value.gender
      }
    })
  }

  // 提交后关闭弹窗
  dialogVisible.value = false
}

// 8. 删除单条数据
const delData = (id) => {
  if (!window.confirm('确定删除该数据？')) return
  // 根据id过滤，删除目标数据
  tableData.value = tableData.value.filter(item => item.id !== id)
}
</script>

<style scoped>
.table-box {
  width: 800px;
  margin: 50px auto;
}
.top-bar {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}
.search-input {
  padding: 6px 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
table {
  width: 100%;
  text-align: center;
}
th {
  background-color: #f5f7fa;
}
button {
  padding: 4px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: #409eff;
  color: #fff;
  margin: 0 2px;
}
.del {
  background: #f56c6c;
}

/* 弹窗样式 */
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content {
  width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}
.form-item {
  margin: 15px 0;
}
.form-item label {
  display: inline-block;
  width: 60px;
}
.form-item input, .form-item select {
  padding: 6px;
  width: 220px;
}
.btn-group {
  text-align: center;
  margin-top: 20px;
}
.save {
  background: #67c23a;
}
</style>