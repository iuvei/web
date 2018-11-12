<template>
  <section class="page-contract">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的契约" name="first">
        <my-contract></my-contract>
      </el-tab-pane>
      <el-tab-pane v-if="!isShowContractAgree" label="分红处理" name="second">
        <contract-dividends></contract-dividends>
      </el-tab-pane>
      <el-tab-pane v-if="!isShowContractAgree" label="分红报表" name="third">
        <dividends></dividends>
      </el-tab-pane>
      <el-tab-pane v-if="!isShowContractAgree" label="契约下级" name="fourth">
        <contract-team></contract-team>
      </el-tab-pane>
    </el-tabs>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>

<script>
  import MyContract from './components/MyContract'
  import ContractTeam from './components/ContractTeam'
  import ContractDividends from './components/ContractDividends'
  import Dividends from './components/Dividends'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'contract',
    components: {
      MyContract,
      ContractTeam,
      ContractDividends,
      Dividends
    },
    data(){
      return {
        activeName: 'first',
      }
    },
    computed: {
      ...mapState('common',['userInfo']),
      ...mapGetters('common',['isShowContractAgree'])
    },
    methods: {
      handleClick(val){

      }
    },
    created() {
    },
    mounted() {

    },
    beforeDestroy(){

    }

  }
</script>
<style lang="scss" scoped>
  .page-account {

  }
</style>
