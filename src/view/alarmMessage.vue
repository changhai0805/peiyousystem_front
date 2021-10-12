<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">新增菜品</el-button>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="菜品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.menuName" autocomplete="off" placeholder="请输入菜品名"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.menuDescription" autocomplete="off" placeholder="请输入菜品描述"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" style="width:600px" :label-width="formLabelWidth">
              <el-upload
                action
                list-type="picture-card"
                :http-request="uploadchange"
                :on-preview="handlePictureCardPreview"
                :on-change="handleChange"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
<!--              <el-input v-model="form.firstUrl" autocomplete="off" placeholder="请上传菜品图片"></el-input>-->
            </el-form-item>
            <el-form-item label="价格" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.price" autocomplete="off" placeholder="请输入菜品价格"></el-input>
            </el-form-item>
            <el-form-item label="窗口" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.window" autocomplete="off" placeholder="请输入窗口"></el-input>
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
        <el-dialog title="修改任务" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog" >
          <el-form :model="form" ref="form">
            <el-form-item label="商品名" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsName" autocomplete="off" placeholder="请输入商品名"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.goodsType" autocomplete="off" placeholder="请输入商品类型"></el-input>
            </el-form-item>
            <el-form-item label="总生产数量" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.produceNum" autocomplete="off" placeholder="请输入总生产量"></el-input>
            </el-form-item>
            <el-form-item label="每日生产数量" style="width:600px" :label-width="formLabelWidth">
              <el-input v-model="form.produceDaily" autocomplete="off" placeholder="请输入每日生产量"></el-input>
            </el-form-item>
            <el-form-item label="选择时间" style="width:600px" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  @change="getSTime"
                  format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>

            <el-form-item label="任务状态" style="width:600px" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择任务状态">
                <el-option label="生产中" value="生产中"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="未完成" value="未完成"></el-option>
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
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入商品名查询(不输入内容默认搜索全部)" v-model="userName"></el-input>
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
        label="菜品名称"
        prop="menuName">
      </el-table-column>
      <el-table-column
        label="菜品图片"
        prop="firstUrl">
      </el-table-column>
      <el-table-column
        label="菜品描述"
        prop="menuDescription">
      </el-table-column>
      <el-table-column
        label="菜品价格"
        prop="price">
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="creatTime">
      </el-table-column>
      <el-table-column
        label="窗口"
        prop="window">
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
        width="240px"
        align="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === '未采样'"
            size="mini"
            type="primary"
            @click="handleChange(scope.$index, scope.row)">采样</el-button>
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
  import {producetaskList,
          producetaskinsertList,
          menucaipin
          // producetaskdeleteList,
          // producetaskeditList,
          // producetaskselectList,
          } from '@/api/user.js';
  export default {
    name: "result",
    components: {
      Pagination
    },
    data() {
      return {
        upFile:'',
        imageUrl: '',
        value1:[],
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
        userName:'',
        dialogFormVisible: false,
        dialogFormVisibletwo:false,
        form: {
          menuName:'',
          menuDescription:'',
          firstUrl:'',
          price:'',
          window:'',
          principal:'',
          id:''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.producetaskList();
    },
    methods: {
//上传图标事件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadchange(item){
        const fileObj = item.file
        const form01 = new FormData()
        form01.append('file', fileObj)
        form01.append('aa', "gggg")
        menucaipin(form01).then((response)=>{
        })
      },
      //上传文件变化监听
      handleChange(file, fileList){
        console.log(file,fileList)
        this.upFile = file.raw
      },
      getSTime (val) {
        console.log(val)
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
        this.form.produceNum=row.produceNum
        this.form.produceDaily=row.produceDaily
        this.form.startTime=row.startTime
        this.form.endTime=row.endTime
        this.value1.push(row.startTime)
        this.value1.push(row.endTime)
        this.form.status=row.status
        this.form.principal=row.principal
        this.dialogFormVisibletwo = true;
        this.producetaskList();
      },
      handleDelete(index, row) {
        console.log(index, row);
        var r=confirm("是否确定删除？");
        if (r===true){
          producetaskdeleteList(row.id).then((response)=>{
          })
          this.producetaskList();
        }else{

        }
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.producetaskList();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.producetaskList();
      },

      //查询所有菜品;
      producetaskList(){
        producetaskList(this.parms).then((response)=>{
          this.tableData = response.data.obj.pageData
          console.log(this.tableData)
          // this.total = response.data.total
        })
      },
      //查询用户
      findListClick(){
        producetaskselectList(this.userName,this.pageNum,this.pageSize).then((response)=>{
          this.tableData = response.data.list
        })
      },
      btn(){
        this.dialogFormVisible = false
          producetaskinsertList(this.form).then((response)=>{
          })
          this.$message.success("添加成功");
          this.resetFormData();
          this.producetaskList();

      },
      btntwo(){
        this.dialogFormVisibletwo = false
        producetaskeditList(this.form).then((response)=>{
          if (response.data === 1){
            this.producetaskList()
            this.$message.success("修改成功");
            this.resetFormData()
          }
        });

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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
