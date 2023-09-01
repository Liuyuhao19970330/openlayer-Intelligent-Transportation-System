<template>
    <div>
        <div id="divShowResult" style="display: none;">
        <div style="background-color: white;position:relative;padding:7px;padding-left:15px">
            <el-button @click="handclick1()" style="margin-right:10px">事件热力图</el-button>
            <el-button @click="createChartsByEvent()" >事件统计图</el-button>
        </div>
        <div id="resulttable"></div> 
    </div>
    <div id="mapchart" style="display: none;">
        <div style ="position:relative;display: flex;align-items: center;justify-content: center;margin:10px" >事件统计图</div>
        <hr style="margin:7px">
        <div style="padding-bottom: 8px;position:relative;left:5%">
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
        myChart:null,
        optionForMonth:null,
        optionForType:null,
        typeArray:[],
     }                   
   },
   mounted(){
    
   },
   methods:{
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
    if (value === "0") {
        return "轻微事故";
    } else if (value === "1") {
        return "中等事故";
    } else if (value === "2") {
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
                        var ciecleVector = new VectorLayer({
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
                        this.map.addLayer(ciecleVector);
                    }
                    var features = [];
                    var tbody = "";
                    for (var i = 0; i < this.result.SFEleArray.length; i++) {
                        var sfele = this.result.SFEleArray[i];
                        var bound = sfele.bound;
                        if (bound != undefined) {
                            var labelposition = [(bound.xmin + bound.xmax) / 2, (bound.ymin + bound.ymax) / 2];
                            var infojson = this.creatJsonInfo(this.result.AttStruct.FldName, sfele.AttValue);
                            console.log(sfele.AttValue)
                            var tds = "";
                            for (var j = 0; j < sfele.AttValue.length - 1; j++) {
                                var value = sfele.AttValue[j];
                                if (j == 7) {
                                    value = this.getEventStatusByNum(value);//按数字获取事件状态
                                    
                                } else if (j == 2) {
                                    value = this.getEventGradeByNum(value);//按数字获取事件等级
                                }
                                tds += "<td >" + value + "</td>";
                            }
                            tbody += "<tr>" + tds + "</tr>"
                            //实例化Vector要素，通过矢量图层添加到地图容器中
                            var iconFeature = new Feature({
                                geometry: new GeomPoint(labelposition),
                                info: infojson
                            });

                            // 事件处理状态
                            var status = this.result.SFEleArray[i].AttValue[7];
                            iconFeature.setStyle(new Style({
                                /**{olx.style.IconOptions}类型*/
                                image: new StyleIcon(
                                    ({
                                        anchor: [0.5, 1],
                                        anchorOrigin: 'top-right',
                                        anchorXUnits: 'fraction',
                                        anchorYUnits: 'fraction',
                                        src: this.imgUrl
                                        // src: '../../images/mapicon/label/' + status + '.png'
                                    })
                                )
                            }));
                            features.push(iconFeature);
                        }
                    }
                    var ths = "";
                    document.getElementById('divShowResult').style.display = 'block';
                    for (var i = 0; i < this.result.AttStruct.FldName.length - 1; i++) {
                        ths += "<th>" + this.result.AttStruct.FldName[i] + "</th>"
                    }
                    var thead = "<thead ><tr>" + ths + "</tr></thead>";
                    $("#resulttable").html("<table class='table table-hover table-bordered'>" +
                        thead + "<tbody>" + tbody + "</tbody></table>");
                    var auth = localStorage.getItem("auth");
                    // if (auth != "common") {
                        $("#divShowResult").show();
                    // }
                    labelSource.addFeatures(features);
                    this.map.un("click", ()=>{console.log('map.un')});
                    this.map.on("click", ()=>{console.log('map.on')});
                })
            }else {
        openMessage("danger", "哎呀！", "没有查询到内容");
    }
        },
    handclick1(){
        var features = createHeatMapByEvent(this.result);
        console.log(features);
        var heatmapSource = null;
        for (var i = 0; i < features.length; i++) {
            features[i].set('weight', parseFloat(this.result.SFEleArray[i].AttValue[3]) * 0.2);
        }
        if (!heatmapSource) {
            heatmapSource = new VectorSource({
                wrapX: false
            });
            var heatmapLayer = new Heatmap({
                source: heatmapSource,
                radius: 10,
                blur: 10
            });
            this.map.addLayer(heatmapLayer);
        }
        heatmapSource.addFeatures(features);
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
        console.log(this.result)
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
    L123(){
        this.myChart.setOption(this.optionForMonth);
    },
    L1234(){
        
        this.myChart.setOption(this.optionForType);
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

</style>