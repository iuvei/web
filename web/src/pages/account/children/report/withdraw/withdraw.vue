<template>
  <section class="page-report-withdraw">
    <h3 class="shadow-title">提现记录</h3>
    <div class="main-content">
      <div class="table-filter">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item label="查询日期">
            <el-date-picker
              v-model="form.dateRange"
              :default-time="['00:00:00','23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              size = "mini"
              type="datetimerange"
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
          stripe
          v-loading="loading"
          height="390"
          :data="tableData"
          style="width: 100%"
          >
          <el-table-column
            prop="serial_number"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="account_name"
            label="提款人">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额">
            <template slot-scope="scope">
              {{scope.row.amount | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
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
    </div>
    <a class="shadow-box-refresh" href="javascript:;" @click="getTableData">刷新</a>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>

</template>

<script>
  import QuickTime from '../../../../../components/util/QuickTime'
  export default {
    name: 'page-report-withdraw',
    components: {
      QuickTime
    },
    data() {
      return {
        form:{
          dateRange:null,
          type: '',
          gameType: '',
        },
        sType: [{id: '',description:'全部'}],
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1
      }
    },
    methods: {
      showTime(val){
        this.form.dateRange = val
      },

      getTransactionTypeList(){
        this.axios.get('/service',{params:{
          action: 'getTransactionTypeList',
          type: 'withdraw'
        }}).then((data)=>{
          if(data.errno == 0){
            this.sType= [...this.sType,...data.data]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getTableData(){
        this.loading = true

        var param = {
          action:'getWithdrawalList',
          request_time_from: this.form.dateRange ? this.form.dateRange[0]:'',
          request_time_to: this.form.dateRange ? this.form.dateRange[1]:'',
          page: this.currentPage,
          is_successed:1
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          this.loading = false
          if(data.errno == 0){
            this.count = data.data.count
            this.tableData = [...data.data.list]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      }
    },
    created() {
      // this.getTransactionTypeList()
      this.getTableData()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-report-withdraw {
  .main-content {
    padding: 10px 20px;
  }

}
</style>

