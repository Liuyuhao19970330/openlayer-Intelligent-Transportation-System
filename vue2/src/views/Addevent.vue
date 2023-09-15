<template>
    <div id="popup_2" class="ol-popup_2">
        <div id="popup-title_2" class="popup-title_2"></div>
         <a href="#" id="popup-closer_2" class="ol-popup-closer_2"></a>
         <div id="popup-content_2" class="popup-content_2"></div>
     </div>
</template>
 
 <script>
 import "ol/ol.css";
 import Overlay from "ol/Overlay";
 import { Draw } from 'ol/interaction';
import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText,Icon as StyleIcon} from 'ol/style';
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
 export default {
   props: ["map"],
   data(){
     return{
         layer:null,
         result:null,
         overlay_event:null,
         is_addLayer:false,
         imgUrl:require("../assets/images/mark.jpg")
     }
   },

   methods:{
   async Draw() {
        if (this.draw == null) {
                this.draw = new Draw({
                type: "Point",
                });
                this.map.addInteraction(this.draw);
                this.draw.on('drawend', async e=>{ await addFeatureCallback(e);
                    var container = document.getElementById("popup_2");
                    var closer = document.getElementById("popup-closer_2");
                    var btn_cancel = document.getElementById("btn-cancel");
                    var overlay = new Overlay({
                        element: container,
                        autoPan: true,
                        autoPanAnimation: {
                        duration: 250 
                        }
                    });
                    this.map.addOverlay(overlay);
                    overlay.setPosition(e.feature.getGeometry().getCoordinates());
                    closer.onclick = () => {
                        overlay.setPosition(undefined);
                        closer.blur();
                        return false;
                    };
                    btn_cancel.onclick = () => {
                        overlay.setPosition(undefined);
                        btn_cancel.blur();
                        return false;
                    };
                });
            }                                    
 },
 async upDate(){
    const feature_event = await EventLayer()
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
      var source = new VectorSource({
          features: feature_event
      })
      this.layer = new VectorLayer({
            source,
            style
        })
        this.map.addLayer(this.layer)
 
 },

 close() {
  if (this.draw) {
    this.map.removeInteraction(this.draw);
    this.draw = null;
  }
}
}
}
 </script>
 <style scoped>
 .ol-popup_2 {
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
 
 .ol-popup_2:after,
 .ol-popup_2:before {
     top: 100%;
     border: solid transparent;
     content: " ";
     height: 0;
     width: 0;
     position: absolute;
     pointer-events: none;
 }
 
 .ol-popup_2:after {
     border-top-color: white;
     border-width: 10px;
     left: 48px;
     margin-left: -10px;
 }
 
 .ol-popup_2:before {
     border-top-color: #cccccc;
     border-width: 11px;
     left: 48px;
     margin-left: -11px;
 }
 
 .ol-popup-closer_2 {
     text-decoration: none;
     position: absolute;
     top: 2px;
     right: 8px;
 }
 
 .popup-content_2 {
     width: 400px;
 }
 
 .ol-popup-closer_2:after {
     content: "✖";
 }

 </style>