<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    />
    <div class="container" @keyup.enter="onSubmit">
    <el-form :model="form" label-width="120px" >
      <h3>
           <span style="font-size: 18px;background: linear-gradient(to right, #87CEEB, #6495ED);
               background-clip: text;
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;">
          正在登录
          </span>
          <el-button type="primary" @click="toRegister" >点我注册</el-button>
      </h3>
      <el-form-item style="display: flex; align-items: center">
        <el-input v-model.trim="form.username" autocomplete="off" prefix-icon="el-icon-user" placeholder="请输入账号" ref="usernameInput"  />
      </el-form-item>
      <el-form-item  >
        <el-input type="password" v-model.trim="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" />
      </el-form-item>
      
      <el-form-item >
        <el-button class="login-button" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'Login',
  props: {},
  data() {
      return {
        form: {
          username: '',
          password: '',
          type:'common',
          x_username:''
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.usernameInput.$refs.input.focus();
      });
    },
    methods: {
     async onSubmit() {
        await this.$post('http://localhost:8000/api/login1',this.form).then(resp=>{
          if(resp.code===0){
            this.x_username = resp.result.username
            this.form = {};
            this.$message({
              message:'成功登录',
              type:'success'
            });
            this.$router.push({path:'/api/map'})
            
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
        bus.$emit('data-event', this.x_username)
      },
      toRegister(){
        this.$router.push({path:'/api/register'})
      }
    }
}
</script>

<style scoped>
.el-button {
  background-color: #fff; /* 设置背景颜色为白色 */
  color: #87CEEB; /* 设置字体颜色为蓝色 */
  border-color: #87CEEB; /* 设置边框颜色为蓝色 */
  
}
.el-button:hover {
  background: linear-gradient(to right, #87CEEB, #6495ED);
  color: #fff; 
  border-color: #fff; 
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 350px;
  width: 300px; 
  border: 1px solid #ccc;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 25px;
  background-color: transparent;
}
.el-form-item{
  display: flex;
  align-items: center;
  width: 100%;
  margin-top:10px;
}

::v-deep .el-form-item__content{
  margin-left: 0 !important;
}
.login-button{
  margin-left: 76px;
  margin-top:15px
}
.login-button:hover{
  background: linear-gradient(to right, #87CEEB, #6495ED);

}
h3{
  margin-top:30px;
  margin-bottom:30px;
}
.login-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: -1;
}
</style>
