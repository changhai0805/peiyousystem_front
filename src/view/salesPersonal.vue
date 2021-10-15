<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
<!--        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">添加用户</el-button>-->

        <el-dialog title="修改教师" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog">
          <el-form :model="form" ref="form">
            <el-form-item label="课程编号" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.lessonId" disabled autocomplete="off" placeholder="请输入课程编号"></el-input>
            </el-form-item>
            <el-form-item label="课程名称" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.lessonName" disabled autocomplete="off" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="教师" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px"  v-model="form.teacherId" placeholder="请选择管理的校区">
                <el-option v-for="(item,index) in teacherList" :key="index" :label="item.teacherName" :value="item.teacherId"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exittwo">取 消</el-button>
            <el-button type="primary" @click="btntwo">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
      <el-col :span="6">
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入课程名查询(不输入内容默认搜索全部)"
                  v-model="goodsName"></el-input>
        <el-button @click="findListClick">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        label="ID"
        type="index">
      </el-table-column>
      <el-table-column
        label="课程编号"
        prop="lessonId">
      </el-table-column>
      <el-table-column
        label="课程名称"
        prop="className">
      </el-table-column>
      <el-table-column
        label="季度"
        prop="quarter">
      </el-table-column>
      <el-table-column
        label="班级类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.grade !=0 ">{{scope.row.grade}}年级</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上课方式"
        prop="classMethod">
      </el-table-column>
      <el-table-column
        label="科目"
        prop="subject">
      </el-table-column>
      <el-table-column
        label="教师名称"
        prop="teacherName">
      </el-table-column>
      <el-table-column
        label="年级"
        prop="grade">
      </el-table-column>
      <el-table-column
        label="教室号"
        prop="classroomId">
      </el-table-column>
      <el-table-column
        label="开课时间"
        prop="startTime">
      </el-table-column>
      <el-table-column
        label="课程数"
        prop="total">
        <template slot-scope="scope">
          <span>{{scope.row.total}}节</span>
        </template>
      </el-table-column>
      <el-table-column
        label="价格/节"
        prop="price">
        <template slot-scope="scope">
          <span>{{scope.row.price}}元</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="isStart">
      </el-table-column>
      <el-table-column
        label="当前人数"
        prop="joinNum">
      </el-table-column>
      <el-table-column
        label="上课时间"
          prop="classTime">
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
            @click="handleEidt(scope.$index, scope.row)">修改教师
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="充值"
      :visible.sync="dialogVisibleCz"
      width="30%"
      :before-close="handleClose">
      充值金额：
      <el-input style="width:80%" type="number" v-model="moneyCz"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="quitCz">取 消</el-button>
          <el-button type="primary" @click="btnCz">确 定</el-button>
        </span>
    </el-dialog>
    <div style="height: 30px;text-align: center">
      <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"
                  style="text-align: center;height: 5%"/>
    </div>

  </div>
</template>

<script>
  import Pagination from './pagination.vue'
  import {selectLessonList,selectLessonListByName,getTeacherList,updateLessonTeacher} from '@/api/user.js';
  export default {
    name: "test",
    components: {
      Pagination
    },
    data(){
      return{
        userName:sessionStorage.getItem("userName"),
        value1: '',
        tableData: [],
        flagJY: '禁用',
        search: '',
        dialogVisibleCz: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        moneyChongzhiusername: 0,
        moneyCz: '',
        count: '',
        parms: {
          pageNum: 1,
          pageSize: 10
        },
        selectList: {
          userId: '',
          status: null
        },
        schoolId:'',
        addSchoolIdList:[],
        value: null,
        goodsName: '',
        dialogFormVisible: false,
        dialogFormVisibletwo: false,
        form: {
          lessonId:'',
          lessonName:'',
          teacherName:'',
          teacherId:'',
        },
        teacherList:[],
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.listAlldo()
      this.getSchoolList()
    },
    methods: {
      getSchoolList(){
        schoolgetSchoolListdo().then((response)=>{
          this.addSchoolIdList=response.data.data
        })

      },
      quitCz () {
        this.moneyCz = ''
        this.dialogVisibleCz = false
      },
      btnCz () {
        usermakeMoneydo(this.moneyChongzhiusername, this.moneyCz).then((response) => {
          if (this.moneyCz <= 0) {
            this.$message.error('请输入大于0的整数')
          } else {
            if (response.data.code == 200) {
              this.moneyCz = ''
              this.$message.success(response.data.msg)
              this.listAlldo()
              this.dialogVisibleCz = false
            } else {
              this.$message.error(response.data.msg)
            }
          }
        })

      },
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
      handleEidt (index, row) {
        getTeacherList().then((response)=>{
          this.teacherList=response.data.data
        })
        this.form.teacherName=row.teacherName;
        this.form.teacherId=row.teacherId;
        this.form.lessonId=row.lessonId;
        this.form.lessonName=row.className;
        this.dialogFormVisibletwo = true
        this.listAlldo()
      },
      handlechange (index, row) {
        console.log(index, row)
        this.moneyChongzhiusername = row.username
        this.dialogVisibleCz = true
      },
      handlechangeJY (index, row) {
        console.log(index, row)
        if (row.status == '禁用') {
          userupdateStatusdo(row.username, '启用').then((response) => {
            if (response.data.code == 200) {
              this.$message.success(response.data.msg)
              this.listAlldo()
            }

          })
        } else {
          userupdateStatusdo(row.username, '禁用').then((response) => {
            if (response.data.code == 200) {
              this.$message.success(response.data.msg)
              this.listAlldo()
            }
          })
        }

      },
      handleDelete (index, row) {
        console.log(index, row)
        var r = confirm('是否确定删除？')
        if (r === true) {
          deletedo(row.id).then((response) => {
            if (response.data.code == 200) {
              this.$message.success(response.data.msg)
              this.listAlldo()
            }
          })

        } else {

        }
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.listAlldo()
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.listAlldo()
      },

      //查询所有任务;
      listAlldo () {
        selectLessonList(this.parms.pageNum, this.parms.pageSize).then((response) => {
          this.tableData = response.data.data.records
          this.total = response.data.data.total
        })
      },
      //查询用户
      findListClick () {
        selectLessonListByName(this.parms.pageNum, this.parms.pageSize, this.goodsName).then((response) => {
          this.tableData = response.data.data.records
        })
      },
      btn () {
        savedo(this.form).then((response) => {
          if(this.form.roleId=='1'){
            insertAdminSchool(this.form.username,this.schoolId).then((response)=>{

            })
          }
          if (response.data.code == 200) {
            this.dialogFormVisible = false
            this.$message.success(response.data.msg)
            this.resetFormData()
            this.listAlldo()
          } else {
            this.$message.error(response.data.msg)
          }
        })

      },
      btntwo () {
        updateLessonTeacher(this.form.lessonId,this.form.teacherId).then((response) => {
          if (response.data.data == true) {
            this.$message.success("修改成功")
            this.dialogFormVisibletwo = false
            //发送消息
            this.listAlldo()
            this.resetFormData()
          }else {
            this.$message.error("修改失败")

          }
        })
      },
      exittwo (form) {
        this.dialogFormVisibletwo = false
        this.resetFormData()
      },
      resetFormData () {
        this.form.lessonId = ''
        this.form.lessonName = ''
        this.form.teacherId = ''
        this.form.teacherName = ''
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
    },
  }
</script>

<style scoped>

</style>
