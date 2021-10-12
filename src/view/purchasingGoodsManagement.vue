<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">添加商品</el-button>
        <el-dialog title="添加采购商品" :visible.sync="dialogFormVisible" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="采购地" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsPlace" autocomplete="off" placeholder="请输入采购地"></el-input>
            </el-form-item>
            <el-form-item label="购买数量" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.buyNum" autocomplete="off" placeholder="请输入购买数量"></el-input>
            </el-form-item>
            <el-form-item label="购买价格" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.buyPrice" autocomplete="off" placeholder="请输入购买价格"></el-input>
            </el-form-item>
            <el-form-item label="购买时间" style="width:600px" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  v-model="form.buyTime"
                  type="datetime"
                  size="small"
                  range-separator="-"
                  @change="getSTime"
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd hh:mm:ss"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="状态" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择采购状态">
                <el-option label="待入库" value="待入库"></el-option>
                <el-option label="已入库" value="已入库"></el-option>
                <el-option label="退货中" value="退货中"></el-option>
                <el-option label="已退货" value="已退货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.principal" autocomplete="off" placeholder="请输入负责人"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exit">取 消</el-button>
            <el-button type="primary" @click="btn">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改采购商品" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="采购地" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsPlace" autocomplete="off" placeholder="请输入采购地"></el-input>
            </el-form-item>
            <el-form-item label="购买数量" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.buyNum" autocomplete="off" placeholder="请输入购买数量"></el-input>
            </el-form-item>
            <el-form-item label="购买价格" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.buyPrice" autocomplete="off" placeholder="请输入购买价格"></el-input>
            </el-form-item>
            <el-form-item label="购买时间" style="width:600px" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  v-model="form.buyTime"
                  type="datetime"
                  size="small"
                  range-separator="-"
                  @change="getSTime"
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd hh:mm:ss"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="状态" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择采购状态">
                <el-option label="待入库" value="待入库"></el-option>
                <el-option label="已入库" value="已入库"></el-option>
                <el-option label="退货中" value="待退货"></el-option>
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
        label="商品类型"
        prop="goodsType">
      </el-table-column>
      <el-table-column
        label="采购地"
        prop="goodsPlace">
      </el-table-column>
      <el-table-column
        label="购买数量"
        prop="buyNum">
      </el-table-column>
      <el-table-column
        label="购买价格"
        prop="buyPrice">
      </el-table-column>
      <el-table-column
        label="购买时间"
        prop="buyTime">
      </el-table-column>
      <el-table-column
        label="购买状态"
        prop="status">
      </el-table-column>
      <el-table-column
        label="负责人"
        prop="principal">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            class="aa"
            size="mini"
            type="success"
            @click="handleEidt(scope.$index, scope.row)">修改</el-button>
          <el-button
            v-if="scope.row.status === '待入库'"
            size="mini"
            type="primary"
            @click="handleChange(scope.$index, scope.row)">入库</el-button>
          <el-button
            v-else-if="scope.row.status === '待退货'"
            size="mini"
            type="warning"
            @click="handleChange(scope.$index, scope.row)">退货</el-button>
          <el-button
            class="aa"
            v-else
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  import {commoditypurchaseList,
    commoditypurchaseinsert,
    commoditypurchaseupdate,
    commoditypurchasedelete,
    commoditypurchasefind,
    commoditypurchaseupdateStatus
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
        value3:'',
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
          goodsType:'',
          goodsPlace:'',
          buyNum:null,
          buyPrice:null,
          buyTime:null,
          status:'',
          id:'',
          principal:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.commoditypurchaseList();
    },
    methods: {
      handleEidt(index, row) {
        console.log(index, row);
        this.form.id=row.id
        this.form.goodsName=row.goodsName
        this.form.goodsType=row.goodsType
        this.form.goodsPlace=row.goodsPlace
        this.form.buyNum=row.buyNum
        this.form.buyPrice=row.buyPrice
        this.form.buyTime=row.buyTime
        this.form.status=row.status
        this.form.principal=row.principal
        this.dialogFormVisibletwo = true;
        this.commoditypurchaseList();

      },
      handleChange(index, row){
        console.log(index, row);
        debugger
        if (row.status === '待退货'){
          row.status = '已退货'
        }
        if (row.status === '待入库'){
          row.status = '已入库'
        }
        commoditypurchaseupdateStatus(row.id,row.status).then((response)=>{
         if (row.status === '已退货'){
           this.$message.success('退货成功')
         }else if(row.status === '已入库'){
           this.$message.success('入库成功')
         }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        var r=confirm("是否确定删除？");
        if (r===true){
          commoditypurchasedelete(row.id).then((response)=>{
            if (response.data === 1){
              this.$message.success('删除成功')
              this.commoditypurchaseList();
            }else{
              this.commoditypurchaseList();
            }
          })

        }else{
          this.commoditypurchaseList();
        }
      },

        getSTime (val) {
        console.log(val)
          this.value1 = val
          var d = new Date(this.value1)
          var startTime =
            d.getFullYear() +
            '-' +
            (d.getMonth() + 1) +
            '-' +
            d.getDate() +
            ' ' +
            d.getHours() +
            ':' +
            d.getMinutes() +
            ':' +
            d.getSeconds()
          console.log(startTime)
          this.form.buyTime = startTime
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.commoditypurchaseList();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.commoditypurchaseList();
      },

      //查询所有任务;
      commoditypurchaseList(){
        commoditypurchaseList(this.parms).then((response)=>{
          this.tableData = response.data.list
          console.log(this.tableData)
          this.total = response.data.total
        })
      },
      //查询用户
      findListClick(){
        commoditypurchasefind(this.goodsName,this.pageNum,this.pageSize).then((response)=>{
          this.tableData = response.data.list
        })
      },
      btn(){
        this.dialogFormVisible = false
        commoditypurchaseinsert(this.form).then((response)=>{
          if (response.data === 1){
            this.$message.success("添加成功");
          }else {
            this.$message.error("输入的内容有误")
          }
        })
        this.resetFormData();
        this.commoditypurchaseList();

      },
      btntwo(){
        this.dialogFormVisibletwo = false
        commoditypurchaseupdate(this.form).then((response)=>{
          if (response.data === 1){
            this.commoditypurchaseList()
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
        this.form.goodsType ='';
        this.form.goodsPlace ='';
        this.form.buyNum ='';
        this.form.buyPrice ='';
        this.form.buyTime ='';
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
