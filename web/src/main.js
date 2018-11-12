// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routes from './router/'
import * as Util from "./util/util.js"
import {baseUrl} from './service/config'
// cookie插件
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// 页面加载进度
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import './assets/scripts/iframeResizer.js'
// sass
import './assets/fonts/iconfont.css'
//引入vuex
import store from './store/index.js'

Vue.config.productionTip = false
// 注入ui组件
Vue.use(ElementUI)

//将全部过滤器放在 filters/index.js 中便于管理
import filters from './filters/index.js'
// 注册全局过滤器
filters(Vue)
//剪贴板插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import axios from 'axios'
import VueAxios from 'vue-axios'
//配置默认头部
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

// http request 拦截器
axios.interceptors.request.use(
  config => {
    store.commit('common/SET_ISLOADING', true)
    if(config.params && config.params.action == 'getCurrentUserInfo' || config.params && config.params.action == 'getUserMoney' || config.params && config.params.action == 'getChildren'){
      store.commit('common/SET_ISLOADING', false)
    }
    if(config.method=='post'){
      config.data = {
        ...config.data,
        terminal_id: 1,
        _t: Date.parse(new Date())/1000,
      }
      if(process.env.NODE_ENV == 'production'){

      }else{
        config.data.token =  VueCookie.get('USERTOKEN')
        config.data.debug = 1
      }
    }else if(config.method=='get'){
      if(!config.params){
        config.params = {}
      }
      config.params = {
        terminal_id: 1,
        _t: Date.parse(new Date())/1000,
        ...config.params
      }
      if(process.env.NODE_ENV == 'production'){

      }else{
        config.params.token =  VueCookie.get('USERTOKEN')
        config.params.debug = 1
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
// http response 拦截器

axios.interceptors.response.use(
  response => {
    setTimeout(() => {
      store.commit('common/SET_ISLOADING', false)
    }, 200)
    if(response.status == 200 || response.status == 304){
      //未登录错误
      if(response.data.errno == 3004 || response.data.errno == 2012 ){
        VueCookie.delete('USERTOKEN')
        VueCookie.delete('USERTOKEN')
        store.commit('common/SET_ISLOGIN', false)
        window.location.href='/login'
      }
    }
    return response.data;
  },
  error => {
    store.commit('common/SET_ISLOADING', false)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // store.state.common.isLogin = false
              break;
        case 500:
          // store.state.common.isLogin = false
            break;
      }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.statusText)
    }
  });

axios.defaults.baseURL = baseUrl

Vue.use(VueAxios, axios)

// 注入路由组件
Vue.use(VueRouter)
// 定义路由参数
const router = new VueRouter({
  base: process.env.NODE_ENV == 'production'?"/":"/",
  routes,
  saveScrollPosition: false,
  mode: process.env.NODE_ENV == 'production'?'history':'history',
  strict: false
})

router.beforeEach((to, from, next) => {
    if(window.ISMOBILE){
      if(to.path.indexOf('register')>-1){
      }else{
        window.location.href = '//app.gw881.com'
      }
    }

    if(to.path.indexOf('withdraw')>-1){
      if(store.getters['common/canWithdrawal']){
        next()
      }else{
        router.app.$alert('禁止提现', '提示', {
          confirmButtonText: '确定'
        });
      }
    }else{
      NProgress.start();
      next()
    }
  // if(!store.state.common.getters.canWithdrawal){
    // }



});

router.afterEach(transition => {
    NProgress.done();
});

router.afterEach((to, from, next) => {
  // window.scrollTo(0, 0);
})

const Bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  data:{
    Bus
  }
})


Date.prototype.Format = function(fmt) {
  fmt = fmt || "yyyy-MM-dd HH:mm:ss"
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
