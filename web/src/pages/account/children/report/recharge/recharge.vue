<template>
  <section class="page-report-recharge">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="充值记录" name="first">
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

              <!--<el-form-item label="支付方式">-->
              <!--<el-select v-model="form.type" placeholder="请选择">-->
              <!--<el-option v-for="item,key in sPaytype" :key="key" :label="item.description" :value="item.id"></el-option>-->
              <!--</el-select>-->
              <!--</el-form-item>-->
              <el-form-item label="充值渠道">
                <el-select v-model="form.gameType" placeholder="请选择">
                  <el-option v-for="item,key in sPlatform" :key="key" :label="item.display_name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
              </el-form-item>
            </el-form>
          </div>
          <div class="table-content">
            <el-table
              v-loading="loading"
              height="330"
              :data="tableData">
              <el-table-column
                prop="order_no"
                label="编号">
              </el-table-column>
              <el-table-column
                sortable
                prop="created_at"
                label="充值时间">
              </el-table-column>
              <el-table-column
                prop="platform"
                label="充值渠道">
              </el-table-column>
              <el-table-column
                prop="amount"
                sortable
                label="金额">
                <template slot-scope="scope">
                  {{scope.row.amount | fAmount}}
                </template>
              </el-table-column>
              <el-table-column
                sortable
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
      </el-tab-pane>
      <el-tab-pane label="银行卡充值记录" name="second">
        <bank-recharge></bank-recharge>
      </el-tab-pane>
    </el-tabs>

    <a class="shadow-box-refresh" href="javascript:;" @click="getTableData">刷新</a>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>

</template>

<script>
  import QuickTime from '../../../../../components/util/QuickTime'
  import BankRecharge from './components/bankRecharge'
  export default {
    name: 'page-record-recharge',
    components: {
      QuickTime,
      BankRecharge
    },
    data() {
      return {
        form:{
          dateRange:null,
          type: '',
          gameType: '',
        },
        sPlatform: [{id: '',display_name:'全部'}],
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        activeName: 'first',
      }
    },
    methods: {
      handleClick(val){
      },
      showTime(val){
        this.form.dateRange = val
      },
      getPlatformList(){
        this.axios.get('/service',{params:{
          action: 'getPlatformList'
        }}).then((data)=>{
          if(data.errno == 0){
            this.sPlatform= []
            data.data.map((value,index,arr)=>{
              if(value.is_third == 1){
                this.sPlatform.push(value)
              }
            })
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
          action:'getDepositList',
          created_at_from: this.form.dateRange ? this.form.dateRange[0]:'',
          created_at_to: this.form.dateRange ? this.form.dateRange[1]:'',
          page: this.currentPage,
          platform_id: this.form.gameType,
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
      this.getPlatformList()
    },
    mounted(){
      this.getTableData()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-report-recharge {
  .main-content {
    padding: 10px 20px;

  }
  .table-content {

  }
}
</style>

