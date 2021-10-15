<template>
  <div class="bg_color" >
    <!--表单-->
    <el-form style="width:23%;margin-left: 36%;margin-top: 3%" :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item  >
        <h3 style="color: GrayText;text-align: center;font-weight: bold;margin-bottom: 30px;font-size: 30px">红星培优管理系统</h3>
      </el-form-item>
      <el-form-item  label="用户名" prop="username" >
        <el-input type="text" v-model="loginForm.username" autocomplete="off"  placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="24">
          <el-col :span='12'>
             <el-button style="width: 100%;background:rgb(98,213,180);border:1px solid #eee" type="primary" @click="submitForm('loginForm')" >登录</el-button>
          </el-col>
                    <el-col :span='12'>
             <el-button style="width: 100%;background:rgb(98,213,180);border:1px solid #eee" type="primary" @click="submitDeatails('loginForm')" >注册</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog
      title="用户注册"
      :visible.sync="dialogVisible"
      width="40%"
      >
     <el-form  :model="loginForm1" status-icon :rules="rules1" ref="loginForm1" label-width="100px" class="demo-ruleForm">
      <el-form-item  label="用户名" prop="username" >
        <el-input type="text" v-model="loginForm1.username" autocomplete="off"  placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input type="password" v-model="loginForm1.password" autocomplete="off"  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item  label="真实姓名" prop="realName">
        <el-input type="realName" v-model="loginForm1.realName" autocomplete="off"  placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item  label="性别" prop="sex">
        <!-- <el-input type="sex" v-model="loginForm1.sex" autocomplete="off"  placeholder="请输入性别"></el-input> -->
        <el-select style="width:100%" v-model="loginForm1.sex" placeholder="请选择性别">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item  label="联系电话" prop="telephone">
        <el-input type="telephone" v-model="loginForm1.telephone" autocomplete="off"  placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item  label="邮箱" prop="email">
        <el-input type="email" v-model="loginForm1.email" autocomplete="off"  placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exitclick">取 消</el-button>
        <el-button type="primary" @click="btnclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {savedo1,login} from '@/api/user.js';
  // import {setToken,getToken,removeToken,setLoginName,setLoginRole} from '@/utils/auth.js';
  export  default {
    data(){
      return{
//      登录表单的数据
        dialogVisible:false,
         options: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        loginForm1: {
          username: '',
          password : '',
          realName:'',
          sex:'',
          telephone:'',
          email:''
        },
        loginForm: {
          username: '',
          password : '',
        },
        rules: {
          username:[
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min:2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ],
          password :[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ]
        },
        rules1: {
          username:[
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
          ],
          password :[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
          realName :[
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min:2, max: 18, message: '长度在 2到 18 个字符', trigger: 'blur' }
          ],
          sex :[
            { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          telephone :[
            { required: true, message: '请输入电话', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 7 到 11 个字符', trigger: 'blur' }
          ],
          email :[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
        },
      }
    },
    methods:{
      submitDeatails(){
        this.dialogVisible = true
      },
      btnclick(){
        console.log(this.loginForm)
        if(this.loginForm1.username != ''&&this.loginForm1.password != ''&&this.loginForm1.sex!= ''&&this.loginForm1.telephone != ''&&this.loginForm1.realName != ''&&this.loginForm1.email != ''){
          savedo1(this.loginForm1).then((response)=>{
            if(response.data.code ==200){

              this.$message.success('注册成功')
              this.loginForm1.username = ''
              this.loginForm1.password = ''
              this.loginForm1.sex = ''
              this.loginForm1.telephone = ''
              this.loginForm1.realName = ''
              this.loginForm1.email = ''
              this.dialogVisible = false

            }else {
              this.$message.error(response.data.msg)
            }
          })
        }else{
          this.$message.error("必填项不能为空")
        }


      },
      exitclick(){
        this.loginForm1.username = ''
        this.loginForm1.password = ''
        this.loginForm1.sex = ''
        this.loginForm1.telephone = ''
        this.loginForm1.realName = ''
        this.loginForm1.email = ''
        this.dialogVisible = false
      },
      submitForm:function(formName) {
        // this.centerDialogVisibleTwo = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //登录接口;
            login(this.loginForm).then((response)=>{
              if(response.data.code == 200){
                if(response.data.data.roleId == 3){
                  sessionStorage.setItem("userName", response.data.data.username);
                  sessionStorage.setItem("realName", response.data.data.realName);
                  sessionStorage.setItem("money", response.data.data.money);
                  this.$router.push('./indexthree')
                }else{
                  this.$message.error('用户名或者密码错误')
                }
              }else{
                this.$message.error('用户名或者密码错误')
              }
            })
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
    background: url("./../assets/bggg.jpg");
    height: 100vh !important;
    background-position: center 0;
    background-size: cover;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: self-start;
  }

</style>
