<template>
  <section class="page-contract">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的契约" name="first">
        <my-salary></my-salary>
      </el-tab-pane>
      <el-tab-pane v-if="!isShowSalaryAgree" label="下级日工资" name="second">
        <contract-dividends></contract-dividends>
      </el-tab-pane>
      <el-tab-pane v-if="!isShowSalaryAgree" label="我的日工资" name="third">
        <dividends></dividends>
      </el-tab-pane>
      <el-tab-pane v-if="!isShowSalaryAgree" label="契约下级" name="fourth">
        <salary-team></salary-team>
      </el-tab-pane>
    </el-tabs>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>

<script>
  import MySalary from './components/MySalary'
  import SalaryTeam from './components/SalaryTeam'
  import ContractDividends from './components/ContractDividends'
  import Dividends from './components/Dividends'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'contract',
    components: {
      MySalary,
      SalaryTeam,
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
      ...mapGetters('common',['isShowSalaryAgree'])
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
