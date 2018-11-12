<template>
  <section class="components-contract-dividends">
    <div class="table-filter">
      <el-form :inline="true" :model="form" size="mini">
        <el-form-item label="查询日期">
          <el-date-picker
            v-model="form.dateRange"
            value-format="yyyy-MM-dd"
            size = "mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item >
          <quick-time @eventChangTime="showTime"></quick-time>
        </el-form-item>
        <el-form-item>
          <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <el-table
        height="380"
        stripe
        :data="tableData">
        <el-table-column
          width="160"
          label="日期">
          <template slot-scope="scope">
            {{scope.row.date}}
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="会员"
          width="120">
        </el-table-column>
        <el-table-column
          prop="turnover"
          label="消费量">
        </el-table-column>
        <el-table-column
          prop="profit"
          label="亏损量">
        </el-table-column>
        <el-table-column
          prop="protocal_bonus_percent"
          label="日工资比例">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="日工资金额">
        </el-table-column>

      </el-table>
      <div class="center">
        <el-pagination
          background
          :page-size="pageSize"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </section>
</template>
<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import QuickTime from '../../../../../../components/util/QuickTime'
  export default {
    name: 'ContractDividends',
    components: {
      QuickTime
    },
    data() {
      return {
        form:{
          dateRange: null,
        },
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
      }
    },
    computed: {
      ...mapGetters('common',['isAgent'])
    },
    watch:{
    },
    methods: {
      showTime(val){
        this.form.dateRange = val
      },
      //抓取列表数据
      getTableData(){
        this.loading = true
        this.axios.get('/service',{params:{
            action: 'getUserSalaryReport',
            date_from: this.form.dateRange ? this.form.dateRange[0]:'',
            date_to: this.form.dateRange ? this.form.dateRange[1]:'',
            type: 1,
            page: this.currentPage,
          }}).then((data)=>{
          this.loading = false
          if(data.errno == 0){
            this.count = data.data.count
            this.tableData = [...data.data.list.data]

          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      }
    },
    created() {
      this.getTableData()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-contract-dividends {

  }
</style>

<style lang="scss">
  .components-contract-dividends {

  }
</style>
