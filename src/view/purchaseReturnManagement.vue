<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
        <el-button type="success"  style="margin-left: 10px;visibility:hidden">添加商品</el-button>
        <el-dialog title="修改退货商品" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="购买时间" style="width:600px" :label-width="formLabelWidth">
              <el-input disabled  v-model="form.buyTime" autocomplete="off" placeholder="请输入购买时间"></el-input>
            </el-form-item>
            <el-form-item label="退货原因" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.returnReason" autocomplete="off" placeholder="请输入退货原因"></el-input>
            </el-form-item>
            <el-form-item  label="退货时间" style="width:600px" :label-width="formLabelWidth">
              <el-input disabled v-model="form.returnTime" autocomplete="off" placeholder="请输入销售金额"></el-input>
            </el-form-item>
            <el-form-item label="销售状态" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择销售状态">
                <el-option label="待退货" value="待退货"></el-option>
                <el-option label="已退货" value="已退货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.principal" autocomplete="off" placeholder="请输入负责人"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exittwo">取 消</el-button>
            <el-button type="primary" @click="btntwo">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
      <el-col :span="6">
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入商品名查询(不输入内容默认搜索全部)" v-model="goodsName"></el-input>
        <el-button @click="findListClick">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;height: 90%">
      <el-table-column
        label="ID"
        type="index">
      </el-table-column>
      <el-table-column
        label="商品名"
        prop="goodsName">
      </el-table-column>
      <el-table-column
        label="购买时间"
        prop="buyTime">
      </el-table-column>
      <el-table-column
        label="退货原因"
        prop="returnReason">
      </el-table-column>
      <el-table-column
        label="退货时间"
        prop="returnTime">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
      </el-table-column>
      <el-table-column
        label="负责人"
        prop="principal">
      </el-table-column>
      <el-table-column
        align="right"
        width="252px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEidt(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status === '已退货' || scope.row.status === '已发货' "
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            v-else-if="scope.row.status === '待退货'"
            size="mini"
            type="warning"
            @click="handleChange(scope.$index, scope.row)">退货</el-button>
          <!--          <el-button-->
          <!--            v-else-->
          <!--            size="mini"-->
          <!--            type="primary"-->
          <!--            @click="handleChange(scope.$index, scope.row)">发货</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 30px;text-align: center">
      <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" style="text-align: center"/>
    </div>

  </div>
</template>

<script>
  import Pagination from './pagination.vue'
  import {purchasereturnList,
    purchasereturndelete,
    purchasereturnupdate,
    purchasereturnfind,
    purchasereturnupdateStatus
  } from '@/api/user.js';
  export default {
    name: "result",
    components: {
      Pagination
    },
    data() {
      return {
        value1: '',
        tableData: [],
        search: '',
        pageNum: 1,
        pageSize: 10,
        total: 0,
        count: '',
        parms:{
          pageNum:1,
          pageSize:10
        },
        selectList:{
          userId:'',
          status:null
        },
        value:null,
        goodsName:'',
        dialogFormVisible: false,
        dialogFormVisibletwo:false,
        form: {
          goodsName:'',
          buyTime:null,
          returnReason:'',
          returnTime:null,
          status:'',
          id:'',
          principal:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.purchasereturnList();
    },
    methods: {
      getSTime (val) {
        this.value1 = val
        var d = new Date(this.value1[0])
        var startTime =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1) +
          '-' +
          d.getDate()
        console.log(startTime)
        this.form.startTime = startTime
        var d2 = new Date(this.value1[1])
        var endTime =
          d2.getFullYear() +
          '-' +
          (d2.getMonth() + 1) +
          '-' +
          d2.getDate()
        console.log(endTime)
        this.form.endTime = endTime
        // console.log(this.prams)
      },
      handleEidt(index, row) {
        console.log(index, row);
        this.form.id=row.id
        this.form.goodsName=row.goodsName
        this.form.buyTime=row.buyTime
        this.form.returnTime=row.returnTime
        this.form.returnReason=row.returnReason
        this.form.status=row.status
        this.form.principal=row.principal
        this.dialogFormVisibletwo = true;
        this.purchasereturnList();

      },
      handleDelete(index, row) {
        console.log(index, row);
        var r=confirm("是否确定删除？");
        if (r===true){
          purchasereturndelete(row.id).then((response)=>{
            if (response.data === 1){
              this.purchasereturnList();
            }
          })

        }else{

        }
      },
      handleChange(index, row){
        console.log(index, row);
        if (row.status === '待退货'){
          row.status = '已退货'
        }
        purchasereturnupdateStatus(row.id,row.status).then((response)=>{
          if (row.status === '已退货'){
            this.$message.success('退货成功')
          }
        })
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.purchasereturnList();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.purchasereturnList();
      },

      //查询所有任务;
      purchasereturnList(){
        purchasereturnList(this.parms).then((response)=>{
          this.tableData = response.data.list
          console.log(this.tableData)
          this.total = response.data.total
        })
      },
      //查询用户
      findListClick(){
        purchasereturnfind(this.goodsName,this.pageNum,this.pageSize).then((response)=>{
          this.tableData = response.data.list
        })
      },
      btntwo(){
        debugger
        this.dialogFormVisibletwo = false
        purchasereturnupdate(this.form).then((response)=>{
          if (response.data === 1){
            this.purchasereturnList()
            this.$message.success("修改成功");
            this.resetFormData()
          }
        })

      },
      exittwo(form){
        this.dialogFormVisibletwo = false
        this.resetFormData()
      },
      resetFormData(){
        this.form.goodsName ='';
        this.form.buyTime ='';
        this.form.returnReason ='';
        this.form.returnTime ='';
        this.form.status ='';
        this.form.principal ='';
      },
      exit(form){
        this.dialogFormVisible = false
        this.resetFormData()
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
  }
</script>

<style scoped>

</style>
