<template>
  <section class="components-dividends">
    <div class="table-content">
      <el-table
        height="420"
        stripe
        :data="tableData">
        <el-table-column
          width="200"
          label="分红时间">
          <template slot-scope="scope">
            {{scope.row.begin_date}}至{{scope.row.end_date}}
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
          prop="active_users"
          label="活跃用户">
        </el-table-column>
        <el-table-column
          prop="rate"
          label="分红比例">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="分红金额">
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
  export default {
    name: 'Dividends',
    components: {
    },
    data() {
      return {
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
      getTableData(){
        this.loading = true
        this.axios.get('/service',{params:{
            action: 'getUserDividendReport',
            type: 2,
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
  .components-dividends {
    .main-content {
      padding: 10px 20px;
    }
  }
</style>

<style lang="scss">
  .components-dividends {

  }
</style>
