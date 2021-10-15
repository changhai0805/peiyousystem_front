<template>
  <div style="position:relative;height: 100%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="second">
            <el-card style="text-align:left" class="box-card">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <el-row style="margin-bottom:10px">用户名：{{customerDetails.username}}</el-row>
                <el-row style="margin-bottom:10px">姓名：<el-input v-model="customerDetails.realName" style="width:20%"></el-input> </el-row>
                <el-row style="margin-bottom:10px">性别：
                <el-select style="width:20%" v-model="customerDetails.sex" placeholder="请选择性别">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
      </el-select>
                </el-row>
                <el-row style="margin-bottom:10px">电话：<el-input v-model="customerDetails.telephone" style="width:20%"></el-input></el-row>
                <el-row style="margin-bottom:10px">邮箱：<el-input v-model="customerDetails.email" style="width:20%"></el-input></el-row>
                <el-row style="margin-bottom:10px">银行卡号：{{customerDetails.bankId}}</el-row>
                <el-row style="margin-bottom:10px">余额：{{customerDetails.money}}</el-row>
                <el-row style="margin-bottom:10px">
                    <el-button @click="editInfo">修改</el-button>
                </el-row>
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
  import {userlistUserInfodo,updatedo,userupdatePassword} from '@/api/user.js';
  export default {
    name: "result",
    components: {

    },
    data() {
      return {
        options: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        value:'',
        checkTime:this.dayFormat(),
          pwd:'',
        customerDetails:{},
        activeName: 'second',
        dialogVisible:false,
        courseName:'',

        };
    },
    mounted() {
     this.getCusInfo()
    },
    methods: {
      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      dateFormat:function() {
        var date=new Date();
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
      //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
      dayFormat:function() {
        var date=new Date();
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        // 拼接
        return year+"-"+month+"-"+day;
      },
        courseClickDetils(val,index,lessonIndex){
          if(val!=''&&val!='-'){
            alert("本节有课")
          }else {
            alert("本节没课")
          }
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
            let usr = sessionStorage.getItem('userName')
                userupdatePassword(usr,this.pwd).then((response)=>{
                // this.customerDetails = response.data.data
                if(response.data.code == 200){
                    this.$message.success(response.data.msg)
                }else{
                    this.$message.console.error(response.data.msg)
                }
            })
        },
        editInfo(){
                updatedo(this.customerDetails).then((response)=>{
                // this.customerDetails = response.data.data
                if(response.data.code == 200){
                    this.$message.success(response.data.msg)
                }else{
                    this.$message.console.error(response.data.msg)
                }
            })
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
