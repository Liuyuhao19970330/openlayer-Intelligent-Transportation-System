import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import { get, post, put, del,patch } from './plugins/axios'; // 导入Axios的封装请求方法
import './plugins/particles';
import '../src/assets/styles/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as echarts from 'echarts';
export const bus = new Vue();
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
// 注册全局的请求方法
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$delete = del;
Vue.prototype.$patch = patch;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
