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
            abc : null,
        }
    },
    methods:{
        async Draw() {
        if (this.draw == null) {
                this.draw = new Draw({
                type: "LineString",
                });
                this.map.addInteraction(this.draw);
                this.draw.on('drawend', async e=>{ await constructAnnouncementCallback(e);

                } )   

    }
}
}
}
</script>

<style>

</style>