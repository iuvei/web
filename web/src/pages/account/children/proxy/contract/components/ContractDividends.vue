<template>
  <section class="components-contract-dividends">
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
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==1" size="mini" type="primary" @click="handleSend(scope.row)">发送</el-button>
            <el-button v-if="scope.row.status==3" disabled size="mini" type="primary">已发送</el-button>
          </template>
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
    name: 'ContractDividends',
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

      //抓取列表数据
      getTableData(){
        this.loading = true
        this.axios.get('/service',{params:{
            action: 'getUserDividendReport',
            page: this.currentPage,
            type: 1
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
      },
      handleSend(item){
        this.axios.post('/service',{
            action: 'sendDividendReport',
            dividend_id: item.id
          }).then((data)=>{
          this.loading = false
          if(data.errno == 0){
            this.$message({
              type: 'success',
              message: '发送成功！'
            });
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
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
