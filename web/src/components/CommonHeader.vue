<template>
  <section class="components-header">
    <div class="top-bar">
      <div class="container clear">
        <ul class="link-list">
          <li><span>{{ date+ '  '+ time}}</span></li>
          <li><a href="http://vip.mf8.vip" target="_blank"><span class="iconfont icon-diamond"></span>关于我们</a></li>
          <li><a href="javascript:;"><span class="iconfont icon-safe"></span>防劫持教程</a></li>
          <li><a href="/static/html/speed.html" target="_blank"><span class="iconfont icon-roulette"></span>测速中心</a></li>
          <li><span style="font-size: 16px;" class="iconfont icon-speaker"></span></li>
        </ul>
        <ul class="link-list right">

          <li><router-link to="/account/shadow/message?type=letter"><el-badge  :max="99" :value="unreadMessage" class="self-badge"><span class="iconfont icon-envelope"></span>站内信</el-badge></router-link></li>
          <li><span  class="iconfont icon-elegant-lady"></span>余额：{{userInfo.available}} <i title="刷新" :class="buttonClass" @click="refreshMoney"  class="big-button"></i></li>
          <li><span class="iconfont icon-purse"></span><router-link to="/account/shadow/deposite">充值</router-link>|<router-link to="/account/shadow/withdraw">提现</router-link></li>
          <li><a href="javascript:;" @click="openService"><span class="iconfont icon-customer-service"></span>客服</a></li>
          <li><a href="javascript:;" @click="logout"><span style="font-size: 24px;" class="iconfont icon-exit"></span>退出</a></li>
        </ul>
      </div>
    </div>
    <!--一级导航-->
    <header class="header">
      <div class="container clear">
        <div class="logo"></div>
        <ul class="menu-list">
          <li>
            <router-link to="/home">
              <span class="iconfont icon-house-outline"></span>首页
            </router-link>
          </li>
        </ul>
        <ul class="menu-list" @mouseenter="setMenu(true)" @mouseleave="setMenu(false)">
          <li>
            <a href="javascript:;" @mouseenter.stop="setSubMenu('lottery')">
              <span class="i confont icon-two-billiards-balls"></span>彩票
            </a>
          </li>
          <li>
            <a href="javascript:;" @mouseenter.stop="setSubMenu('slot')">
              <span class="iconfont icon-slot"></span>电子游戏
            </a>
          </li>
          <li>
            <a href="javascript:;" @mouseenter.stopr="setSubMenu('chess')">
              <span class="iconfont icon-chess"></span>棋牌娱乐
            </a>
          </li>
          <li>
            <a href="javascript:;" @mouseenter.stop="setSubMenu('casino')">
              <span class="iconfont icon-poker-table"></span>真人娱乐
            </a>
          </li>
          <!--二级导航-->
          <transition name="el-zoom-in-top">
            <div class="sub-header" v-show="showSubMenu">
              <div class="sub-header-bg">
                <transition name="el-zoom-in-center">
                  <div v-show="nowMenu == 'lottery'" class="bg-lottery"></div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-show="nowMenu == 'slot'" class="bg-slot"></div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-show="nowMenu == 'chess'" class="bg-chess"></div>
                </transition>
                <transition name="el-zoom-in-center">
                  <div v-show="nowMenu == 'casino'" class="bg-casino"></div>
                </transition>
              </div>
              <div class="sub-header-box">
                <!--彩票-->
                <div class="sub-header-content sub-header-lottery" style="margin-bottom: 20px;" v-show="nowMenu == 'lottery'">
                  <div class="lottery-series">
                    <h3 class="title-ssc">时时彩</h3>
                    <p>
                      <a v-for="item,key in menu.ssc" :href="baseUrl+ getLotteryNavObj(key,item) +'lottery='+ item.identifier" target="_blank">{{item.name}}</a>
                    </p>
                  </div>
                  <div class="lottery-series">
                    <h3 class="title-115">11选5</h3>
                    <p>
                      <a v-for="item,key in menu['11x5']" :href="baseUrl+ getLotteryNavObj(key,item) +'lottery='+ item.identifier" target="_blank">{{item.name}}</a>
                    </p>
                  </div>
                  <div class="lottery-series">
                    <h3 class="title-pk10">pk10</h3>
                    <p>
                      <a v-for="item,key in menu['pk10']" :href="baseUrl+ getLotteryNavObj(key,item) +'lottery='+ item.identifier" target="_blank">{{item.name}}</a>
                    </p>
                  </div>
                  <div class="lottery-series">
                    <h3 class="title-k3">快三</h3>
                    <p>
                      <a v-for="item,key in menu['k3']" :href="baseUrl+ getLotteryNavObj(key,item) +'lottery='+ item.identifier" target="_blank">{{item.name}}</a>
                    </p>
                  </div>
                  <div class="lottery-series">
                    <h3 class="title-dpc">低频彩</h3>
                    <p>
                      <a v-for="item,key in menu['other']" :href="baseUrl+ getLotteryNavObj(key,item) +'lottery='+ item.identifier" target="_blank">{{item.name}}</a>
                    </p>
                  </div>
                  <div class="lottery-series">
                    <h3 class="title-kl10">快乐10分</h3>
                    <p>
                      <a v-for="item,key in menu['kl12']" :href="baseUrl+ getLotteryNavObj(key,item) +'lottery='+ item.identifier" target="_blank">{{item.name}}</a>
                    </p>
                  </div>
                  <!--<div class="lottery-series">-->
                    <!--<h3 class="title-pcdd">pc蛋蛋</h3>-->
                    <!--<p>-->
                      <!--<a href="">北京28</a>-->
                      <!--<a href="">加拿大28</a>-->
                      <!--<a href="">台湾28</a>-->
                      <!--<a href="">菲律宾28</a>-->
                    <!--</p>-->
                  <!--</div>-->
                </div>
                <!--电子游戏-->
                <div class="sub-header-content" v-show="nowMenu == 'slot'">
                  <ul class="game-menu-list menu-slot">
                    <li><a href="#"><span class="avatar"></span><span class="title">PT游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">MG游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">PNG游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">QT游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">AG游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">TTG游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">NT游戏</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">IM游戏</span></a></li>
                  </ul>
                </div>
                <!--棋牌娱乐-->
                <div class="sub-header-content" v-show="nowMenu == 'chess'">
                  <ul class="game-menu-list menu-chess">
                    <li><a href="#"><span class="avatar"></span><span class="title">开元棋牌</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">NA棋牌</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">Kgame棋牌</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">开发中</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">开发中</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">开发中</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">开发中</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">开发中</span></a></li>
                  </ul>
                </div>
                <!--真人娱乐-->
                <div class="sub-header-content" v-show="nowMenu == 'casino'">
                  <ul class="game-menu-list menu-casino">
                    <li><a href="#"><span class="avatar"></span><span class="title">AG真人</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">BBIN真人</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">EBET真人</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">SAG真人</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">正在开发</span></a></li>
                    <li><a href="#"><span class="avatar"></span><span class="title">正在开发</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </ul>
        <a class="download-btn right">
          <router-link to="/download" target="_blank">
            <span class="icon-monitor"></span>下载中心
          </router-link>
        </a>
        <ul class="menu-list right">
          <li>
            <router-link to="/account">
              <span class="iconfont icon-settings"></span>管理中心
            </router-link>
          </li>
          <li>
            <router-link to="/activity">
              <span class="iconfont icon-money"></span>优惠活动
            </router-link>
          </li>
          <li>
            <router-link to="/account/shadow/message">
              <span class="iconfont icon-marketing"></span>系统公告
            </router-link>
          </li>
        </ul>
      </div>

    </header>


  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'

  import {getGameMenu} from '../service/getData'
  export default {
    name: 'CommonHeader',
    components: {
    },
    data () {
      return {
        time: '',
        date: '',
        serviceTime: '加载中...',
        timerID: null,
        nowMenu: 'slot',
        showSubMenu: false,
        menu: {
          '11x5': {},
          'k3': {},
          'kl12': {},
          'other': {},
          'pk10': {},
          'ssc': {},
          'hot': {}
        },
        baseUrl: '/view/game',
        buttonClass: 'el-icon-refresh'
      }
    },
    watch:{
      getServiceTime(val){

      },
      isLogin(val){
        if(val){
          this.getGameMenu()
          this.getUnreadNum()
        }
      }
    },
    computed:{
      getServiceTime: function(){
        return this.$store.state.common.userInfo.signin_at
      },
      ...mapState('common',['isLogin','userInfo','unreadMessage','serviceUrl'])
    },
    methods: {
      ...mapMutations('common',['SET_ISLOGIN']),
      ...mapActions('common',['getUnreadNum','getUserInfo','getUserMoney']),
      refreshMoney(){
        this.buttonClass = 'el-icon-loading'
        this.getUserMoney().then(()=>{
          this.buttonClass = 'el-icon-refresh'
        })
      },
      getLotteryNavObj(id,obj) {
        var prefix = '/view/game'
        var result = ''
        switch(obj.series_id)
        {
          case 1:
            if(id == 12){
              result = prefix+'/ssc.shtml?'
            }else if(id == 26){
              result = prefix+'/mmc.shtml?'
            }else{
              result = prefix+'/ssc.shtml?'
            }
            break;
          case 2:
            if(id == 43){
              result = prefix+'/115mmc.shtml?'
            }else{
              result = prefix+'/11x5.shtml?'
            }
            break;
          case 3:
            if(id==4){
              result = prefix+'/3d.shtml?'
            }else if(id == 20){
              result = prefix+'/3d.shtml?'
            }else{
              result = prefix+'/3d.shtml?'
            }
            break;
          case 4:
            result = prefix+'/k3.shtml?'
            break;
          case 5:
            result = prefix+'/pk10.shtml?'
            break;
          case 6:
            break;
          case 7:
            result = prefix+'/kl8.shtml?'
            break;
          case 8:
            result = prefix+'/kl12.shtml?'
            break;
          case 9:
            result = prefix+'/klsf.shtml?'
            break;
          default:
        }
        return result
        var game = {
          '11x5':{
            url:prefix+'/11x5.shtml?',
            num_type:5
          },
          k3:{
            url:prefix+'/k3.shtml?',
            num_type:3
          },
          kl12:{
            url:prefix+'/kl12.shtml?',
            num_type:5
          },
          klsf:{
            url:prefix+'/klsf.shtml?',
            num_type:8
          },
          pk10:{
            url:prefix+'/pk10.shtml?',
            num_type:10
          },
          ssc:{
            url:prefix+'/ssc.shtml?',
            num_type:5
          },
          kl8:{
            url:prefix+'/kl8.shtml?',
            num_type:20
          },
          d3:{
            url:prefix+'/3d.shtml?',
            num_type:3
          },
          pl:{
            url:prefix+'/ssc.shtml?',
          },
          sport:{
            url:'',
            image:''
          },
          mmc:{
            url:prefix+'/mmc.shtml?',
          },
          pg115mmc:{
            url:prefix+'/115mmc.shtml?',
          }
        }

      },
      getGameMenu(){
        getGameMenu().then((data)=>{
          if(data.errno == 0){
            this.menu = {...data.data}
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      logout() {
        this.axios.get('/service',{
          params: {
            action: 'logout'
          }
        }).then((res) => {
          if (res.errno == 0) {
            this.$cookie.delete('USERTOKEN')
            this.SET_ISLOGIN(false)
            window.location.href="/login"
          } else {
            this.$alert(res.error, '退出失败', {
              confirmButtonText: '确定'
            });
          }
        }).catch((err) =>{
          this.$cookie.delete('USERTOKEN')
          this.SET_ISLOGIN(false)
          this.$router.replace('/login')
        })
      },
      setMenu(bool){
        this.showSubMenu = bool
      },
      setSubMenu(val){
        this.nowMenu = val
      },
      timer(time) {
        let _this = this
        let cd = time?new Date(time): new Date()
        if(this.timerID){
          clearINterval(this.timerID)
        }
        this.timerID = setInterval(updateTime, 1000);
        updateTime()
        function updateTime() {
          cd = new Date(cd.getTime()+1000)
          _this.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2)
          _this.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2)
        };
        function zeroPadding(num, digit) {
          var zero = '';
          for(var i = 0; i < digit; i++) {
            zero += '0';
          }
          return (zero + num).slice(-digit);
        }
      },
      openService(){
        window.open(this.serviceUrl,'_blank');
      }

    },
    created() {
    },
    activated(){
      this.timer()
    },
    mounted(){
      this.timer()
      if(this.isLogin){
        this.getGameMenu()
        this.getUnreadNum()

      }
    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables.scss';
  .components-header {
    margin-bottom: 10px;
    .top-bar {
      background: #fff;
      .container {
        border-bottom: 1px solid #f3f3f3;
        text-align: left;
      }
      .link-list {
        display: inline-block;
        vertical-align: middle;
        letter-spacing: 0;
        font-size: 0;
        line-height: 30px;

        li {
          display: inline-block;
          font-size: 12px;
          margin-right: 30px;
          color: #212121;
          a {
            display: inline-block;
            vertical-align: middle;
            line-height: 30px;
            cursor: pointer;
            .iconfont{
              font-size: 16px;
              line-height: 13px;
              margin-right: 4px;
              vertical-align: middle;
            }
            &.active,&:hover {
                color: #19abc0;
              cursor: pointer;
            }
          }
        }
      }
    }
    .header {
      background: #fff;
      padding: 35px 0;
      position: relative;
      box-shadow: 0 0 4px #e4e3e9;
      .container {
        text-align: left;
        position: relative;
      }
      .logo {
        position: absolute;
        left: 50%;
        background: url(../assets/common/logo.png) center center no-repeat;
        width: 85px;
        height: 112px;
        margin-left: -42px;
        top: -43px;
      }
      .menu-list{
        display: inline-block;
        letter-spacing: 0;
        font-size: 0;
        >li{
          cursor: pointer;
          display: inline-block;
          line-height: 14px;
          height: 40px;
          font-size: 14px;
          margin-right: 30px;
          position: relative;
          a{
            display: block;
            width: 100%;
            height: 100%;
          }
          &.active,&:hover{
            a{
              color: #19abc0;
            }
            &:after {
              content: "";
              display: block;
              width: 100%;
              position: absolute;
              bottom: 0;
              border-bottom: 4px solid #56b9ff;
            }
          }
          .iconfont {
            font-size: 18px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }

      }

      .download-btn {
        @include linear-gradient(to right,#49b4ff, #31cdff);
        box-shadow: 0 0 10px rgba(49,170,255,.3);
        color: #fff;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 700;
        margin-top: -10px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        span {
          font-size: 20px;
          margin-right: 6px;
        }
        a {
          color: #fff;
        }
        &:hover {
          box-shadow: 0 0 2px rgba(49,170,255,.6);
        }
        &:active {
          box-shadow: none;
        }
      }
    }
    .sub-header {
      border-top: 1px solid #e9f6ff;
      width: 1920px;
      left: 50%;
      margin-left: -960px;
      background: #fff;
      position: absolute;
      top: 43px;
      z-index: 995;
      .sub-header-bg {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        background: url(../assets/common/bg-lottery2.jpg) no-repeat center top;
        z-index: 1;
        .bg-lottery {
          background: url(../assets/common/bg-lottery.png) no-repeat;
          width: 476px;
          height: 100%;
          right: 50%;
          position: absolute;
          margin-right: -960px;
        }
        .bg-slot {
          background: url(../assets/common/bg-slot.png) no-repeat;
          width: 1488px;
          height: 279px;
          left: 50%;
          position: absolute;
          margin-left: -700px;
        }
        .bg-lottery {
          background: url(../assets/common/bg-lottery.png) no-repeat;
          width: 476px;
          height: 402px;
          right: 50%;
          position: absolute;
          margin-right: -960px;
        }
        .bg-casino {
          background: url(../assets/common/bg-casino.png) no-repeat;
          width: 1507px;
          height: 310px;
          left: 50%;
          position: absolute;
          margin-left: -780px;
        }
        .bg-chess{
          background: url(../assets/common/bg-chess.png) no-repeat;
          width: 1359px;
          height: 306px;
          left: 50%;
          position: absolute;
          margin-left: -760px;
        }
      }

      .sub-header-box {
        width: 1400px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
        min-height: 279px;
      }

      .sub-header-lottery {
        border: 1px solid #c9c9c9;
        border-bottom: 0;
        width: 1185px;
        margin-top: 20px;
      }
      .lottery-series {
        border-bottom: 1px solid #c9c9c9;
        position: relative;
        h3 {
          padding-top: 15px;
          width: 90px;
          display: inline-block;
          vertical-align: top;
          background-repeat: no-repeat;
          text-indent: -999em;
          background-position: 10px 17px;
          min-height: 30px;
          height: 100%;
          $list: title-115,title-dpc,title-k3,title-kl10,title-pcdd,title-pk10,title-ssc;
          @each $item in $list {
            &.#{$item} {
              background-image: url('../assets/common/' + $item + '.png');
            }
          }
        }
        p {
          padding-top: 15px;
          display: inline-block;
          width: calc(100% - 100px);
          a {
            display: inline-block;
            line-height: 14px;
            font-size: 14px;
            height: 32px;
            margin: 0 30px 0 0;
            position: relative;
            &:after{
              content:'';
              width: 100%;
              height: 4px;
              background: #56b9ff;
              position: absolute;
              bottom: 0;
              left: 0;
              display: none;
            }
            &:hover{
              color: #56b9ff;
              &:after{
                display: block;
              }
            }
          }
        }
      }
      .game-menu-list {
        width: 700px;
        margin-left: 240px;
        padding-top: 40px;
        li {
          padding: 13px 15px;
          min-width: 176px;
          box-sizing: border-box;
          position: relative;
          display: inline-block;
          margin-bottom: 10px;
          margin-right:0px;
          a {
            display: block;
            position: relative;
            z-index: 2;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            .avatar{
              width: 63px;
              height: 63px;
            }
            .title{
              font-family: 'FangSong','STSong';
              font-size: 16px;
              padding-left: 6px;
            }
            &:hover {
              .title{
                color: #333;

              }
            }
          }
          &:after {
            content: '';
            display: block;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0 0 15px rgba(0,0,0,.3);
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: scale(.95);
            transition: all 0.3s;
          }
          &:hover{
            &:after{
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      }

    }

    .game-menu-list.menu-slot {
      height: 279px;
      width: 780px;
      margin-left: 280px;
      .avatar{
        background-image: url(../assets/common/menu-slot.png);
        background-repeat: no-repeat;
      }
      li {
        &:nth-child(1) .avatar{
          background-position: left top;
        }
        &:nth-child(2) .avatar{
          background-position: -179px top;
        }
        &:nth-child(3) .avatar{
          background-position: -340px top;
        }
        &:nth-child(4) .avatar{
          background-position: -506px top;
        }
        &:nth-child(5) .avatar{
          background-position: left -107px;
        }
        &:nth-child(6) .avatar{
          background-position: -179px -107px;
        }
        &:nth-child(7) .avatar{
          background-position: -340px -107px;
        }
        &:nth-child(8) .avatar{
          background-position: -506px -107px;
        }
      }
    }

    .game-menu-list.menu-chess {
      height: 306px;
      width: 780px;
      margin-left: 280px;
      .avatar{
        background-image: url(../assets/common/menu-chess.png);
        background-repeat: no-repeat;
      }
      li {
        &:nth-child(1) .avatar{
          background-position: left top;
        }
        &:nth-child(2) .avatar{
          background-position: -179px top;
        }
        &:nth-child(3) .avatar{
          background-position: -340px top;
        }
        &:nth-child(4) .avatar{
          background-position: -506px top;
        }
        &:nth-child(5) .avatar{
          background-position: left -107px;
        }
        &:nth-child(6) .avatar{
          background-position: -179px -107px;
        }
        &:nth-child(7) .avatar{
          background-position: -340px -107px;
        }
        &:nth-child(8) .avatar{
          background-position: -506px -107px;
        }
      }
    }

    .game-menu-list.menu-casino {
      height: 310px;
      width: 580px;
      margin-left: 340px;
      .avatar{
        background-image: url(../assets/common/menu-casino.png);
        background-repeat: no-repeat;
      }
      li {
        &:nth-child(1) .avatar{
          background-position: left top;
        }
        &:nth-child(2) .avatar{
          background-position: -210px top;
        }
        &:nth-child(3) .avatar{
          background-position: -398px top;
        }
        &:nth-child(4) .avatar{
          background-position: left -107px;
        }
        &:nth-child(5) .avatar{
          background-position: -210px -107px;
        }
        &:nth-child(6) .avatar{
          background-position: -398px -107px;
        }
      }
    }
    .big-button {
      font-size: 18px;
      color: #0A94E3;
      vertical-align: middle;
    }

  }

</style>
<style lang="scss">
  .self-badge {
    .el-badge__content.is-fixed{
      top: 9px !important;
      right: 2px;
    }
  }
</style>
