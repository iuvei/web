<template>
  <section class="page-transfer">
    <h3 class="shadow-title">转账申请</h3>
    <div class="table-content">
      <el-form ref="form" status-icon :rules="rules" size="small" :model="form" label-width="120px" class="form-center">
        <el-form-item label="可用余额">
          {{userInfo.available}}
        </el-form-item>
        <el-form-item label="可提余额">
          {{userInfo.withdrawable}}
        </el-form-item>
        <el-form-item label="转账类型" prop="transferTips">
          <el-select :disabled="isSetUser" v-model="form.transferTips" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.description"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款人" prop="user">
          <el-input :disabled="isSetUser" v-model.trim="form.user" placeholder="" @focus="showSelect" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item label="转账金额"  prop="amount">
          <el-input-number v-model.trim="form.amount" :controls="false" class="el-input-number-no-controls"></el-input-number>
        </el-form-item>
        <el-form-item label="资金密码" prop="password">
          <el-input type="password" v-model.trim="form.password" placeholder="" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡户名" prop="accountName">
          <el-input  v-model.trim="form.accountName" placeholder="" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即转账</el-button>
        </el-form-item>
      </el-form>
      <transition name="el-zoom-in-center">
        <div class="select-box" v-if="selectShow">
          <team-list @eventNameSelected="selectedTeamUser" @eventClose="closeSelect"></team-list>
        </div>
      </transition>
    </div>
    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>
</template>

<script>
  import TeamList from '../../../../components/util/TeamList'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'transfer',
    components: {
      TeamList
    },
    data() {
      return {
        form:{
          user: '',
          userId: '',
          accountName: '',
          amount:'',
          password: '',
          transferTips:''
        },
        rules: {
          user: [
            { required: true, message: '请选择转账用户'},
          ],
          transferTips: [
            { required: true, message: '请选择转账说明'},
          ],
          amount: [
            { required: true, message: '请输入转账金额'},
          ],
          password: [
            { required: true, message: '请输入资金密码'},
          ],
          accountName: [
            { required: true, message: '请输入银行卡姓名'},
          ]
        },
        options: [],
        selectShow: false,
        isSetUser: false
      };
    },
    computed:{
      ...mapState('common',['userInfo']),
      ...mapGetters('common',['hasBankCard'])
    },
    methods: {
      ...mapActions('common',['getUserInfo']),
      closeSelect(){
        this.selectShow = false
      },
      showSelect(){
        this.selectShow = true
      },

      getTransactionTypeList(){
        this.axios.get('/service?action=getTransactionTypeList&type=transfer-out').then((data)=>{
          if(data.errno == 0){
            this.options = []
            this.options = [...data.data]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      selectedTeamUser(data){
        this.form.user = data.name
        this.form.userId = data.id
      },
      onSubmit(){
        this.$refs['form'].validate((valid) => {
          if (valid){
            let data = {
              action:'doTransfer',
              username: this.form.user,
              amount: this.form.amount,
              fund_password: this.form.password,
              account_name: this.form.accountName,
              desc: this.form.transferTips
            }
            this.axios.post('/service',data).then((data)=>{
              if(data.errno == 0){
                this.$message({
                  type: 'sucess',
                  message: '恭喜你，转账成功！'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: data.error
                });
              }
            })
          }
        });
      }
    },
    created() {
      this.getUserInfo().then(()=>{
        if(!this.hasBankCard){
          this.$router.replace('/account/shadow/bankcard?origin=transfer')
        }
      })
      this.getTransactionTypeList()
      this.$emit("eventSize",true)

      if(this.$route.query.hasOwnProperty('username')){
        this.form.user = this.$route.query.username
        this.isSetUser = true

        this.form.transferTips = 4
      }


    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-transfer {
    background: #fff;
    .table-content{
      padding: 10px 20px;
      position: relative;
    }
    .select-box {
      position: absolute;
      top: 34px;
      left: 670px;
    }
  }
</style>
