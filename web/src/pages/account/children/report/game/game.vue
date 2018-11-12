<template>
  <section class="page-report-game">
    <ul class="i-tab-title">
      <li class="tab-title-active">游戏记录</li>
      <li><router-link to="/account/shadow/reportTrace">追号记录</router-link></li>
    </ul>
    <div class="main-content">
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
              <el-form-item label="用户名">
                <el-input v-model="form.username" ></el-input>
              </el-form-item>
              <el-form-item label="彩系">
                <el-select v-model="form.gameType" placeholder="请选择">
                  <el-option v-for="item,key in sGameSeries" :key="key" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="彩种">
                <el-select v-model="form.lotteryType" placeholder="请选择">
                  <el-option v-for="item,key in cLotteryList" :key="key" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option v-for="item,key in sProjectStatus" :key="key" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期号">
                <el-input v-model="form.issue" ></el-input>
              </el-form-item>
              <el-form-item>
                <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
              </el-form-item>
            </el-form>
          </div>
          <div class="table-content">
            <el-table
              v-loading="loading"
              stripe
              height="350"
              size="mini"
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                width="80"
                label="订单编号">
                <template slot-scope="scope">
                  {{scope.row.serial_number}}<br><a class="color-blue" href="javascript:;"  @click="showDetail(scope.row.id)">查看详情</a>
                </template>
              </el-table-column>
              <el-table-column
                prop="username"
                label="用户名">
              </el-table-column>
              <el-table-column
                prop="bought_at"
                width="146"
                label="投注时间">
              </el-table-column>
              <el-table-column
                width="120"
                label="游戏与玩法">
                <template slot-scope="scope">
                  <span>{{ scope.row.lottery }}</span><br>
                  <span>{{ scope.row.way }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="prize_group"
                label="投注奖金组">
              </el-table-column>
              <el-table-column
                width="120"
                label="注单信息">
                <template slot-scope="scope">
                  <span>期号</span>{{scope.row.issue}}
                </template>
              </el-table-column>
              <el-table-column
                label="投注号码">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>号码: {{ scope.row.bet_number }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="mini">详细号码</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="winning_number"
                label="开奖号码">
              </el-table-column>
              <el-table-column
                label="注单金额">
                <template slot-scope="scope">
                  {{ scope.row.amount | fAmount }}
                </template>
              </el-table-column>
              <el-table-column
                label="奖金">
                <template slot-scope="scope">
                  {{ scope.row.prize | fAmount}}
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <span :class="scope.row.status=='已中奖' ? 'color-red':''">{{ scope.row.status }}</span>
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
  import Detail from './components/Detail'
  export default {
    name: 'page-report-game',
    components: {
      QuickTime,
      Detail
    },
    data() {
      return {
        form:{
          dateRange:null,
          type: '',
          username: '',
          gameType: '',
          lotteryType: '',
          status: '',
          issue: '',
        },
        gameId: 0,
        dialogVisible: false,
        sGameSeries: [{id: '',name:'全部'}],
        sLotteryList: [{id: '',name:'全部'}],
        sProjectStatus: [{id: '',name:'全部'}],
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1
      }
    },
    computed:{
      cLotteryList:function(){
        if(this.form.gameType!=''){
          let id = this.form.gameType
          let result = []
          this.sLotteryList.map((val,num,array)=>{
            if(val.series_id == id){
              result.push(val)
            }
          })

          this.form.lotteryType = result[0].id
          return result
        }else{
          this.form.lotteryType = ''
          return this.sLotteryList
        }
      }
    },
    watch:{

    },
    methods: {
      gotoAccount(){
        this.$router.replace('/account')
      },
      showTime(val){
        this.form.dateRange = val
      },

      getGameSeries(){
        this.axios.get('/service',{params:{
          action: 'getGameSeries',
          game_type: 'number'
        }}).then((data)=>{
          if(data.errno == 0){
            this.sGameSeries= [...this.sGameSeries,...data.data]
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
          action: 'getLotteryList',
          game_type: 'number'
        }}).then((data)=>{
          if(data.errno == 0){
            this.sLotteryList = [...this.sLotteryList,...data.data]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getProjectStatus(){
        this.axios.get('/service',{params:{
          action: 'getProjectStatus'
        }}).then((data)=>{
          if(data.errno == 0){
            for(let item in data.data){
              this.sProjectStatus.push({id:item,name:data.data[item]})
            }
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
          action:'getProjectList',
          created_at_from: this.form.dateRange ? this.form.dateRange[0]:'',
          created_at_to: this.form.dateRange ? this.form.dateRange[1]:'',
          page: this.currentPage,
          lottery_id: this.form.lotteryType,
          status: this.form.status,
          issue: this.form.issue,
          username: this.form.username
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
      },
      showDetail(id){
        this.gameId = id
        this.dialogVisible = true
      },
      closeDetail(){
        this.dialogVisible = false
      },
    },
    created() {
      this.getLotteryList()
      this.getGameSeries()
      this.getProjectStatus()
    },
    mounted(){

      if(this.$route.query.hasOwnProperty('id')){
        this.showDetail(Number(this.$route.query.id))
      }
      if(this.$route.query.hasOwnProperty('username')){
        this.form.username = this.$route.query.username
      }
      this.getTableData()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-report-game {
  .el-input {
    width: 90px;
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

