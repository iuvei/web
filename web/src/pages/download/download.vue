<template>
  <section class="page-download" @scroll = "showAnimate"  ref="viewBox" id="page-download">
    <div class="summary summary1">
      <div class="summary-m">
        <div class="stage">
          <div class="pokerbg"></div>
          <div class="app1"></div>
          <div class="app2"></div>
        </div>
        <div class="text-info">
          <div class="logo"><router-link to="/home"><img src="../../assets/common/logo.png"></router-link></div>
          <p class="title">畅玩游戏<br><span>-</span>尽在魔方APP</p>
          <p><img width="170" src="../../assets/home/download_qr.png"></p>
          <p><a class="download-btn" target="_blank" :href="downloadLink"><span class="apple"></span>苹果端下载</a></p>
          <p><a class="download-btn" target="_blank" :href="downloadLink"><span class="android"></span>安卓端下载</a></p>
        </div>
      </div>
    </div>
    <div class="summary summary2">
      <div class="summary-m">
        <div class="stage" :class="{active:section2}" ref="section2">
          <div class="iphone"></div>
          <div class="stage-text"><img src="../../assets/download/text2.png"></div>
        </div>
      </div>
    </div>
    <div class="summary summary3">
      <div class="summary-m">
        <div class="stage" :class="{active:section3}">
          <div class="iphone"></div>
          <div class="stage-text"><img src="../../assets/download/text3.png"></div>
        </div>
      </div>
    </div>
    <div class="summary summary4">
      <div class="summary-m">
        <div class="stage" :class="{active:section4}">
          <div class="iphone"></div>
          <div class="stage-text"><img src="../../assets/download/text4.png"></div>
        </div>
      </div>
    </div>
    <div class="download-footer">
      <div class="summary-m">
          <h3> ---------------    下载魔方游戏APP    ---------------</h3>
          <div class="footer-wrap">
            <div class="qrcode"><img src="../../assets/home/download_qr.png"><h4>请使用浏览器扫一扫</h4></div>
            <div class="downloand-link">
              <p><a class="download-btn black" target="_blank" :href="downloadLink"><span class="apple"></span>苹果端下载</a></p>
              <p><a class="download-btn black" target="_blank" :href="downloadLink"><span class="android"></span>安卓端下载</a></p>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'page-download',
    components: {
    },
    data() {
      return {
        section2: false,
        section3: false,
        section4: false,
        downloadLink: 'https://app.gw881.com'
      }
    },
    computed:{

    },
    methods: {
      showAnimate(){
        let scroll = document.body.scrollTop || document.documentElement.scrollTop;
        if(scroll>=980){
          this.section2 = true
        }
        if(scroll >= 980+ 767){
          this.section3 = true
        }
        if(scroll >= 980+ 767+ 755){
          this.section4 = true
        }
      }
    },
    created() {

      if (typeof document.addEventListener != "undefined") {
        document.addEventListener("scroll",this.showAnimate,true);
      } else {
        document.attachEvent("scroll",this.showAnimate);
      }
      //不显示顶部底部
      this.$emit("eventFromChild",false)
    },
    activated (){

    },
    deactivated (){

    },
    beforeDestroy(){
      //显示顶部底部
      this.$emit("eventFromChild",true)
      if (typeof document.addEventListener != "undefined") {
        document.removeEventListener("scroll",this.showAnimate,true);
      } else {
        document.detachEvent("scroll",this.showAnimate);
      }
    }
  }
</script>
<style lang="scss" scoped>
  html, body{
    height: auto;
  }
  .page-download {
    background: #Fff;
    .summary {
      width: 100%;
      background-repeat: no-repeat;
      background-position: center top;
      margin-bottom: 100px;
      .summary-m {
        width: 1400px;
        height: 100%;
        position: relative;
        margin: 0 auto;
        .stage{
          position: absolute;
          height: 100%;
          width: 50%;
          .stage-text {
            top: 245px;
            position: absolute;
            opacity:0;

          }
        }
        .stage.active{
          .stage-text {
            animation: rightIn 1.5s ease-in-out;
            animation-fill-mode: both;
          }
        }
      }

      &.summary1{
        background-image: url(../../assets/download/downloadbg1.jpg);
        height: 980px;
        .text-info {
          position: absolute;
          right: 0;
          top: 0;
          width: 590px;
          text-align: center;
          .logo{
            background: #fff;
            width: 188px;
            padding-top: 30px;
            height: 170px;
            text-align: center;
            margin: 0 auto;
          }
          p {
            padding-bottom: 30px;
          }
        }
        .title {
          font-size: 72px;
          line-height: 120px;
          color: #fff;
          padding-top: 40px;
          text-align: left;
          span {
            display: inline-block;
            vertical-align: middle;
            background: #ffcb2a;
            text-indent: -999em;
            height: 10px;
            width: 90px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
        }
      }
      &.summary2{
        background-image: url(../../assets/download/downloadbg2.jpg);
        height: 767px;
        .stage.active{
          .stage-text {
            animation: leftIn 1.5s ease-in-out;
            animation-fill-mode: both;
          }
        }
      }
      &.summary3{
        background-image: url(../../assets/download/downloadbg3.jpg);
        height: 755px;
        margin-bottom: 0;
        .stage{
          right: 0;
          .iphone {
            right: 0;
            top: 10px;
          }
          .stage-text {
            top: 245px;
            right: 0;
            position: absolute;
          }
        }

      }
      &.summary4{
        background-image: url(../../assets/download/downloadbg4.jpg);
        height: 576px;
        margin-bottom: 0;
        .stage{
          width: 100%;
          .iphone {
            left: 280px;
            top: 80px;
          }
          .stage-text {
            top: 90px;
            left: 500px;
            position: absolute;
          }
        }
      }



    }
    .download-btn {
      width: 240px;
      height: 60px;
      line-height: 60px;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      font-size: 24px;
      background: #fff;
      display: inline-block;
      position: relative;
      &:after {
        display: block;
        width: 40px;
        height: 10px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background: #5e94fe;
        content: '';
        position: absolute;
        right: -80px;
        top: 24px;
      }
      span{
        background-repeat: no-repeat;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
      .apple {
        background-image: url(../../assets/download/apple-black.png);
        width: 28px;
        height: 33px;
        margin-top:-5px;

      }
      .android {
        background-image: url(../../assets/download/android.png);
        width: 31px;
        height: 34px;
        margin-top:-5px;
      }
      &.black {
        background: #000;
        color: #fff;
        .apple {
          background-image: url(../../assets/download/apple.png);
        }
      }
    }
    .iphone {
      background: url(../../assets/download/iphone.png) no-repeat;
      width: 153px;
      height: 321px;
      position: absolute;
      opacity:0;
    }
    .stage.active .iphone {
      animation: topIn ease .5s 1s;
      animation-fill-mode: both;
    }
    .app1,.app2,.pokerbg {
      position: absolute;
    }
    .app1 {
      background: url(../../assets/download/app1.png) no-repeat;
      width: 1002px;
      height: 799px;
      left: -130px;
      top: 70px;
      animation: app1 0.3s .7s ease-in-out;
      animation-fill-mode: both;
    }
    .app2 {
      background: url(../../assets/download/app2.png) no-repeat;
      width: 691px;
      height: 449px;
      top: 480px;
      left: 250px;
      animation: app2 0.3s .7s ease-in-out;
      animation-fill-mode: both;
    }
    .pokerbg {
      background: url(../../assets/download/poker.png) no-repeat;
      width: 853px;
      height: 540px;
      left: -180px;
      top: 300px;
      animation: poker .5s ease-in-out;
      animation-fill-mode: both;
    }

    .download-footer {
      text-align: center;
      h3 {
        font-size: 30px;
        padding: 200px 0 30px;
      }
      .footer-wrap {
        width: 600px;
        margin: 0 auto;
        height: 280px;
        .qrcode {
          text-align: center;
          float: left;
          img {
            width: 170px;
            height: 170px;
          }
        }
        p {
          padding-bottom: 30px;
        }
      }
    }

    @keyframes topIn{
      0% {
        opacity:0;
        transform:  translate(0px,-25px)  ;
      }
      100% {
        opacity:1;
        transform:  translate(0px,0px)  ;
      }
    }
    @keyframes rightIn{
      0% {
        opacity:0;
        transform:  translate(100px,0px)  ;
      }
      100% {
        opacity:1;
        transform:  translate(0px,0px)  ;
      }
    }
    @keyframes leftIn{
      0% {
        opacity:0;
        transform:  translate(-100px,0px)  ;
      }
      100% {
        opacity:1;
        transform:  translate(0px,0px)  ;
      }
    }
    @keyframes poker{
      0% {
        opacity:0;
        transform: scale(0.7) rotate(18deg);
      }
      100% {
        opacity:1;
        transform:  scale(1) rotate(0deg);
      }
    }
    @keyframes app1{
      0% {
        opacity:0;
        transform: translate(-150px,-10px)  scale(0.8) rotate(7deg);
      }
      100% {
        opacity:1;
        transform:translate(0px,0px)   scale(1) rotate(0deg);
      }
    }
    @keyframes app2{
      0% {
        opacity:0;
        transform: translate(150px,10px)  scale(0.8) rotate(-7deg);
      }
      100% {
        opacity:1;
        transform:translate(0px,0px)   scale(1) rotate(0deg);
      }
    }

  }
</style>

