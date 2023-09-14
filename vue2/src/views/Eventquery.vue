<template>
    <div>
    <div id="divShowResult" style="overflow:auto;height:600px;margin-top:20px;display: none;width: 49%;left:28%;bottom:0px;margin-bottom:-290px">
        <div style="display:flex;background-color: white;position:relative;padding:7px;padding-left:15px">
            <el-button @click="handclick1()" style="margin-right:10px">事件热力图</el-button>
            <el-button @click="createChartsByEvent()" >事件统计图</el-button>
            <div style="position:relative;top:5px;right:-730px;cursor: pointer;" @click="table_off"><svg t="1693452797521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1763" width="24" height="24"><path d="M0 0h1024v1024H0z" fill="#d81e06" fill-opacity="0" p-id="1764"></path><path d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z" fill="#d81e06" p-id="1765"></path>
    </svg></div> 
        </div>
    <el-table
      :data="tableData_1"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="code"
        label="事件编号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="type"
        label="事件类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="level"
        label="事件等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="time"
        label="事故时间"
        width="140">
      </el-table-column>
      <el-table-column
        prop="address"
        label="事故地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="num"
        label="车牌号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="驾驶员"
        width="100">
      </el-table-column>
      <el-table-column
        prop="state"
        label="处理状态"
        width="130">
      </el-table-column>
    </el-table>   
  </div>


    <div id="mapchart" style="display: none;">
        <div style ="position:relative;display: flex;align-items: center;justify-content: center;margin:10px" >事件统计图
            <div style="position:absolute;right:2px;top:1px;cursor: pointer;" @click="toggleChart"><svg t="1693452797521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1763" width="24" height="24"><path d="M0 0h1024v1024H0z" fill="#d81e06" fill-opacity="0" p-id="1764"></path><path d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z" fill="#d81e06" p-id="1765"></path></svg></div>
        </div>
        <hr style="margin:7px">
        <div style="padding-bottom: 8px;position:relative;left:5%;display:flex;width:100%">
            <el-button style="left:20px" @click="L123()">按月份统计</el-button>
            <el-button @click="L1234()">按类型统计</el-button>
            
        </div>
        <div id="char-content" ></div>
    </div>
    </div>
    
</template>
 
 <script>
 import "ol/ol.css";
import {Map, View, Feature} from 'ol'
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText,Icon as StyleIcon} from 'ol/style';
import { Circle as GeomCircle, Point as GeomPoint, LineString as GeomLineString, Polygon as GeomPolygon } from 'ol/geom';
import Heatmap from 'ol/layer/Heatmap';
 import { Draw } from 'ol/interaction';
 export default {
    props: ["map"],
   data(){
     return{
        result:null,
        imgUrl:require("../assets/images/a1.jpeg"),
        isChartVisible: true,
        myChart:null,
        optionForMonth:null,
        optionForType:null,
        typeArray:[],
        heatmapLayer:null,
        ciecleVector:null,
        is_Heatmap:false,
        tableData:[],
        tableData_1:[]
     }                   
   },
   mounted(){
    this.toggleChart();
   },
   methods:{
    toggleChart() {
    
    document.getElementById('mapchart').style.display = 'none';
    
  },

    creatJsonInfo(FldName, AttValue) {
    const jsonInfo = { FldName, AttValue };
    
    // 可以根据需要执行其他操作
    
    return jsonInfo; // 返回 JSON 格式的数据
  },
  getEventStatusByNum(value) {
    if (value === "0") {
        return "未处理";
    } else if (value === "1") {
        return "处理中";
    } else if (value === "2") {
        return "已处理";
    } else {
        return "未知状态";
    }
    },
    getEventGradeByNum(value) {
    if (value === "1") {
        return "轻微事故";
    } else if (value === "2") {
        return "一般事故";
    } else if (value === "3") {
        return "重大事故";
    } else if (value === "4") {
        return "特大事故";
    } else {
        return "未知等级";
    }
    },
   async Draw() {
        if (this.draw == null) {
                this.draw = new Draw({
                type: "Circle",
                });
                this.map.addInteraction(this.draw);
                this.draw.on('drawend',  async e=>{   this.result = await  eventQueryVecLayerCallback(e);
                    var  labelSource = null
                    if (labelSource == null) {
                        //矢量标注的数据源
                        labelSource = new VectorSource();
                        this.ciecleVector = new VectorLayer({
                            source: labelSource,
                            style: new Style({
                                //填充色
                                fill: new StyleFill({
                                    color: 'rgba(255, 255, 255, 0.2)'
                                }),
                                //边线样式
                                stroke: new StyleStroke({
                                    color: '#ffcc33',
                                    width: 2
                                })
                            })
                        });
                        this.map.addLayer(this.ciecleVector);
                    }
                    var features = [];
                    for(let i = 0; i< this.result.SFEleArray.length;i++) {
                        this.tableData.push(this.result.SFEleArray[i].AttValue)
                    }
                    for(let i = 0; i< this.tableData.length;i++) {
                        if ( this.tableData[i][2] === "1") {
                            this.tableData[i][2]= "轻微事故"
                        } else if ( this.tableData[i][2] === "2") {
                            this.tableData[i][2]= "一般事故"
                        } else if ( this.tableData[i][2] === "3") {
                            this.tableData[i][2]= "重大事故"
                        }else if ( this.tableData[i][2] === "4") {
                            this.tableData[i][2]= "特大事故"
                        }
                    }
                    for(let i = 0; i< this.tableData.length;i++) {
                        if ( this.tableData[i][7] === "0") {
                            this.tableData[i][7]= "未处理"
                        } else if ( this.tableData[i][7] === "1") {
                            this.tableData[i][7]= "处理中"
                        } else if ( this.tableData[i][7] === "2") {
                            this.tableData[i][7]= "已处理"
                        }
                    }
                    for(let i = 0; i< this.tableData.length;i++){
                        this.tableData_1.push({"code":this.tableData[i][0],"type":this.tableData[i][1],"level":this.tableData[i][2],"time":this.tableData[i][3],"address":this.tableData[i][4],
                        "num":this.tableData[i][5],"name":this.tableData[i][6],"state":this.tableData[i][7]})
                    }
                    console.log(this.tableData_1)
                    console.log(this.tableData)
                    for (var i = 0; i < this.result.SFEleArray.length; i++) {
                        var sfele = this.result.SFEleArray[i];
                        var bound = sfele.bound;
                        if (bound != undefined) {
                            var labelposition = [(bound.xmin + bound.xmax) / 2, (bound.ymin + bound.ymax) / 2];
                            var infojson = this.creatJsonInfo(this.result.AttStruct.FldName, sfele.AttValue);
                            console.log(infojson)
                            var iconFeature = new Feature({
                                geometry: new GeomPoint(labelposition),
                                info: infojson
                            });
                            iconFeature.setStyle(new Style({
                                image: new StyleIcon(
                                    ({
                                        anchor: [0.5, 1],
                                        anchorOrigin: 'top-right',
                                        anchorXUnits: 'fraction',
                                        anchorYUnits: 'fraction',
                                        src: this.imgUrl
                                    })
                                )
                            }));
                            features.push(iconFeature);
                        }
                    }
                    
               document.getElementById('divShowResult').style.display = 'block';
               labelSource.addFeatures(features);
                    this.map.un("click", ()=>{});
                    this.map.on("click", ()=>{
                    this.map.removeLayer(this.ciecleVector);
                    this.tableData = [];
                    this.tableData_1 = []
                });
                })
            }else {
        openMessage("danger", "哎呀！", "没有查询到内容");
    }
        },
    handclick1(){
        console.log(this.is_Heatmap)
        if(!this.is_Heatmap==false){
            return
        }
        var features = createHeatMapByEvent(this.result);
        var heatmapSource = null;
        for (var i = 0; i < features.length; i++) {
            features[i].set('weight', parseFloat(this.result.SFEleArray[i].AttValue[3]) * 0.2);
        }
        if (!heatmapSource) {
            heatmapSource = new VectorSource({
                wrapX: false
            });
             this.heatmapLayer = new Heatmap({
                source: heatmapSource,
                radius: 10,
                blur: 10
            });
            this.map.addLayer(this.heatmapLayer);
        }
        heatmapSource.addFeatures(features);
        this.is_Heatmap = true
    },
    createChartsByEvent() {
        document.getElementById('mapchart').style.display = 'block';
        // stopPressBar();
        var numForMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var typeObj = {};
        for (var i = 0; i < this.result.SFEleArray.length; i++) {
            //按月份统计
            var month = Number(this.result.SFEleArray[i].AttValue[3].split(".")[1]);
            numForMonth[month - 1]++;
            //按事件类型统计
            var type = this.result.SFEleArray[i].AttValue[1];
            var numForType = typeObj[type];
            if (!numForType) {
                numForType = 0;
            }
            numForType++;
            typeObj[type] = numForType;
        }
        for (var key in typeObj) {
            this.typeArray.push({ value: typeObj[key], name: key });
        }
        this.optionForMonth = {
            title: {
                text: '交通事件(' + this.result.SFEleArray.length + '起)'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [{
                    name: '交通事件'
                }],
                top: 'top',
                left: 'center'
            },
            backgroundColor: 'rgba(255, 255, 255, 1)',
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true },
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '交通事件',
                    type: 'line',
                    data: numForMonth,
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]

    },
    this.optionForType = {
        title: {
                text: '交通事件(' + this.result.SFEleArray.length + '起)'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: '40px',
                right: '20px',
                data: this.typeArray
            },
            backgroundColor: '#ffff',
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true },
                }
            },
            calculable: true,
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '40%'],
                    data: this.typeArray,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
    }
    
    this.myChart = this.$echarts.init(document.getElementById('char-content'))
    this.myChart.setOption(this.optionForMonth);
    },
    close(){
        this.is_Heatmap = false
        if (this.draw) {
    this.map.removeInteraction(this.draw);
    this.draw = null;
    this.map.removeLayer(this.heatmapLayer);
    this.map.removeLayer(this.ciecleVector);
    document.getElementById('divShowResult').style.display = 'none';
    this.toggleChart();
    this.tableData = []
    this.tableData_1 = []
        }
    },
    L123(){
        this.myChart.setOption(this.optionForMonth);
    },
    L1234(){
        
        this.myChart.setOption(this.optionForType);
    },
    table_off(){
        if (this.draw) {
    this.map.removeInteraction(this.draw);
    this.draw = null;
    this.map.removeLayer(this.heatmapLayer);
    this.map.removeLayer(this.ciecleVector);
    document.getElementById('divShowResult').style.display = 'none';
    this.tableData = []
    this.tableData_1 = []
        }
    }
}
}
</script>
<style scoped>
#divShowResult{
    position: fixed;
    z-index: 250;
    width: 60%;
    height: 30%;
    bottom: 0;
    left:23%;
    overflow: auto;
    border: 1px solid transparent;
    border-radius:5px ;
}
.table{
    background-color: antiquewhite;
}

#mapchart{
    position: fixed;
    z-index: 250;
    width: 25%;
    height: 35%;
    top: 30%;
    left:40%;
    border: 1px #c0c0c0 solid;
    border-radius: 5%;
    background-color: white;
    overflow: hidden;
    box-shadow: 10px 10px 20px rgba(192, 192, 192, 0.5);

}
#char-content{
    width: 100%;
    height: 80%;
}
::v-deep .el-table td,
::v-deep .el-table th{
  text-align: center ;
}
</style>