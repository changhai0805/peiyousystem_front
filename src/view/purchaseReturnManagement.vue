<template>
  <div style="position:relative;height: 100%">
    <el-dialog title="填写信息" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog">
      <el-form :model="form2" ref="form">
        <el-form-item label="用户名" style="width:600px;text-align: left;" :label-width="formLabelWidth">
          <span>{{this.form2.username}}</span>
        </el-form-item>
        <el-form-item label="课程名称" style="width:600px;text-align: left;" :label-width="formLabelWidth">
          <span>{{this.form2.className}}</span>
        </el-form-item>
        <el-form-item label="应付金额" style="width:600px;text-align: left;" :label-width="formLabelWidth">
          <span style="color: red">{{this.form2.totalPay}}￥</span>
        </el-form-item>
        <el-form-item label="学生姓名" style="width:400px;text-align: left;" :label-width="formLabelWidth">
          <el-input style="width:300px" v-model="form2.stuName" autocomplete="off" placeholder="输入学生姓名"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" style="width:500px;float:left;text-align: left;" :label-width="formLabelWidth">
          <el-input style="width:350px" v-model="inviteKey" autocomplete="off" placeholder="输入邀请码(可不填)"></el-input>
        </el-form-item>
        <el-button style="float: left;margin-left: 10px" @click="exittwo">验证</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exittwo">取 消</el-button>
        <el-button type="primary" @click="btntwo">支 付</el-button>
      </div>
    </el-dialog>
    <el-dialog title="支付" :visible.sync="dialogFormVisiblepay" :before-close="closeDialog">
      <el-form :model="form2" ref="form">
        <el-form-item label="密码" style="width:500px;text-align: left;" :label-width="formLabelWidth">
          <el-input style="width:300px" type="password" show-password v-model="form2.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exitpay">取 消</el-button>
        <el-button type="primary" @click="pay">支 付</el-button>
      </div>
    </el-dialog>
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未付款" name="first">
          <el-table
            :data="tableData"
            style="width: 100%;height: 90%">
            <el-table-column
              label="ID"
              type="index">
            </el-table-column>
            <el-table-column
              label="订单编号"
              prop="orderId">
            </el-table-column>
            <el-table-column
              label="课程名称"
              prop="lessonName">
            </el-table-column>
             <el-table-column
              label="价格"
              prop="price">
            </el-table-column>
            <el-table-column
              label="班级容量"
              prop="classNum">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="orderStatus">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              align="right"
              width="252px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEidt(scope.$index, scope.row)">付款</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
              </template>
            </el-table-column>
          </el-table>
              <div style="height: 30px;text-align: center">
              <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" style="text-align: center"/>
              </div>
        </el-tab-pane>
        <el-tab-pane label="已付款" name="second">
            <el-table
            :data="tableDataAlready"
            style="width: 100%;height: 90%">
            <el-table-column
              label="ID"
              type="index">
            </el-table-column>
            <el-table-column
              label="订单编号"
              prop="orderId">
            </el-table-column>
            <el-table-column
              label="课程名称"
              prop="lessonName">
            </el-table-column>
             <el-table-column
              label="价格"
              prop="price">
            </el-table-column>
            <el-table-column
              label="班级容量"
              prop="classNum">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="orderStatus">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              align="right"
              width="252px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEidtReady(scope.$index, scope.row)">退款</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteReady(scope.$index, scope.row)">删除订单</el-button>
              </template>
            </el-table-column>
          </el-table>
              <div style="height: 30px;text-align: center">
              <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChangeparmsAready" @handleSizeChange="handleSizeChangeparmsAready" style="text-align: center"/>
              </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
  import Pagination from './pagination.vue'
  import {orderuserPayTab,orderuserUnPayTab,login,joinAndPay} from '@/api/user.js';
  export default {
    name: "result",
    components: {
      Pagination
    },
    data() {
      return {
        tableData: [],
        tableDataAlready:[],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        totalAready:0,
        count: '',
        inviteKey:'',
        activeName: 'first',
        parms:{
          pageNum:1,
          pageSize:10
        },
         parmsAready:{
          pageNum:1,
          pageSize:10
        },
        dialogFormVisibletwo:false,
        dialogFormVisiblepay:false,
        form2:{
          lessonId:'',
          orderId:'',
          username:'',
          className:'',
          totalPay:'',
          password:'',
          stuName:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.orderuserPayTab();
      this.orderuserUnPayTab();
    },
    methods: {
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.orderuserPayTab();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.orderuserPayTab();
      },
      handleCurrentChangeparmsAready (val) {
        console.log(val)//页码
        this.parmsAready.pageNum = val
        this.orderuserPayTab();
      },
      handleSizeChangeparmsAready (val) {
        console.log(val)
        this.parmsAready.pageSize = val//页数
        this.orderuserPayTab();
      },
      orderuserPayTab(){
        var usr = sessionStorage.getItem('userName')
         orderuserPayTab(this.parms.pageNum,this.parms.pageSize,usr).then((response) => {
            if (response.data.code == 200) {
              this.tableDataAlready = response.data.data.records
              this.totalAready = response.data.data.total
            }
          })
      },
      orderuserUnPayTab(){
        let usr = sessionStorage.getItem('userName')
         orderuserUnPayTab(this.parmsAready.pageNum,this.parmsAready.pageSize,usr).then((response) => {
            if (response.data.code == 200) {
              this.tableData = response.data.data.records
              this.total = response.data.data.total
            }
          })
      },
      handleClick(){

      },
      handleEidt(index,row){
        this.form2.stuName=''
        this.form2.orderId=''
        this.form2.orderId=row.orderId
        this.form2.lessonId=row.lessonId
        this.form2.className=row.lessonName
        this.form2.username=sessionStorage.getItem("userName")
        this.form2.totalPay=row.price
        this.dialogFormVisibletwo=true;
      },
      handleDelete(){},
      handleEidtReady(index,rocord){},
      handleDeleteReady(){},
      closeDialog(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            location.reload();
          })
          .catch(_ => { });
      },
      exittwo(){
        this.dialogFormVisibletwo=false
      },
      exitpay(){
        this.form2.password=''
        this.dialogFormVisiblepay=false
      },
      pay(){
        if(this.form2.password==''){
          this.$message.error("密码不能为空!")
        }else {
          login(this.form2).then((response)=>{
            if (response.data.code === 200) {
              joinAndPay(this.form2.username,this.form2.lessonId,this.form2.totalPay,this.form2.stuName,this.form2.orderId).then((response)=>{
                if(response.data.code==200){
                  this.$message.success(response.data.msg)
                  this.dialogFormVisiblepay=false
                }else {
                  this.$message.error(response.data.msg)
                }
              })

            }else {
              this.$message.error(response.data.msg)
            }
          })
        }
      },
      btntwo(){
        if(this.form2.stuName==''){
          this.$message.error("请输入学生姓名")
        }else {
          this.dialogFormVisiblepay=true;

        }
      }
    },
  }
</script>

<style scoped>

</style>
