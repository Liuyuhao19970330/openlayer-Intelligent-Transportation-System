<template>
  <div id="map">
    <Measure :map="map" ref="measureComponentRef" />
    <Popup :map="map" ref="popupComponentRef" />
    <Addevent :map="map" ref="addeventComponentRef" />
    <Eventquery :map="map"  ref="eventqueryComponentRef"  />
    <Publish :map="map"  ref="publishComponentRef"  />
    <Roadinfo :map="map"  ref="roadinfoComponentRef"  />
    <Reportroadinfo :map="map"  ref="reportroadinfoComponentRef"  />
    <Eventinfo :map="map"  ref="eventinfoComponentRef"  />
    <ChangePassword  ref="changepasswordComponentRef"  />
    <Admin  ref="adminComponentRef"  />
    <Traffic :map="map" ref="trafficComponentRef"  />
    <Screenshot :map="map" ref="screenshotComponentRef"  />
    <Search2 :map="map" ref="search2ComponentRef"  />
    
    <div class="navbar-container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  style="display:flex" >
        <el-menu-item index="3"  class="logo "  style="color:red; margin-left:50px;margin-right:35px;user-select: none;pointer-events: none;font-size:18px">
          <svg t="1694567579802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5471" width="40" height="40"><path d="M959.992 703.988H64.008c-35.282 0-64-28.688-64-64V277.324c0-35.282 28.718-63.998 64-63.998h895.984c35.31 0 63.998 28.716 63.998 63.998v362.664c0 35.312-28.688 64-63.998 64z" fill="#FFCE54" p-id="5472"></path><path d="M0.01 639.988c0 35.312 28.718 64 64 64h95.826v-85.312H0.01v21.312z" fill="#E6E9ED" p-id="5473"></path><path d="M1023.99 298.668H106.68c-11.782 0-21.344 9.546-21.344 21.328v170.668c0 11.782 9.562 21.312 21.344 21.312h917.31V298.668z" fill="#4FC2E9" p-id="5474"></path><path d="M192.006 597.302c-58.812 0-106.67 47.874-106.67 106.686 0 58.81 47.858 106.686 106.67 106.686s106.67-47.876 106.67-106.686c0-58.812-47.858-106.686-106.67-106.686zM789.306 597.302c-58.81 0-106.624 47.874-106.624 106.686 0 58.81 47.812 106.686 106.624 106.686 58.842 0 106.686-47.876 106.686-106.686 0-58.812-47.844-106.686-106.686-106.686z" fill="#434A54" p-id="5475"></path><path d="M207.1 688.926c8.328 8.312 8.328 21.812 0 30.124-8.344 8.376-21.844 8.376-30.17 0-8.344-8.312-8.344-21.812 0-30.124 8.326-8.376 21.826-8.376 30.17 0z" fill="#F5F7FA" p-id="5476"></path><path d="M362.674 512.07h256.01v191.918H362.674z" fill="#E6E9ED" p-id="5477"></path><path d="M804.432 688.926c8.312 8.312 8.312 21.812 0 30.124-8.344 8.376-21.874 8.376-30.186 0-8.312-8.312-8.312-21.812 0-30.124 8.312-8.376 21.842-8.376 30.186 0z" fill="#F5F7FA" p-id="5478"></path><path d="M480 298.668h21.328v405.32H480z" fill="#E6E9ED" p-id="5479"></path><path d="M190.616 512.07l-0.658-213.402 42.672-0.126 0.656 213.372zM768.308 512.07l-0.624-213.402 42.622-0.126 0.688 213.372z" fill="#3BAFDA" p-id="5480"></path><path d="M362.674 298.668h256.012v405.32h21.31V277.324H341.332v426.664h21.342zM1023.99 554.678h-63.998c-11.782 0-21.312 9.5-21.312 21.312s9.532 21.312 21.312 21.312h63.998v-42.624z" fill="#E6E9ED" p-id="5481"></path>
          </svg>
          &nbsp;光谷智慧交通系统</el-menu-item>
        <el-submenu index="1" style="margin-left:5px">
          <template slot="title" >实时路况</template>
          <el-menu-item index="1-1" style="margin-left:20%" @click="traffic_on" >开启实时路况</el-menu-item>
          <el-menu-item index="1-2" style="margin-left:20%" @click="traffic_off">关闭实时路况</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="handleClick5()" >路况情况</el-menu-item>
        <el-menu-item index="3" @click="handleClick()" >发布公告</el-menu-item>
        <el-submenu index="4" style="margin-left:5px">
          <template slot="title" >视频监控</template>
          <el-menu-item index="2-1" style="margin-left:20%" @click="Video_on" >开启视频监控</el-menu-item>
          <el-menu-item index="2-2" style="margin-left:20%" @click="Video_off">关闭视频监控</el-menu-item>
        </el-submenu>
        <el-menu-item index="5"  >事件添加</el-menu-item>  
        <el-submenu index="6" style="margin-left:5px">
          <template slot="title" >事件更新</template>
          <el-menu-item index="6-1" style="margin-left:20%" @click="Updates_on" >添加事件</el-menu-item>
          <el-menu-item index="6-2" style="margin-left:20%" @click="Updates_off">关闭添加</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="7"    >事件查询</el-menu-item> -->
        <el-submenu index="7" style="margin-left:5px">
          <template slot="title" >事件查询</template>
          <el-menu-item index="7-1" style="margin-left:20%" @click="Search_on" >开启事件查询</el-menu-item>
          <el-menu-item index="7-2" style="margin-left:20%" @click="Search_off">关闭事件查询</el-menu-item>
        </el-submenu>
        <el-menu-item index="8"  @click="handleQueryCameraVecLayer4"  >事件信息</el-menu-item>
        <el-submenu index="8" style="margin-left:5px;">
          <template slot="title" >工具箱</template>
          <el-menu-item index="2-1" style="margin-left:25%" @click="measure1()" >测量距离</el-menu-item>
          <el-menu-item index="2-2" style="margin-left:25%" @click="measure2()">测量面积</el-menu-item>
          <el-menu-item index="2-3" style="margin-left:25%" @click="clearMeasure()">关闭测量</el-menu-item>
          <el-menu-item index="2-4" style="margin-left:25%" @click="Export()">导出图片</el-menu-item>
        </el-submenu>
      </el-menu>  
      <el-menu :default-active="activeIndex" class="el-menu-demo1" mode="horizontal"  style="display:flex;right:0px" > 
        <el-menu-item index="1"  style="margin-left:200px;margin-right:50px;width:400px">
            <el-input @keyup.enter.native ="abc123" placeholder="请输入查询交通事故信息" v-model="input3" class="input-with-select" >
              <el-button slot="append" icon="el-icon-search"  @click="abc123"></el-button>
            </el-input>
        </el-menu-item>
        <el-menu-item index="2" style="margin-left:22px;user-select:none">
          <el-dropdown trigger="click">
          <span style="font-size:17px">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>&nbsp;&nbsp;{{ x_username }}
          </span>
          <template #dropdown>
            <el-dropdown-menu >
              <el-dropdown-item @click.native.prevent="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="AdminData">用户管理</el-dropdown-item>
              <el-dropdown-item divided @click.native.prevent="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  <div class="img1">
    <!-- 右下角的图层切换窗口 -->
    <img src="../assets/images/dog.jpg" alt="" srcset=""  @click="handleImageClick()" :class="{ 'selected': selectedImage === 'dog' }" style="cursor: pointer" >
    <img src="../assets/images/long.jpg" alt="" srcset="" style="margin-left:20px;cursor: pointer" @click="handleImageClick1()" :class="{ 'selected': selectedImage === 'long' }">
  </div>
  <div id="mouse-position"></div> <!-- 鼠标坐标显示的窗口 -->
  <div class="menu">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" style="background-color: rgba(0, 0, 0, 0);border-color:rgba(0, 0, 0, 0)">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title" >导航一</span>
        </template>
        <el-menu-item-group style="padding-bottom: 10px;" >
          <span slot="title" style="font-size:15px;color:skyblue;margin-left:5px;user-select: none;">图层目录</span>
          <div style="margin-top: 10px;display:flex;flex-direction: column;margin-left:25px">
            <label style="cursor: pointer" v-for="(input, index) in inputs" :key="index">
              <input  type="checkbox" v-model="input.checked" :name="input.name" @change="handleInputChange(index)">
              {{ input.name }}
            </label>
          </div>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
  </div>
</template>

<script>
import "ol/ol.css";
import Overlay from "ol/Overlay";
import { Map, View ,transform} from "ol";
import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer'
import Group from "ol/layer/Group";
import {XYZ,OSM} from "ol/source";
import VectorSource from 'ol/source/Vector';
import  {ZoomToExtent,FullScreen,MousePosition,ScaleLine} from 'ol/control';
import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText,Icon as StyleIcon} from 'ol/style';
import Measure from '../views/Measure.vue';
import Popup from '../views/Popup.vue';
import Addevent from '../views/Addevent.vue';
import Eventquery from '../views/Eventquery.vue';
import Publish from '../views/Publish.vue';
import Roadinfo from '../views/Roadinfo.vue';
import Reportroadinfo from '../views/Reportroadinfo.vue';
import Eventinfo from '../views/Eventinfo.vue';
import ChangePassword from '../views/ChangePassword.vue';
import { bus } from '../main';
import Admin from '../views/Admin.vue';
import Traffic from '../views/Traffic.vue';
import Screenshot from '../views/Screenshot.vue'
import Search2 from '../views/search2.vue'
export default {
  components: {
    Measure,
    Popup,
    Addevent,
    Eventquery,
    Publish,
    Roadinfo,
    Reportroadinfo,
    Eventinfo,
    ChangePassword,
    Admin,
    Traffic,
    Screenshot,
    Search2
  },
  data() {
    return {
    tdtKey : '8a5c2b00e94b49659861e064c37f778d',
    activeIndex: '1',
    input3:'',
    map:null,
    is_flowLayer:false,
    flowLayer:null,
    searchLayer:null,
    popupTitle: '',
      popupContent: '',
      Visiable:false,
      draw:null,
      Traffic:null,
      op:null,
      selectedImage: 'dog',
      x_username:'',
      form1:{},
    inputs: [
      { name: '居民区', checked: true },
      { name: '道路', checked: true },
      { name: '摄像头', checked: true },
      { name: '事件', checked: true },
      { name: '警务室', checked: true }
        // 添加更多需要的输入元素
      ],
      isCollapse: true,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
    
  },
  created() {
    bus.$on('data-event', (data) => {
      this.x_username = data;
    });
  },
  mounted() {
    this.initMap();
  },
    //this.initDrawingInteraction(); // 初始化绘制交互
  methods: {
    
    measure1() {
      this.$refs.measureComponentRef.measure('distence');
    },
    measure2() {
      this.$refs.measureComponentRef.measure('area');
    },
    measure3() {
      this.$refs.measureComponentRef.measure('angle');
    },
    clearMeasure(){
      this.$refs.measureComponentRef.clearMeasure()
    },
      handleInputChange(index) {
      const checked = this.inputs[index].checked;
      // 根据需要执行其他逻辑
      docLayer.setLayerStatus(index, checked ? 'include' : 'exclude');
    },
    initMap() {
      this.map = new Map({
        target: "map",
        view: new View({
            center: [114.3762, 30.4916],
            zoom: 14,
            projection: "EPSG:4326"
        })
    });

    
    const layer_vec = new TileLayer({
        title: "天地图矢量图层",
        source: new XYZ({
            url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=" + this.tdtKey,
            crossOrigin: "anonymous",
            projection: "EPSG:4326",
            maxZoom: 18,
            minZoom: 1,
            wrapX: false
        })
    });
  
    const layer_cva = new TileLayer({
        title: "天地图矢量注记图层",
        source: new XYZ({
            url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=" +this.tdtKey,
            crossOrigin: "anonymous",
            projection: "EPSG:4326",
            maxZoom: 18,
            minZoom: 1,
            wrapX: false
        })
    });

    var layer_img = new TileLayer({
        title: "天地图影像图层",
        source: new XYZ({
            url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=" + this.tdtKey,
            crossOrigin: "anonymous",
            projection: "EPSG:4326",
            maxZoom: 18,
            minZoom: 1,
            wrapX: false
        })
    });

    var layer_cia = new TileLayer({
        title: "天地图影像注记图层",
        source: new XYZ({
            url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=" + this.tdtKey,
            crossOrigin: "anonymous",
            projection: "EPSG:4326",
            maxZoom: 18,
            minZoom: 1,
            wrapX: true
        })
    });
    const imgLayergroup = new Group({
        layers: [
            layer_img,
            layer_cia
        ],
        visible: false
        
    });
    // 矢量+注记图层组
    const vecLayergroup = new Group({
        layers: [
            layer_vec,
            layer_cva
        ],
        visible: true
    });
   
    this.map.addLayer(imgLayergroup);
    this.map.addLayer(vecLayergroup);


    this.map.addLayer(docLayer);

    const navControl = new ZoomToExtent({
            extent: [
                100, 30,
                140, 30
            ]
        })
      const fullScreen = new FullScreen();
      this.map.addControl(navControl,fullScreen);//复位控件.
      const mousePositionControl = new MousePosition({
        /* 坐标格式 */
        coordinateFormat:ol.coordinate.createStringXY(4),
        projection:'EPSG:4326',
        /* 坐标信息显示样式类名,默认是'ol-mouse-position' */
        className:'custom-mouse-position',
        target:document.getElementById('mouse-position'),
        undefinedHTML:'&nbsp'
    })
    this.map.addControl(mousePositionControl)

    const scaleLineControl = new ScaleLine({
    /* 设置比例尺单位,degrees,imperial,us,nautical,metric */
    units:'metric'
})
  this.map.addControl(scaleLineControl)
  },
  handleImageClick() {
    this.selectedImage = 'dog'
    this.map.getLayers().item(1).setVisible(true);
      this.map.getLayers().item(0).setVisible(false)
    },
    handleImageClick1() {
      this.selectedImage = 'long'
      this.map.getLayers().item(1).setVisible(false);
      this.map.getLayers().item(0).setVisible(true);
    },

Video_on() {
  this.$refs.popupComponentRef.popup();
},
Video_off() {
  this.$refs.popupComponentRef.cleanPopup();
},
handleClick(){
  this.$refs.publishComponentRef.Draw();
        },
Updates_on(){
  this.$refs.addeventComponentRef.Draw();
},
Updates_off(){
  this.$refs.addeventComponentRef.close()
},
Search_on(){
  this.$refs.eventqueryComponentRef.Draw();
  
},
Search_off(){
  this.$refs.eventqueryComponentRef.close();
  
},
handleClick5(){
  this.$refs.reportroadinfoComponentRef.RoadInfoTableInit(this.x_username);
} ,
handleQueryCameraVecLayer4(){
  this.$refs.eventinfoComponentRef.ShowDiv();
},
changePassword(){
  this.$refs.changepasswordComponentRef.changePassword();
},
async logout(){
  await this.$post('http://localhost:8000/api/loginout',this.x_username).then(resp=>{
    if(resp.code===0){
            this.$message({
              message:'成功登出',
              type:'success'
            });
            this.$router.push({path:'/api/login'})
            
          }else{
            this.$message({
              message:'修改失败',
              type:'failed'
            });
          }

  })

},
AdminData(){
  this.$refs.adminComponentRef.Admin();
},
traffic_on(){
  this.$refs.trafficComponentRef.flow();
},
traffic_off(){
  this.$refs.trafficComponentRef.close();
},
Export(){
  this.$refs.screenshotComponentRef.captureScreenshot();
},
abc123(){
  if(this.input3 === ''){
                this.$message.error('请输入内容');
                return
            }
  this.$refs.search2ComponentRef.accidents(this.input3);
},

  }
}
</script>

<style  scoped>
#map {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
html,
body {
  overflow: hidden;
}
.navbar-container {
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;  /* 如果需要，可以调整 z-index 值以确保导航条显示在最上层 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown  {
  font-size: 12px;
  color: #5a5e66;
}
.img1{
  display:flex;
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 220px;
  height: 100px;
  z-index: 999;
}
#mouse-position{
  padding: 2px 5px;
  position: fixed;
  bottom: 10px;
  left:20%;
  width: 152px;
  height: 30px;
  border: 1px solid red;
  z-index: 999;
  border-radius: 5px;
}
::v-deep .el-menu.el-menu--horizontal{
  width:100vw !important;
}
.menu{
  position: fixed;
  bottom: 30%;
  left:0px;
  width: 10%;
  height: 20%;
  z-index: 999;
}
.selected {
  border: 2px solid rgb(121, 182, 206);
  box-shadow: 0px 0px 5px 5px rgba(121, 182, 206, 0.5);
}


</style>
