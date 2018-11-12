<template>
  <section class="page-agent">
    <div class="total-number">
      <ul class="clear">
        <li>
          <span class="icon"><img src="../../../../../assets/account/money-back.png"></span>
          <dl>
            <dt>今日盈亏</dt>
            <dd>¥{{sum_today.profit | fAmount}}</dd>
          </dl>
        </li>
        <li>
          <span class="icon"><img src="../../../../../assets/account/rating.png"></span>
          <dl>
            <dt>团队人数</dt>
            <dd >{{Number(sum_today.team_agent_num)+ Number(sum_today.team_player_num)}}人</dd>
            <dd class="amount">[代理{{sum_today.team_agent_num}}人 玩家{{sum_today.team_player_num}}人]</dd>
          </dl>
        </li>
        <li>
          <span class="icon"><img src="../../../../../assets/account/global.png"></span>
          <dl>
            <dt>团队余额</dt>
            <dd>¥{{sum_today.team_balance | fAmount}}</dd>
          </dl>
        </li>
        <li>
          <span class="icon"><img src="../../../../../assets/account/man.png"></span>
          <dl>
            <dt>今日登录</dt>
            <dd>{{sum_today.login_num}}人</dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="chart">
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
            <quick-time :isDefault = "false" @eventChangTime="showTime"></quick-time>
          </el-form-item>
          <el-form-item>
            <a class="search-btn right" href="javascript:;"  @click="getTableData">搜索</a>
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-header">
        <ul class="clear">
          <li  @click="showChart('recharge')">
            <dl>
              <dt><i class="icon-coins"></i></dt>
              <dd><b>￥{{total_recharge | fAmount}}</b>团队充值</dd>
            </dl>
          </li>
          <li @click="showChart('withdrawal')">
            <dl>
              <dt><i class="icon-credit-card"></i></dt>
              <dd><b>￥{{total_withdrawal | fAmount}}</b>团队提现</dd>
            </dl>
          </li>
          <li @click="showChart('bet')">
            <dl>
              <dt><i class="icon-three-cards"></i></dt>
              <dd><b>￥{{total_bet | fAmount}}</b>团队投注</dd>
            </dl>
          </li>
          <li @click="showChart('prize')">
            <dl>
              <dt><i class="icon-trophy"></i></dt>
              <dd><b>￥{{total_prize | fAmount}}</b>团队中奖</dd>
            </dl>
          </li>
          <li @click="showChart('activity')">
            <dl>
              <dt><i class="icon-gift"></i></dt>
              <dd><b>￥{{total_activity | fAmount}}</b>团队活动</dd>
            </dl>
          </li>
          <li @click="showChart('rebet')">
            <dl>
              <dt><i class="icon-gift-card"></i></dt>
              <dd><b>￥{{total_rebet | fAmount}}</b>团队返点</dd>
            </dl>
          </li>
        </ul>
      </div>
      <div id="myChart" style="width: 1066px; height: 328px;"></div>
    </div>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>

<script>

  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  import QuickTime from '../../../../../components/util/QuickTime'

  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'

  export default {
    name: 'page-agent',
    components: {
      QuickTime
    },
    data() {
      return {
        form:{
          dateRange:null,
        },
        sum_today:{
          deposit:"",
          login_num: 0,
          prize: "",
          profit: "",
          team_balance: "",
          team_num: 0,
          turnover: "",
          username: "",
          withdrawal: "",
          team_agent_num: "",
          team_player_num: "",
        },
        chartsData:{
          date: [],
          moneyArray: []
        },
        mychart:{},
        isPositive: false,
        interval_data: {
          date: [],
          recharge: [],
          withdrawal: [],
          bet: [],
          prize: [],
          activity: [],
          rebet: [],
        }
      }
    },
    computed: {
      ...mapState('common',['userInfo']),

      total_recharge: function(){
        if(this.interval_data.recharge.length>0){
          return this.interval_data.recharge.reduce(function(prev, curr, idx, arr){
            return Number(prev) + Number(curr);
          });
        }

      },
      total_withdrawal: function(){
        if(this.interval_data.withdrawal.length>0) {
          return this.interval_data.withdrawal.reduce(function (prev, curr, idx, arr) {
            return Number(prev) + Number(curr);
          });
        }
      },
      total_bet: function(){
        if(this.interval_data.bet.length>0) {
          return this.interval_data.bet.reduce(function (prev, curr, idx, arr) {
            return Number(prev) + Number(curr);
          });
        }
      },
      total_prize: function(){
        if(this.interval_data.prize.length>0) {
          return this.interval_data.prize.reduce(function (prev, curr, idx, arr) {
            return Number(prev) + Number(curr);
          });
        }
      },
      total_activity: function(){
        if(this.interval_data.activity.length>0) {
          return this.interval_data.activity.reduce(function (prev, curr, idx, arr) {
            return Number(prev) + Number(curr);
          });
        }
      },
      total_rebet: function(){
        if(this.interval_data.rebet.length>0) {
          return this.interval_data.rebet.reduce(function (prev, curr, idx, arr) {
            return Number(prev) + Number(curr);
          });
        }
      },

    },
    methods: {
      ...mapActions('common',['getUserInfo']),
      showTime(val){
        this.form.dateRange = val
      },
      formateStart(date){
        let result = new Date(date)
        return result.Format("yyyy-MM-dd")
      },
      formateEnd(date){
        let result = new Date(date)
        return result.Format("yyyy-MM-dd")
      },
      getDefaultDate(){
        var myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 7);
        this.form.dateRange = [this.formateStart(myDate),this.formateEnd(new Date())]
      },

      showChart(type){
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        this.date = [];
        this.data = [];
        for (var i = 1; i < 10; i++) {
          var now = new Date(base += oneDay);
          this.date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
          this.data.push(Math.round((Math.random()) * 20 ));
        }
        let option = {
          xAxis: {
            data: this.interval_data.date
          },
          series: [
            {
              data: this.interval_data[type]
            }
          ]
        };
        this.mychart.setOption(option)
      },
      getMyReport(){
        this.axios.get('/service',{params:{
            action: 'getContract'
          }}).then((data)=>{
          if(data.errno == 0){
            var obj = data.data
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getTableData(){
        var param = {
          action:'GetTeamGameProfitsHome',
          date_from: this.form.dateRange ? this.form.dateRange[0]:'',
          date_to: this.form.dateRange ? this.form.dateRange[1]:'',
          username: this.userInfo.username,
          sum_type: 0,
          game_type: 0,
          parent_user_id: this.form.parentId
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.sum_today = {...data.data.sum_today}
            this.interval_data = {...data.data.interval_data}
            this.showChart('recharge')
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
    },
    mounted() {
      this.getUserInfo().then(()=>{
        this.getDefaultDate()
        this.getTableData()
      })
      this.mychart = echarts.init(document.getElementById('myChart'))
      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];
      var data = [Math.random() * 300];
      for (var i = 1; i < 10; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      let option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#3dc1ff',
          padding: [10,15],
          formatter: '{b}<br /><span style="font-size: 18px;color: #fff">¥{c}</span>',
          extraCssText: 'text-align:center;font-size:12px;',
          position: function (pt) {
            return [pt[0]-52, '10%'];
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name:'数据',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(255, 70, 131)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                }, {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }])
              }
            },
            data: []
          }
        ]
      };
      this.mychart.setOption(option)
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-agent {
  .total-number {
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
    padding: 20px;
    ul {
      width: 100%;
      li {
        float: left;
        width: 25%;
        padding-left: 40px;
        position: relative;
        &:after{
          content: '';
          height: 30px;
          width: 1px;
          background: #efefef;
          position: absolute;
          right: 0;
          top: 0;
        }
        &:last-child:after{
          display: none;
        }
        .icon {
          width: 42px;
          margin-right: 10px;
          float: left;
          img {
            width: 100%;
          }
        }
        dl {
          float: left;
          dt{
            font-size: 14px;
          }
          dd{
            font-size: 18px;
            font-weight: 700;
            line-height: 26px;
          }
          .amount {
            font-size: 14px;
          }
        }
      }
    }
  }
  .chart {
    background: #fff;
    .chart-header {
      width: 100%;
      ul {
        padding: 0 5px;
        text-align: center;
        letter-spacing: 10px;
        li {
          letter-spacing: normal;
          display: inline-block;
          dl{
            min-width: 112px;
            padding: 5px 7px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            border: 1px solid #0fb0dd;
            background: #e6f7fc;
            cursor: pointer;
            dt{
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              height: 24px;
              width: 24px;
              line-height: 24px;
              display: inline-block;
              text-align: center;
              vertical-align: middle;
              color: #fff;
              background: #0dafde;
            }
            dd{
              display: inline-block;
              vertical-align: middle;
              padding-left: 8px;
              font-size: 14px;
              b{
                display: block;
                font-size: 12px;
                margin-left: -4px;
              }
            }

          }
          $dl: (2: #f1f8f3 #71be8a, 3: #fff6f1 #ffab75, 4: #fffaeb #fbcd3b,5:#fff0f0 #ff7069 ,6: #fbf0f8 #da70bc);
          @each $num,$color in $dl {
            &:nth-child(#{$num}) {
              dl{
                background-color: nth($color, 1);
                border-color: nth($color, 2);
                dt {
                  background: nth($color, 2);
                }
              }

            }
          }
        }
      }
    }

    #myChart {
      margin: 0 auto;
    }
  }
}
</style>

