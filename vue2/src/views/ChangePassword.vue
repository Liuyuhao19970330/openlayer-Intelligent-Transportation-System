<template>
    <div v-if="showDiv" id="app" style="position:fixed;width:40%;height:40%;z-index:999;left:33%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账户名称">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
  
  <script>
    export default {
        data(){
        return{
            showDiv:false,
            form:{
                username:'',
                password:'',
                newPassword:''
            }
        }                   
    },
        methods:{
            changePassword(){
                console.log('123')
                this.showDiv = true
            },
        onSubmit(){
        this.$patch('http://localhost:8000/api/changepassword',this.form).then(resp=>{
          if(resp.code===0){
            this.form = {};
            this.$message({
              message:'密码修改成功,请重新登入',
              type:'success'
            });
            this.$router.push({path:'/api/login'})
            
          }
          if(resp.code==='10004'){
            this.form = {};
            this.$message({
              message:'用户不存在',
              type:'error'
            });
          }
          if(resp.code==='10006'){
            this.form = {};
            this.$message({
              message:'密码不匹配',
              type:'error'
            });
          }
        })
      },
        cancel(){
            this.showDiv = false
        }
        }
    }
  </script>
  
  <style>
  
  </style>