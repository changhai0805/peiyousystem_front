<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #444;font-weight: bold;display: inline-block;padding-left: 150px">修改密码</span>
      </div>
      <div style="width: 100%">
        <label style="width: 15%;text-align: right;display: inline-block">用户名：</label><el-input disabled v-model="userName" style="width: 30%;text-align: left"></el-input><br>
        <label style="width: 15%;text-align: right;display: inline-block">密码：</label><el-input placeholder="请输入要修改的密码" v-model="pwd" style="width: 30%;text-align: left;padding-top: 20px"></el-input>
        <br><el-button style="margin-top: 20px;margin-left: 40%" @click="changeName">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {updatePasswordByName} from '@/api/user.js';
  export default {
    name: "test",
    data(){
      return{
        userName:sessionStorage.getItem("userName"),
        pwd:''
      }
    },
    methods:{
      updatePasswordByName(){
        var userName = sessionStorage.getItem("userName");
        updatePasswordByName(userName,this.pwd).then((response)=>{
          if (response.data === 1){
            this.$router.push('/login')
            this.$message.success('修改密码成功,请重新登录')
            sessionStorage.removeItem('userName')
          }
        })
      },
      changeName(){
        this.updatePasswordByName()
      }
    }
  }
</script>

<style scoped>

</style>
