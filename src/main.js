import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
import './assets/fonts/iconfont.js'
import './assets/fonts/iconfont.css'
import '@/assets/scss/index.scss'
import VueContextMenu from 'vue-contextmenu'
// 接口拦截
axios.interceptors.response.use((response) => {
    let res = response.data;
    let path = location.hash;
    if(res.status == 0){
      return res.data;
    } else if(res.status == 10) {  // 10:未登录
      if(path != '/#/index'){
        window.location.href = '/#/login';
      }
      // to-do
      // Message.warning(res.msg);
      return Promise.reject(res);
    } else {  // 业务出错
      alert(res.msg);
      // to-do
      // Message.warning(res.msg);
      return Promise.reject(res);
    }
  },(error)=>{  // 接口调用出错
    let res = error.response;
    alert(res);
    // to-do
    // Message.error(res.data.message);
    return Promise.reject(error);
  });

createApp(App).use(store).use(VueContextMenu).use(router).use(VueAxios, axios).use(ElementPlus).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
