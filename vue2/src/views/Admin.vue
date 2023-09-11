<template>
  <div>
  <div v-if="showDiv" id="app" style="position:fixed;width:35%;height:43%;z-index:999;left:36%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
    <div style=" display:flex;justify-content: space-between;"><h4>用户信息</h4> 
    <div style="position:absolute;top:25px;right:25px" @click="quit"><svg t="1693452797521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1763" width="24" height="24"><path d="M0 0h1024v1024H0z" fill="#d81e06" fill-opacity="0" p-id="1764"></path><path d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z" fill="#d81e06" p-id="1765"></path></svg></div>
    </div>
    <hr>
        <div style=" display:flex;justify-content: space-between;"><el-input v-model="inputText" style="width: 75%;">{{this.inputText}}</el-input> 
          <el-button @click="search1">搜索</el-button>
        <div style="position:relative;top:8px;right:10px" @click="Admin"><svg  t="1693470817461" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2715" width="20" height="20"><path d="M914.17946 324.34283C854.308387 324.325508 750.895846 324.317788 750.895846 324.317788 732.045471 324.317788 716.764213 339.599801 716.764213 358.451121 716.764213 377.30244 732.045471 392.584453 750.895846 392.584453L955.787864 392.584453C993.448095 392.584453 1024 362.040424 1024 324.368908L1024 119.466667C1024 100.615347 1008.718742 85.333333 989.868367 85.333333 971.017993 85.333333 955.736735 100.615347 955.736735 119.466667L955.736735 256.497996C933.314348 217.628194 905.827487 181.795372 873.995034 149.961328 778.623011 54.584531 649.577119 0 511.974435 0 229.218763 0 0 229.230209 0 512 0 794.769791 229.218763 1024 511.974435 1024 794.730125 1024 1023.948888 794.769791 1023.948888 512 1023.948888 493.148681 1008.66763 477.866667 989.817256 477.866667 970.966881 477.866667 955.685623 493.148681 955.685623 512 955.685623 757.067153 757.029358 955.733333 511.974435 955.733333 266.91953 955.733333 68.263265 757.067153 68.263265 512 68.263265 266.932847 266.91953 68.266667 511.974435 68.266667 631.286484 68.266667 743.028524 115.531923 825.725634 198.233152 862.329644 234.839003 892.298522 277.528256 914.17946 324.34283L914.17946 324.34283Z" fill="#389BFF" p-id="2716"></path></svg></div> 
        </div>
        <div style="position:relative;">
  <div style="overflow:auto;height:280px;margin-top:20px">
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="is_online"
        label="登录状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="state"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)">修改</el-button>
          <el-button @click="handleDelete(scope.row)">删除</el-button>
          <el-button v-if="scope.row.is_online === '在线'" @click="offline(scope.row)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>   
  </div>
</div>
</div>



<div v-if="showDiv1" id="app" style="position:fixed;width:20%;height:30%;z-index:999;left:36%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="position: absolute;left:35px">
    <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username" placeholder="请输入要修改的用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password" placeholder="请输入要修改的密码"></el-input>
  </el-form-item>
  <el-form-item label="用户类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
      <el-option label="普通用户" value="common"></el-option>
      <el-option label="交通部门" value="traffic"></el-option>
      <el-option label="管理员" value="admin"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">立即修改</el-button>
      <el-button @click="resetForm">返回</el-button>
    </el-form-item>
  </el-form>
</div>  
</div>    
</template>

<script>
export default {
  data(){
    return{
      showDiv:false,
      showDiv1:false,
      tableData: [
      ],
      inputText:'',
      ruleForm: {
          username: '',
          password: '',
          type: '',
          oldUsername:''
        },
        old:null,
        offLine:''
    }
  },
  methods:{
    Admin(){
      this.showDiv = true
      this.$post('http://localhost:8000/api/admin').then(resp=>{
            this.tableData=resp.data
        })
    },
    quit(){
      this.showDiv=false
    },
    search1(){
      this.$post('http://localhost:8000/api/search1',this.inputText).then(resp=>{
            this.inputText = '';
            this.tableData = resp.data
        })
    },
    modify(e){
      this.showDiv=false
      this.showDiv1=true
      this.ruleForm = e
      this.ruleForm.oldUsername = e.username
    },
    submitForm(){
      try{
      this.$post('http://localhost:8000/api/admin1',this.ruleForm).then(resp=>{
        if(resp.code==0){
          this.$message({
              message:'修改成功',
              type:'success'
            });
            Admin()
        }
      })
      }catch(error){
        console.log(error)
      }
    },
    resetForm(){
      this.showDiv=true
      this.showDiv1=false
    },
    del(e){
      try{
      this.$post('http://localhost:8000/api/delete',e).then(resp=>{
        if(resp.code==0){
          this.$message({
              message:'删除成功',
              type:'success'
            });
            this.Admin()
        }
      })
      }catch(error){
        console.log(error)
      }
    },
    handleDelete(row) {
    if (confirm("确定要删除吗?")) {
      // 用户点击了确定
      this.del(row); // 根据需要调用删除逻辑的方法
    } else {
      // 用户点击了取消
      // 可以选择执行一些其他操作，或者什么都不做
    }
  },
 async offline(e){
    await this.$post('http://localhost:8000/api/loginout',e.username).then(resp=>{
    if(resp.code===0){
            this.$message({
              message:'操作成功',
              type:'success'
            });
            this.Admin()
          }else{
            this.$message({
              message:'操作失败',
              type:'failed'
            });
          }

  })
  }
  }

  
}
</script>

<style scoped>

::v-deep .el-table td,
::v-deep .el-table th{
  text-align: center ;
}
</style>
