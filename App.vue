<template>
  <div id="app">
    <el-container>
      <!-- 头部导航 -->
      <el-header class="app-header">
        <div class="logo">
          <el-icon><Tools /></el-icon>
          <span>失眠智能诊疗系统</span>
        </div>
        <div class="nav-menu">
          <el-menu
            mode="horizontal"
            :default-active="$route.path"
            router
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/consultation">问诊咨询</el-menu-item>
            <el-menu-item index="/prescription">处方建议</el-menu-item>
            <el-menu-item index="/doctor-consultation">专业医生</el-menu-item>
            <el-menu-item index="/knowledge">知识库</el-menu-item>
            <el-menu-item index="/chat">智能助手</el-menu-item>
            <el-menu-item index="/admin">管理后台</el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!-- 主要内容 -->
      <el-main class="app-main">
        <router-view />
      </el-main>

      <!-- 底部信息 -->
      <el-footer class="app-footer">
        <div>
          <p>© 2024 中医失眠智能诊疗系统 - 仅供参考，不能替代专业医生诊断</p>
          <p>如有严重症状请及时就医</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { Tools } from '@element-plus/icons-vue'
</script>

<style scoped>
#app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.logo .el-icon {
  margin-right: 8px;
  font-size: 24px;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-menu .el-menu {
  background: transparent;
  border: none;
}

.nav-menu .el-menu-item {
  color: white;
  border-bottom: 2px solid transparent;
}

.nav-menu .el-menu-item:hover,
.nav-menu .el-menu-item.is-active {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-color: white;
}

.app-main {
  min-height: calc(100vh - 120px);
  background: #f5f7fa;
  padding: 20px;
}

.app-footer {
  background: #2c3e50;
  color: #bdc3c7;
  text-align: center;
  padding: 20px;
}

.app-footer p {
  margin: 5px 0;
  font-size: 14px;
}
</style>