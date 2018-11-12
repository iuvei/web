<template>
  <div class="components-top-menu container clear">
    <div class="avatar-wrap left">
      <div class="avatar"><img src="../../assets/account/user-head.png"></div>
      <div class="user-name">{{userInfo.username}}<br>{{greetings}}</div>
    </div>
    <dl class="left pink">
      <dt>类型<span>+</span></dt>
      <dd>{{userTypeName}}</dd>
    </dl>
    <dl class="left blue">
      <dt>奖金<span>+</span></dt>
      <dd>{{userInfo.prize_group}}</dd>
    </dl>
    <ul class="imgLink-list left">
      <li><router-link to="/account/shadow/deposite"><span class="link-img recharge"></span><b>充值</b></router-link></li>
      <li><router-link to="/account/shadow/withdraw"><span class="link-img withdraw"></span><b>提现</b></router-link></li>
      <li v-if="isAgent&&canTransfer"><router-link to="/account/shadow/transfer" ><span class="link-img transfer"></span><b>转账</b></router-link></li>
      <li><router-link to="/account/shadow/password" ><span class="link-img safeCenter"></span><b>安全中心</b></router-link></li>
      <li><router-link to="/account/shadow/message?type=letter" ><span class="link-img message"></span><b>消息管理</b></router-link></li>
    </ul>
  </div>
</template>
<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'TopMenu',
    components: {

    },
    data () {
      return {
      }
    },
    computed: {
      greetings(){
        let now = new Date(),hour = now.getHours()
        let msg = '你好'
        if(hour < 6){msg = "凌晨好!"}
        else if (hour < 9){msg = "早上好!"}
        else if (hour < 12){msg = "上午好!"}
        else if (hour < 14){msg = "中午好!"}
        else if (hour < 17){msg = "下午好!"}
        else if (hour < 19){msg = "傍晚好!"}
        else if (hour < 22){msg = "晚上好!"}
        else {msg = "夜里好!"}
        return msg
      },
      ...mapState('common',['userInfo']),
      ...mapGetters('common',['fundsPwdSetted','userTypeName','isAgent','canTransfer']),
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
  @import '../../scss/variables.scss';
  .components-top-menu {
    background: #fff;
    margin-bottom: 10px;
    width: 100%;
    .avatar-wrap {
      background: url(../../assets/account/avatar.png) no-repeat;
      width: 257px;
      height: 119px;
      padding: 18px 0  0 18px;
      box-shadow: 0 0 30px rgba(25,155,193,.3);
      .avatar {
        width: 78px;
        height: 78px;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
      .user-name {
        padding-left: 10px;
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
      }
    }
    dl {
      width: 94px;
      border-right: 1px solid #d2d1d2;
      height: 119px;
      text-align: center;
      dt{
        line-height: 40px;
        font-size: 16px;
        span {
          display: inline-block;
          font-size: 20px;
          font-weight: 700;
          margin: 0 5px;
        }
      }
      dd {
        line-height: 60px;
      }
    }
    .pink {
      dt {
        span {
          color: #ee3d73
        }
      }
      dd {
        color: #ee3d73
      }
    }
    .blue {
      dt {
        span {
          color: #19acc0
        }
      }
      dd {
        color: #19acc0
      }
    }

  }


</style>
