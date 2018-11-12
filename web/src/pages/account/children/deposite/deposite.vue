<template>
  <section class="page-deposite">
    <div class="deposite-channel">
      <el-menu
        :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item,key in payList" :key="key" :index="key">{{item}}</el-menu-item>
      </el-menu>
    </div>
    <div class="content-main">
      <p class="pay-tips" v-if="!showQr&&!postScript">提示：单笔充值最高限额{{currentPay.max_amount}}元，单日充值总额无上限</p>
      <p class="pay-tips" v-if="showQr||postScript">提示：请在三十分钟内完成充值 <span class="color-red">{{timerText}}</span></p>
      <el-form  ref="form" :rules="rules" :model="form" size="small" label-width="110px" class="form-center" @submit.native.prevent>
        <div class="" v-show="!showQr && !postScript">
          <el-form-item label="支付平台">
            <el-radio-group v-model="form.platform">
              <el-radio v-for="item,key in currentPayList" :key="key" :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="needBank" label="充值银行" prop="bankId">
            <el-select v-model="form.bankId" placeholder="请选择">
              <el-option
                v-for="item,key in currentPay.banks"
                :key="key"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="充值金额" :error="amountError">
            <el-input v-model.trim="form.amount"></el-input>
          </el-form-item>
          <el-form-item v-if="currentPay.payment_type_id == 9" label="入款人姓名" prop="payname">
            <el-input v-model.trim="form.payname"></el-input>
          </el-form-item>
          <el-form-item label="充值限额">
            {{currentPay.min_amount}} - {{currentPay.max_amount}} (元)
          </el-form-item>
          <el-form-item label="手续费用">
            <span v-if="Number(currentPay.fee)>0">
              充值{{form.amount}}元，手续费{{(Number(currentPay.fee)*form.amount).toFixed(2)}}元，实际到账{{(Number(form.amount)-Number(currentPay.fee)*form.amount).toFixed(2)}}元
            </span>
            <span v-else>免手续费</span>
          </el-form-item>
          <el-form-item>
            <a class="g-btn" :class="{small: isNotFree}" @click="onSubmit">开始充值</a>
            <a v-if="isNotFree" href="###" @click="gotoFree">免手续费通道</a>
          </el-form-item>
        </div>
        <div class="qr-box" v-show="showQr">
          <p>充值金额：{{form.amount}} 元</p>
          <p><img v-show="qrImg!=''" :src="qrImg"></p>
          <p><el-button type="primary" @click="closeQrCode">充值完成</el-button></p>
        </div>

        <div class="" v-show="postScript">
          <el-form-item label="收款账号">
            <span class="can-select">{{postscriptForm.account}}</span>
            <el-button
              size="mini"
              v-clipboard:copy="postscriptForm.account"
              v-clipboard:success="copySuccess"
              v-clipboard:error="onError"
              type="primary">复制</el-button>
          </el-form-item>
          <el-form-item label="收款姓名">
            <span class="can-select">{{postscriptForm.account_name}}</span>
          </el-form-item>
          <el-form-item label="银行">
            <span class="bank-logo ico-bank" :class="postscriptForm.bank_identifier"></span>({{postscriptForm.bank_name}} )
          </el-form-item>

          <el-form-item v-if="currentPay.payment_type_id == 9" label="入款人姓名">
            <span class="color-red big-font can-select">{{form.payname}}</span>
            <el-button
              size="mini"
              v-clipboard:copy="form.payname"
              v-clipboard:success="copySuccess"
              v-clipboard:error="onError"
              type="primary">复制</el-button>
          </el-form-item>
          <el-form-item v-if="currentPay.payment_type_id != 9" label="附言">
            <span class="color-red big-font can-select">{{postscriptForm.postscript}}</span>
            <el-button
              size="mini"
              v-clipboard:copy="postscriptForm.postscript"
              v-clipboard:success="copySuccess"
              v-clipboard:error="onError"
            type="primary">复制</el-button>
          </el-form-item>
          <el-form-item label="入款人金额" >
            <span class="color-red big-font can-select" >{{form.amount}}</span>
            <el-button
            size="mini"
            v-clipboard:copy="form.amount"
            v-clipboard:success="copySuccess"
            v-clipboard:error="onError"
            type="primary">复制</el-button><br><span v-if="currentPay.payment_type_id == 9" class="color-red">请严格输入入款金额，以便自动到账！</span>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="gotoPostScript">前往充值</el-button>
            <el-button type="success" @click="closePostScript">充值完成</el-button>
          </el-form-item>
        </div>
      </el-form>
      <form ref="postForm" action="/service" target="_blank" method="post" style="display: none">
        <input type="hidden" name="action" v-model="serviceApi"/>
        <input type="hidden" name="platform_id" v-model="currentPay.id" />
        <input type="hidden" name="amount" v-model="form.amount" />
        <input type="hidden" name="bank_id" v-model="form.bankId" />
      </form>
    </div>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'deposite',
    components: {

    },
    data() {
      return {
        form: {
          bankId: '',
          amount: null,
          platform: null,
          payname: ''
        },
        postscriptForm: {
          account:"",
          account_name:"",
          bank_identifier:"",
          bank_name:"",
          hoplink:"",
          postscript:""
        },
        rules: {
          bankId: [
            { required: true, message: '请选择银行'},
          ],
          amount: [
            { required: true, message: '请输入余额'},
          ],

          payname:[
            { required: true, message: '请输入入款人'},
          ],
        },
        timer: null,
        timerText: '',
        payList: {},
        allPayList: [],
        defaultId: null,
        activeIndex: null,
        defaultActiveIndex: null,
        currentPayList: [],
        currentPay:{},
        amountError: '',
        qrImg:'',
        showQr: false,
        postScript: false,
        serviceApi: 'deposit',
        onError: '您的浏览器不支持复制，请手动复制！'
      };
    },
    computed: {
      minAmount: function(){
        if(this.currentPay.min_amount){
          return Number(this.currentPay.min_amount.replace(/\,/g,''))
        }else{
          return 0
        }
      },
      maxAmount: function(){
        if(this.currentPay.max_amount){
          return Number(this.currentPay.max_amount.replace(/\,/g,''))
        }else{
          return 0
        }
      },
      needBank: function(){
        return this.currentPay.need_bank == 1
      },
      isNotFree: function(){
        return Number(this.currentPay.fee)>0
      },
      ...mapGetters('common',['fundsPwdSetted'])
    },
    watch: {
      'form.platform': function(key){
        this.currentPayList.map((val,num,arr)=>{
          if(val.id+'' == key+''){
            this.currentPay = {...val}
          }
        })
        this.form.amount = null
      },
      'form.amount': function(val){
        if(val == null){
          this.amountError =  ''
        }else{
          var $amount =  Number(this.form.amount),
            $min = this.minAmount,
            $max = this.maxAmount
          if($amount >= $min && $amount <= $max){
            this.amountError =  ''
          }else{
            this.amountError = '不符合金额限制'
          }
        }

      }
    },
    methods: {
      ...mapActions('common',['getUserInfo']),
      copySuccess(){
        this.$message({
          type: 'success',
          message: '复制成功!'
        });
      },
      handleSelect(key){
        this.activeIndex = key+''
        this.closeQrCode()
        this.closePostScript()
        this.setcurrentPayList()
        this.setCurrentPay()

      },
      //开始倒计时
      startTimer(){
        this.endTimer()
        var intDiff = parseInt(1800); //倒计时总秒数量
        var _this = this
        function times() {
          var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值
          if (intDiff > 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          } else { //当时间耗尽

          }
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          _this.timerText = minute + '分' + second + '秒'
          intDiff--;
        }
        this.timer = setInterval(times,1000)
      },
      endTimer(){
        clearInterval(this.timer)
        this.timerText = ''
      },
      //获取当前开启支付方式
      getAvailablePaymentType(){
        this.axios.get('/service',{
          params:{
            action:'getAvailablePaymentType'
          }
        }).then((data)=>{
          if(data.errno == 0){
            this.payList = {...data.data}
          }else{
            this.$message({
              message: data.error,
              type: 'error'
            });
          }
        })
      },
      //获取所有支付方式
      getDepositPlatformList(){
        this.axios.get('/service',{
          params:{
            action:'getDepositPlatformList'
          }
        }).then((data)=>{
          if(data.errno == 0){
            this.allPayList = [...data.data]
            this.computedIndex()
          }else{
            this.$message({
              message: data.error,
              type: 'error'
            });
            if(data.errno == 5055){
              this.$router.back()
            }
          }
        })
      },
      //获取默认支付方式
      getDefaultPlatform(){
        this.axios.get('/service',{
          params:{
            action:'getDefaultPlatform'
          }
        }).then((data)=>{
          if(data.errno == 0){
            this.defaultId = data.data.default_id

          }else{
//            this.$message({
//              message: data.error,
//              type: 'error'
//            });
          }

          this.getAvailablePaymentType()
          this.getDepositPlatformList()
        })
      },
      //设定默认
      computedIndex(){
        this.allPayList.map((value,key,arr)=>{
          if(this.defaultId != null){
            if(value.id == this.defaultId){
              this.defaultActiveIndex =  value.payment_type_id+''
              this.activeIndex = value.payment_type_id+''
              this.handleSelect(this.activeIndex)
            }
          }else{

              this.defaultActiveIndex =  value.payment_type_id+''
              this.activeIndex = this.defaultActiveIndex
              this.activeIndex = value.payment_type_id+''
              this.handleSelect(this.activeIndex)
              return false
          }

        })
      },
      setcurrentPayList(){
        this.currentPayList = []
        if(this.allPayList.length>0){
          this.allPayList.map((val,num,array)=>{
            var arr = []
            if(val.payment_type_id+'' == this.activeIndex){
              this.currentPayList.push(val)
            }
          })
        }
      },
      setCurrentPay(){
        this.currentPay = this.currentPayList[0]
        this.form.platform = this.currentPay['id']
      },
      randomAmount(bool){
        var random =  this.getTwoNumber()
        if(bool){
          var moneyValue = Number(this.form.amount) - random
        }else{
          var moneyValue = Number(this.form.amount)+ random
        }

        this.$confirm('当前可受理您的充值金额为：'+ moneyValue +' 元，\n' + '您是否确认充值？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.form.amount = moneyValue
          this.doRecharge()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消充值'
          });
        });
      },
      getTwoNumber(){
        return (Math.floor(Math.random()*9+1)+''+Math.floor(Math.random()*9+1))/100
      },
      onSubmit(){
          //第三方支付
        this.$refs['form'].validate((valid) => {
            if (valid) {
              if(!this.form.amount){
                this.amountError = '请输入金额'
                return false
              }
              if(this.amountError !=''){
                return false
              }
              if(this.currentPay.is_qr==1){
                var amount = Number(this.form.amount)
                if ((amount+'').indexOf(".")==-1 ) {
                  if(this.form.amount == this.maxAmount){
                    this.randomAmount(true)
                  }else{
                    this.randomAmount()
                  }
                  return false;
                }else{
                  this.doRecharge();
                }

              }else{//平台支付
                  this.doRecharge();
              }
            }else {
              console.log('error submit!!');
              return false;
            }
        })



      },
      showQrCode(){
        this.showQr = true
        this.startTimer()
      },
      closeQrCode(){
        this.showQr = false
        this.resetForm('form')
        this.endTimer()
      },
      showPostScript(){
        this.postScript = true
        this.startTimer()
      },

      closePostScript(){
        this.postScript = false
        this.resetForm('form')
        this.endTimer()
      },
      gotoPostScript(){
        window.open(this.postscriptForm.hoplink,'_blank')
      },
      doRecharge(){
        let data = {
          action: 'deposit',
          platform_id: this.currentPay.id,
          amount: Number(this.form.amount)
        };
        if(!this.currentPay.is_qr){
          data.bank_id = this.form.bankId
        }
        //非第三方
        if(this.currentPay.is_third == 0){

          let data = {
            action: 'bankDeposit',
            platform_id: this.currentPay.id,
            bank_id: this.form.bankId,
            amount: Number(this.form.amount),
            postscript: this.form.payname
          }
          this.axios.post('/service',data).then((data)=>{
            if(data.errno == 0){
              this.postscriptForm = {...data.data}
              this.showPostScript()
            }else{
              this.$message({
                type: 'error',
                message: data.error
              });
            }
          })

        }else{

          if (this.currentPay.save_qr == 0) {
            // this.$cookie.set('NBRecharge', JSON.stringify(data.data), 120);
            // window.open(window.location.origin + '/static/html/recharge.html','_blank', '充值');
            setTimeout(()=>{
              this.$refs.postForm.submit()
            },30)
          }


          if (this.currentPay.save_qr == 1) {
            this.axios.post('/service',data).then((data)=>{
              if(data.errno == 0){
                this.qrImg = data.data.qr_path
                this.showQrCode(data)
              }else{
                this.$message({
                  type: 'error',
                  message: data.error
                });
              }
            })
          }
        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      gotoFree() {
        var _this = this
        if(_this.currentPay.id === 43) {
          for(var i = 0; i < this.allPayList.length; i++) {
            var item = this.allPayList[i]
            if(item.id === 4){
              _this.currentPay = {...item}
              _this.form.amount = null
              _this.form.platform = item.id
              _this.activeIndex = item.payment_type_id + ''
              _this.defaultActiveIndex = item.payment_type_id+''
              _this.handleSelect(item.payment_type_id)
              break;
            }
          }
        }else{
          for(var i = 0; i < this.currentPayList.length; i++) {
            var item = this.currentPayList[i]
            if(Number(item.fee) === 0){
              _this.currentPay = {...item}
              _this.form.amount = null
              _this.form.platform = item.id
              break;
            }
          }

        }




      }
    },
    created() {
      this.getUserInfo().then(()=>{
        if(!this.fundsPwdSetted){
          this.$router.replace('/account/shadow/password?type=funds&origin=deposite')
        }else{
          this.getDefaultPlatform()
        }
      })
      this.$emit("eventSize",true)

    },
    mounted() {
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-deposite {
  background: #fff;
  .el-input {
    width: 100%;
  }
  .el-menu-item {
    font-size: 16px;
    font-weight: 500;
  }
  .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom: 2px solid #19abc0;
    color: #19abc0;
  }
  .qr-box {
    text-align: center;
    p {
      line-height: 28px;
      padding: 10px 0;
    }
    img {
      width: 160px;
    }
  }
  .content-main {
    padding: 20px;
  }
  .big-font {
    font-size: 20px;
  }
  .g-btn {
    &.small {
      width: 50%;
    }
  }
}
</style>

