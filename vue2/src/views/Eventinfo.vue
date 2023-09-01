<template>
  <div v-if="showDiv" id="app" style="position:fixed;width:45%;height:40%;z-index:999;left:30%;top:30%;border:1px rgb(223, 215, 215) solid;background-color:white;padding:30px;border-radius:10px ;">
        <div style=" display:flex;justify-content: space-between;"><h4>路况信息</h4> <div style="position:absolute;top:25px;right:25px" @click="Handleclick"><svg t="1693452797521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1763" width="24" height="24"><path d="M0 0h1024v1024H0z" fill="#d81e06" fill-opacity="0" p-id="1764"></path><path d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z" fill="#d81e06" p-id="1765"></path></svg></div></div>
        <hr style="margin-bottom: 10px;">
        <div style=" display:flex;justify-content: space-between;margin-bottom:10px"><el-input v-model="inputText" style="width: 80%;">{{this.inputText}}</el-input> <el-button @click="logInput">搜索</el-button></div>
        <el-table
        :data="items"
        height="250"
        border
        style="width: 100%">
        <el-table-column
            prop="id"
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
            <!-- <template slot-scope="scope"> -->
            <el-button >修改</el-button>
            <el-button>删除</el-button>
            <!-- <el-button v-if="scope.row.is_online === '在线'">下线</el-button> -->
            <!-- </template> -->
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[],
            showDiv:false,
            inputText: ''
        }
        
    },
    methods:{
        ShowDiv(){
            this.showDiv = true
            
        },
        logInput() {
            console.log(typeof this.inputText)
      this.$post('http://localhost:8000/api/road1',this.inputText).then(resp=>{
            this.inputText = '';
            this.items = resp.data
        })
    },
    Handleclick(){
        this.showDiv = false;
        this.items = []
    }
    },


}
</script>

<style scoped>
::v-deep .el-table td,
::v-deep .el-table th{
  text-align: center ;
}
</style>

