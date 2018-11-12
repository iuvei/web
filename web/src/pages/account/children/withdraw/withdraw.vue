<template>
  <section class="page-withdraw">
    <h3 class="shadow-title">提现申请</h3>
    <div class="table-content" >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" v-show="!confirm" class="form-center"  @submit.native.prevent>
        <el-form-item label="可提现余额">
          <span class="color-pink">{{userInfo.withdrawable}}</span>
        </el-form-item>
        <el-form-item label="收款银行卡" prop="bankcard">
          <el-select v-model="form.bankcard" placeholder="请选择" @change="doCheckoutWithdrawal">
            <el-option
              v-for="item,key in bankcardList"
              :key="key"
              :label="item.bank+'  '+item.account"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现金额" prop="amount">
          <el-input-number v-model.trim="form.amount" :controls="false" :min="100" :max="max" class="el-input-number-no-controls"></el-input-number>
        </el-form-item>
        <p class="form-p">单笔最低提现金额：100.00元，最高{{withdrawalRules.max_amount | fAmount}}元</p>
        <el-form-item>
          <el-button type="primary" @click="checkConfirm">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="currentBankCard!=null && confirm" :model="form" ref="form2" :rules="rules" size="mini" label-width="120px" class="form-center">
        <el-form-item label="用户名">
          <span>{{userInfo.username}}</span>
        </el-form-item>
        <el-form-item label="可提现金额">
          <span>{{userInfo.withdrawable}}</span>
        </el-form-item>
        <el-form-item label="本次提现金额">
          <span>{{form.amount}}</span>
        </el-form-item>
        <el-form-item label="开户银行">
          <span>{{currentBankCard.bank}}</span>
        </el-form-item>
        <el-form-item label="开户地址">
          <span>{{currentBankCard.branch_address}}</span>
        </el-form-item>
        <el-form-item label="开户人">
          <span>{{currentBankCard.account_name}}</span>
        </el-form-item>
        <el-form-item label="提现银行卡号">
          <span>{{currentBankCard.account}}</span>
        </el-form-item>
        <el-form-item label="验证资金密码" prop="password">
          <el-input type="password" v-model="form.password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doConfirm">确定</el-button>
        </el-form-item>
      </el-form>
      <el-card class="box-tips">
        <div slot="header" class="clearfix">
          <span>温馨提示</span>
        </div>
        <p class="text-p">
          <i class="el-icon-info"></i>提取余额到银行卡<br>
          1,每天提现时间为 {{withdrawalRules.allow_time}};
          2,单笔最低提现金额为{{withdrawalRules.min_amount}}元人民币;
          3,单笔最高提现金额为{{withdrawalRules.max_amount}}元人民币;
          4,每日提现次数最多为{{withdrawalRules.withdraw_limit_times}}次。
        </p>
        <p class="text-p">
          <i class="el-icon-info"></i>今日已提现次数：<span class="color-pink">{{withdrawalRules.withdraw_times}}/{{withdrawalRules.withdraw_limit_times}}</span>
        </p>
      </el-card>
    </div>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>
<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'withdraw',
    components: {
    },
    data() {
      var checkAmount = (rule, str, callback) => {
        var value = Number(str)
        if (value >Number(this.userInfo.withdrawable)) {
          callback(new Error('提现余额超过可提现余额'))
        } else {
          callback()
        }
      };
      return {

        form:{
          amount:null,
          password: null,
          bankcard: null
        },
        rules: {
          amount: [
            { required: true, message: '余额不能为空'},
            { validator: checkAmount, trigger: 'change'}
          ],
          bankcard: [
            { required: true, message: '请选择收款银行卡'},
          ],
          password: [
            { required: true, message: '请输入资金密码'},
          ]
        },
        withdrawalRules: {
          min_amount: '',
          max_amount: '',
          withdraw_limit_times: '',
          withdraw_times: 0,
          allow_time: ''
        },
        currentBankCard: null,
        confirm: false,
        countdownStr: '',
        timer: null
      };
    },
    computed: {
      max: function(){
        if(this.withdrawalRules.max_amount != ''){
          return Number(this.withdrawalRules.max_amount)
        }else{
          return 0
        }
      },
      ...mapState('bankcard',['bankcardList']),
      ...mapState('common',['userInfo']),
      ...mapGetters('common',['canWithdrawal','hasBankCard'])
    },
    methods: {
      ...mapActions('common',['getUserInfo']),
      checkConfirm(){
        this.$refs['form'].validate((valid) => {
            if (valid) {
                this.confirm = true
            }
        })
      },
      getWithdrawalRules(){
        this.axios.get('/service',{params:{
          action: 'getWithdrawalRules'
        }}).then((data)=>{
          if(data.errno == 0){
            this.withdrawalRules = {...data.data}
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      doConfirm(){
        this.$refs['form2'].validate((valid) => {
          if (valid) {
            let data = {
              action: 'withdraw',
              bankcard_id: this.form.bankcard,
              amount: this.form.amount,
              fund_password: this.form.password
            };
            this.axios.post('/service',data).then((data)=>{
              if(data.errno == 0){
                this.$message({
                  type: 'success',
                  message: '恭喜您，提现申请成功！'
                });
                this.confirm = false

              }else{
                this.$message({
                  type: 'error',
                  message: data.error
                });
              }
            })
          }
        })

      },
      doCheckoutWithdrawal(){
        let withdrawlTime
        this.bankcardList.map((val,num,array)=>{
           if(val.id == this.form.bankcard){
             this.currentBankCard = val
             withdrawlTime = val.intended_withdrawal_at
             this.countdown(withdrawlTime)
           }
        })
      },
      countdown(val){
        let now = new Date()
        let cardTime = new Date(val)
        if (now.getTime() < cardTime.getTime()) {
          let withdrawalTime = (now.getTime() / 1000) - (cardTime.getTime() / 1000);
          function _cover(num) {
            var n = parseInt(num, 10);
            return n < 10 ? '0' + n : n;
          }
          if(this.timer==null){

          }else{
            clearInterval(this.timer)
          }
          this.timer = setInterval(function(){
            withdrawalTime--
            let day= _cover(parseInt(withdrawalTime/(24*60*60))),
              h= _cover(parseInt(withdrawalTime/(60*60)%24)),
              m= _cover(parseInt(withdrawalTime/60%60)),
              s= _cover(parseInt(withdrawalTime%60));
            this.countdownStr = day+'天'+h+'小时'+m+'分'+s+'秒'
          },1000)
        }
      },
    },
    created() {
      this.getUserInfo().then(()=>{
        if(!this.hasBankCard){
          this.$router.replace('/account/shadow/bankcard?origin=withdraw')
        }
      })
      if(this.canWithdrawal){
        this.$emit("eventSize",true)
        this.getWithdrawalRules()
      }else{
        this.$router.go(-1)
        this.$message.error('禁止提现！');
      }
    },
    mounted(){

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-withdraw {
    background: #fff;
    .form-p {
      font-size: 14px;
      line-height: 20px;
      margin-bottom:10px;
    }
    .box-tips {
      background: #f1ece2;
      width: 260px;
      position: absolute;
      left: 0;
      top: 40px;
      .text-p {
        font-size: 12px;
        margin-bottom: 12px;
        position: relative;
        padding-left: 16px;
        i {
          top: 3px;
          left: 0;
          position: absolute;
        }
      }
    }
  }
</style>
