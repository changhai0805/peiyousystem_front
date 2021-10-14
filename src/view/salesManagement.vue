<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18">
        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">添加用户</el-button>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :before-close="closeDialog">
          <el-form :model="form" ref="form">
            <el-form-item label="用户名" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.password" autocomplete="off" show-password
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.realName" autocomplete="off" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.telephone" autocomplete="off" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.email" autocomplete="off" placeholder="输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="初始金额" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.money" autocomplete="off" placeholder="请输入初始金额"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="form.roleId" placeholder="请选择角色">
                <el-option label="校区管理员" value="1"></el-option>
                <el-option label="教师" value="2"></el-option>
                <el-option label="学生家长" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.roleId == '3' " label="年级" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="form.grade" placeholder="请选择年级">
                <el-option label="1年级" value="1"></el-option>
                <el-option label="2年级" value="2"></el-option>
                <el-option label="3年级" value="3"></el-option>
                <el-option label="4年级" value="4"></el-option>
                <el-option label="5年级" value="5"></el-option>
                <el-option label="6年级" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.roleId == '1' " label="管理校区" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px"  v-model="schoolId" placeholder="请选择管理的校区">
                <el-option v-for="(item,index) in addSchoolIdList" :key="index" :label="item.schoolName" :value="item.schoolId"></el-option>
              </el-select>

            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="exit">取 消</el-button>
            <el-button type="primary" @click="btn">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改用户" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog">
          <el-form :model="form" ref="form">
            <el-form-item label="用户名" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.password" autocomplete="off" show-password
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.realName" autocomplete="off" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.telephone" autocomplete="off" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.email" autocomplete="off" placeholder="输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="初始金额" style="width:600px" :label-width="formLabelWidth">
              <el-input style="width:600px" v-model="form.money" autocomplete="off" placeholder="请输入初始金额"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="form.roleId" placeholder="请选择角色">
                <el-option label="校区管理员" value="1"></el-option>
                <el-option label="教师" value="2"></el-option>
                <el-option label="学生家长" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.roleId == '学生家长' " label="年级" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="form.grade" placeholder="请选择年级">
                <el-option label="1年级" value="1"></el-option>
                <el-option label="2年级" value="2"></el-option>
                <el-option label="3年级" value="3"></el-option>
                <el-option label="4年级" value="4"></el-option>
                <el-option label="5年级" value="5"></el-option>
                <el-option label="6年级" value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.roleId == '校区管理员' " label="所属校区" style="width:600px" :label-width="formLabelWidth">
              <el-select style="width:600px" v-model="addSchoolId" placeholder="请选择所属校区">
                <el-option label="1年级" value="1"></el-option>
                <el-option label="2年级" value="2"></el-option>
                <el-option label="3年级" value="3"></el-option>
                <el-option label="4年级" value="4"></el-option>
                <el-option label="5年级" value="5"></el-option>
                <el-option label="6年级" value="6"></el-option>
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
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入用户名查询(不输入内容默认搜索全部)"
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
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="password">
      </el-table-column>
      <el-table-column
        label="真实姓名"
        prop="realName">
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
        label="电话"
        prop="telephone">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex">
      </el-table-column>
      <el-table-column
        label="银行卡号"
        prop="bankId">
      </el-table-column>
      <el-table-column
        label="剩余金额"
        prop="money">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
      </el-table-column>
      <el-table-column
        label="角色"
        prop="roleId">
        <template slot-scope="scope">
          <span v-if="scope.row.roleId == 1">校区管理员</span>
          <span v-else-if="scope.row.roleId == 2">教师</span>
          <span v-else>学生家长</span>
        </template>
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
  import {
    listAlldo,
    findUserList,
    userupdateStatusdo,
    usermakeMoneydo,
    deletedo,
    savedo,
    updatedo,
    insertAdminSchool,
    schoolgetSchoolListdo
  } from '@/api/user.js'

  export default {
    name: 'result',
    components: {
      Pagination
    },
    data () {
      return {
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
        console.log(index, row)
        this.form.id = row.id
        this.form.username = row.username
        this.form.realName = row.realName
        this.form.telephone = row.telephone
        this.form.email = row.email
        this.form.sex = row.sex
        this.form.money = row.money
        if (row.roleId == 1) {
          this.form.roleId = '校区管理员'
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
        listAlldo(this.parms.pageNum, this.parms.pageSize).then((response) => {
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
        updatedo(this.form).then((response) => {
          if (response.data.code == 200) {
            this.dialogFormVisibletwo = false
            this.$message.success(response.data.msg)
            this.listAlldo()
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
