<template>
  <el-container>
    <!-- <el-aside width="200px" style="height:100vh">
    </el-aside> -->
    <el-container>
      <el-header style="text-align: right">
      <el-menu
        :default-active="this.$route.path"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        mode="horizontal"
        @close="handleClose"
        background-color="#B3C0D1"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%">
        <el-menu-item index="/purchasingGoodsManagement">
          <i class="el-icon-baseball"></i>
          <span slot="title">课程查询</span>
        </el-menu-item>
        <el-menu-item index="/purchaseReturnManagement">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">我的订单</span>
        </el-menu-item>
        <el-menu-item index="/purchasePersonal">
          <i class="el-icon-document"></i>
          <span slot="title">客服反馈</span>
        </el-menu-item>
        <el-menu-item index="/personCore">
          <i class="el-icon-document"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="/newsCore">
          <i class="el-icon-document"></i>
          <span slot="title">消息中心</span>
        </el-menu-item>
      </el-menu>
      <div style="position:absolute;right:0px;top:0px">
        <span>{{userName}}</span>
        <el-button type="info"    @click="exitlogin">退出登录</el-button>
      </div>

      </el-header>

      <el-main style="height:100vh">
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
