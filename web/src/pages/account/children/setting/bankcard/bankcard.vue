<template>
  <section class="page-bankcard">
    <h3 class="shadow-title">{{optTitle}}</h3>
    <div class="table-content">
      <!--校验银行卡-->
      <el-form :model="checkForm" ref="checkForm"  status-icon label-width="146px" v-show="showCheckBank" class="form-center">
        <el-form-item label="选择验证银行卡号" prop="cardId">
          <el-select v-model="checkForm.cardId" placeholder="请选择">
            <el-option
              v-for="item,key in bankcardList"
              :key="key"
              :label="item.account"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户人姓名" prop="accountName">
          <el-input v-model="checkForm.accountName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="银行账号" prop="account" >
          <el-input v-model="checkForm.account" placeholder="" ></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="资金密码" prop="fundspassword">
          <el-input type="password" v-model="checkForm.fundspassword" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCheckBankCard">下一步</el-button>
        </el-form-item>
      </el-form>

      <!--添加银行卡信息-->
      <el-form :model="form" size="small"  status-icon :rules="rules" ref="form" label-width="120px" v-show="!showConfirm&&!showCheckBank"  class="form-center">
        <el-form-item label="开户银行" prop="bankId">
          <el-select v-model="form.bankId" placeholder="请选择">
            <el-option
              v-for="item,key in bankList"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户银行区域" required>
          <area-select :provinceCn="region.provinceName" :cityCn="region.cityName" @onchange="changeRegion" ></area-select>
        </el-form-item>
        <el-form-item label="支行名称" prop="branch">
          <el-input v-model="form.branch" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="开户人姓名" prop="accountName">
          <el-input v-model="form.accountName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="银行账号" prop="account">
          <el-input v-model="form.account" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="确认银行账号" prop="accountCheck">
          <el-input v-model="form.accountCheck" placeholder=""></el-input>
        </el-form-item>
        <el-form-item class="is-required" label="资金密码" prop="accountCheck">
          <el-input v-model="form.fundspassword" type="password" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitConfirm">下一步</el-button>
        </el-form-item>
      </el-form>

      <!--确认银行卡信息-->
      <el-card class="confirm-card" v-show="showConfirm">
        <ul>
          <li><span class="item-title">开户银行:</span><span>{{bankName}}</span></li>
          <li><span class="item-title">开户银行区域:</span><span>{{region.provinceName+' ' +region.cityName}}</span></li>
          <li><span class="item-title">支行名称:</span><span>{{form.branch}}</span></li>
          <li><span class="item-title">开户人姓名:</span><span>{{form.accountName}}</span></li>
          <li><span class="item-title">银行账号:</span><span>{{form.account}}</span></li>
        </ul>
        <el-button type="primary" @click="bindNewBank">确认</el-button>
        <el-button @click="submitConfirm">返回</el-button>
      </el-card>
    </div>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>

<script>
  import {bindBankCard,checkBankCard,changeBankCard} from '../../../../../service/getData'
  import AreaSelect from  '../../../../../components/util/AreaSelect'
  import ElFormItem from "../../../../../../node_modules/element-ui/packages/form/src/form-item.vue"
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import {trim} from '../../../../../util/util'
  import md5 from 'js-md5'

  // import debounce from 'throttle-debounce/debounce';
  export default {
    name: 'bankcard',
    components: {
      ElFormItem,
      AreaSelect
    },
    data() {
      var checkAccount = (rule, str, callback) => {

          var value = trim(str)
          var _this = this
          if (/^[\d\s]+$/.test(value)) {
            if(value.length>=16 && value.length<=19){
              if(rule.field == 'accountCheck'){
                if(value != trim(_this.form.account)){
                  callback(new Error('请保持账号一致'))
                }else{
                  callback();
                }
              }else{
                callback();
              }
            }else{
              callback(new Error('银行卡16位至19位'))
            }
          } else {
            callback(new Error('请输入数字值'))
          }
      };
      return {
        checkForm:{
          cardId: null,
          accountName: '',
          account: null,
          fundspassword: null
        },
        form:{
          bankId: null,
          branch: '',
          accountName: '',
          account: null,
          accountCheck: null,
          fundspassword: null
        },
        rules: {
          bankId: [
            { required: true, message: '开户银行不能为空'},
          ],
          branch: [
            { required: true, message: '支行名称不能为空'},
          ],
          accountName: [
            { required: true, message: '开户人姓名不能为空'},
          ],
          account: [
            { validator: checkAccount, trigger: 'blur'}
          ],
          accountCheck: [
            { validator: checkAccount, trigger: 'blur'}
          ]
        },
        region: {
          provinceId: '',
          cityId: '',
          provinceName: '',
          cityName: '',
        },
        bankList: {
        },
        showConfirm: false,
        showCheckBank: false,
        opt: '',
      };
    },
    computed:{
      bankName:function(){
        if(this.form.bankId){
          return this.bankList[this.form.bankId]
        }else{
          return ''
        }
      },
      account: function(){
        return this.form.account
      },
      accountCheck: function(){
        return this.form.accountCheck
      },
      checkAccount: function(){
        return this.checkForm.account
      },
      optTitle: function(){
        let title = '添加银行卡'
        if(this.opt=='update'){
          title = '修改银行卡'
        }else if(this.opt=='delete'){
          title = '删除银行卡'
        }
        return title
      },
      optType: function(){
        let type = 1
        if(this.opt=='update'){
          type = 2
        }else if(this.opt=='delete'){
          type = 3
        }
        return type
      },
      ...mapState('common',['userInfo']),
      ...mapState('bankcard',['bankcardList','checkedToken']),
      ...mapGetters('common',['fundsPwdSetted','nameSetted']),
    },
    watch:{
      account:function(current,old){
         this.form.account = this.formatAccount(this.form.account)
      },
      accountCheck:function(current,old){
        this.form.accountCheck = this.formatAccount(this.form.accountCheck)
      },
      checkAccount:function(current,old){
        this.checkForm.account = this.formatAccount(this.checkForm.account)
      }
    },
    methods: {
      ...mapMutations('bankcard',['SET_BANKCARD_TOKEN','SET_HAS_BANKCARD']),
      ...mapActions('bankcard',['getBankCardList']),
      ...mapActions('common',['getUserInfo']),
      changeRegion(region){
        this.region = {...region}
      },
      //格式化银行卡号
      formatAccount(str) {
        if(!str) str =''
        var str = str.replace(/\s/g, '').split(''),
          len = str.length,
          i = 0,
          newArr = [];
        for (; i < len; i++) {
          if (i % 4 == 0 && i != 0) {
            newArr.push(' ');
            newArr.push(str[i]);
          } else {
            newArr.push(str[i]);
          }
        }
        return newArr.join('')
      },
      //获取可添加银行列表
      getbank(){
        this.axios.get('/service',{params:{
            action:'getBankList'
        }}).then(({data})=>{
          this.bankList = {...data}
        })
      },
      //校验银行卡令牌
      submitCheckBankCard(){
        var data = {
          card_id: this.checkForm.cardId,
          account_name: this.checkForm.accountName,
          account: this.checkForm.account,
          fund_pwd: this.checkForm.fundspassword,
          type: this.optType
        }
        checkBankCard(data).then((data)=>{
          if(data.errno == 0){
            this.SET_BANKCARD_TOKEN(data.data.checked_token)

            if(this.opt=='update'){
              this.showCheckBank = false
              this.setUpdateForm()
            }else if(this.opt=='delete'){

              this.submitDelete()
            }else{
              this.showCheckBank = false
            }
          }else{
            this.$message({
              message: data.error,
              type: 'error'
            });
          }

        })
      },
      //更新卡数据初始化
      setUpdateForm(){
        let id = this.checkForm.cardId
        let card = null
        this.bankcardList.map(function(value,index,array){
          if(value.id == id) {
            card = value
          }
        })
        this.form.bankId = card.bank_id+''
        this.form.branch = card.branch
        this.form.accountName = card.account_name
        this.form.account = card.account
        this.form.accountCheck = card.account
        this.region.provinceName = card.province
        this.region.cityName = card.city

      },
      //删除银行卡
      submitDelete(){
        this.axios.post('/service?action=deleteBankCard',{
          card_id: this.checkForm.cardId,
          checked_token: this.checkedToken
        }).then((data)=>{
          if(data.errno == 0){
            this.$message({
              message: '银行卡删除成功！',
              type: 'success'
            })
            this.resetForm('checkForm')
            this.getBankCardList()
            this.$router.back()
          }else{
            this.$message({
              message: data.error,
              type: 'error'
            })
          }
        })
      },
      //生成银行卡信息表
      submitConfirm(){
        if(!this.showConfirm){
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.showConfirm = true
            }
          })
        }else{
          this.showConfirm = false
        }
      },
      //确认绑定银行卡
      bindNewBank(){
            let data = {
              account: this.form.account,
              account_name: this.form.accountName,
              bank_id: this.form.bankId,
              branch: this.form.branch,
              confirmBank: this.bankName,
              confirmProvince: this.region.provinceName,
              confirmCity: this.region.cityName,
              province_id: this.region.provinceId,
              city_id: this.region.cityId,
              card_id: this.checkForm.cardId,
              fund_password: md5(md5(md5((this.userInfo.username).toLowerCase()+this.form.fundspassword)))
            }
            if(this.checkedToken){
              data.checked_token = this.checkedToken
            }
            if(this.opt=='update'){
              changeBankCard(data).then((data)=>{
                if(data.errno == 0){
                  this.$message({
                    message: '恭喜你，修改银行卡成功！',
                    type: 'success'
                  });
                  this.resetForm('form')
                  this.getBankCardList()
                }else{
                  this.$message({
                    message: data.error,
                    type: 'error'
                  });
                }
              })
            }else{
              bindBankCard(data).then((data)=>{
                if(data.errno == 0){
                  this.$message({
                    message: '恭喜你，绑定银行卡成功！',
                    type: 'success'
                  });
                  this.resetForm('form')
                  this.showConfirm = false
                  this.getBankCardList()
                  this.getUserInfo()
                  if(this.$route.query.hasOwnProperty('origin')){
                    this.$router.replace('/account/shadow/'+this.$route.query.origin.toLowerCase())
                  }else{
                    this.$router.replace('/account')
                  }
                }else{
                  if(data.errno == 5004){
                    this.$router.replace('/account/shadow/password?type=name')
                  }else{
                    this.$message({
                      message: data.error,
                      type: 'error'
                    });
                  }

                }
              })
            }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.getbank()
      this.$emit("eventSize",true)
    },
    mounted(){
      if(this.$route.query.hasOwnProperty('opt')){
        this.opt = this.$route.query.opt
        if(this.opt != '' ){
          this.showCheckBank = true
        }
      }
      if(this.bankcardList.length>0){
        this.showCheckBank = true

      }
      if(!this.fundsPwdSetted){
        if(this.$route.query.hasOwnProperty('origin')){
          this.$router.replace('/account/shadow/password?type=funds&origin='+this.$route.query.origin.toLowerCase())
        }else{
          this.$router.replace('/account/shadow/password?type=funds')
        }
      }else{
        if(!this.nameSetted){
          if(this.$route.query.hasOwnProperty('origin')){
            this.$router.replace('/account/shadow/password?type=name&origin='+this.$route.query.origin.toLowerCase())
          }else{
            this.$router.replace('/account/shadow/password?type=name')
          }
        }
      }

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-bankcard {
    background: #fff;

    .table-content{
      padding: 10px 20px;
    }
    .confirm-card {
      width: 500px;
      margin: 10px auto;
      text-align: center;
      ul{
        margin-bottom: 10px;
        text-align: left;
        li {
          border-bottom: 1px solid #d8d8d8;
          line-height: 32px;
        }
      }
      .item-title{
        width: 150px;
        display: inline-block;
        text-align: left;
        color: #555;
      }
    }
    .form-center {
      padding: 10px 0;
    }
  }
</style>
<style lang="scss">
  .page-bankcard {
    .table-content .el-input.is-disabled .el-input__inner{
      color: #222;
    }
  }
</style>
