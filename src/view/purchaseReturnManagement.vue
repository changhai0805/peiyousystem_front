<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未缴费" name="first">
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
        <el-tab-pane label="已缴费" name="second">
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
  import {orderuserPayTab,orderuserUnPayTab} from '@/api/user.js';
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
        activeName: 'first',
        parms:{
          pageNum:1,
          pageSize:10
        },
         parmsAready:{
          pageNum:1,
          pageSize:10
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
                this.tableData = response.data.data.records
                this.total = response.data.data.total
            }
          })
      },
      orderuserUnPayTab(){
        let usr = sessionStorage.getItem('userName')
         orderuserUnPayTab(this.parmsAready.pageNum,this.parmsAready.pageSize,usr).then((response) => {
            if (response.data.code == 200) {
             this.tableDataAlready = response.data.data.records
             this.totalAready = response.data.data.total
            }
          })
      },
      handleClick(){

      },
      handleEidt(){},
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
      }
    },
  }
</script>

<style scoped>

</style>
