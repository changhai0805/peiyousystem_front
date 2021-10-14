<template>
    <div class="">
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unreadNum})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{scope.row.message}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="creatTime" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template #default="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="handleAllRead">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${readNum})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title">{{scope.row.message}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="creatTime" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template #default="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleAllDel">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
  import {selectAllMessageByUserId,updateMessageStatus,deleteAllMessageByUserId,deleteMessage,updateAllMessageByUserId} from '@/api/user.js';
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [],
                unreadNum:'0',
                read: [],
                readNum:'0'
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
              updateMessageStatus(id).then((response)=>{
                if(response.data==1){
                  this.$message.success("已读成功!");
                  this.selectMessage();
                }else {
                  this.$message.error("操作失败");
                }
              })
            },
          handleAllRead(index) {
            var userId = sessionStorage.getItem("userId");
            updateAllMessageByUserId(userId).then((response)=>{
              if(response.data>0){
                this.$message.success("全部已读成功!!");
                this.selectMessage();
              }else {
                this.$message.error("操作失败");
              }
            })
          },
            handleDel(index) {

                const item = this.read.splice(index, 1);
              var id= item[0].id;
              deleteMessage(id).then((response)=>{
                if(response.data==1){
                  this.$message.success("删除成功!");
                  this.selectMessage();
                }else {
                  this.$message.error("操作失败");
                }
              })
            },
          handleAllDel(index) {
            var userId = sessionStorage.getItem("userId");
            deleteAllMessageByUserId(userId).then((response)=>{
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
            selectAllMessageByUserId(userId).then((response)=>{
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

