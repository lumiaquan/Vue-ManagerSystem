<template>
  <div id="app">
      <el-container>
          <el-header style="background-color:#409EFF;color: white">后台管理系统</el-header>
          <el-container>
              <el-aside width="200px">
                  <el-menu
                          default-active="add"
                          class="el-menu-vertical-demo"
                          @open="handleOpen"
                          @close="handleClose"
                          :router=true
                  >
                      <el-menu-item index="add">
                          <i class="el-icon-menu"></i>
                          <span slot="title">添加题目</span>
                      </el-menu-item>
                      <el-menu-item index="charge">
                          <i class="el-icon-setting"></i>
                          <span slot="title">管理题目</span>
                      </el-menu-item>
                      <el-menu-item index="search">
                          <i class="el-icon-search"></i>
                          <span slot="title">搜索题目</span>
                      </el-menu-item>
                  </el-menu>
              </el-aside>
              <el-main>
                  <router-view></router-view>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
    .el-header,
    .el-footer {
        background-color: #b3c0d1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
        text-align: center;
        line-height: 200px;
        background-color: white;
    }

    .el-menu{
        border:0
    }

    .el-main {
        background-color: white;
        color: #333;
        line-height: 160px;
        border-right: solid 1px #e6e6e6;
        border-left: solid 1px #e6e6e6;
        border-bottom: solid 1px #e6e6e6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        z-index: 99;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
