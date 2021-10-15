<template>
  <div style="position:relative;height: 100%;">
    <el-row class="lessonIndex" style="text-align:left;padding-top: 10px">
      <el-col :span="18"><span style="visibility:hidden">''</span></el-col>
      <el-col :span="6">
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入课程名称查询(不输入内容默认搜索全部)" v-model="goodsName"></el-input>
        <el-button @click="findListClick">搜索</el-button>
      </el-col>
      <el-row style="margin:0 auto" >
        <el-col :span='6' style="padding:10px" v-for="(item ,index) in lessonList" :key="index">
          <div style="width:100%;height:200px;background:whitesmoke">
            <div class="lessons" style="width: 100%;height: 85%;"></div>
            <p @click="details(item)" style="height:120px;cursor:pointer;color:purple;font-weight: bold;line-height: 20px;font-size: 18px;">{{item.className}} &nbsp;&nbsp;&nbsp;<span style="color: lightskyblue">{{item.quarter}}班</span><span style="float: right;margin-right: 20px;">{{item.classType}}</span></p>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog
      title="课程详情"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="closeDialog">
      <el-form :model="form" ref="form">
        <el-form-item label="课程名称:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.className}}</span>
        </el-form-item>
        <el-form-item label="科目类型:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.subject}}</span>
        </el-form-item>
        <el-form-item label="开班时间:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.startTime}}</span>
        </el-form-item>
        <el-form-item label="上课时间:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.startTime}}</span>
        </el-form-item>
        <el-form-item label="班级类型:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.classType}}</span>
        </el-form-item>
        <el-form-item label="上课地点:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.classAddr}}</span>
        </el-form-item>
        <el-form-item label="课程数:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.total}}节</span>
        </el-form-item>
        <el-form-item label="班容量:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span>{{this.form.classSize}}人</span>
        </el-form-item>
        <el-form-item label="报名人数:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
        <span>{{this.form.joinNum}}人</span>
        </el-form-item>
        <el-form-item label="价格/节:" style="width:100%;height: 20px;line-height: 20px;text-align: left" :label-width="formLabelWidth">
          <span style="color: red">{{this.form.price}}￥</span>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="addCar">加 购 </el-button>
<!--        <el-button type="primary" @click="">报 名</el-button>-->
      </span>
    </el-dialog>
    <el-dialog title="填写信息" :visible.sync="dialogFormVisibletwo" :before-close="closeDialog">
      <el-form :model="form2" ref="form">
        <el-form-item label="用户名" style="width:600px" :label-width="formLabelWidth">
          <span>{{this.form2.username}}人</span>
        </el-form-item>
        <el-form-item label="课程名称" style="width:600px" :label-width="formLabelWidth">
          <span>{{this.form2.className}}人</span>
        </el-form-item>
        <el-form-item label="应付金额" style="width:600px" :label-width="formLabelWidth">
          <span>{{this.form2.totalPay}}人</span>
        </el-form-item>
        <el-form-item label="学生姓名" style="width:600px" :label-width="formLabelWidth">
          <el-input style="width:600px" v-model="form2.stuName" autocomplete="off" placeholder="输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exittwo">取 消</el-button>
        <el-button type="primary" @click="btntwo">确 定</el-button>
      </div>
    </el-dialog>
    <div style="height: 30px;text-align: center">
      <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" style="text-align: center"/>
    </div>

  </div>
</template>

<script>
import Pagination from './pagination.vue'
import {commoditypurchaseList,addToCar} from '@/api/user.js';
export default {
  name: "result",
  components: {
    Pagination
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dialogVisible:false,
      dialogFormVisibletwo:false,
      parms:{
        pageNum:1,
        pageSize:10
      },
      formLabelWidth: '120px',
      lessonList:[],
      form:{
        classMethod: '',
        className: '',
        classSize: '',
        classTime: '',
        classType: '',
        classroomId: '',
        dateTime: '',
        grade:'',
        id:'',
        isStart: '',
        joinNum:'',
        lessonId: '',
        price: '',
        quarter: '',
        startTime: '',
        subject: '',
        teacherId: '',
        teacherName: '',
        total: '',
        weekTime:''
      },
      form2:{
        username:'',
        className:'',
        totalPay:'',
        stuName:''
      }
    }
  },
  mounted() {
    this.commoditypurchaseList();
  },
  methods: {
    addCar(){
      addToCar(sessionStorage.getItem("userName"),this.form.lessonId,this.form.className,this.form.price,this.form.total,this.form.classSize).then((response)=>{
        debugger
        if(response.data.code==200){
          this.$message.success("加购成功")
          this.commoditypurchaseList();
          this.dialogVisible=false
        }else if(response.data.code==555){
          this.$message.error(response.data.msg)
        }

      })
    },
    commoditypurchaseList(){
      commoditypurchaseList(this.parms.pageNum,this.parms.pageSize).then((response)=>{
        this.lessonList = response.data.data.records;
        this.total = response.data.data.total
      })
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
    details(item){
      var week = '';
      if(item.weekTime==1){
        week='一'
      }else if(item.weekTime==2){
        week='二'
      }else if(item.weekTime==3){
        week='三'
      }else if(item.weekTime==4){
        week='四'
      }else if(item.weekTime==5){
        week='五'
      }else if(item.weekTime==6){
        week='六'
      }else{
        week='七'
      }

      this.form.classMethod=item.classMethod
      this.form.className=item.className
      this.form.classSize=item.classSize
      this.form.classTime=item.classTime
      this.form.classType=item.classType
      this.form.classroomId=item.classroomId
      this.form.dateTime=item.dateTime
      this.form.grade=item.grade
      this.form.isStart=item.isStart
      this.form.joinNum=item.joinNum
      this.form.lessonId=item.lessonId
      this.form.price=item.price
      this.form.quarter=item.quarter
      this.form.startTime='每周'+week+item.dateTime.substring(0,5);
      this.form.subject=item.subject
      this.form.teacherId=item.teacherId
      this.form.teacherName=item.teacherName
      this.form.total=item.total
      this.form.weekTime=item.weekTime
      this.form.classAddr = item.schoolName+item.classAddr;
      this.dialogVisible = true
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
  .lessons{
    background:url('../assets/lesson.png') 0 0 no-repeat
  }
  .lessonIndex{
    height: 88%;
    background:url('../assets/lessonIndex.jpeg') 0 0 no-repeat
  }
</style>
