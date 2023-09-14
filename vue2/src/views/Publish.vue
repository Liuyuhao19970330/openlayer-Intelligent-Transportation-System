<template>
  <div id="pushNotice" class="btn-primary"></div>
</template>

<script>
import "ol/ol.css";
import { Draw } from 'ol/interaction';
import {Map, View, Feature} from 'ol';
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
export default {
    props:["map"],
    data(){
        return{
        }
    },
    methods:{
      async  Draw(){
            await addLine()
        }

    }
}
    
</script>

<style>

</style>