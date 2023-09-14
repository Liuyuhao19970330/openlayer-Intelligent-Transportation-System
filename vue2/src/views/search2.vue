<template>
   <div  id="popup_1" class="ol-popup_1">
        <a href="#" id="popup-closer_1" class="ol-popup-closer_1" ></a>
        <div id="popup-content_1" class="popup-content_1"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import Overlay from "ol/Overlay";
import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText,Icon as StyleIcon} from 'ol/style';
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';

export default {
  props: ["map"],
  data(){
    return{
        imgUrl:require("../assets/images/a1.jpeg"), //vue2加载图片要用请求的方式来访问相对路径;
        layer_search:null,
        is_addLayer:false,
        ol_features123:null,
        layer_search:null
    }
  },
  methods:{
    async accidents(e){
        if (this.layer_search) {
    this.map.removeLayer(this.layer_search);
    this.layer_search = null;
  }
  this.ol_features123 = await eventQueryByKeyword(e);
    if(!this.ol_features123){
        this.$message.error('抱歉,什么都没找到!');
        return
    }else{
      const style = new Style({
            //形状
            image: new StyleIcon({
                anchor: [0.5, -0.5],
                anchorOrigin: 'bottom-right',
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                offsetOrigin: 'top',
                // offset:[0,10],
                //图标缩放比例
                scale: 1,
                //透明度
                opacity: 0.75,
                //图标的url
                src: this.imgUrl,
                willReadFrequently: true,
            }),
        })
      var source = new VectorSource({
          features: this.ol_features123
      })
      this.layer_search = new VectorLayer({
            source,
            style
        })
        this.map.addLayer(this.layer_search)
    }
        
        var container = document.getElementById('popup_1');
        var content = document.getElementById('popup-content_1');
        var closer = document.getElementById('popup-closer_1');
        var overlay = new Overlay(
            ({
                //要转换成overlay的HTML元素
                element: container,
                //当前窗口可见
                autoPan: true,
                //是否应该停止事件传播到地图窗口
                autoPanAnimation: {
                    //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
                    duration: 250
                }
            }));
        this.map.addOverlay(overlay);  
        this.map.on('pointermove',  (e)=> {
            var pixel = this.map.getEventPixel(e.originalEvent);
            var hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
        try{let _that = this;
        this.map.on("click", (evt)=> {
                var feature = _that.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer_search) { return feature; });
                        //清空popup的内容容器
                        // content.innerHTML = '';
                let name = null
                let code = null
                let level = null
                let address = null
                let time = null
                let state = null
                let num = null
                let type = null
                let state_1 = ''
                let level_1 = ''
                try{ level = feature.values_.values_.事件等级;
                     type = feature.values_.values_.事件类型;
                     code = feature.values_.values_.事件编号;
                     address = feature.values_.values_.发生地点;
                     time = feature.values_.values_.发生时间;
                     state = feature.values_.values_.处理状态;
                     num = feature.values_.values_.车牌号;
                     name = feature.values_.values_.驾驶员;
                    }catch (error){return;}
                switch (state) {
                    case "0":
                    state_1 = "未处理";
                    break;
                    case "1":
                    state_1 = "处理中";
                    break;
                    case "2":
                    state_1 = "已处理";
                    break;
                    default:
                    state_1 = "未处理";
                }
                switch (level ) {
                    case "1":
                    level_1 = "轻微事故";
                    break;
                    case "2":
                    level_1 = "一般事故";
                    break;
                    case "3":
                    level_1 = "重大事故";
                    break;
                    case "4":
                    level_1 = "特大事故";
                    break;
                    default:
                    level_1 = "未知等级";
                }
                content.innerHTML = `
                <p>事件详细信息</p>
                <hr/>
                <table class="event-table">
                    <tr>
                        <td>事件编号：</td>
                        <td>${code}</td>
                    </tr>
                    <tr>
                        <td>事件等级：</td>
                        <td>${level_1}</td>
                    </tr>
                    <tr>
                        <td>事件类型：</td>
                        <td>${type}</td>
                    </tr>
                    <tr>
                        <td>发生地点：</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>发生时间：</td>
                        <td>${time}</td>
                    </tr>
                    <tr>
                        <td>处理状态：</td>
                        <td>${state_1}</td>
                    </tr>
                    <tr>
                        <td>车牌号：</td>
                        <td>${num}</td>
                    </tr>
                    <tr>
                        <td>驾驶员：</td>
                        <td>${name}</td>
                    </tr>
                </table>               
                `;
                if (feature.values_.values_.驾驶员) {
                    overlay.setPosition(evt.coordinate);
                } else {
                    overlay.setPosition(undefined);
                }
                
                 //把 overlay 显示到指定的 x,y坐标
        })
        var closer = document.getElementById("popup-closer_1");
            closer.onclick = () => {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            }
        } catch(error){

    };
        this.is_addLayer = true
           
    },

    cleanPopup(){
        this.map.removeLayer(this.layer_search);
        this.is_addLayer = false
    },
    mounted() {
    }
  }
}
</script>

<style scoped>
.ol-popup_1 {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
}

.ol-popup_1:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup_1:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup_1:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer_1 {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.popup-content_1 {
    width: 400px;
}

.ol-popup-closer_1:after {
    content: "✖";
    
}

</style>