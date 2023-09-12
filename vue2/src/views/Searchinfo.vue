<template>

</template>

<script>
export default {
    props:["map"],
    data(){
        return{

        }
    },
    method:{
       async searchInfo(e){
        console.log(e)
            // if(this.input3 === ''){
            //     this.$message.error('请输入内容');
            // }
            // else{
            //     this.clearPreviousData();
            // var ol_features = await eventQueryByKeyword(e);
            // // 所有在data中定义的变量都要用this来访问
            // var source = new VectorSource({wrapX:false});
            //         var layer = new VectorLayer({
            //             source
            //         })

            //         layer123.setStyle(
            //             new Style({
            //                 image:new StyleCircle({
            //                     radius:12,
            //                     fill:new StyleFill({ 
            //                         color:'#2A2A2A'
            //                     }),
            //                     stroke: new StyleStroke({
            //                             color: '#ffcc33',
            //                             width: 2
            //                         })
            //                 })
            //             })
            //         )
            //     source.addFeatures(ol_features);
            //     this.searchLayer = layer;
            // await this.map.addLayer(this.searchLayer);
            // }
        }
    }
}
</script>

<style>
</style> 