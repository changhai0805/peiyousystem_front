<template>
  <div style="position:relative;height: 100%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程表" name="first">
            <div>
               <el-select style="float:left" v-model="value" placeholder="请选择学生">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <table>
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th v-for="(weekNum, weekIndex) in classTableData.courses.length" :key="weekIndex"> {{'周' + digital2Chinese(weekIndex, 'week')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
                            <td>
                                <p>{{'第' + digital2Chinese(lessonIndex+1) + "节"}}</p>
                                <p class="period">{{ lesson }}</p>
                            </td>

                            <td class="hovertable" v-for="(course, courseIndex) in classTableData.courses" :key="courseIndex" @click="courseClickDetils(course,courseIndex,lessonIndex)">
                                {{classTableData.courses[courseIndex][lessonIndex] || '-'}}
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                        <span>这是一段信息</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                        </el-dialog>
            </div>
        </el-tab-pane>
        <el-tab-pane label="基本信息" name="second">
            <el-card style="text-align:left" class="box-card">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <el-row style="margin-bottom:10px">用户名：{{customerDetails.username}}</el-row>
                <el-row style="margin-bottom:10px">密码：{{customerDetails.password}}</el-row>
                <el-row style="margin-bottom:10px">真实姓名：{{customerDetails.realName}}</el-row>
                <el-row style="margin-bottom:10px">性别：{{customerDetails.sex}}</el-row>
                <el-row style="margin-bottom:10px">电话：{{customerDetails.telephone}}</el-row>
                <el-row style="margin-bottom:10px">邮箱：{{customerDetails.email}}</el-row>
                <el-row style="margin-bottom:10px">年级：{{customerDetails.grade}}年级</el-row>
                <el-row style="margin-bottom:10px">银行卡号：{{customerDetails.bankId}}</el-row>
                <el-row style="margin-bottom:10px">余额：{{customerDetails.money}}</el-row>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="third">
            <el-card class="box-card" style="margin-top:50px">
            <div slot="header" class="clearfix">
                <span style="color: #444;font-weight: bold">修改密码</span>
            </div>
            <div style="width: 100%">
                <!-- <label style="width: 15%;text-align: right;display: inline-block">用户名：</label><el-input disabled v-model="userName" style="width: 30%;text-align: left"></el-input><br> -->
                <label style="text-align: right;display: inline-block">密码：</label><el-input type="password" placeholder="请输入要修改的密码" v-model="pwd" style="width: 25%;text-align: left;padding-top: 20px"></el-input>
                <br><el-button style="margin-top: 20px;margin-left: 25%" @click="changeName">确认</el-button>
            </div>
            </el-card>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {userlistUserInfodo} from '@/api/user.js';
  export default {
    name: "result",
    components: {

    },
    data() {
      return {
          pwd:'',
        customerDetails:{},
        activeName: 'first',
        dialogVisible:false,
        courseName:'',
        classTableData: {
                lessons: [
                    '08:00-09:00',
                    '09:00-10:00',
                    '10:00-11:00',
                    '11:00-12:00',
                    '13:00-14:00',
                    '14:00-15:00',
                    '15:00-16:00',
                    '16:00-17:00'
                ],
                courses: [
                    ['', '', '', '', '', '', '', ''],
                    ['生物(l001)', '物理', '化学', '政治', '历史', '英语', '', '语文'],
                    ['语文', '数学', '英语', '历史', '', '化学', '物理', '生物'],
                    ['生物', '', '化学', '政治', '历史', '英语', '数学', '语文'],
                    ['语文', '数学', '英语', '历史', '政治', '', '物理', '生物'],
                    ['生物', '物理', '化学', '', '历史', '英语', '数学', '语文'],
                    ['语文', '数学', '英语', '', '', '', '', ''],
                ]
            }

        };
    },
    mounted() {
     this.getCusInfo()
    },
    methods: {
        courseClickDetils(val,index,lessonIndex){
            console.log(val,index,lessonIndex)
            debugger
            for(let i=0;i<=6;i++){
                if(index == i){
                    //确定列
                    console.log(this.classTableData.courses[i])
                    //确定行 锁定单元格
                    for(var j=0;j<this.classTableData.courses[i].length;j++){
                        if(lessonIndex == j){
                            console.log(this.classTableData.courses[i][j])
                            this.courseName = this.classTableData.courses[i][j]
                            //弹框显示课程基本信息以及考勤，通过课程名区分
                            this.dialogVisible = true
                        }
                    }
                }
            }
        },
        changeName(){

        },
        getCusInfo(){
            let usr = sessionStorage.getItem('userName')
             userlistUserInfodo(usr).then((response)=>{
                this.customerDetails = response.data.data
            })
           },
                   digital2Chinese(num, identifier) {
                    const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
                    return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
        }
    },
  }
</script>

<style scoped>
.class-table>.table-wrapper{
        width: 100%;
        height: 100%;
        overflow: auto;
}
.class-table>.tabel-container{
     margin: 7px;
}
.tabel-container>table {

}
 table {
    table-layout: fixed;
    width: 100%;
}
thead {
    background-color: #67a1ff;
}
th {
                    color: #fff;
                    line-height: 17px;
                    font-weight: normal;
                }
tbody{
    background-color: #eaf2ff;
}
td {
    width: 30px;
    /*padding: 12px 2px;*/
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
}
td:hover{
     background: rgb(103, 161, 255);
     /*border:medium double #fff*/
}
</style>
