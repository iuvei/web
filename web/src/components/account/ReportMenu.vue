<template>
  <div class="components-report-menu clear">
    <div class="imgLink-wrap">
      <h2>报表管理</h2>
      <ul class="imgLink-list">
        <li><router-link to="/account/shadow/reportPersonal"><span class="link-img personalReport"></span><b>个人报表</b></router-link></li>
        <li><router-link to="/account/shadow/reportFunds"><span class="link-img fundingDetails"></span><b>资金明细</b></router-link></li>
        <li><router-link to="/account/shadow/reportRecharge"><span class="link-img personalReport"></span><b>充值记录</b></router-link></li>
        <li><router-link to="/account/shadow/reportWithdraw"><span class="link-img fundingDetails"></span><b>提现记录</b></router-link></li>
        <li><router-link to="/account/shadow/reportGame"><span class="link-img gameRecord"></span><b>游戏记录</b></router-link></li>
        <li><router-link to="/account/shadow/reportTrace"><span class="link-img traceRecord"></span><b>追号记录</b></router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ReportMenu',
    components: {

    },
    data () {
      return {
      }
    },
    computed: {
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
  .components-report-menu {
      width: 100%;
      .imgLink-wrap {
        padding: 10px 0 10px 0;
        margin-bottom: 10px;
        background: #fff;
        h2 {
          padding-left: 20px;
        }
      }
  }

</style>
