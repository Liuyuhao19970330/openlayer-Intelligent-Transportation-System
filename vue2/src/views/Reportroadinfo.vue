<template>
  <div v-if="showDiv" style="position:fixed;width:40%;height:40%;z-index:999;left:33%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
    <el-form ref="form" :model="form" label-width="80px" >
        <el-form-item label="事件类型">
            <el-select v-model="form.type" placeholder="请选择事件类型">
            <el-option label="碰撞" value="碰撞"></el-option>
            <el-option label="刮擦" value="刮擦"></el-option>
            <el-option label="追尾" value="追尾"></el-option>
            <el-option label="碾压" value="碾压"></el-option>
            <el-option label="翻车" value="翻车"></el-option>
            <el-option label="失火" value="失火"></el-option>
            <el-option label="其他" value="其他"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="事件地址">
            <el-input v-model="form.address" placeholder="请输入路况情况,包含事故路段"></el-input>
        </el-form-item>

        <el-form-item label="建筑标识">
            <el-input v-model="form.building" placeholder="请输入事故最近的建筑标识"></el-input>
        </el-form-item>

        <el-form-item label="发生时间">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>

        <el-form-item label="事件描述">
            <el-input type="textarea" v-model="form.description" placeholder="请输入事故的具体信息"></el-input>
        </el-form-item>

        <el-form-item style="position:absolute;left: 30%;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button  @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          type: '',
          date1: '',
          date2: '',
          description: '',
          address:'',
          building:'',
        },
        visiable : false,
        showDiv:false,
      }
    },
    methods: {
      RoadInfoTableInit(){
        this.showDiv = true
      },
      onSubmit() {
        const date = new Date(this.form.date1);
        this.form.date1 = date.toLocaleDateString('en-CN'); 
        const date2 = new Date(this.form.date2);
        const hours = date2.getHours();
        const minutes = date2.getMinutes();
        const seconds = date2.getSeconds();
        this.form.date2 = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.$post('http://localhost:8000/api/road',this.form).then(resp=>{
            this.form = {};
            this.$message({
              message:'成功提交',
              type:'success'
            }); 
        })
      },
      cancel(){
        this.showDiv = false;
      },
     
    }
}
</script>

<style>

</style>