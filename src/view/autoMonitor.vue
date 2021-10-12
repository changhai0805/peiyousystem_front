<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">添加商品</el-button>
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="保质期" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.qualityTime" autocomplete="off" placeholder="输入保质期必须加单位,例7天、5个月"></el-input>
            </el-form-item>
            <el-form-item label="发酵工艺" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.fermentMethod" placeholder="请选择任务状态">
                <el-option label="上发酵" value="上发酵"></el-option>
                <el-option label="下发酵" value="下发酵"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒精度数" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.alcoholDegree" autocomplete="off" placeholder="输入酒精度必须加单位%VOL,例3.5%VOL"></el-input>
            </el-form-item>
            <el-form-item label="麦芽浓度" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.maltConcentration" autocomplete="off" placeholder="输入酒精度必须加单位5°P,例5°P"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exit">取 消</el-button>
            <el-button type="primary" @click="btn">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加商品" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="保质期" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.qualityTime" autocomplete="off" placeholder="输入保质期必须加单位,例7天、5个月"></el-input>
            </el-form-item>
            <el-form-item label="发酵工艺" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.fermentMethod" placeholder="请选择任务状态">
                <el-option label="上发酵" value="上发酵"></el-option>
                <el-option label="下发酵" value="下发酵"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒精度数" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.alcoholDegree" autocomplete="off" placeholder="输入酒精度必须加单位%VOL,例3.5%VOL"></el-input>
            </el-form-item>
            <el-form-item label="麦芽浓度" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.maltConcentration" autocomplete="off" placeholder="输入酒精度必须加单位5°P,例5°P"></el-input>
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
        label="保质期"
        prop="qualityTime">
      </el-table-column>
      <el-table-column
        label="发酵工艺"
        prop="fermentMethod">
      </el-table-column>
      <el-table-column
        label="酒精度数"
        prop="alcoholDegree">
      </el-table-column>
      <el-table-column
        label="麦芽浓度"
        prop="maltConcentration">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEidt(scope.$index, scope.row)">编辑</el-button>
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
  import {goodsinfoList,
    goodsinfoinsert,
    goodsinfodelete,
    goodsinfoupdate,
    goodsinfofind
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
          goodsType:'',
          qualityTime:'',
          fermentMethod:'',
          alcoholDegree:'',
          maltConcentration:'',
          id:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.goodsinfoList();
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
        this.form.qualityTime=row.qualityTime
        this.form.fermentMethod=row.fermentMethod
        this.form.alcoholDegree=row.alcoholDegree
        this.form.maltConcentration=row.maltConcentration
        this.dialogFormVisibletwo = true;
        this.goodsinfoList();

      },
      handleDelete(index, row) {
        console.log(index, row);
        var r=confirm("是否确定删除？");
        if (r===true){
          goodsinfodelete(row.id).then((response)=>{
          })
          this.goodsinfoList();
        }else{

        }
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.goodsinfoList();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.goodsinfoList();
      },

      //查询所有任务;
      goodsinfoList(){
        goodsinfoList(this.parms).then((response)=>{
          this.tableData = response.data.list
          console.log(this.tableData)
          this.total = response.data.total
        })
      },
      //查询用户
      findListClick(){
        goodsinfofind(this.goodsName,this.pageNum,this.pageSize).then((response)=>{
          this.tableData = response.data.list
        })
      },
      btn(){
        this.dialogFormVisible = false
        goodsinfoinsert(this.form).then((response)=>{
         if (response.data === 1){
           this.$message.success("添加成功");
         }else {
           this.$message.error("输入的内容有误")
         }
        })

        this.resetFormData();
        this.goodsinfoList();

      },
      btntwo(){
        this.dialogFormVisibletwo = false
        goodsinfoupdate(this.form).then((response)=>{

        })
        this.goodsinfoList()
        this.$message.success("修改成功");
        this.resetFormData()
      },
      exittwo(form){
        this.dialogFormVisibletwo = false
        this.resetFormData()
      },
      resetFormData(){
        this.form.goodsName ='';
        this.form.goodsType ='';
        this.form.produceNum ='';
        this.form.produceDaily ='';
        this.form.startTime ='';
        this.form.endTime ='';
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
