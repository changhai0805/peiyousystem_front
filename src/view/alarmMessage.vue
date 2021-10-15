<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
     <span style="color:#606266;padding-left:10px">选择课程：</span><el-select @change="optinClick" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        label="年级"
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
        label="班级类型"
        prop="classType">
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
            @click="handleEidt(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.status == '禁用'"
            @click="handlechangeJY(scope.$index, scope.row)">启用
          </el-button>
          <el-button
            size="mini"
            type="primary"
            v-else
            @click="handlechangeJY(scope.$index, scope.row)">禁用
          </el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handlechange(scope.$index, scope.row)">充值
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
                  style="text-align: center;height: 5%"/>
    </div>

  </div>
</template>

<script>
  import Pagination from './pagination.vue'
  import {
    lessonselectLessonByTeacher,
    findUserList,
    userupdateStatusdo,
    usermakeMoneydo,
    deletedo,
    savedo,
    updatedo,
    schoolgetSchoolListdo
  } from '@/api/user.js'

  export default {
    name: 'result',
    components: {
      Pagination
    },
    data () {
      return {
        options:[],
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
        value: null,
        goodsName: '',
        dialogFormVisible: false,
        dialogFormVisibletwo: false,
        form: {
          username: '',
          realName: '',
          telephone: null,
          email: '',
          sex: '',
          money: '',
          roleId: '',
          grade: '',
          password: '',
          id: '',
        },
        formLabelWidth: '120px'
      }
    },
    mounted () {
      this.schoolgetSchoolListdo()
      // this.lessonselectLessonByTeacher()
    },
    methods: {
      quitCz () {
        this.moneyCz = ''
        this.dialogVisibleCz = false
      },
      optinClick(val){
        lessonselectLessonByTeacher(this.parms.pageNum,this.parms.pageSize,usr,val).then((response) => {
          this.tableData = response.data.data.records
          console.log(this.tableData)
          this.total = response.data.data.total
        })
      },
   // select
      schoolgetSchoolListdo(){
        schoolgetSchoolListdo(sessionStorage.getItem('userName')).then((response) => {
          for(var i=0;i<response.data.data.length;i++){
            let obj={}
            obj['value']=response.data.data[i].schoolId
            obj['label']=response.data.data[i].schoolName
            this.options.push(obj)
          }
          this.value = this.options[0].label
          console.log(this.options[0].value)
          let usr = sessionStorage.getItem('userName')
          lessonselectLessonByTeacher(this.parms.pageNum,this.parms.pageSize,usr,this.options[0].value).then((response) => {
          this.tableData = response.data.data.records
          console.log(this.tableData)
          this.total = response.data.data.total
        })
        })
        
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
        console.log(index, row)
        this.form.id = row.id
        this.form.username = row.username
        this.form.realName = row.realName
        this.form.telephone = row.telephone
        this.form.email = row.email
        this.form.sex = row.sex
        this.form.money = row.money
        if (row.roleId == 1) {
          this.form.roleId = '社区管理员'
        } else if (row.roleId == 2) {
          this.form.roleId = '教师'
        } else {
          this.form.roleId = '学生家长'
        }
        if (row.grade == 1) {
          this.form.grade = '1年级'
        } else if (row.grade == 2) {
          this.form.grade = '2年级'
        } else if (row.grade == 3) {
          this.form.grade = '3年级'
        } else if (row.grade == 4) {
          this.form.grade = '4年级'
        } else if (row.grade == 5) {
          this.form.grade = '5年级'
        } else if (row.grade == 6) {
          this.form.grade = '6年级'
        } else {
          this.form.grade = '无'
        }

        this.form.password = row.password
        this.form.id = row.id
        this.dialogFormVisibletwo = true
        this.lessonselectLessonByTeacher()
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
              this.lessonselectLessonByTeacher()
            }

          })
        } else {
          userupdateStatusdo(row.username, '禁用').then((response) => {
            if (response.data.code == 200) {
              this.$message.success(response.data.msg)
              this.lessonselectLessonByTeacher()
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
              this.lessonselectLessonByTeacher()
            }
          })

        } else {

        }
      },
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.lessonselectLessonByTeacher()
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.lessonselectLessonByTeacher()
      },

      //查询所有任务;
      lessonselectLessonByTeacher () {
        let usr = sessionStorage.getItem('userName')
        lessonselectLessonByTeacher(this.parms.pageNum, this.parms.pageSize,usr,this.value).then((response) => {
          this.tableData = response.data.data.records
          console.log(this.tableData)
          this.total = response.data.data.total
        })
      },
      //查询用户
      findListClick () {
        findUserList(this.parms.pageNum, this.parms.pageSize, this.goodsName).then((response) => {
          this.tableData = response.data.data.records
        })
      },
      btn () {
        savedo(this.form).then((response) => {
          if (response.data.code == 200) {
            this.dialogFormVisible = false
            this.$message.success(response.data.msg)
            this.resetFormData()
            this.lessonselectLessonByTeacher()
          } else {
            this.$message.error(response.data.msg)
          }
        })

      },
      btntwo () {
        updatedo(this.form).then((response) => {
          if (response.data.code == 200) {
            this.dialogFormVisibletwo = false
            this.$message.success(response.data.msg)
            this.lessonselectLessonByTeacher()
            this.resetFormData()
          }
        })
      },
      exittwo (form) {
        this.dialogFormVisibletwo = false
        this.resetFormData()
      },
      resetFormData () {
        this.form.username = ''
        this.form.realName = ''
        this.form.telephone = ''
        this.form.email = ''
        this.form.sex = ''
        this.form.money = ''
        this.form.roleId = ''
        this.form.grade = ''
        this.form.password = ''
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
    },
  }
</script>

<style scoped>

</style>
