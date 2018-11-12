<template>
  <section class="components-profile">
    <div class="profile-warp clear">
      <div class="percentage left">
        <canvas class="canvas" id="process"></canvas>
      </div>
      <div class="safe-status left">
        <p>安全系数:<span class="color-red">{{rate}}%</span><span class="icon icon-waring"></span></p>
        <p><el-button @click="gotoSetting" v-if="rate!=100" size="small" round><span class="icon-shield2"></span>提升</el-button></p>
      </div>
    </div>
    <div class="profile-warp">
      <dl class="balance">
        <dt>账户余额：</dt>
        <dd>¥
          <el-tooltip effect="dark" :content="userInfo.available" placement="top">
            <b class="tooltip">{{userInfo.available}}</b>
          </el-tooltip>
        </dd>
      </dl>
    </div>
    <div class="profile-warp no-border">
      <p>
        <router-link class="profile-btn charge" to="/account/shadow/deposite"><span class="icon-smartphone1"></span>充值</router-link>
        <router-link class="profile-btn withdraw" to="/account/shadow/withdraw"><span class="icon-atm-machine"></span>提现</router-link>
      </p>
      <ul class="balance-list">
        <li><span>彩票余额:</span><b>{{userInfo.available}}</b></li>
        <li><span>电子余额:</span><b class="color-red">系统未开通</b></li>
        <li><span>真人余额:</span><b class="color-red">系统未开通</b></li>
        <li><span>棋牌余额:</span><b class="color-red">系统未开通</b></li>
      </ul>
      <p>
        <a style="display: none" href="javascript:;" class="profile-btn transfer">游戏转账</a>
      </p>
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'Profile',
    components: {

    },
    data () {
      return {
        radio: 1
      }
    },
    computed:{
      ...mapState('common',['userInfo','rate','rateOperate']),
      statusText: function(){
        var text = '低'
        var rate = Number(this.rate)
        if(rate>50&&rate<100){
          text = '中'
        }
        if(rate == 100){
          text = '高'
        }
        return text
      },
      upLink: function(){
        var opt = this.rateOperate
        if(opt.hasOwnProperty('bank_card')){
          return '/account/shadow/bankcard'
        }
        if(opt.hasOwnProperty('fund_password')){
          return '/account/shadow/password?type=funds'
        }
        if(opt.hasOwnProperty('real_name')){
          return '/account/shadow/password?type=name'
        }
        if(opt.hasOwnProperty('security')){
          return '/account/shadow/password?type=security'
        }
        return ''
      }
    },
    watch:{
    },
    methods: {
      ...mapActions('common',['getSecurityRate']),
      gotoSetting(){
        this.$router.push(this.upLink)
      },
      setPercentage(per,text){
        var c = document.getElementById('process'),
          process = 0,
          ctx = c.getContext('2d'),
          per = per || 0,
          text = text || '低';
          ctx.canvas.width = 90
          ctx.canvas.height = 100

        // 画灰色的圆
        ctx.beginPath();
        ctx.arc(38, 38, 33, 0, Math.PI*2);
        ctx.lineWidth = 10;
        ctx.fillStyle = '#ccc';
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
        ctx.fill();

        function animate(){
          requestAnimationFrame(function (){
            process = process + 1;
            drawCricle(ctx, process);
            if (process < per) {
              animate();
            }else{
              // 画小的圆
              ctx.beginPath();
              ctx.arc(70, 70, 11, 0, Math.PI*2);
              ctx.fillStyle = '#1e83c2'
              ctx.fill()
              ctx.beginPath();
              ctx.font = "8pt Microsoft YaHei";
              ctx.fillStyle = '#fff';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.shadowBlur= 10;
              ctx.shadowColor="#2c7fd3";
              ctx.fillText(text, 70, 70);
            }
          });

        }

        function drawCricle(ctx, percent){
          // 画进度环
          ctx.beginPath();
          ctx.moveTo(38, 38);
          ctx.arc(38, 38, 33, Math.PI * 1.5, Math.PI * (1.5 + 2 * percent / 100 ));
          ctx.lineWidth = 10;
          var grd=ctx.createLinearGradient(0,0,0,76);
          grd.addColorStop(0,"#1eafc3");
          grd.addColorStop(1,"#1880c1");
          ctx.strokeStyle = grd;
          ctx.stroke();
          // 画内填充圆
          ctx.beginPath();
          ctx.arc(38, 38, 30, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();

          // 填充文字
          ctx.beginPath();
          ctx.font = "8pt Microsoft YaHei";
          ctx.fillStyle = '#212121';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(process + '%', 38, 38);
        }
        animate();
      }
    },
    created() {
        this.getSecurityRate().then(()=>{
          this.setPercentage(this.rate,this.statusText)
        })
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../scss/variables.scss';
  .components-profile {
    background: #fff;
    .profile-warp {
      padding: 18px 0  18px 18px;
      border-bottom: 1px solid #d2d1d2;
      .percentage {
        height: 100px;
        width: 102px;
        .canvas {
        }
      }
      .safe-status {
        width: 130px;
        span {
          color: #1e83c2;
        }
      }
      .balance {
        font-size: 24px;
        dt {
          line-height: 40px;
        }
        dd {
          font-weight: 900;
          line-height: 40px;
          b{

          }
        }
        .tooltip{
          width: 212px;
          font-size: 35px;
          padding-left: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .balance-list {
        min-height: 292px;
        li {
          padding-left: 18px;
          line-height: 36px;
          border-radius: 18px;
          background: #ebeef4;
          margin-bottom: 15px;
          span {
            display: inline-block;
            width: 70px;
            color: #808a92;
          }
        }
      }
      p {
        text-align: center;
        padding: 10px 0;
      }
      .profile-btn {
        width: 106px;
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        display: inline-block;
        text-align: center;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        color: #fff;
        box-shadow: 0 0 8px rgba(255,49,93,.4);
        @include linear-gradient(to right,#ff6893, #ff9b72);
        &.withdraw {
          box-shadow: 0 0 8px rgba(49,170,255,.4);
          @include linear-gradient(to right,#5ad7f7, #a7eed1);
        }
        &.transfer {
          box-shadow: 0 0 8px rgba(212,180,154,.4);
          background: #d4b49a;
          width: 180px;
          height: 48px;
          line-height: 48px;
          -webkit-border-radius: 24px;
          -moz-border-radius: 24px;
          border-radius: 24px;
        }
        span{
          font-size: 30px;
          margin-right: 6px;
        }
      }
    }
    .no-border {
      border: none;
      padding: 18px;
    }
  }

</style>
