<template>
  <section class="components-game-detail">
    <div class="letter-main">
      <el-button icon="el-icon-arrow-left" size="mini" @click="closeDetail">返回列表</el-button>
      <h3 class="lottery-info-number">{{detail.lottery}}  第<span>{{detail.issue}}</span>期</h3>
      <div class="item-center can-select">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>开奖信息</span>
          </div>
          <div class="item-info">
            <div class="item-info-balls">
              <h4>开奖号码</h4>
              <div class="item-info-balls-right">
                <div v-if="detail.formatted_status=='未中奖'">
                  <span class="ball" v-for="item in detail.splitted_winning_number">{{item}}</span>
                </div>
                <div v-if="detail.formatted_status=='已撤销'">
                  <span class="ball">已</span>
                  <span class="ball">撤</span>
                  <span class="ball">销</span>
                </div>
                <div v-if="detail.formatted_status=='待开奖'">
                  <span class="ball">待</span>
                  <span class="ball">开</span>
                  <span class="ball">奖</span>
                </div>
                <div v-if="detail.formatted_status=='已中奖'">
                  <span class="ball" v-for="item in detail.splitted_winning_number">{{item}}</span>
                </div>
              </div>
            </div>
            <div class="item-info-balls">
              <h4>投注号码</h4>
              <div class="item-info-balls-right">
                <p>
                  <el-input
                    type="textarea"
                    :rows="1"
                    disabled
                    v-model="detail.bet_number">
                  </el-input></p>
              </div>
            </div>
            <div class="item-info-balls">
              <h4>中奖注数</h4>
              <div class="item-info-balls-right">
                {{detail.won_count}}
              </div>
            </div>
            <div class="item-info-balls">
              <h4>中奖金额</h4>
              <div class="item-info-balls-right">
                <span class="color-red">{{detail.prize}} 元</span>
              </div>
            </div>
            <div class="item-info-balls">
              <h4>注单编号</h4>
              <div class="item-info-balls-right">
                {{detail.serial_number}}
              </div>
            </div>
            <!--<div class="item-info-balls">-->
              <!--<h4>注单ID</h4>-->
              <!--<div class="item-info-balls-right">-->
                <!--{{detail.id}}-->
              <!--</div>-->
            <!--</div>-->

          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>投注信息</span>
          </div>
          <div class="item-info">
            <p><label>玩法</label>{{detail.way}}</p>
            <p><label>奖金组</label>{{detail.prize_group}}</p>
            <p><label>奖金标准</label><el-input
              class="item-textarea"
              type="textarea"
              :rows="2"
              disabled
              v-model="detail.prize_set_formatted">
            </el-input></p>
            <p><label>投注金额</label><dfn>￥</dfn><span data-money-format=""><i>{{detail.amount}}</i></span></p>
            <p><label>倍数</label>{{detail.multiple}}倍</p>
            <p><label>注数</label>{{detail.bet_count}}注</p>
            <p><label>货币模式</label>{{detail.formatted_coefficient}}</p>
            <p><label>投注时间</label><span class="c-red">{{detail.bought_at}}</span></p>
            <p><label>状态</label>
              <span class="c-red">{{detail.formatted_status}}</span>
              <el-button v-if="detail.formatted_status == '待开奖'"  @click="handleDrop()" type="danger" size="mini">撤单</el-button>
            </p>
          </div>
        </el-card>


      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'components-game-detail',
    components: {

    },
    props: {
      gameId: {
        type: Number,
        default() {
          return 0;
        }
      },
    },
    data() {
      return {
        tableData: [],
        detail: {
          splitted_winning_number: '',
          way: '',
          prize: '',
          issue: '',
          username: '',
          prize_group: '',
          bet_number: '',
          prize_set_formatted: '',
          amount: '',
          multiple: '',
          bet_count: '',
          formatted_coefficient: '',
          bought_at: '',
          formatted_status: '',
        },
        currentTitle: '',
        currentTime: '',
        currentContent: ''
      };
    },
    methods: {
      closeDetail(){
        this.$emit('eventGameDetail')
      },
      showDetail(){
        var param = {
          action: 'getProjectDetail',
          id: this.gameId
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.detail = {...data.data}
          }else{
            this.closeDetail()
            this.$message({
              type: 'error',
              message: data.error
            })
          }
        })
      },
      handleDrop(){
        this.$confirm('您确认要撤单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDropProject()

        }).catch(() => {
        });
      },
      doDropProject(){
        let data = {
          action: 'dropProject',
          id: this.detail.id
        };
        this.axios.post('/service',data).then((data)=>{
          if(data.errno == 0){
            this.closeDetail()
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
      this.showDetail()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-game-detail {
    background: #fff;
    height: 440px;
    .lottery-info-number {
      text-align: center;
      margin-top: -20px;
      span {
        color: red;
      }
    }
    .item-center {
      display: flex;
      line-height: 32px;
      .box-card {
        flex: 1;
        margin: 10px;
      }
      .item-info {
        p {
          border-bottom: 1px #ddd dashed;
        }
        label {
          width: 100px;
          display: inline-block;
        }
        .item-textarea {
          width: 350px;
          vertical-align: top;
          margin: 4px 0;
        }
      }
      .item-info-balls {
        margin-bottom: 20px;
        display: flex;
        h4{
          flex: 1;
        }
        .item-info-balls-right{
          flex:3;
        }
        .ball {
          display: inline-block;
          width: 45px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          border-radius: 50%;
          color: #fff;
          font-size: 26px;
          margin: 0 2px;
          background: #f36e3d;
          box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.47);

        }
      }
    }

  }
</style>

