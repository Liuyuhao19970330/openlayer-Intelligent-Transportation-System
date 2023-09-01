<template>
    <div class="sidebar-container">
      <el-menu :collapse="isCollapsed" :default-active="activeMenu" class="sidebar-menu">
        <el-menu-item index="home">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="about">
          <i class="el-icon-info"></i>
          <span slot="title">关于我们</span>
        </el-menu-item>
        <el-menu-item index="products">
          <i class="el-icon-box"></i>
          <span slot="title">产品</span>
        </el-menu-item>
      </el-menu>
  
      <el-button type="primary" icon="el-icon-menu" @click="toggleSidebar"></el-button>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        isCollapsed: false,
        activeMenu: 'home'
      };
    },
    methods: {
      toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
      }
    }
  };
  </script>
  
  <style>
  .sidebar-container {
    display: flex;
  }
  
  .sidebar-menu {
    width: 200px;
  }
  
  .sidebar-menu.collapsed {
    width: 60px;
  }
  
  .sidebar-menu.collapsed .el-menu-item .el-icon,
  .sidebar-menu.collapsed .el-submenu .el-icon-arrow-down,
  .sidebar-menu.collapsed .el-submenu .el-icon-arrow-up {
    display: none;
  }
  
  .sidebar-menu.collapsed .el-menu-item .title-text {
    display: none;
  }
  
  .sidebar-menu.collapsed .el-button {
    margin-left: -20px;
  }
  </style>

