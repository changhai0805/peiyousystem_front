<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="color: #444;font-weight: bold;display: inline-block;padding-left: 150px">修改个人信息</span>
    </div>
    <div style="width: 100%">
      <label style="width: 15%;text-align: right;display: inline-block">用户名：</label><el-input  v-model="form.realName" style="width: 30%;text-align: left"></el-input><br>
      <label style="width: 15%;text-align: right;display: inline-block">身份证号：</label><el-input  placeholder="请输入要修改的身份证号" v-model="form.idNumber" style="width: 30%;text-align: left;padding-top: 20px"></el-input><br>
      <label style="width: 15%;text-align: right;display: inline-block">密码：</label><el-input placeholder="password" v-model="form.password" style="width: 30%;text-align: left;padding-top: 20px"></el-input><br>
      <label style="width: 15%;text-align: right;display: inline-block">角色：</label><el-input placeholder="请输入要修改的角色" v-model="form.role" style="width: 30%;text-align: left;padding-top: 20px"></el-input><br>
      <label style="width: 15%;text-align: right;display: inline-block">性别：</label><el-input placeholder="请输入要修改的性别" v-model="form.sex" style="width: 30%;text-align: left;padding-top: 20px"></el-input><br>
      <label style="width: 15%;text-align: right;display: inline-block">电话：</label><el-input placeholder="请输入要修改的电话" v-model="form.telephone" style="width: 30%;text-align: left;padding-top: 20px"></el-input><br>
      <br><el-button style="margin-top: 20px;margin-left: 40%"  @click="changeName">修改</el-button>
      <el-dialog title="添加采购信息" :visible.sync="dialogFormVisible" :before-close="closeDialog" >
        <el-form :model="form" ref="form">
          <el-form-item  label="用户名" style="width:600px" :label-width="formLabelWidth">
            <el-input v-model="form.realName" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item  label="身份证号" style="width:600px" :label-width="formLabelWidth">
            <el-input v-model="form.idNumber" autocomplete="off" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="密码" style="width:600px" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="角色" style="width:600px" :label-width="formLabelWidth">
            <el-input v-model="form.role" autocomplete="off" placeholder="请输入角色"></el-input>
          </el-form-item>
          <el-form-item label="性别" style="width:300px" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" style="width:600px" :label-width="formLabelWidth">
            <el-input v-model="form.telephone" autocomplete="off" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exit">取 消</el-button>
          <el-button type="primary" @click="btn">确 定</el-button>
        </div>
      </el-dialog>
<!--      <div style="height: 300px;width: 400px; background-color: #f7455d" >-->
<!--        <pdf-->
<!--          ref="pdf"-->
<!--          :src="url"-->
<!--        >-->
<!--        </pdf>-->

<!--      </div>-->
    </div>
  </el-card>
</div>
</template>

<script>
  // import pdf from 'vue-pdf'
  import {updatePasswordByName,ctygfindUserInfo} from '@/api/user.js';
    export default {
      // components:{
      //   pdf
      // },
        name: "test",
        data(){
          return{
            // url:"http://10.168.1.101:9000/laos/文档调整内容_1632734260733(2)_1633676653671.pdf",
            // realName:'',
            // telephone:'',
            // idNumber:'',
            // password:'',
            // role:'',
            // sex:'',
            dialogFormVisible:false,
            form: {
              id:'',
              userId:'',
              password:'',
              realName:'',
              sex:'',
              telephone:'',
              idNumber:'',
              role:'',
            },
            formLabelWidth: '120px',
          }
        },
        methods:{
          ctygfindUserInfo(){
            var id = sessionStorage.getItem('id')
            ctygfindUserInfo(id).then((response)=>{
              this.form.id = response.data.obj.id;
              this.form.userId = response.data.obj.userId;
              this.form.realName = response.data.obj.realName;
              this.form.telephone = response.data.obj.telephone;
              this.form.idNumber = response.data.obj.idNumber;
              this.form.password = response.data.obj.password;
              this.form.role = response.data.obj.role;
              this.form.sex = response.data.obj.sex;
            })
          },
          changeName(){
            this.dialogFormVisible = true
          },
          exit(form){
            this.dialogFormVisible = false
            location.reload();
          },
          btn(){
            this.dialogFormVisible = false
            updatePasswordByName(this.form).then((response)=>{
              if (response.data.code === 200){
                this.$message.success('修改成功')
                this.ctygfindUserInfo();
              }
            })

          },
          closeDialog(done){
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
                location.reload();
              })
              .catch(_ => { });
          }
        },
      mounted() {
          this.ctygfindUserInfo()
      }
    }
</script>

<style scoped>

</style>
