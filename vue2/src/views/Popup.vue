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
  props: ["map"],
  data(){
    return{
        imgUrl:require("../assets/images/mark.jpg"), //vue2加载图片要用请求的方式来访问相对路径;
        layer:null,
        is_addLayer:false,
        overlay_video:null
    }
  },
  methods:{
    async popup(){
      if(this.is_addLayer == true){
        return
      }
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
      var ol_features123 = await videoLayer()
      var source = new VectorSource({
          features: ol_features123
      })
      this.layer = new VectorLayer({
            source,
            style
        })
        this.map.addLayer(this.layer)
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');
        this.overlay_video = new Overlay(
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
        this.map.addOverlay(this.overlay_video);  
        this.map.on('pointermove',  (e)=> {
            var pixel = this.map.getEventPixel(e.originalEvent);
            var hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
        let _that = this;
        this.map.on("click", function(evt) {
                var feature_1 = _that.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
                        //清空popup的内容容器
                        // content.innerHTML = '';
                let name = null
                let code = null
                let video = null
                try{ name = feature_1.values_.values_.位置;
                     code = feature_1.values_.values_.编号;
                     video =feature_1.values_.values_.URL;
                    }catch (error){return;}

                let videoHTML = '';
                if (video) {
                    videoHTML = `<video controls>
                                    <source src="${video}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>`;
                }
                content.innerHTML = `
                <p>编号：${code}</p>
                <hr/>
                ${videoHTML}
                <hr/>
                <p> 位置：${name}</p>`;
                if (feature_1.values_.values_.URL) {
                    _that.overlay_video.setPosition(evt.coordinate);
                    console.log(feature_1)
                } else {
                    _that.overlay_video.setPosition(undefined);
                }
                
        });
        var closer = document.getElementById("popup-closer");
            closer.onclick = () => {
                _that.overlay_video.setPosition(undefined);
                closer.blur();
                return false;
            };
        this.is_addLayer = true
      
    },

    cleanPopup(){
        this.map.removeLayer(this.layer);
        this.map.removeLayer(this.overlay_video);
        this.is_addLayer = false
    },
    mounted() {
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