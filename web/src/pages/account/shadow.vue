<template>
  <transition name="bounce">
  <section class="page-shadow" :class="{isMobile:isMobile}">
      <router-view class="page-box" :class="{small:size}" @eventSize="setSize"></router-view>
  </section>
  </transition>
</template>
<script>
  export default {
    name: 'account',
    components: {
    },
    data() {
      return {
        size: false
      }
    },
    computed: {
      isMobile: function(){
          var userAgentInfo = navigator.userAgent;
          var Agents = ["Android", "iPhone","Windows Phone"];
          var flag = true;
          for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
              break;
            }
          }
          return !flag;
      }
    },
    methods: {
      setSize:function(data){
        this.size = data
      }
    },
    created() {

    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  .page-shadow {
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    overflow: hidden;
    .page-box {
      width: 1136px;
      height: 580px;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-left: -568px;
      margin-top: -290px;
      background: #fff;
      z-index: 999;
      padding: 0 20px;
      &.small{
        width: 1022px;
        height: 520px;
        margin-left: -511px;
        margin-top: -260px;
      }
    }
    &.isMobile{
      .page-box {
        position: absolute;
      }
    }
  }
</style>
<style lang="scss">
  @import '../../scss/variables.scss';
  .page-shadow {
    text-align: left;
    .el-input {
      width: 150px;
    }
    .el-input-number {
      .el-input {
        width: auto;
      }
    }
    .el-card__header {
      padding: 12px 20px;
    }
    .form-center {
      padding: 30px 0px;
      width: 450px;
      margin: 0 auto;
      .el-input {
        width: 260px;
      }
      .el-input-number {
        .el-input {
          width: auto;
        }
      }
    }
    .el-input-number-no-controls{
      .el-input__inner{
        text-align: left;
      }
    }
    .search-btn {
      width: 120px;
      height: 30px;
      line-height: 28px;
      font-size: 16px;
      display: inline-block;
      text-align: center;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      color: #fff;
      box-shadow: 0 0 8px rgba(0, 117, 160, .4);
      @include linear-gradient(to right, #0caddf, #2cd3c7);
    }
    .pay-tips {
      border: 2px solid #36beff;
      line-height: 24px;
      padding: 12px 30px;
      -webkit-border-radius: 28px;
      -moz-border-radius: 28px;
      border-radius: 28px;
      box-shadow: 0 5px 30px rgba(95,230,255,.4);
    }
    .i-tab-title {
      border-bottom: 1px solid #e6e6e6;
      line-height: 60px;
      li {
        display: inline-block;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 2px solid transparent;
        color: #909399;
        padding: 0 20px;
        cursor: pointer;
        white-space: nowrap;
        list-style: none;
        &.tab-title-active {
          border-color: #0a94e3;
          color: #19abc0;
        }
      }
    }
    .el-tabs__item {
      line-height: 60px;
      height: 60px;
      font-size: 16px;
      &.is-active{
        color: #19abc0;
      }
      &:hover{
        color: #19abc0;
      }
    }
    .el-tabs__active-bar{
      background-color: #19abc0;
      height: 3px;
    }
    .shadow-title{
      font-size: 16px;
      color: #19abc0;
      font-weight: 500;
      line-height: 60px;
      border-bottom: solid 1px #e6e6e6;
    }
    .center {
      padding: 10px 0;
      text-align: center;
    }
  }
  .table-content{
    padding: 10px 10px;
    position: relative;
  }

  .bounce-enter-active {
    animation: bounce-in .3s ease-in-out;
    -webkit-animation: bounce-in .3s ease-in-out;
  }
  .bounce-leave-active {
    animation: bounce-in .2s ease-in-out reverse;
    -webkit-animation: bounce-in .2s ease-in-out reverse;
  }
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(.7);
    }
    80% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
