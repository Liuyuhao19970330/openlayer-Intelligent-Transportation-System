<template>
  <div class="register">
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
    <div class="container"  @keyup.enter="submitForm('ruleForm')">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>
           <span style="font-size: 18px;background: linear-gradient(to right, #87CEEB, #6495ED);
               background-clip: text;
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;">
          正在注册
          </span>
          <el-button type="primary" @click="toLogin" >点我登录</el-button>
      </h3>
      <el-form-item style="display: flex; align-items: center" prop="username">
        <el-input v-model.trim="ruleForm.username" autocomplete="off" prefix-icon="el-icon-user" placeholder="请输入账号" ref="usernameInput" />
      </el-form-item>
      <el-form-item  prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item  prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button class="login-button" type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入名称"));
        } else if (value.length < 2 || value.length > 9) {
          callback(new Error("名称长度应在2到9个字符之间"));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          checkPass: '',
          username:'',
          type:'common'
        },
        rules: {
          username: [
            { required: true, validator: validateName, trigger: "blur" },
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.usernameInput.$refs.input.focus();
      });
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post('http://localhost:8000/api/register',this.ruleForm).then(resp=>{
              console.log(resp)
          if(resp.code===0){
            this.ruleForm = {};
            this.$message({
              message:'注册成功',
              type:'success'
            });
            this.$router.push({path:'/api/login'})

          }
          if(resp.code==="10002"){
            this.ruleForm = {};
            this.$message({
              message:'用户名重复,请重新注册',
              type:'error'
            });
          }
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    toLogin(){
        this.$router.push({path:'/api/login'})
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
  width:218px !important;
}
.login-button{
  margin-left: 0px !important;
  margin-top:0
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



