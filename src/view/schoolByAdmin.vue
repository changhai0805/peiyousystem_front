<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #444;font-weight: bold;display: inline-block;padding-left: 60px;font-size: 22px">校区信息</span>
      </div>
      <div style="width: 100%;">
        <label style="text-align: right;float: left;font-size: 22px;margin-top: 22px">校区名称：{{schoolName}}</label><br>
        <label style="text-align: right;font-size: 22px;margin-top: 30px">校区地点：{{schoolAddr}}</label>
      </div>
    </el-card>
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible" :before-close="closeDialog">
      <el-form :model="form" ref="form">
        <el-form-item label="教室编号" style="width:600px" :label-width="formLabelWidth">
          <el-input style="width:600px" v-model="form.classroomId" autocomplete="off" placeholder="请输入教室编号"></el-input>
        </el-form-item>
        <el-form-item label="教室地点" style="width:600px" :label-width="formLabelWidth">
          <el-input style="width:600px" v-model="form.classAddr" autocomplete="off"
                    placeholder="请输入教室地点"></el-input>
        </el-form-item>
        <el-form-item label="班容量" style="width:600px" :label-width="formLabelWidth">
          <el-input style="width:600px" type="number" v-model="form.classSize" autocomplete="off" placeholder="请输入班容量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exit">取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%;height: 90%">
      <el-table-column
        label="ID"
        type="index">
      </el-table-column>
      <el-table-column
        label="教室编号"
        prop="classroomId">
      </el-table-column>
      <el-table-column
        label="教室地点"
        prop="classAddr">
      </el-table-column>
      <el-table-column
        width="200px"
        label="班容量"
        prop="classSize">
      </el-table-column>
      <el-table-column
        align="center"
        width="300px"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEidt(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 30px;text-align: center">
      <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
                  style="text-align: center"/>
    </div>
  </div>
</template>

<script>
  import {schoolInfoDo,updateClassroom,deleteClassroom} from '@/api/user.js';
  import Pagination from './pagination'
  export default {
    name: "test",
    components: {
      Pagination
    },
    data(){
      return{
        dialogFormVisible: false,
        tableData: [],
        userName:sessionStorage.getItem("userName"),
        pwd:'',
        schoolName:'',
        schoolAddr:'',
        pageNum: 1,
        pageSize: 10,
        total: 0,
        parms: {
          pageNum: 1,
          pageSize: 10
        },
        form: {
          id: '',
          classroomId: '',
          classAddr: '',
          classSize: '',
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.selectSchoolInfo();
    },
    methods:{
      handleEidt (index, row) {
        console.log(index, row)
        this.form.id = row.id
        this.form.classroomId = row.classroomId
        this.form.classAddr = row.classAddr
        this.form.classSize = row.classSize
        this.dialogFormVisible = true
        this.selectSchoolInfo()
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.selectSchoolInfo();
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.selectSchoolInfo();
      },
      selectSchoolInfo(){
        schoolInfoDo(this.parms.pageNum,this.parms.pageSize,this.userName).then((response) => {
            this.schoolName = response.data.data.schoolInfo.schoolName;
            this.schoolAddr = response.data.data.schoolInfo.schoolAddr;
            this.tableData = response.data.data.classroomList.records
            this.total = response.data.data.classroomList.total
        })
      },
      btn () {
        updateClassroom(this.form).then((response) => {
            this.dialogFormVisible = false
            this.$message.success(response.data.msg)
            this.resetFormData()
            this.selectSchoolInfo()
        })

      },
      handleDelete (index, row) {
        var r = confirm('是否确定删除？')
        if (r === true) {
          deleteClassroom(row.id).then((response) => {
              this.$message.success(response.data.msg)
              this.selectSchoolInfo()
          })

        } else {

        }
      },
      resetFormData () {
        this.form.classSize = ''
        this.form.classAddr = ''
        this.form.classroomId = ''
        this.form.id = ''
      },
      exit (form) {
        this.dialogFormVisible = false
        this.resetFormData()
      },
      closeDialog (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
            location.reload()
          })
          .catch(_ => {
          })
      }
    }
  }
</script>

<style scoped>

</style>
