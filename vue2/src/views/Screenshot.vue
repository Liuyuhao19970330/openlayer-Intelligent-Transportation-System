<template>
  
</template>

<script>
import html2canvas from 'html2canvas';
export default {
    props:["map"],
    data(){
        return{

        }
    },
    methods:{
        captureScreenshot() {
      // 获取要截屏的元素，可以是整个页面或特定的DOM元素
      const element = document.body;

      html2canvas(element).then(canvas => {
        // 创建一个虚拟链接
        const link = document.createElement('a');
        // 将 Canvas 转换为图片 URL
        link.href = canvas.toDataURL('../../src/assets/images/png');
        // 设置下载的文件名
        link.download = 'screenshot.png';
        // 触发链接点击事件，进行下载
        link.click();
      });
    },
        screenshot(){
            console.log('123')
        }
    }
}
</script>

<style>

</style>