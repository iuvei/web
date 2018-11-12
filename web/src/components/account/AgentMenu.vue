<template>
  <div class="components-agent-menu">
    <div class="imgLink-wrap">
      <h2>代理中心</h2>
      <ul class="imgLink-list">
        <li><router-link to="/account/shadow/agent"><span class="link-img agent"></span><b>代理首页</b></router-link></li>
        <li><router-link to="/account/shadow/userProfit"><span class="link-img teamReport"></span><b>用户报表</b></router-link></li>
        <li><router-link to="/account/shadow/profit"><span class="link-img teamReport"></span><b>团队报表</b></router-link></li>
        <li><router-link to="/account/shadow/teamAccount"><span class="link-img teamManagement"></span><b>团队管理</b></router-link></li>
        <li><router-link to="/account/shadow/teamAccount?type=manual"><span class="link-img promotion"></span><b>开户管理</b></router-link></li>
        <li><router-link v-if="isShowContract" to="/account/shadow/contract"><span class="link-img domain"></span><b>契约分红</b></router-link></li>
        <li><router-link v-if="isShowSalary" to="/account/shadow/salary"><span class="link-img accountChange"></span><b>契约日工资</b></router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>

  /**
   * contract_dividend_status
   * 0: 新建临时契约;1:上下级达成契约;2:拒绝签订契约;3:没有契约设置
   *
   */
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'AgentMenu',
    components: {

    },
    data () {
      return {

      }
    },
    computed: {
      ...mapState('common',['isLogin','userInfo']),
      ...mapGetters('common',['isShowContract','isShowSalary']),
      showContract: function(){

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
  @import '../../scss/variables.scss';
  .components-agent-menu {
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
