<template>
  <section class="page-profit">
    <h3 class="shadow-title">个人报表</h3>
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
          <el-form-item>
            <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
          </el-form-item>
        </el-form>
      </div>
      <div >
        <el-table
          size="mini"
          border
          :data="tableData">
          <el-table-column
            label="用户名">
            <template slot-scope="scope">
              {{userInfo.username}}
            </template>
          </el-table-column>
          <el-table-column
            label="充值总额">
            <template slot-scope="scope">
              {{scope.row.deposit | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_withdrawal"
            label="提款总额">
            <template slot-scope="scope">
              {{scope.row.withdrawal | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_turnover"
            label="投注总额">
            <template slot-scope="scope">
              {{scope.row.turnover | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_prize"
            label="中奖总额">
            <template slot-scope="scope">
              {{scope.row.prize | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_commission"
            label="返点总额">
            <template slot-scope="scope">
              {{scope.row.commission | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_bonus"
            label="活动奖金总额">
            <template slot-scope="scope">
              {{scope.row.bonus | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_daily_salary"
            label="日工资总额">
            <template slot-scope="scope">
              {{scope.row.daily_salary | fAmount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="total_profit"
            label="总盈亏">
            <template slot-scope="scope">
              <span v-if="selfData[0].isPositive" class="color-green">{{scope.row.profit | fAmount}}</span>
              <span v-if="!selfData[0].isPositive" class="color-red">{{scope.row.profit | fAmount}}</span>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
    <a class="shadow-box-refresh" href="javascript:;" @click="getTableData">刷新</a>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>

</template>

<script>
  import QuickTime from '../../../../../components/util/QuickTime'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import {fAmount} from '../../../../../util/util'
  export default {
    name: 'page-profit',
    components: {
      QuickTime
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
        isPositive: true
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

      showTime(val){
        this.form.dateRange = val
      },
      getTableData(){
        this.loading = true
        var param = {
          action:'getUserGameTypeProfits',
          date_from: this.form.dateRange ? this.form.dateRange[0]:'',
          date_to: this.form.dateRange ? this.form.dateRange[1]:'',
          page: this.currentPage,
          sum_type: 2,
          game_type: 1,
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
    .table-one {
      padding-top: 150px;
    }

  }
</style>


