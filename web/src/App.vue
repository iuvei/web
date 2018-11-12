<template>
  <div class="app">
    <common-header v-if="showTop"></common-header>
    <!--<keep-alive>-->
      <router-view @eventFromChild="setDataFromChild"></router-view>
    <!--</keep-alive>-->
    <common-footer v-if="showTop"></common-footer>
    <transition name="el-fade-in-linear">
      <div class="v-modal" v-if="showModal"></div>
    </transition>
    <div class="loading" v-if="isLoading">
      <div class="loading-container">
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
        <p>请求中...</p>
      </div>
    </div>

  </div>
</template>

<script>
import CommonHeader from  './components/CommonHeader'
import CommonFooter from  './components/CommonFooter'


import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name: 'app',
  components:{
    CommonHeader,
    CommonFooter
  },
  data(){
    return {
      showTop: true,
      showModal: false,
      userTimer: null,
    }
  },
  computed:{
    ...mapState('common',['isLogin','userInfo','isLoading','windowScrollTop']),
    ...mapGetters('common',['isShowContractAgree','isShowSalaryAgree'])
  },
  watch:{
    gameIframeLink: function(curVal,oldVal){
      this.$refs.iframeGame.contentWindow.location.replace(curVal)
    },
    isShowContractAgree: function(val){
      if(val){
        this.$confirm('您有一个契约分红需要签订,是否前往签订?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.$router.push('/account/shadow/contract')
        }).catch(() => {
        });
      }
    },
    isShowSalaryAgree: function(val){
      if(val){
        this.$confirm('您有一个契约日工资需要签订,是否前往签订?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.$router.push('/account/shadow/salary')
        }).catch(() => {
        });
      }
    },
    'userInfo.is_change_pwd': function(val){
      if(val==1){
        this.$confirm('为了您的账号安全，请修改登录密码', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false
        }).then(() => {
          this.$router.push('/account/shadow/password')
        }).catch(() => {
          this.$router.push('/account/shadow/password')
        });
      }
    },
    showModal: function(val){
      if(val){
        document.documentElement.style='height:100%;overflow:hidden;'
        this.SET_WINDOW_SCROLLTOP(document.documentElement.scrollTop)
        document.documentElement.scrollTop = 0;
      }else{
        document.documentElement.style=''
        document.documentElement.scrollTop = this.windowScrollTop
      }
    }
  },
  methods:{
    setDataFromChild(data){
      this.showTop = data
    },
    ...mapActions('common',['getUserInfo','getUserMoney']),
    ...mapMutations('common',['SET_ISLOGIN','SET_ISLOADING','SET_WINDOW_SCROLLTOP','SET_SERVICE_URL'])
  },
  beforeRouteEnter(to,from,next){
    if (to.matched.some(record => record.meta.noRequiresAuth)) {
      next(vm=>{
        clearInterval(vm.userTimer)
      })
    } else {
      next(vm=>{
        if(vm.userInfo.is_change_pwd){
          if(path.indexOf('password')> -1){
          }else{
            vm.$confirm('为了您的账号安全，请修改登录密码', '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              showCancelButton: false
            }).then(() => {
              vm.$router.push('/account/shadow/password')
            }).catch(() => {
              vm.$router.push('/account/shadow/password')
            });
          }
        }

        var path = to.path
        if(path.indexOf('shadow')> -1){
          vm.showModal = true
        }else {
          vm.showModal = false
        }

        setTimeout(()=>{
          if(vm.$cookie.get('USERTOKEN') && vm.$cookie.get('USERTOKEN') != ''){
            vm.SET_ISLOGIN(true)
            if(!vm.userTimer){
              vm.userTimer = setInterval(()=>{
                vm.getUserMoney()
              },1000*10)
            }
          }else{
            clearInterval(vm.userTimer)
            vm.SET_ISLOGIN(false)
            vm.$router.replace('/login')
          }
        },50)

      })

    }
  },
  beforeRouteUpdate(to, from, next){

    var path = to.path

    //强制修改密码
    if(this.userInfo.is_change_pwd){
      if(path.indexOf('password')> -1){
      }else{
        this.$confirm('为了您的账号安全，请修改登录密码', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false
        }).then(() => {
          this.$router.push('/account/shadow/password')
        }).catch(() => {
          this.$router.push('/account/shadow/password')
        });
      }
    }


    if(path.indexOf('shadow')> -1){
      this.showModal = true
    }else {
      this.showModal = false
    }
    if (to.matched.some(record => record.meta.noRequiresAuth)) {
      clearInterval(this.userTimer)
    } else {
      setTimeout(()=>{
        if(this.$cookie.get('USERTOKEN') && this.$cookie.get('USERTOKEN') != ''){
          this.SET_ISLOGIN(true)
          if(!this.userTimer){
            this.userTimer = setInterval(()=>{
              this.getUserMoney()
            },1000*10)
          }
        }else{
          clearInterval(this.userTimer)
          this.SET_ISLOGIN(false)
          this.$router.replace('/login')
        }
      },50)

    }


    next()
  },
  mounted(){
    if(this.$cookie.get('USERTOKEN') && this.$cookie.get('USERTOKEN') != ''){
      this.SET_ISLOGIN(true)
      this.getUserInfo()
    }
  },
  created(){
    this.axios.get('/service',{params:{
        action: 'getClientServices',
      }}).then((data)=>{
        this.SET_SERVICE_URL(data.data[0].script)
    })
  },
  activated(){

  }
}
</script>

<style lang="scss">
@import 'scss/global';
@import "scss/module.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
.app {
}
.v-modal {
  z-index: 997;
}

</style>
