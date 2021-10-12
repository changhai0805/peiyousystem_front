<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
<!--        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">新增</el-button>-->
<!--        <el-dialog title="添加采购信息" :visible.sync="dialogFormVisible" :before-close="closeDialog" >-->
<!--          <el-form :model="form" ref="form">-->
<!--            <el-form-item label="菜品名称" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.goodName" autocomplete="off" placeholder="请输入菜品名称"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="菜品类型" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.goodType" autocomplete="off" placeholder="请输入菜品类型"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="价格" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.buyNum" autocomplete="off" placeholder="请输入价格"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="菜品来源" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.buyPlace" autocomplete="off" placeholder="请输入菜品来源"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="exit">取 消</el-button>-->
<!--            <el-button type="primary" @click="btn">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
        <el-dialog title="编辑采购信息" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="菜品名称" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodName" autocomplete="off" placeholder="请输入菜品名称"></el-input>
            </el-form-item>
            <el-form-item label="菜品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodType" autocomplete="off" placeholder="请输入菜品类型"></el-input>
            </el-form-item>
            <el-form-item label="价格" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.buyNum" autocomplete="off" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item label="菜品来源" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.buyPlace" autocomplete="off" placeholder="请输入菜品来源"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exittwo">取 消</el-button>
            <el-button type="primary" @click="btntwo">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
<!--      <el-col :span="6">-->
<!--        <el-input style="width: 300px;margin-right: 0px" placeholder="输入职位查询(不输入内容默认搜索全部)" v-model="userName"></el-input>-->
<!--        &lt;!&ndash;        <el-button @click="findListClick">搜索</el-button>&ndash;&gt;-->
<!--      </el-col>-->
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;height: 90%">
      <el-table-column
        label="ID"
        type="index">
      </el-table-column>
      <el-table-column
        label="订餐人姓名"
        prop="orderName">
      </el-table-column>
      <el-table-column
        label="人数"
        prop="orderNum">
      </el-table-column>
      <el-table-column
        label="订餐电话"
        prop="orderPhone">
      </el-table-column>
      <el-table-column
        label="订餐时间"
        prop="orderTime">
      </el-table-column>
      <el-table-column
        label="到达时间"
        prop="getTime">
      </el-table-column>
      <el-table-column
        label="窗口"
        prop="window">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
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
  import {orderinfoList,insertUserList,orderinfodelete,editUserList} from '@/api/user.js';
  export default {
    name: "result",
    components: {
      Pagination
    },
    data() {
      return {
        tableData: [],
        search: '',
        pageNum: 1,
        pageSize: 5,
        total: 0,
        count: '',
        parms:{
          pageNum:1,
          pageSize:5
        },
        selectList:{
          userId:'',
          status:null
        },
        value:null,
        userName:'',
        onePassword:'',
        userId:'',
        dialogFormVisible: false,
        dialogFormVisibletwo:false,
        dialogFormVisiblethree:false,
        form: {
          goodName:'',
          goodType:'',
          buyNum:'',
          buyPlace:'',
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.orderinfoList();
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
        var r=confirm("是否确定删除？");
        if (r===true){
          orderinfodelete(row.id).then((response)=>{
            if (response.data.code === 200){
              this.orderinfoList();
            }
          })

        }else{

        }
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.orderinfoList();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.orderinfoList();
      },
      //用户管理;
      orderinfoList(){
        orderinfoList(this.parms).then((response)=>{
          console.log(response)
          this.tableData = response.data.obj.pageData
          this.total = response.data.obj.totalCount
        })
      },
      btn(){
        this.dialogFormVisible = false
        insertUserList(this.form).then((response)=>{
          if (response.data.code === 200){
            this.$message.success("添加成功");
            this.resetFormData();
            this.orderinfoList();
          }
        })

      },
      btntwo(){
        this.dialogFormVisibletwo = false
        editUserList(this.form).then((response)=>{
          if (response.data.code === 200){
            this.orderinfoList()
            this.$message.success("修改成功");
            this.resetFormData()
          }
        })

      },
      exitthree(form){
        this.dialogFormVisiblethree = false
        this.resetFormData()
      },
      exittwo(form){
        this.dialogFormVisibletwo = false
        this.resetFormData()
      },
      resetFormData(){
        this.form.goodName ='';
        this.form.goodType ='';
        this.form.buyNum ='';
        this.form.buyPlace ='';
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
