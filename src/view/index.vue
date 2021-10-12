<template>
  <el-container>
    <el-aside width="200px" style="height:100vh">
      <el-menu
        :default-active="this.$route.path"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        text-color="#fff"
        background-color="#000"
        active-text-color="#ffd04b"
      style="height: 100%">
<!--        <el-submenu index="/alarmMessage">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-location"></i>-->
<!--            <span>导航一</span>-->
<!--          </template>-->
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-submenu index="1-4">-->
<!--            <template slot="title">选项4</template>-->
<!--            <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-submenu>-->
        <el-menu-item index="/alarmMessage">
          <i class="el-icon-location"></i>
          <span slot="title">班级管理</span>
        </el-menu-item>
        <el-menu-item index="/result">
          <i class="el-icon-document"></i>
          <span slot="title">学院管理</span>
        </el-menu-item>
        <el-menu-item index="/personnews">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">我的评价</span>
        </el-menu-item>
        <el-menu-item index="/test">
          <i class="el-icon-setting"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right;background:#B3C0D1">
        <span>{{userName}}</span>
        <el-button type="info"  @click="exitlogin">退出登录</el-button>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "index",
        data(){
        return{
          userName:sessionStorage.getItem('userName')
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        exitlogin(){
          var r=confirm("是否退出登录？");
          if (r===true){
            this.$router.push('/login')
            sessionStorage.removeItem('userName')
            sessionStorage.removeItem('id')
          }

        }
      },
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    /* text-align: center; */
    line-height: 20px !important;

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
