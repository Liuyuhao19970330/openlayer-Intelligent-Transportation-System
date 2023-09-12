<template>
<div>
  <div v-if="showDiv" id="app" style="position:fixed;width:45%;height:40%;z-index:999;left:30%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
        <div style=" display:flex;justify-content: space-between;"><h4>路况信息</h4> <div style="position:absolute;top:25px;right:25px;cursor: pointer;" @click="Handleclick"><svg t="1693452797521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1763" width="24" height="24"><path d="M0 0h1024v1024H0z" fill="#d81e06" fill-opacity="0" p-id="1764"></path><path d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z" fill="#d81e06" p-id="1765"></path></svg></div></div>
        <hr style="margin-bottom: 10px;">
        <div style=" display:flex;justify-content: space-between;margin-bottom:10px"><el-input v-model="inputText" style="width: 80%;">{{this.inputText}}</el-input> <el-button @click="logInput">搜索</el-button></div>
        <el-table
        :data="items"
        height="250"
        border
        style="width: 100%">
        <el-table-column
            prop="x_username"
            label="用户名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="type"
            label="事件类型"
            width="80">
        </el-table-column>
        <el-table-column
            prop="address"
            label="事件地址"
            width="120">
        </el-table-column>
        <el-table-column
        label="发生时间"
        width="100"
        >
        <template slot-scope="scope">
            {{ scope.row.date1 }} {{ scope.row.date2 }}
        </template>
        </el-table-column>
        <el-table-column
            prop="building"
            label="附近建筑"
            width="120">
        </el-table-column>
        <el-table-column
            prop="description"
            label="事件描述"
            width="120">
        </el-table-column>
        <el-table-column
            prop="state"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="modify(scope.row)">修改</el-button>
                <el-button @click="handleDelete(scope.row)"> 删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
    <div v-if="showDiv1" style="position:fixed;width:40%;height:40%;z-index:999;left:33%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[],
            showDiv:false,
            inputText: '',
            showDiv1:false,
            form: {
            type: '',
            date1: '',
            date2: '',
            description: '',
            address:'',
            building:'',
            },
            oldForm:{},
            allForm:{}
        }
        
    },
    methods:{
        ShowDiv(){
            this.showDiv = true
            
        },
    formatDate(date) {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
    },
    logInput() { 
    this.$post('http://localhost:8000/api/road1', this.inputText)
        .then(resp => {
        this.inputText = '';
        
        // 修改 date1 字段的格式
        resp.data.forEach(item => {
            item.date1 = this.formatDate(item.date1);
        });
        
        this.items = resp.data;
        });
    },
    Handleclick(){
        this.showDiv = false;
        this.items = []
    },
    
    cancel(){
        this.showDiv1 = false;
        this.showDiv = true;
        logInput()
    },
    modify(e) {
    this.showDiv1 = true;
    this.showDiv = false;
    this.form = JSON.parse(JSON.stringify(e));
    this.oldForm = JSON.parse(JSON.stringify(e));
    },
    del(e){
        this.$post('http://localhost:8000/api/Del1', e).then(resp => {
            this.$message({
              message:'删除成功',
              type:'success'
            });
        })
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
    onSubmit(){
        if (this.form.date2 instanceof Date) {
            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
            this.form.date2 = this.form.date2.toLocaleTimeString("zh-CN", options);
            }
        const mergedData = {form: this.form,oldForm: this.oldForm};
        this.$patch('http://localhost:8000/api/Eventinfo1', mergedData)//修改事件信息
        .then(resp => {
            this.$message({
              message:'成功提交',
              type:'success'
            });
        })

    },
    },


}
</script>

<style scoped>
::v-deep .el-table td,
::v-deep .el-table th{
  text-align: center ;
}
</style>

