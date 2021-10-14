<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 用户反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog title="意见回复" :visible.sync="dialogFormVisible" :before-close="closeDialog" >
      <el-form :model="WalletForm" ref="form">
        <el-form-item label="用户名:" prop="userName" style="width:650px" label-width="220px">
          <el-input disabled
                    type="text"
                    v-model="replyForm.userName"
                    placeholder="请输入用户名">
          </el-input>
        </el-form-item>

        <el-form-item label="回复内容:" prop="replyInfo"  style="width:650px" label-width="220px">
          <el-input
            type="textarea"
            v-model="replyForm.replyInfo"
            placeholder="请输入回复信息">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exit">取 消</el-button>
        <el-button type="primary" @click="btn">回 复</el-button>
      </div>
    </el-dialog>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未回复(${unreadNum})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column width="200px">
              <template #default="scope">
                <span>用户{{scope.row.userName}}:</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <span class="message-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.opinionInfo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" width="180"></el-table-column>
            <el-table-column width="120">
              <template #default="scope">
                <el-button size="small" @click="handleRead(scope.$index)">回复用户</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`已回复(${readNum})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template #default="scope">
                  <span>用户{{scope.row.userName}}:</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template #default="scope">
                  <span class="message-title">{{scope.row.opinionInfo}}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template #default="scope">
                  <span class="message-title">回复内容:  {{scope.row.replyInfo}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" width="150"></el-table-column>
              <el-table-column width="120">
                <template #default="scope">
                  <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Pagination from './pagination.vue'
  import {selectAllOpinionByUserId,replyOpinion,deleteAllOpinionByUserId,deleteOpinion,updateAllOpinionByUserId} from '@/api/user.js';
  export default {
    name: 'tabs',
    data() {
      return {
        message: 'first',
        showHeader: false,
        unread: [],
        unreadNum:'0',
        read: [],
        readNum:'0',
        replyForm:{
          id:'',
          userName:'',
          replyInfo:''
        }
      }
    },
    mounted() {
      this.selectMessage();
      // var time = setInterval(() => {
      //   this.selectMessage();
      // }, 5000);
    },
    methods: {
      handleRead(index) {
        var item = this.unread.splice(index, 1);
        var id= item[0].id;
        var userName=item[0].userName;
        this.replyForm.userName=userName;
        this.replyForm.id=id;
        this.dialogFormVisible = true;
        this.selectMessage();
      },
      handleAllRead(index) {
        var userId = sessionStorage.getItem("userName");
        updateAllOpinionByUserId(userId).then((response)=>{
          if(response.data>0){
            this.$message.success("全部已读成功!!");
            this.selectMessage();
          }else {
            this.$message.error("操作失败");
          }
        })
      },
      btn(){
        replyOpinion(this.replyForm).then((response)=>{
          if(response.data == 1){
            this.$message.success('回复成功!');
            this.dialogFormVisible = false
            this.resetFormData()
            this.selectMessage();
          }else{
            this.$message.error('回复失败!');
          }

        })
      },
      exit(form){
        this.dialogFormVisible = false
        this.resetFormData();
        this.selectMessage();
      },
      resetFormData(){
        this.replyForm.userName ='';
        this.replyForm.replyInfo ='';
      },
      handleDel(index) {

        const item = this.read.splice(index, 1);
        var id= item[0].id;
        deleteOpinion(id).then((response)=>{
          if(response.data==1){
            this.$message.success("删除成功!");
            this.selectMessage();
          }else {
            this.$message.error("操作失败");
          }
        })
      },
      handleAllDel(index) {
        var userId = sessionStorage.getItem("userName");
        deleteAllOpinionByUserId(userId).then((response)=>{
          if(response.data>0){
            this.$message.success("全部删除成功!!");
            this.selectMessage();
          }else {
            this.$message.error("删除失败");
          }
        })
      },
      //用户管理;
      selectMessage(){
        var userId = sessionStorage.getItem("userName");
        selectAllOpinionByUserId(userId).then((response)=>{
          this.unread = response.data.unread;
          this.read = response.data.read;
          this.unreadNum = response.data.unread.length;
          this.readNum = response.data.read.length;
        })
      },
    },
    computed: {
      unreadNums(){
        return this.unreadNum;
      }
    }
  }

</script>

<style>
  .message-title{
    cursor: pointer;
  }
  .handle-row{
    margin-top: 30px;
  }
</style>

