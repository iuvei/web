<template>
  <section class="components-footer">
    <div class="container">
      <div class="license">
        <dl>
          <dt><span class="icon-diploma"></span>运营资质</dt>
          <dd>
            <a class="license1" href="#"></a>
            <a class="license2" href="#"></a>
            <a class="license3" href="#"></a>
            <a class="license4" href="#"></a>
          </dd>
        </dl>
        <dl>
          <dt><span class="icon-casino-manager"></span>博彩责任</dt>
          <dd>
            <a class="license5" href="#"></a>
            <a class="license6" href="#"></a>
            <a class="license7" href="#"></a>
          </dd>
        </dl>
      </div>
      <ul class="link-list">
        <li><a href="http://vip.mf8.vip" target="_blank">魔方品牌</a></li>
        <li><router-link to="/static/html/speed.html" target="_blank">测速中心</router-link></li>
        <li><router-link to="/download" target="_blank">下载中心</router-link></li>
        <li><a href="javascript:;">防劫持教程</a></li>
        <li><router-link to="/help">帮助中心</router-link></li>
      </ul>
      <p>© 2014 魔方娱乐版权所有 菲律宾政府合法博彩牌照认证<br>魔方游戏郑重提示：彩票有风险，投资需谨慎，不向未满18周岁的青少年出售彩票</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CommonHeader',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created() {

    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables.scss';
  .components-footer {
    background: #f5f8ff;
    padding: 25px 0;
    position: relative;
    &:before{
      position: absolute;
      display: block;
      content: '';
      background: url(../assets/common/footer-left.jpg) no-repeat;
      width: 78px;
      height: 190px;
      left: 0;
      top: 100px;
      z-index: 0;
      opacity: 0.8;
    }
    &:after{
      position: absolute;
      display: block;
      content: '';
      background: url(../assets/common/footer-right.jpg) no-repeat;
      width: 92px;
      height: 170px;
      right: 0;
      top: 0;
      opacity: 0.8;
      z-index: 0;
    }
    .container {
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      position: relative;
      z-index: 2;
      .license {
        dl {
          display: inline-block;
          vertical-align: middle;
          margin: 0 50px;
          dt {
            font-size: 14px;
            span{
              font-size: 20px;
              margin-right: 6px;
            }
          }
          dd {
            padding: 25px 0;
            a {
              display: inline-block;
              height: 41px;
              width: 90px;
              background-image: url(../assets/common/license.png);
              background-repeat: no-repeat;
              margin: 0 10px;
            }
            $list: (license1:0,license2:-97px,license3:-208px,license4:-372px,license5:-450px,license6:-595px,license7:-760px);
            $list2: (license1:82px,license2:91px,license3:147px,license4:51px,license5:142px,license6:156px,license7:128px);
            @each $header,$size in $list{
              .#{$header}{
                background-position: $size top;
              }
            }
            @each $header,$size in $list2{
              .#{$header}{
                width: $size;
              }
            }
          }
        }
      }

      .link-list {
        letter-spacing: 0;
        font-size: 0;
        padding: 25px 0;
        li {
          display: inline-block;
          border-right: 1px solid #212121;
          padding: 0 17px;
          line-height: 12px;
          height: 12px;
          a {
            font-size: 12px;
            line-height: 12px;
            display: inline-block;
          }
          &:last-child{
            border: none;
          }
        }
      }


    }
  }

</style>
