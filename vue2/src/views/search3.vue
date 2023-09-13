<template>
  <div  id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer" ></a>
        <div id="popup-content" class="popup-content"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import Overlay from "ol/Overlay";
import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText,Icon as StyleIcon} from 'ol/style';
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';

export default {
    props:["map"],
    data(){
        return{
            is_addLayer:false,
            searchLayer:null,
            imgUrl_1:require("../assets/images/a1.jpeg"),
            overlay_1:null
        }
    },
    methods:{
     async  abc(e){
            if (this.searchLayer) {
    // 移除之前的图层
    this.map.removeLayer(this.searchLayer);
    this.searchLayer = null;
  }
  if(this.input3 === ''){
                this.$message.error('请输入内容');
            }else{
                // this.clearPreviousData();
            var ol_features = await eventQueryByKeyword(e);
            // 所有在data中定义的变量都要用this来访问
            if(!ol_features){
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
                      src: this.imgUrl_1,
                      willReadFrequently: true,
                  }),
              })
              var source = new VectorSource({wrapX:false});
              this.searchLayer = new VectorLayer({
                        source,
                        style
                    })                  
                source.addFeatures(ol_features);
               this.map.addLayer(this.searchLayer);
               var container = document.getElementById('popup');
                var content = document.getElementById('popup-content');
                var closer = document.getElementById('popup-closer');
            this.overlay_1 = new Overlay(
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
            this.map.addOverlay(this.overlay_1);
            this.map.on('pointermove',  (e)=> {
            var pixel = this.map.getEventPixel(e.originalEvent);
            var hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
        let _that = this;
        this.map.on("click", evt => {
                var feature = _that.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
                        //清空popup的内容容器
                        // content.innerHTML = '';
                console.log(feature.values_.values_) 
                let name = feature.values_.values_.位置          
                content.innerHTML = `
                <p>编号：${name}</p>
                <hr/>
                <p>编号：${name}</p>
                <hr/>
                <p> 位置：${name}</p>
                <button>${name}<button>
                `;
        });
        var closer = document.getElementById("popup-closer");
            closer.onclick = () => {
                this.overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
        this.is_addLayer = true
            }
          
            }
        }
    }
}
</script>

<style scoped>
.ol-popup {
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

.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.popup-content {
    width: 400px;
}

.ol-popup-closer:after {
    content: "✖";
    
}
</style>