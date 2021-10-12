<template>
  <div class="bg_color" >
    <!--表单-->
    <el-form style="width:23%;margin-right: 140px;position: relative;left: 60px" :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item  >
        <h3 style="color: #ffffff;text-align: center;font-weight: bold;margin-bottom: 30px;font-size: 30px">红星培优管理系统</h3>
      </el-form-item>
      <el-form-item  label="用户名" prop="username" >
        <el-input type="text" v-model="loginForm.username" autocomplete="off"  placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitForm('loginForm')" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {login} from '@/api/user.js';
  import {setToken,getToken,removeToken,setLoginName,setLoginRole} from '@/utils/auth.js';
  export  default {
    data(){
      return{
//      登录表单的数据
        loginForm: {
          username: '',
          password : '',
        },
        rules: {
          username:[
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password :[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ]
        },
      }
    },
    methods:{
      submitForm:function(formName) {
        // this.centerDialogVisibleTwo = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //登录接口;
            login(this.loginForm).then((response)=>{
              if (response.data.code === 200){
                if (response.data.data.roleId === 1){
                  this.$message.success(response.data.msg);
                  this.$router.push('/indextwo')
                  sessionStorage.setItem("userName", response.data.data.username);
                  sessionStorage.setItem("realName", response.data.data.realName);
                  sessionStorage.setItem("money", response.data.data.money);
                }else if(response.data.data.roleId ===2){
                  this.$message.success(response.data.msg);
                  this.$router.push('/index')
                  sessionStorage.setItem("userName", response.data.data.username);
                  sessionStorage.setItem("realName", response.data.data.realName);
                  sessionStorage.setItem("money", response.data.data.money);
                }else if(response.data.data.roleId ===3){
                  this.$message.success(response.data.msg);
                  this.$router.push('/indexthree')
                  sessionStorage.setItem("userName", response.data.data.username);
                  sessionStorage.setItem("realName", response.data.data.realName);
                  sessionStorage.setItem("money", response.data.data.money);
                }

              }else{
                this.$message.error(response.data.message);
              }
            })
            // login(this.loginForm).then((response)=>{
            //   // response.data.data.permission
            //   if (response.data.code === 0){
            //     this.$message.error(response.data.message);
            //   }else if(response.data.code === 1){
            //     if (response.data.data.permission === '管理员'){
            //       this.$message.success(response.data.message);
            //       this.$router.push('/index')
            //       sessionStorage.setItem("userName", response.data.data.userName);
            //     }else if(response.data.data.permission ==='销售员'){
            //       this.$message.success(response.data.message);
            //       this.$router.push('/indextwo')
            //       sessionStorage.setItem("userName", response.data.data.userName);
            //     }else if(response.data.data.permission ==='采购员'){
            //       this.$message.success(response.data.message);
            //       this.$router.push('/indexthree')
            //       sessionStorage.setItem("userName", response.data.data.userName);
            //     }
            //   }else{
            //     this.$message.error(response.data.message);
            //   }
            //
            // })
          }
        });
      },
    },
    created () {
    },
  }
</script>
<style scoped>
  .bg_color{
    background: url("./../assets/bg.png");
    height: 100vh !important;
    background-position: center 0;
    background-size: cover;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: self-start;
  }

</style>
