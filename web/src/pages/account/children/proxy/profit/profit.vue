<template>
  <section class="page-profit">
    <h3 class="shadow-title">团队报表</h3>
    <div class="main-content">
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
          <el-form-item label="用户名">
            <el-input v-model="form.username" @focus="showSelect" ></el-input>
          </el-form-item>
          <el-form-item class="s-breadcurm">
              <span v-for="item,key in pathArray" @click="searchByBread(item.username,key)">{{item.username}}<i class="el-breadcrumb__separator el-icon-arrow-right"></i></span>
          </el-form-item>
          <el-form-item>
            <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
          </el-form-item>
          <el-form-item>
            <el-button v-if="form.username != ''" type="primary" plain size="mini" @click="backMyteam">返回我的直属团队</el-button>
          </el-form-item>
        </el-form>

        <transition name="el-zoom-in-center">
          <div class="select-box" v-show="selectShow">
              <team-list-all @eventNameSelected="selectedTeamUser" @eventNodePath="showNodePath" @eventClose="closeSelect"></team-list-all>
          </div>
        </transition>
      </div>
      <div>
        <el-table
          stripe
          v-loading="loading"
          height="250"
          size="mini"
          :data="tableData"
          >
          <el-table-column label="直属下级盈亏" header-align="center">
            <el-table-column
              label="用户名">
              <template slot-scope="scope">
                {{ scope.row.username }}<br><a  class="color-blue" href="javascript:;" @click="checkUser(scope.row)">查看报表</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="deposit"
              label="充值总额">
              <template slot-scope="scope">
                {{scope.row.deposit | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="withdrawal"
            label="提款总额">
              <template slot-scope="scope">
                {{scope.row.withdrawal | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="turnover"
              label="投注总额">
              <template slot-scope="scope">
                {{scope.row.turnover | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="prize"
              label="中奖总额">
              <template slot-scope="scope">
                {{scope.row.prize | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="commission"
              label="返点总额">
              <template slot-scope="scope">
                {{scope.row.commission | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="bonus"
              label="活动奖金总额">
              <template slot-scope="scope">
                {{scope.row.bonus | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="daily_salary"
              label="日工资总额">
              <template slot-scope="scope">
                {{scope.row.daily_salary | fAmount}}
              </template>
            </el-table-column>
            <el-table-column
              prop="profit"
              label="总盈亏">
              <template slot-scope="scope">
                <span v-if="scope.row.isPositive" class="color-green">{{scope.row.profit | fAmount}}</span>
                <span v-if="!scope.row.isPositive" class="color-red">{{scope.row.profit | fAmount}}</span>
                <span></span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-table
          size="mini"
          :show-header="false"
          border
          row-class-name="background-yellow"
          :data="selfData">
          <el-table-column
            label="用户名">
            <template slot-scope="scope">
              <span v-if="form.username!=''">{{form.username}}</span>
              <span v-else>{{userInfo.username}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="total_deposit"
            label="充值总额">
            <template slot-scope="scope">
              {{scope.row.total_deposit | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_withdrawal"
            label="提款总额">
            <template slot-scope="scope">
              {{scope.row.total_withdrawal | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_turnover"
            label="投注总额">
            <template slot-scope="scope">
              {{scope.row.total_turnover | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_prize"
            label="中奖总额">
            <template slot-scope="scope">
              {{scope.row.total_prize | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_commission"
            label="返点总额">
            <template slot-scope="scope">
              {{scope.row.total_commission | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_bonus"
            label="活动奖金总额">
            <template slot-scope="scope">
              {{scope.row.total_bonus | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_daily_salary"
            label="日工资总额">
            <template slot-scope="scope">
              {{scope.row.total_daily_salary | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_profit"
            label="总盈亏">
            <template slot-scope="scope">
              <span v-if="selfData[0].isPositive" class="color-green">{{scope.row.total_profit | fAmount}}</span>
              <span v-if="!selfData[0].isPositive" class="color-red">{{scope.row.total_profit | fAmount}}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          border
          class="allTable"
          :show-header="false"
          :data="allData"
          :class="{isPositive:allData[0].isPositive}"
          row-class-name="background-blue"
          size="mini">
          <el-table-column
            label="合计">
            <template slot-scope="scope">
              合计
            </template>
          </el-table-column>
          <el-table-column
            prop="total_deposit"
            label="充值总额">
            <template slot-scope="scope">
              {{scope.row.total_deposit | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_withdrawal"
            label="提款总额">
            <template slot-scope="scope">
              {{scope.row.total_withdrawal | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_turnover"
            label="投注总额">
            <template slot-scope="scope">
              {{scope.row.total_turnover | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_prize"
            label="中奖总额">
            <template slot-scope="scope">
              {{scope.row.total_prize | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_commission"
            label="返点总额">
            <template slot-scope="scope">
              {{scope.row.total_commission | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_bonus"
            label="活动奖金总额">
            <template slot-scope="scope">
              {{scope.row.total_bonus | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_daily_salary"
            label="日工资总额">
            <template slot-scope="scope">
              {{scope.row.total_daily_salary | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_profit"
            label="总盈亏">
            <template slot-scope="scope">
              {{scope.row.total_profit | fAmount}}
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
    <a class="shadow-box-refresh" href="javascript:;" @click="getTableData">刷新</a>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>

</template>

<script>
  import QuickTime from '../../../../../components/util/QuickTime'
  import TeamListAll from '../../../../../components/util/TeamListAll'

  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import {fAmount} from '../../../../../util/util'
  export default {
    name: 'page-profit',
    components: {
      QuickTime,
      TeamListAll
    },
    data() {
      return {
        form:{
          dateRange: null,
          type: 2,
          username: '',
          parentId: ''
        },
        tableData:[],
        selfData: [{isPositive:true}],
        allData: [{isPositive:true}],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        isPositive: true,
        selectShow: false,
        pathArray: []
      }
    },
    computed: {
      hasDate:function(){
        if(this.tableData.length>0){
          if(this.tableData[0].date!= undefined){
            return true
          }else{
            return false
          }
        }else{
          return true
        }
      },
      ...mapState('common',['userInfo']),
    },
    methods: {
      closeSelect(){
        this.selectShow = false
      },
      showSelect(){
        this.selectShow = true
      },
      selectedTeamUser(data){
        this.form.username = data
      },
      showTime(val){
        this.form.dateRange = val
      },
      backMyteam(){
        this.form.username = ''
        this.pathArray = []
        this.getTableData()
      },
      checkUser(item){
        this.form.username = item.username
        this.pathArray.push({username:item.username})
        this.getTableData()
      },
      searchByBread(name,key){
        this.form.username = name
        this.pathArray.splice(key+1)
        this.getTableData()
      },
      getTableData(){
        this.loading = true
        var param = {
          action:'getTeamGameTypeProfits',
          date_from: this.form.dateRange ? this.form.dateRange[0]:'',
          date_to: this.form.dateRange ? this.form.dateRange[1]:'',
          page: this.currentPage,
          username: this.form.username,
          sum_type: 2,
          game_type: 1
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          this.loading = false
          if(data.errno == 0){
            this.count = data.data.list.total
            this.tableData = [...data.data.list.data]

            this.tableData.map((value,index,array)=>{
              if(Number(value.profit)<0){
                this.tableData[index].isPositive = false
              }else{
                this.tableData[index].isPositive = true
              }
            })

            var selfData = data.data['self-sum-info']
            if(Number(selfData.total_profit)<0){
              selfData.isPositive = false
            }else{
              selfData.isPositive = true
            }
            this.selfData = [selfData]

            var allData = data.data['agent-sum-info']
            if(Number(allData.total_profit)<0){
              allData.isPositive = false
            }else{
              allData.isPositive = true
            }
            this.allData = [allData]

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
      handleCheck(row){
        this.form.parentId = row.user_id
        this.getTableData()
      },
      showNodePath(nodePath){
        var arr = []
        for (let i in nodePath) {
          arr.push(nodePath[i]);
        }

        this.pathArray = arr

      }
    },
    mounted() {

    },
    created() {
      if(this.$route.query.hasOwnProperty('name')){
        this.form.username = this.$route.query.name
      }
      this.getTableData()

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-profit {
  .main-content {
    padding: 10px 15px;
    .table-content {
    }
    .first-line{
      .el-table__body{
        tr{
          &:first-child{
            display: none;
          }
        }
      }

    }
    .table-filter {
      position: relative;
      .select-box {
        z-index: 10;
        position: absolute;
        right: 240px;
        top: 0px;
      }
    }
  }
}
</style>

<style lang="scss">
  .page-profit {
    .main-content {
      padding: 10px 15px;
      .table-content {
      }
      .first-line{
        .el-table__body{
          tr{
            &:first-child{
              display: none;
            }
          }
        }
        .el-table__header-wrapper{
          tr{
            &:nth-child(2){
              display: none;
            }
          }
        }
      }
    }
    .allTable{
      tr{
        td:nth-child(9){
          color: #c90000
        }
      }
    }
    .isPositive{
      tr{
        td:nth-child(9){
          color: #278617;
        }
      }
    }
    .background-yellow {
      background: #ffecae;
    }
    .background-blue{
      background: #bceaff;
    }
    .s-breadcurm {
      span:last-child {
        color: #0A82FC;
        .el-breadcrumb__separator{
          display: none;

        }
      }
    }
  }
</style>


