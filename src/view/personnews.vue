<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px;height:60px">
      <el-col :span="18">
        <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;visibility:hidden">1</el-button>
      </el-col>
      <el-col :span="6">
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入用户名查询(不输入内容默认搜索全部)"
                  v-model="goodsName"></el-input>
        <el-button @click="findListClick">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      height="350"
      border
      :data="tableData"
      style="width: 100%;height: 90%;margin-top:20px">
      <el-table-column
        label="ID"
        type="index">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="stuName">
      </el-table-column>
      <el-table-column
        label="课程名称"
        prop="lessonName">
      </el-table-column>
      <el-table-column
        label="评价内容"
        prop="evaluationInfo">
      </el-table-column>
      <el-table-column
        label="评价时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="评分"
        prop="level">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.level"
            :colors="colors">
          </el-rate>
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
    findUserList,
    listByTeacherInPage
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
      this.listByTeacherInPage()
    },
    methods: {
      handleCurrentChange (val) {
        console.log(val)//页码
        this.parms.pageNum = val
        this.listByTeacherInPage()
      },
      handleSizeChange (val) {
        console.log(val)
        this.parms.pageSize = val//页数
        this.listByTeacherInPage()
      },

      //查询所有任务;
      listByTeacherInPage () {
        let uses = sessionStorage.getItem('userName')
        listByTeacherInPage(this.parms.pageNum, this.parms.pageSize,uses).then((response) => {
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
    },
  }
</script>

<style scoped>

</style>
