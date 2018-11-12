<template>
  <section class="page-report-funds">
    <h3 class="shadow-title">资金明细 {{userName}}</h3>
    <div class="main-content ">
      <transition name="el-zoom-in-center">
      <div class="game-main" v-if="!dialogVisible">
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

            <el-form-item label="转账类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option v-for="item,key in sType" :key="key" :label="item.description" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="彩种">
              <el-select v-model="form.gameType" placeholder="请选择">
                <el-option v-for="item,key in sGameType" :key="key" :label="item.name" :value="item.id"></el-option>
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
            height="350"
            stripe
            :data="tableData">
            <el-table-column
              label="编号"
              width="120">
              <template slot-scope="scope">
                {{scope.row.serial_number}}
                <br v-if="scope.row.type_id==7">
                <a v-if="scope.row.type_id==7" class="color-blue" href="javascript:;"  @click="showDetail(scope.row.project_id)">查看详情</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              width="160"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="type"
              label="账变类型">
            </el-table-column>
            <el-table-column
              prop="lottery"
              label="游戏">
            </el-table-column>
            <el-table-column
              prop="way"
              label="玩法">
            </el-table-column>
            <el-table-column
              width="70"
              label="模式">
              <template slot-scope="scope">
                {{ scope.row.coefficient | fMoneyUnit}}
              </template>
            </el-table-column>
            <el-table-column
              width="170"
              label="变动金额">
              <template slot-scope="scope">
                <span :class="scope.row.is_income == 0? 'color-red':'color-green'">{{scope.row.formatted_amount | fAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="170"
              label="余额">
              <template slot-scope="scope">
               {{scope.row.ablance | fAmount}}
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
      </div>
      </transition>
      <transition name="el-zoom-in-center">
        <div class="game-main" v-if="dialogVisible">
          <detail @eventGameDetail="closeDetail" :gameId="gameId"></detail>
        </div>
      </transition>
    </div>



    <a class="shadow-box-refresh" href="javascript:;" @click="getTableData">刷新</a>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>

</template>

<script>
  import QuickTime from '../../../../../components/util/QuickTime'

  import Detail from '../game/components/Detail'

  export default {
    name: 'page-report-funds',
    components: {
      QuickTime,
      Detail
    },
    data() {
      return {
        form:{
          dateRange:null,
          type: '',
          gameType: '',
        },
        sType: [{id: '',description:'全部'}],
        sGameType: [{id: '',name:'全部'}],
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        dialogVisible: false,
        gameId: 0,
        userName: ''
      }
    },
    watch: {
      'form.dateRange':function(val){
      },
      currentPage: function(val){

      }
    },
    methods: {
      showTime(val){
        this.form.dateRange = val
      },
      getTransactionTypeList(){
        this.axios.get('/service',{params:{
          action: 'getTransactionTypeList',
          type: 'transfer'
        }}).then((data)=>{
          if(data.errno == 0){
            this.sType = [...this.sType,...data.data]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getLotteryList(){
        this.axios.get('/service',{params:{
          action: 'getLotteryList'
        }}).then((data)=>{
          if(data.errno == 0){
            this.sGameType = [...this.sGameType,...data.data]
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
          action:'getTransactionList',
          created_at_from: this.form.dateRange ? this.form.dateRange[0]:'',
          created_at_to: this.form.dateRange ? this.form.dateRange[1]:'',
          page: this.currentPage,
          lottery_id: this.form.gameType,
          type_id: this.form.type,
          user_id: this.$route.query.hasOwnProperty('id')?this.$route.query.id:''
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
      showDetail(id){
        this.gameId = id
        this.dialogVisible = true
      },
      closeDetail(){
        this.dialogVisible = false
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      }
    },

    created() {
      this.getTransactionTypeList()
      this.getLotteryList()
      this.getTableData()
      if(this.$route.query.hasOwnProperty('username')){
        this.userName = '('+ this.$route.query.username + ')'
      }
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-report-funds {
  .margin-right20 {
    margin-right: 20px;
  }
  .main-content {
    margin: 10px 10px;
    position: relative;
    height: 500px;
    .game-main {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 506px;
    }
  }

}
</style>

<style media="print">

</style>
