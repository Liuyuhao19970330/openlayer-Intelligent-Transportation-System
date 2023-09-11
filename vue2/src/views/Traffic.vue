<template>
  
</template>

<script>
import "ol/ol.css";
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer'
import Group from "ol/layer/Group";
import VectorSource from 'ol/source/Vector';
import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText,Icon} from 'ol/style';
export default {
    props:["map"],
    data(){
        return{
            flowLayer : null,
            Traffic:null
        }
    },
    methods:{
    async flow(){
        this.Traffic = await queryByLayer()
        const ol_features1 = [];
        const ol_features2 = [];
        const ol_features3 = [];

        this.Traffic.forEach((feature)=>{
            const Traffic1 = parseInt(feature.values_.values_.车流量);
            
            if (Traffic1 > 0 && Traffic1 <= 1000) {
            ol_features1.push(feature);
            } else if (Traffic1 > 1000 && Traffic1 <= 1500) {
            ol_features2.push(feature);
            } else if (Traffic1 > 1500 && Traffic1 <= 2000) {
            ol_features3.push(feature);
            }

        });
        
        const style1 = new Style({
            stroke: new StyleStroke({
            color: "rgb(178,34,34)",
            width: 6
            })
        });
        
        const style2 = new Style({
            stroke: new StyleStroke({
            color: "rgb(34,139,34)",
            width: 6
            })
        });
        
        const style3 = new Style({
            stroke: new StyleStroke({
            color: "rgb(255,127,36)",
            width: 6
            })
        });
        


        const source1 = new VectorSource({ wrapX: false, features: ol_features1 });
        const source2 = new VectorSource({ wrapX: false, features: ol_features2 });
        const source3 = new VectorSource({ wrapX: false, features: ol_features3 });
        
        const flowLayer1 = new VectorLayer({ source: source1, style: style1 });
        const flowLayer2 = new VectorLayer({ source: source2, style: style2 });
        const flowLayer3 = new VectorLayer({ source: source3, style: style3 });
        
        this.flowLayer = new Group({
            layers: [
            flowLayer1,
            flowLayer2,
            flowLayer3
            ],
        });
        this.map.addLayer(this.flowLayer)

    },   
    close(){
        this.map.removeLayer(this.flowLayer);
    }
    
      
    
    }
}
</script>

<style>

</style>