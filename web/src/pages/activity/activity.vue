 <template>
  <section class="page-activity">
    <h2><img src="../../assets/activity/title1.png"></h2>
    <ul class="activity-list">
      <li>
        <div class="img"><img src="../../assets/activity/act_1.jpg"></div>
        <a class="activity-link" @click="showContent('num1')" href="javascript:;"></a>
        <transition name="el-zoom-in-top">
          <div v-show="openList.num1" class="activity-content">
            <h3>活动说明</h3>
            <table>
              <tr>
                <th>签到时间</th>
                <th>投注金额</th>
                <th>赠送</th>
              </tr>
              <tr>
                <td>第一天</td>
                <td>1888元	</td>
                <td>8元</td>
              </tr>
              <tr>
                <td>第二天	</td>
                <td>5888元</td>
                <td>28元</td>
              </tr>
              <tr>
                <td>第三天</td>
                <td>8888元</td>
                <td>38元</td>
              </tr>
              <tr>
                <td>第四天</td>
                <td>18888元</td>
                <td>88元</td>
              </tr>
              <tr>
                <td>第五天</td>
                <td>38888元	</td>
                <td>128元</td>
              </tr>
              <tr>
                <td>第六天</td>
                <td>58888元</td>
                <td>238元</td>
              </tr>
              <tr>
                <td>第七天</td>
                <td>88888元</td>
                <td>358元</td>
              </tr>
              <tr>
                <td>第八天</td>
                <td>188888元	</td>
                <td>588元</td>
              </tr>
              <tr>
                <td>第九天</td>
                <td>388888元</td>
                <td>1288元</td>
              </tr>
              <tr>
                <td>第十天</td>
                <td>588888元</td>
                <td>2588元</td>
              </tr>
            </table>
            <h3>活动说明</h3>
            <ol>
              <li>活动相关制度， 每达到一阶段领取相应的奖励，期间如果出现中断，不可再继续签到，次日则需要重新来过。</li>
              <li>消费流水须在当日23:59前完成次日清零，如23:59分没有点击领取，即被视为自动放弃活动。<br>
                例：第一天消费达到1888 可领取8元，第二天若未达到5888 则无法签到，第三天则从第一天优惠开始计算。</li>
              <li>参与活动需遵守魔方娱乐平台相关规则，如发现任何利用活动或技术漏同对冲等恶意套利行为，魔方娱乐将扣除所有违规所得，并且有权
                冻结其账户。</li>
              <li>活动期间禁止一切刷佣金行为，对此平台将实时监控，玩法限制，5星大于80000注，4星大于8000注，3星大于800注，2星大于80注，定
                位胆大于8码的一律按作弊处理，严重者给予封号处理。</li>
              <li>魔方娱乐平台保留对此活动的最终解释权，并持有修改。终止等权利。</li>
            </ol>
            <p>

              <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="当日投注量">
                  <el-input v-model="turnover" disabled  placeholder="金额" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary":disabled="clickDisable" @click="takeSignEvent"  >签到</el-button>
                </el-form-item>
              </el-form>
            </p>
          </div>
        </transition>

      </li>
    </ul>
    <h2><img src="../../assets/activity/title2.png"></h2>
    <ul>
      <li>

      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'activity',
    components: {
    },
    data(){
      return {
        openList: {
          num1: true
        },
        turnover: '',
        clickDisable: false
      }
    },
    methods: {
      showContent(id){
        this.openList[id] = !this.openList[id]
      },
      getUserTurnover(){
        this.axios.get('/service',{
          params:{
            action: 'getUserTurnover',
          }
        }).then((data) => {
          if(data.errno === 0){
            this.turnover = data.data.turnover
            if(data.data.can_take == 1){
              this.clickDisable = false
            }else{
              this.clickDisable = true
            }
          }
        }).catch((error) =>{
          this.$message.error('未知错误');
        })
      },
      takeSignEvent(){
        this.axios.post('/service',{action: 'takeSignEvent'}).then((data)=>{
          if(data.errno == 0){

            this.$alert('恭喜您，签到成功！', '成功', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }else{
            this.$alert(data.error, '失败', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });

          }
        })
      }
    },
    created() {
      this.getUserTurnover()
    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  .page-activity {
    width: 1260px;
    margin: 0 auto;
    background: #ffffff;
    padding: 18px 0;
    min-height: 800px;
    h2 {
      margin-bottom: 12px;
    }
    .activity-list {
      position: relative;
      padding: 0 17px;
      li {
        margin-bottom: 28px;
        position: relative;
        .img {
          width: 100%;
          img {
            width: 100%;
            display: block;
          }
        }
        .activity-link {
          position: absolute;
          left: 0;
          top: 0;
          background: url(../../assets/activity/link.png) no-repeat;
          width: 128px;
          height: 94px;
        }
      }
    }
    .activity-content{
      padding: 1px 60px 30px;
      background: #e2f4f6 url(../../assets/activity/activitybg.jpg) no-repeat 80% 60px;
      font-size: 18px;
      line-height: 1.6em;

      h3 {
        font-size: 25px;
        margin-bottom: 10px;
        margin-top: 30px;
      }
      table {
        border-collapse:collapse;
        border: 1px solid #000000;
        text-align: center;

        td {
          border: 1px solid #000000;
          padding: 5px 0;
        }
        th {
          border: 1px solid #000000;
          font-size: 22px;
          padding: 5px 10px;
        }
      }
      ol {
        li {
          list-style: inherit;
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
