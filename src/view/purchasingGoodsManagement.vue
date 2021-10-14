<template>
  <div style="position:relative;height: 100%">
    <el-row style="text-align:left;background: #fff;padding-top: 10px">
      <el-col :span="18"><span style="visibility:hidden">''</span></el-col>
      <el-col :span="6">
        <el-input style="width: 300px;margin-right: 0px" placeholder="输入课程名称查询(不输入内容默认搜索全部)" v-model="goodsName"></el-input>
        <el-button @click="findListClick">搜索</el-button>
      </el-col>
      <el-row style="margin:0 auto" >
        <el-col :span='6' style="padding:10px">
          <div style="width:100%;height:200px;background:#eee">
            <p style="height:120px;">关于学生成长的必要课程，欢迎各位家长来报名</p>
            <el-button style='float:right;margin-right:20px;cursor:pointer;' @click="details">详情</el-button>
            <el-button style='float:right;margin-right:20px;cursor:pointer;'>报名</el-button>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-dialog
      title="课程详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div style="height: 30px;text-align: center">
      <pagination :currentPage="pageNum" :total=total :limit="pageSize" :small="false"
                  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" style="text-align: center"/>
    </div>

  </div>
</template>

<script>
import Pagination from './pagination.vue'
import {} from '@/api/user.js';
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
      parms:{
        pageNum:1,
        pageSize:10
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.commoditypurchaseList();
  },
  methods: {
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
    details(){
      this.dialogVisible = true
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
