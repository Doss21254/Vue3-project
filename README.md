# Vue3 用户管理后台CRUD实战
## 技术栈
Vite + Vue3 + TypeScript + <script setup>
## Vite构建工具说明
采用Vite新一代构建工具，对比Webpack启动速度大幅提升；
打包阶段自动Tree-Shaking，剔除冗余代码，减小线上包体积。
1. 开发命令 `npm run dev`：极速热更新，本地调试页面
2. 打包命令 `npm run build`：编译压缩代码，产出dist静态部署文件
3. vite.config.ts配置路径别名`@`，简化组件导入路径，规范工程代码
## 项目功能
1. 表格渲染用户模拟数据
2. 弹窗复用：新增/编辑用户共用弹窗组件
3. computed计算属性实现关键词实时搜索过滤
4. 删除单条数据、表单双向绑定基础校验
## 本地运行教程
git clone https://github.com/Doss21254/Vue3-project.git
cd Vue3-project
npm install
# 本地调试
npm run dev
# 打包上线
npm run build
