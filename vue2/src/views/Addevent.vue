<template>
    <div id="popup" class="ol-popup">
        <div id="popup-title" class="popup-title"></div>
         <a href="#" id="popup-closer" class="ol-popup-closer"></a>
         <div id="popup-content" class="popup-content"></div>
     </div>
</template>
 
 <script>
 import "ol/ol.css";
 import Overlay from "ol/Overlay";
 import { fromLonLat, transform, toLonLat } from "ol/proj";

 import { Draw } from 'ol/interaction';
 export default {
   props: ["map"],
   data(){
     return{
         layer:null,
         result:null
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
                    var container = document.getElementById("popup");
                    var closer = document.getElementById("popup-closer");
                    var overlay = new Overlay({
                        element: container,
                        autoPan: true,
                        autoPanAnimation: {
                        duration: 250 
                        }
                    });
                    this.map.addOverlay(overlay);
                    overlay.setPosition(e.feature.getGeometry().getCoordinates());
                    
                    closer.onclick = function() {
                        overlay.setPosition(undefined);
                        closer.blur();
                        return false;
                    };});
            }                                    
 },

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
 
 .ol-popup:after,
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