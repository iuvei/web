<template>
  <section class="page-home">
    <div class="banner-wrap">
      <slider>
        <slider-item><img src="../../assets/home/banner.png"></slider-item>
        <slider-item><img src="../../assets/home/banner2.png"></slider-item>
        <slider-item><img src="../../assets/home/banner3.png"></slider-item>
      </slider>
      <div class="user-wrap">
        <div class="top">
          <div class="user-card">
            <div class="clear">
              <dl>
                <dt>
                  <img src="../../assets/account/user-head.png">
                </dt>
                <dd>{{userInfo.username}}</dd>
              </dl>
              <div class="card-info">
                <p class="greetings">Welcome！欢迎您！</p>
                <p>账户余额：</p>
                <p class="balance">￥<span>{{userInfo.available}}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="card-link">
            <router-link to="/account/shadow/deposite"><span class="charge"></span>充值</router-link>
            <router-link to="/account/shadow/withdraw"><span class="withdraw"></span>提现</router-link>
          </div>
          <div class="customize-link">
            <h3><span class="iconfont icon-dice"></span><span class="title">最近玩过的游戏</span></h3>
            <ul class="clear">
              <li v-for="item,key in recentGame">
                <a :href="baseUrl+ getLotteryNavObj(item.lotteryId,item) +'lottery='+ item.identifier" target="_blank">
                  <div class="img"><img :src="'/static/images/recently/m_'+ item.lotteryId +'.png'"></div>
                </a>
              </li>
            </ul>
            <p v-if="Object.keys(recentGame).length == 0">最近还没有玩过游戏哦！</p>
          </div>
        </div>
        <div class="bottom">
          <h3><span class="iconfont icon-scan"></span><span class="title">扫一扫手机APP</span></h3>
          <!--<p><span class="qq"></span>客服QQ:</p>-->
          <img src="../../assets/home/download_qr.png">
        </div>

      </div>
    </div>
    <div class="middle-bg">
      <div class="container">
        <div class="function">
          <ul class="game-list">
            <li v-for="item,key in hotGame">
              <div class="list-background">
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
              <div class="item-content">
                <a :href="baseUrl+ getLotteryNavObj(item.lotteryId,item) +'lottery='+ item.identifier" target="_blank">
                  <h3>热门游戏</h3>
                  <p class="img-box"><img :src="'/static/images/hot/hot_'+ item.lotteryId +'.png'"></p>
                  <p>{{item.name}}</p>
                </a>
              </div>
            </li>
            <li v-for="item,key in suggestGame">
              <div class="list-background">
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
              <div class="item-content">
                <a :href="baseUrl+ getLotteryNavObj(item.lotteryId,item) +'lottery='+ item.identifier" target="_blank">
                  <h3 class="suggest">推荐游戏</h3>
                  <p class="img-box"><img :src="'/static/images/hot/hot_'+ item.lotteryId +'.png'"></p>
                  <p>{{item.name}}</p>
                </a>
              </div>
            </li>

          </ul>
          <div class="function-right">
            <div class="activity">
              <div class="activity-wrap">
                <div class="activity-background">
                  <div class="shadow"></div>
                  <div class="shadow"></div>
                </div>
                <div class="activity-link">
                  <img src="../../assets/home/activity.png">
                </div>
              </div>
              <div class="title"><span class="el-icon-star-on"></span>热门活动</div>
            </div>
            <div class="leader-boards">
              <div class="boards-wrap">
                <h3>排行榜</h3>
                <transition-group
                    name="prize-list"
                    tag="ul"
                  >
                  <li v-for="item in nowRankList" :key="item">{{rankListText[item]}}</li>
                </transition-group>
              </div>

            </div>
          </div>
        </div>
        <div class="category-list">
          <ul class="clear">
            <li>
              <div class="list-background">
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
              <div class="item-content item-lottery">
                <p>
                  <span class="title">彩票<b>LOTTERY</b></span>
                  <b>/</b>
                  <span>多种玩法 任君选择</span>
                </p>
              </div>
            </li>
            <li>
              <div class="list-background">
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
              <div class="item-content item-chess">
                <p>
                  <span class="title">棋牌游戏</span>
                  <b>/</b>
                  <span>人气之地 更多选择</span>
                </p>
              </div>
            </li>
            <li>
              <div class="list-background">
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
              <div class="item-content item-slot">
                <p>
                  <span class="title">电子游戏</span>
                  <b>/</b>
                  <span>拉爆奖池 以小博大</span>
                </p>
              </div>
            </li>
            <li>
              <div class="list-background">
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
              <div class="item-content item-casino">
                <p>
                  <span class="title">真人娱乐</span>
                  <b>/</b>
                  <span>美女互动 如临现场</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div class="bottom-bg">
      <div class="container">
        <div class="advantage">
          <h2>我们的优势</h2>
          <div class="block-wrap clear">
            <div class="advantage-block block-big">
              <img src="../../assets/home/left.png">
            </div>
            <div class="advantage-block block1">
              <h3><span class="block-shadow"><i class="icon-font icon-money-bag" ></i></span><span class="title">资金雄厚</span></h3>
              <p>双集团稳定运营多年，稳定的资金管控，强大的现金流，100%兑现赔付，保您畅玩无忧。</p>
            </div>
            <div class="advantage-block block2">
              <h3><span class="block-shadow block2"><i class="icon-font icon-electricity" ></i></span><span class="title">充提快速</span></h3>
              <p>支持中国大陆15家主流银行转账充值，15家银行快捷充值，19家银行银联快捷充值，支付宝、微信支付、财付通充值等主流充值渠道，实现最为快捷、便利的充提体验。</p>
            </div>
            <div class="advantage-block block3">
              <h3><span class="block-shadow block3"><i class="icon-font icon-weight-balance" ></i></span><span class="title">硬件开奖</span></h3>
              <p>自主彩使用瑞士超精密硬件Quantis Random NumberGenerator测量记录完全不可预测的光子自然衰变生成开奖数据，真正做到公平公正。</p>
            </div>
            <div class="advantage-block block4">
              <h3><span class="block-shadow block4"><i class="icon-font icon-shield" ></i></span><span class="title">程序安全</span></h3>
              <p>100%自主研发，通过Global Trust国际安全认证，采用AES 256位加密，为您提供顶级的游戏体验。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Slider from  '../../components/home/Slider'
  import SliderItem from  '../../components/home/SliderItem'
  import SelectMenu from  '../../components/home/SelectMenu'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import {getGameMenu} from '../../service/getData'

  import  Velocity from 'velocity-animate'
  export default {
    name: 'home',
    components: {
      Slider,
      SliderItem,
      SelectMenu
    },
    data() {
      return {
        hotGame: [],
        suggestGame: [
          {name: "菲律宾秒秒彩", identifier: "SSCMMC", is_third: 0, series_id: 1,lotteryId: 26},
          {name: "菲律宾分分彩", identifier: "1FSSC", is_third: 0, series_id: 1,lotteryId: 13},
          {name: "菲律宾3分彩", identifier: "3FSSC", is_third: 0, series_id: 1,lotteryId: 16},
          {name: "菲律宾极速PK10", identifier: "DJ90S", is_third: 0, series_id: 5,lotteryId: 19}
        ],
        recentGame: [],
        rankListText: [],
        rankListNumber: [],
        nowRankList:[],
        pointer: 0,
        length: 15,
        rankList: [],
        demoList:[1,2,3,4,5,6,7,8,9],
        baseUrl: '/view/game'
      }
    },
    computed:{
      ...mapState('common',['userInfo','isLogin']),

    },
    methods: {
      ...mapActions('common',['getUserInfo']),
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
      },
      getGameMenu(){
        getGameMenu().then((data)=>{
          if(data.errno == 0){
            // this.hotGame = {...data.data.hot}

            var hot = {...data.data.hot}
            Object.keys(hot).map((value,key,arr)=>{
              if(key<8){
                hot[value].lotteryId = value
                this.hotGame.push(hot[value])
              }
            })


            var obj = {...data.data.recently}
            Object.keys(obj).map((value,key,arr)=>{
              if(key<8){
                obj[value].lotteryId = value
                this.recentGame.push(obj[value])
              }
            })
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getPrizeList(){
        this.axios.get('/service?action=getPrizeList',{params:{
            count: 50
        }}).then((data)=>{
          if(data.errno == 0){

            var obj = data.data
            this.rankListText = []
            obj.map((value,index,array)=>{
              this.rankListText.push(value.username + '赢得'+ this.fAmount(value.prize) )
              this.rankListNumber.push(index)
            })
            this.nowRankList = this.rankListNumber.slice(0,this.length)
            if(this.rankListNumber.length>this.length){
              this.pointer = this.length-1
              this.startList()
            }
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      fAmount: function(s, n){
        n = n > 0 && n <= 20 ? n : 2;
        if(!s){
          return 0
        }
        if(isNaN(Number(s))){
          return s
        }
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "", i;
        for(i = 0; i < l.length; i ++ ) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },
      computedList() {
        this.nowRankList.splice(0,1)
        setTimeout(()=>{
          this.nowRankList.splice(this.nowRankList.length,0,this.rankListNumber.slice(this.pointer,this.pointer+1)[0])
        },1000)
      },
      startList(){
        setInterval(()=>{
          this.pointer++
          if(this.pointer>=this.rankListNumber.length){
            this.pointer = 0
          }
          this.computedList()
        },2000)
      },

    },
    created() {
      this.getGameMenu()
      this.getPrizeList()
    },
    mounted(){
      this.getUserInfo()
    },
    beforeDestroy(){

    }

  }
</script>
<style lang="scss" scoped>
  .page-home {
    .middle-bg {
      background: url(../../assets/home/bg.jpg) no-repeat center top;
    }
    .bottom-bg {
      background: url(../../assets/home/bg2.jpg) no-repeat center top;
      height: 853px;
    }
    .banner-wrap {
      position: relative;
      .clear {
        zoom: 1;
      }
    }
    .user-wrap{
      width: 310px;
      height: 580px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      background: #fff;
      position: absolute;
      top: 40px;
      left: 50%;
      margin-left: -660px;
      z-index: 5;
      .title {
        position: relative;
        display: inline-block;
        font-size: 14px;
        line-height: 26px;
        &:after{
          content: '';
          display: block;
          width: 8px;
          height: 1px;
          position: absolute;
          left: 50%;
          margin-left: -4px;
          bottom: 0px;
          background: #212121;
        }
      }
      .top{
        background: url(../../assets/home/top-bg.png) no-repeat center top;
        height: 150px;
        padding: 40px 35px 0 48px;
        img {
          width: 66px;
        }
        dl {
          width: 66px;
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          dd{
            font-size: 14px;
            font-weight: 700;
            color: #fff;
          }
        }
        .card-info {
          float: right;
          width: 150px;
          p {
            font-size: 12px;
            color: #fff;
            line-height: 24px;
          }
          .greetings {
            border-bottom: 1px solid #ffd7cc;
            line-height: 24px;
            font-size: 14px;
          }
          .balance {
            padding-top: 5px;
            span {
              font-size: 24px;
              color: #fff;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: inline-block;
              overflow: hidden;
              width: 134px;
            }
          }
        }
      }
      .middle {
        .card-link {
          height: 90px;
          a {
            display: block;
            float: left;
            width: 50%;
            text-align: center;
            height: 90px;
            line-height: 30px;
            color: #8c5fa3;
            background: #fff0e9;
            position: relative;
            padding-top: 17px;
            span{
              display: block;
              margin: 0 auto;
              background-repeat: no-repeat;
              height: 35px;
              width: 48px;
              background-position: center center;
              &.charge{
                background-image: url(../../assets/home/icon-charge-png.png);
              }
              &.withdraw{
                background-image: url(../../assets/home/icon-withdraw-png.png);
              }
            }
            &:first-child{
              background: #f2ebf5;
            }
            &:after{
              content: '';
              display: block;
              width: 8px;
              height: 1px;
              position: absolute;
              left: 50%;
              margin-left: -4px;
              bottom: 10px;
              background: #8c5fa3;
            }
          }

        }
        .customize-link{
          padding: 12px 20px;
          height: 220px;
          h3{
            padding-bottom: 20px;
          }
          .title {
            margin-left: 5px;
          }
          ul {
            margin-right: -20px;
            li {
              width: 62px;
              margin-bottom: 5px;
              margin-right: 4px;
              float: left;
              text-align: center;
              .img {
                width: 62px;
                height: 62px;
                img {
                  width: 62px;
                  height: 62px;
                  display: inline-block;
                }
              }
              p{
                font-size: 11px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space:nowrap;
              }
            }
          }
        }
      }

      .bottom{
        padding: 0 20px;
        position: relative;
        h3{
          padding-bottom: 10px;
        }
        .title {
          margin-left: 6px;
        }
        img {
          width: 110px;
          height: 110px;
          position: absolute;
          top: 5px;
          right: 16px;
        }
        p{
          color: #8c5fa3;
          line-height: 24px;
          font-size: 12px;
          .qq{
            display: inline-block;
            vertical-align: middle;
            background: url(../../assets/home/qq.png) no-repeat;
            width: 13px;
            height: 15px;
            margin-right: 5px;

          }
        }
      }
    }

    .function {
      height: 740px;
      padding-top: 96px;
      .game-list {
        float: left;
        width: 820px;
        li {
          width: 205px;
          height: 287px;
          text-align: center;
          float: left;
          position: relative;
          .list-background {
            width: 100%;
            height: 250px;
            position: absolute;
            left: 0;
            top: 37px;
            .shadow {
              width: 100%;
              height: 100%;
              background: #fff;
              position: absolute;
              -webkit-transition: all .2s ease-in-out;
              -moz-transition: all .2s ease-in-out;
              transition: all .2s ease-in-out;
              opacity: 0;
              box-shadow: 0 0 30px rgba(56,59,162,.2);
              &:first-child{
                top: -94px;
                transition-delay: 150ms;
                -moz-transition-delay: 150ms;
                -webkit-transition-delay: 150ms;
                transform:scale(.65);
                -moz-transform:scale(.65);
                -webkit-transform:scale(.65);
              }
              &:nth-child(2){
                top: -77px;
                transition-delay: 75ms;
                -moz-transition-delay: 75ms;
                -webkit-transition-delay: 75ms;
                transform:scale(.7);
                -moz-transform:scale(.7);
                -webkit-transform:scale(.7);
              }
              &:nth-child(3){
                top: -50px;
                transform:scale(.85);
                -moz-transform:scale(.85);
                -webkit-transform:scale(.85);
              }
            }
          }
          &:hover{
            .list-background{
              .shadow{
                &:first-child{
                  top: -74px;
                  opacity: 0.7;
                  transform:scale(0.7);
                  -moz-transform:scale(0.7);
                  -webkit-transform:scale(0.7);
                }
                &:nth-child(2){
                  top: -37px;
                  opacity: 0.8;
                  transform:scale(0.85);
                  -moz-transform:scale(0.85);
                  -webkit-transform:scale(0.85);
                }
                &:nth-child(3){
                  top: 0;
                  opacity: 1;
                  transform:scale(1);
                  -moz-transform:scale(1);
                  -webkit-transform:scale(1);
                }
              }
            }
          }
          .item-content {
            @extend .list-background;
            padding-top: 20px;
            .img-box {
              margin-top: 20px;
              width: 100%;
              height: 112px;
              line-height: 112px;
              img{
                display: inline-block;
                vertical-align: middle;
              }
            }
            h3{
              display: inline-block;
              height: 20px;
              width: 76px;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              font-size: 12px;
              text-align: center;
              background: #e9313f;
              color: #fff;
              line-height: 20px;
              box-shadow: 0 2px 10px rgba(255,0,0,.4);
              &.suggest{
                background: #4386d8;
                box-shadow: 0 2px 10px rgba(44,125,206,.4);
              }
              &.self-employed{
                background: #c27baa;
                box-shadow: 0 2px 10px rgba(194,123,170,.4);
              }
            }
            p {
              color: #2d212b;
              line-height: 30px;
            }
          }

        }
      }
      .function-right {
        width: 519px;
        padding-top: 100px;
        float: right;
        .activity{
          width: 310px;
          height: 399px;
          float: left;
          background: #fff;
          position: relative;
          .activity-wrap{
            width: 100%;
            height: 100%;
            position: relative;
            .activity-background{
              position: relative;
              width: 358px;
              height: 100%;
              left: -48px;
              top: -48px;
              .shadow{
                width: 100%;
                height: 100%;
                background: #fff;
                position: absolute;
                -webkit-transition: all .2s ease-in-out;
                -moz-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
                box-shadow: 0 0 30px rgba(56,59,162,.2);
                &:first-child{
                  top: -100px;
                  opacity: .7;
                  transform:scale(.7);
                  -moz-transform:scale(.7);
                  -webkit-transform:scale(.7);
                }
                &:nth-child(2){
                  top: -50px;
                  opacity: .85;
                  transform:scale(.85);
                  -moz-transform:scale(.85);
                  -webkit-transform:scale(.85);
                }
              }
            }
            .activity-link {
              box-shadow: 0 0 30px rgba(56,59,162,.2);
              position: absolute;
              width: 358px;
              height: 400px;
              left: -48px;
              top: -48px;
            }
          }
          .title {
            height: 48px;
            line-height: 48px;
            padding-left: 10px;
            bottom: 0;
            position: absolute;
            span{
              margin-right: 6px;
            }
          }
        }
        .leader-boards{
          background: url(../../assets/home/leaderboards.png) no-repeat;
          width: 207px;
          height: 399px;
          padding-top: 19px;
          float: left;
          .boards-wrap{
            background: rgba(6,35,54,.7);
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            width: 167px;
            height: 363px;
            color: #fff;
            margin: 0 auto;
            h3{
              text-align: center;
              font-size: 18px;
              line-height: 46px;
              padding-bottom: 15px;
              background: url(../../assets/home/badge.png) no-repeat center bottom;
            }
            ul{
              padding-left: 10px;
              line-height: 28px;
              li{
                font-size: 12px;
                line-height: 20px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
    .category-list{
      height: 420px;
      ul{
        margin-right: - 70px;
        li {
          width: 300px;
          height: 290px;
          text-align: center;
          float: left;
          position: relative;
          margin-right: 66px;
          -webkit-transition: all .2s ease-in-out;
          -moz-transition: all .2s ease-in-out;
          transition: all .2s ease-in-out;
          cursor: pointer;
          .list-background {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 37px;

            .shadow {
              width: 100%;
              height: 100%;
              background: #fff;
              position: absolute;
              -webkit-transition: all .2s ease-in-out;
              -moz-transition: all .2s ease-in-out;
              transition: all .2s ease-in-out;
              opacity: 0;
              box-shadow: 0 0 30px rgba(56,59,162,.2);
              &:first-child{
                top: -94px;
                transition-delay: 150ms;
                -moz-transition-delay: 150ms;
                -webkit-transition-delay: 150ms;
                transform:scale(.65);
                -moz-transform:scale(.65);
                -webkit-transform:scale(.65);
              }
              &:nth-child(2){
                top: -77px;
                transition-delay: 75ms;
                -moz-transition-delay: 75ms;
                -webkit-transition-delay: 75ms;
                transform:scale(.7);
                -moz-transform:scale(.7);
                -webkit-transform:scale(.7);
              }
            }
          }
          &:hover{
            transform:scale(1.05);
            -moz-transform:scale(1.05);
            -webkit-transform:scale(1.05);
            .list-background{
              .shadow{
                &:first-child{
                  top: -74px;
                  opacity: 0.7;
                  transform:scale(0.7);
                  -moz-transform:scale(0.7);
                  -webkit-transform:scale(0.7);
                }
                &:nth-child(2){
                  top: -37px;
                  opacity: 0.8;
                  transform:scale(0.85);
                  -moz-transform:scale(0.85);
                  -webkit-transform:scale(0.85);
                }
              }
            }
          }
          .item-content {
            height: 100%;
            @extend .list-background;
            padding-top: 20px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.item-lottery{
              background-image: url(../../assets/home/b1.png);
            }
            &.item-chess{
              background-image: url(../../assets/home/b2.png);
            }
            &.item-slot{
              background-image: url(../../assets/home/b3.png);
            }
            &.item-casino{
              background-image: url(../../assets/home/b4.png);
            }
            p {
              color: #fff;
              width: 100%;
              background: rgba(0,0,0,.5);
              height: 92px;
              line-height: 92px;
              position: absolute;
              bottom: 0;
              left: 0;
              .title{
                font-size: 18px;
                b{
                  font-size: 14px;
                }
              }
              b{
                font-size: 20px;
                margin: 0 4px;
              }
            }
          }

        }
      }
    }

    .advantage {
      text-align: center;
      h2 {
        font-size: 48px;
        padding-top: 160px;
        line-height: 48px;
        margin-bottom: 94px;
      }
      .block-wrap {
        width: 1361px;
        margin: 0 auto;
        border: 1px solid #e2d9de;
        border-bottom: none;
        border-right: none;
        position: relative;
        height: 450px;
        .advantage-block {
          position: absolute;
          float: left;
          height: 225px;
          width: 400px;
          border-right: 1px solid #e2d9de;
          border-bottom: 1px solid #e2d9de;
          font-size: 14px;
          text-align: left;
          padding: 24px 34px 0 34px;
          h3 {
            color: #212121;
            font-weight: 700;
            font-size: 16px;
            .block-shadow{
              display: inline-block;
              vertical-align: middle;
              -webkit-border-radius: 18px;
              -moz-border-radius: 18px;
              border-radius: 18px;
              height: 36px;
              width: 36px;
              background: #d268cb;
              color: #fff;
              position: relative;
              z-index: 3;
              margin:0 22px 12px 0;
              box-shadow: 5px 5px 15px rgba(207,82,210,.3);
              font-size: 24px;
              text-align: center;
              line-height: 28px;

              &:after,&:before{
                position: absolute;
                @extend .block-shadow;
                content: '';
                left: 0;
                top: 0;
                z-index: -1;

              }
              &:before{
                transform:scale(1.3);
                -moz-transform:scale(1.3);
                -webkit-transform:scale(1.3);
                opacity: 0.6;
                animation: circle 2s infinite;
                -moz-animation: circle 2s infinite;
                -webkit-animation: circle 2s infinite;
              }
              &:after{
                transform:scale(1.6);
                -moz-transform:scale(1.6);
                -webkit-transform:scale(1.6);
                opacity: 0.3;
                animation: circle2 2s infinite;
                -moz-animation: circle2 2s infinite;
                -webkit-animation: circle2 2s infinite;
              }
              &.block2{
                background: #40afe8;
                box-shadow: 5px 5px 15px rgba(36,217,247,.3);
              }
              &.block3{
                background: #447aff;
                box-shadow: 5px 5px 15px rgba(28,122,255,.3);
              }
              &.block4{
                background: #e29307;
                box-shadow: 5px 5px 15px rgba(245,172,4,.3);
              }
            }

            .title {
              position: relative;
              display: inline-block;
              line-height: 26px;
              font-weight: 700;
              &:after{
                content: '';
                display: block;
                width: 15px;
                height: 1px;
                position: absolute;
                left: 50%;
                margin-left: -7px;
                bottom: 0px;
                background: #212121;
              }
            }
          }
          p {
            color: #595f73;
            line-height: 24px;
          }
          left: 560px;
          top: 0;
          &.block2 {
            left: 960px;
          }
          &.block3 {
            left: 560px;
            top: 225px;
          }
          &.block4 {
            left: 960px;
            top: 225px;
          }
        }
        .block-big {
          height: 450px;
          width: 560px;
          overflow: hidden;
          padding: 0;
          padding-left: 20px;
          left: 0;
          top: 0;
        }
        &:before {
          display: block;
          content: '';
          background: url(../../assets/home/frame-arrow.png) no-repeat;
          width: 69px;
          height: 69px;
          position: absolute;
          right: -34px;
          top: 50%;
          margin-top: -35px;
          z-index: 2;
        }
      }
    }
  }
  @keyframes circle
  {
    from { opacity: .3}
    50% { opacity: .6}
    to {opacity: .3}
  }
  @-moz-keyframes circle /* Firefox */
  {
    from { opacity: .3}
    50% { opacity: .6}
    to {opacity: .3}
  }
  @-webkit-keyframes circle /* Safari 和 Chrome */
  {
    from { opacity: .3}
    50% { opacity: .6}
    to {opacity: .3}
  }
  @keyframes circle2
  {
    from { opacity: .1}
    50% { opacity: .3}
    to {opacity: .1}
  }
  @-moz-keyframes circle2 /* Firefox */
  {
    from { opacity: .1}
    50% { opacity: .3}
    to {opacity: .1}
  }
  @-webkit-keyframes circle2 /* Safari 和 Chrome */
  {
    from { opacity: .1}
    50% { opacity: .3}
    to {opacity: .1}
  }
</style>
<style lang="scss">
  .page-home{
    .banner-wrap {
      .clear {
        zoom: 1;
      }
    }
    .prize-list-move {
      transition: transform 1s;
    }
    .prize-list-enter-active, .prize-list-leave-active {
      transition: all 1s;
      position: absolute;
    }
    .prize-list-enter, .prize-list-leave-to {
      opacity: 0;
      transform: translateY(20px);
    }
    .prize-list-leave-to {
      transform: translateY(-20px);
    }
  }

</style>
