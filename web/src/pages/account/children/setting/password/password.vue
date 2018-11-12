<template>
  <section class="page-password">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录密码" name="login">
        <p class="pay-tips" v-if="userInfo.is_change_pwd==1">提示：为了您的账号安全，请修改登录密码。</p>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"  class="form-center">
          <el-form-item label="旧登录密码" prop="oldPass">
            <el-input type="password" v-model.trim="ruleForm.oldPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新登录密码" prop="pass">
            <el-input type="password" v-model.trim="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model.trim="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitLogin('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="资金密码" name="funds">
        <p  v-if="!fundsPwdSetted" class="pay-tips">为了保障您的资金安全，请先设定资金密码！</p>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px"  class="form-center">
          <el-form-item v-if="fundsPwdSetted" label="旧资金密码" prop="oldPass">
            <el-input type="password" v-model.trim="ruleForm2.oldPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新资金密码" prop="pass">
            <el-input type="password" v-model.trim="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model.trim="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFunds('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="密保问题" name="security">
        <security-question v-if="!setQuestion"></security-question>
        <p class="center" v-if="setQuestion">您已设置安全口令，安全口令不可修改！</p>
      </el-tab-pane>
      <el-tab-pane label="取款人" name="name">
        <name v-if="!nameSetted"></name>
        <p class="center" v-if="nameSetted">您已绑定取款人: {{userInfo.name}}！</p>
      </el-tab-pane>
    </el-tabs>
    <a class="shadow-box-close" v-if="userInfo.is_change_pwd==0" href="javascript:;" @click="$router.back()">关闭</a>
    <a class="shadow-box-close" v-if="userInfo.is_change_pwd==1" href="javascript:;" @click="closeError">关闭</a>

  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import SecurityQuestion from './components/security'
  import Name from './components/name'
  export default {
    name: 'password',
    components: {
      SecurityQuestion,
      Name
    },
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!(/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]{1})\1\1).{6,16}$/).test(value)){
          callback(new Error('密码格式错误'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!(/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]{1})\1\1).{6,16}$/).test(value)){
          callback(new Error('密码格式错误'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeName: 'login',
        ruleForm: {
          oldPass: '',
          pass: '',
          checkPass: '',
        },
        showTips: 'false',
        ruleForm2: {
          oldPass: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          oldPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        rules2: {
          oldPass: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass4, trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
      ...mapState('common',['userInfo']),
      ...mapGetters('common',['fundsPwdSetted','setQuestion','nameSetted']),
    },
    methods: {
      ...mapMutations('common',['SET_FUND_PWD','SET_IS_CHANGE_PWD']),
      handleClick(tab, event) {

      },
      submitLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post("/service?action=changeLoginPwd", {
              current_password: this.ruleForm.oldPass,
              new_password: this.ruleForm.pass,
            }).then((data)=>{
              if(data.errno == 0){
                this.$message({
                  message: '恭喜你，登录密码修改成功！',
                  type: 'success'
                });
                this.resetForm('ruleForm')
                this.SET_IS_CHANGE_PWD(0)
              }else{
                this.$message({
                  message: data.error,
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      submitFunds(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let act = 'setFundPwd'
            let data = {}
            let message = "恭喜你，资金密码设置成功！"
            if(this.fundsPwdSetted){
              act = 'changeFundPwd'
              data = {
                current_password: this.ruleForm2.oldPass,
                new_password: this.ruleForm2.pass,
              }
              message = "恭喜你，资金密码修改成功！"
            }else{
              data = {
                fund_pwd: this.ruleForm2.pass,
                confirm_fund_pwd: this.ruleForm2.checkPass,
              }
            }
            this.axios.post("/service?action="+act, data).then((data)=>{
              if(data.errno == 0){
                this.$message({
                  message: message,
                  type: 'success'
                });
                this.resetForm('ruleForm2')
                this.SET_FUND_PWD(true)
                if(this.$route.query.hasOwnProperty('origin')){
                  this.$router.replace('/account/shadow/'+this.$route.query.origin.toLowerCase())
                }
              }else{
                this.$message({
                  message: data.error,
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      closeError() {
        this.$message.error('为了您的账号安全，请修改登录密码');
      }
    },
    created() {
      this.$emit("eventSize",true)
    },

    mounted() {
      if(this.$route.query.hasOwnProperty('type')){
        this.activeName = this.$route.query.type.toLowerCase()
      }


    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-password {
    background: #fff;
    .center {
      line-height: 200px;
    }
  }
</style>
<style lang="scss">
  .page-password {

    .el-tabs__content {
      padding: 10px 20px;
    }
  }
</style>
