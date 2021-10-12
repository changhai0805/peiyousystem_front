<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
<!--        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">添加教师</el-button>-->
<!--        <el-dialog title="新增教师" :visible.sync="dialogFormVisible" :before-close="closeDialog" >-->
<!--          <el-form :model="form" ref="form">-->
<!--            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="发起时间" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input disabled v-model="form.returnTime" autocomplete="off" placeholder="输入发货地点"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="退货原因" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.returnReason" autocomplete="off" placeholder="请输入销售金额"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="退货金额" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.returnPrice" autocomplete="off" placeholder="请输入销售金额"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="销售状态" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-select v-model="form.status" placeholder="请选择销售状态">-->
<!--                <el-option label="待退货" value="待退货"></el-option>-->
<!--                <el-option label="已退货" value="已退货"></el-option>-->
<!--                <el-option label="待发货" value="待发货"></el-option>-->
<!--                <el-option label="已发货" value="已发货"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="负责人" style="width:600px" :label-width="formLabelWidth">-->
<!--              <el-input v-model="form.principal" autocomplete="off" placeholder="请输入负责人"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="exit">取 消</el-button>-->
<!--            <el-button type="primary" @click="btn">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
        <el-dialog title="修改教师" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="用户名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="教师名称" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width:600px" :label-width="formLabelWidth">
              <el-input disabled v-model="form.returnTime" autocomplete="off" placeholder="输入发货地点"></el-input>
            </el-form-item>
            <el-form-item label="学科" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.returnReason" autocomplete="off" placeholder="请输入销售金额"></el-input>
            </el-form-item>
            <el-form-item label="最高学历" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.returnPrice" autocomplete="off" placeholder="请输入销售金额"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择销售状态">
                <el-option label="待退货" value="待退货"></el-option>
                <el-option label="已退货" value="已退货"></el-option>
                <el-option label="待发货" value="待发货"></el-option>
                <el-option label="已发货" value="已发货"></el-option>
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
        <el-dialog title="评价信息" :visible.sync="dialogFormVisiblethree" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="发起时间" style="width:600px" :label-width="formLabelWidth">
              <el-input disabled v-model="form.returnTime" autocomplete="off" placeholder="输入发货地点"></el-input>
            </el-form-item>
            <el-form-item label="退货原因" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.returnReason" autocomplete="off" placeholder="请输入销售金额"></el-input>
            </el-form-item>
            <el-form-item label="退货金额" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.returnPrice" autocomplete="off" placeholder="请输入销售金额"></el-input>
            </el-form-item>
            <el-form-item label="销售状态" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择销售状态">
                <el-option label="待退货" value="待退货"></el-option>
                <el-option label="已退货" value="已退货"></el-option>
                <el-option label="待发货" value="待发货"></el-option>
                <el-option label="已发货" value="已发货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.principal" autocomplete="off" placeholder="请输入负责人"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exitthree">取 消</el-button>
            <el-button type="primary" @click="btnthree">确 定</el-button>
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
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="教师名称"
        prop="realName">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex">
      </el-table-column>
      <el-table-column
        label="学科"
        prop="subject">
      </el-table-column>
      <el-table-column
        label="最高学历"
        prop="education">
      </el-table-column>
      <el-table-column
        label="毕业院校"
        prop="university">
      </el-table-column>
      <el-table-column
        label="教龄"
        prop="teachYear">
        <template slot-scope="scope">
        <span>{{scope.row.teachYear}}年</span>
        </template>
      </el-table-column>
      <el-table-column
        label="教资证书编号"
        prop="licenseId">
      </el-table-column>
      <el-table-column
        label="评价信息"
        align="center"
        width="100px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handlePingjia(scope.$index, scope.row)">查看评价</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      width="252px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEidt(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status === '已退货' || scope.row.status === '已发货' "
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
  import {teacherList} from '@/api/user.js';
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
        dialogFormVisiblethree:false,
        form: {
          goodsName:'',
          goodsType:'',
          returnTime:null,
          returnReason:'',
          returnPrice:null,
          status:'',
          id:'',
          principal:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.teacherList();
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
        this.form.goodsType=row.goodsType
        this.form.returnTime=row.returnTime
        this.form.returnReason=row.returnReason
        this.form.returnPrice=row.returnPrice
        this.form.status=row.status
        this.form.principal=row.principal
        this.dialogFormVisibletwo = true;
        this.salereturnList();

      },
      handlePingjia(index, row) {
        console.log(index, row);
        this.form.id=row.id
        this.form.goodsName=row.goodsName
        this.form.goodsType=row.goodsType
        this.form.returnTime=row.returnTime
        this.form.returnReason=row.returnReason
        this.form.returnPrice=row.returnPrice
        this.form.status=row.status
        this.form.principal=row.principal
        this.dialogFormVisiblethree = true;
        this.salereturnList();

      },
      handleDelete(index, row) {
        console.log(index, row);
        var r=confirm("是否确定删除？");
        if (r===true){
          salereturndelete(row.id).then((response)=>{
          })
          this.salereturnList();
        }else{

        }
      },
      handleChange(index, row){
        console.log(index, row);
        if (row.status === '待退货'){
          row.status = '已退货'
        }
        salereturnupdateStatus(row.id,row.status).then((response)=>{
          if (response.data === 1){
             row.status = '已退货';
          }else {
          }
        })
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.salereturnList();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.salereturnList();
      },

      //查询所有任务;
      teacherList(){
        teacherList(this.parms.pageNum,this.parms.pageSize).then((response)=>{
          this.tableData = response.data.data.records
          this.total = response.data.data.total
        })
      },
      //查询用户
      findListClick(){
        salereturnfind(this.goodsName,this.pageNum,this.pageSize).then((response)=>{
          this.tableData = response.data.list
        })
      },
      btntwo(){
        debugger
        this.dialogFormVisibletwo = false
        salereturnupdate(this.form).then((response)=>{
        })
        this.salereturnList()
        this.$message.success("修改成功");
        this.resetFormData()
      },
      btnthree(){
        debugger
        this.dialogFormVisiblethree = false
        salereturnupdate(this.form).then((response)=>{
        })
        this.salereturnList()
        this.$message.success("修改成功");
        this.resetFormData()
      },
      exittwo(form){
        this.dialogFormVisibletwo = false
        this.resetFormData()
      },
      exitthree(form){
        this.dialogFormVisiblethree = false
        this.resetFormData()
      },
      resetFormData(){
        this.form.goodsName ='';
        this.form.goodsType ='';
        this.form.returnTime ='';
        this.form.returnReason ='';
        this.form.returnPrice ='';
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
