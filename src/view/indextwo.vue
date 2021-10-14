<template>
  <el-container>
    <el-aside width="200px" style="height:100vh">
      <el-menu
        :default-active="this.$route.path"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#000"
        text-color="#fff"
        active-text-color="#fff"
        style="height: 100%">
        <el-menu-item index="/schoolByAdmin">
          <i class="el-icon-alarm-clock"></i>
          <span slot="title">校区信息</span>
        </el-menu-item>
        <el-menu-item index="/salesManagement">
          <i class="el-icon-alarm-clock"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/salesReturnManagement">
          <i class="el-icon-apple"></i>
          <span slot="title">教师管理</span>
        </el-menu-item>
        <el-menu-item index="/salesPersonal">
          <i class="el-icon-document"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/imServer">
          <i class="el-icon-s-custom"></i>
          <span slot="title">客服中心</span>
        </el-menu-item>
        <el-menu-item index="/Opinion">
          <i class="el-icon-s-custom"></i>
          <span slot="title">留言列表</span>
        </el-menu-item>
        <el-menu-item index="/exitMoney">
          <i class="el-icon-position"></i>
          <span slot="title">审核退费</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right">
        <span>{{realName}}</span>
        <el-button type="info"  @click="exitlogin">退出登录</el-button>
      </el-header>
      <el-main style="height: 100%">
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
        userName:sessionStorage.getItem('userName'),
        realName:sessionStorage.getItem("realName")
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
        }

      }
    },
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
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
