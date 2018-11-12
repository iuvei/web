<template>
  <section class="page-login" ref="login" :style="'height:'+ screenHeight+'px'">
    <div class="login-box">
      <div class="left">
        <div class="logo"></div>
        <div class="form">
          <ar-input :autofocus="true" label="用户名" v-model.trim="username" placeholder="请输入用户名"></ar-input>
          <ar-input label="密码" type="password" v-model.trim="password" placeholder="请输入密码" @keyup.enter="login"></ar-input>
          <ar-input label="验证码" v-if="showCaptcha" v-model.trim="captcha" placeholder="请输入验证码" @keyup.enter="login">
            <img slot="right" @click="getCaptcha" :src="captchaUrl">
          </ar-input>
          <input style="display:none" name="fakeusernameremembered"/>
          <input style="display:none" type="password" name="fakepasswordremembered"/>
          <div class="form-line no-border">
            <el-checkbox v-model="rememberUser" class="rember">记住密码</el-checkbox>
            <span class="float-right">忘记密码？<a href="javascript:;" class="color-blue" @click="openService">联系客服</a></span>
          </div>
          <div class="form-line no-border">
            <a class="login-btn" href="javascript:;" @click="login" >登录</a>
          </div>
        </div>
        <div class="login-types" style="display: none">
          <h3><span>其他登录方式</span></h3>
          <p class="login-link">
            <a class="qq" href="#"></a>
            <a class="wechat" href="#"></a>
          </p>

        </div>
      </div>
      <div class="right">
        <div class="browser">
          <ul>
            <li><a class="chrome" target="_blank" href="https://www.google.cn/chrome/"></a></li>
            <li><a class="firefox" target="_blank" href="http://www.firefox.com.cn/"></a></li>
            <li><a class="sogou" target="_blank" href="https://ie.sogou.com/"></a></li>
            <li><a class="ie" target="_blank" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads"></a></li>
          </ul>
          <h3><span>推荐浏览器</span></h3>
        </div>
      </div>
      <div class="button"><i class="el-icon-caret-right"></i></div>

    </div>

    <div class="login-float">
      <a href="javascript:;" @click="openService"><span class="icon-shopping-online"></span></a>
      <a href="/static/html/speed.html" target="_blank"><span class="icon-electricity"></span></a>
      <router-link to="/download" target="_blank"><span class="icon-finger-touching"></span></router-link>
    </div>
    <div class="login-footer">
      <p>www.mf8.vip</p>
      <p>© 2014 魔方娱乐版权所有菲律宾政府合法博彩牌照认证</p>
    </div>
  </section>
</template>

<script>
  import md5 from 'js-md5'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import ArInput from '../../components/util/ArInput'
  export default {
    name: 'page-login',
    components: {
      ArInput
    },
    data() {
      return {
        rememberUser: false,
        username: "",
        password: "",
        captcha: "",
        showCaptcha: false,
        screenHeight: document.documentElement.clientHeight,
        captchaUrl: "",
        height: 0,
      }
    },
    computed:{
      ...mapState('common',['isLogin','serviceUrl'])
    },

    watch:{

      showCaptcha (val){
        if(val){
          this.getCaptcha()
        }
      }
    },
    methods: {
      ...mapMutations('common',['SET_ISLOGIN','SET_IS_CHANGE_PWD']),

      focus(name){
        this.$refs[name].focus()
        this.$refs[name+'-p']
      },
      rememberUserName(name,pass){
        if(this.rememberUser){
          this.$cookie.set('loginUserName', name, { expires: '7D' });
          this.$cookie.set('loginPassword', pass, { expires: '7D' });
        }else{
          this.$cookie.delete('loginUserName');
          this.$cookie.delete('loginPassword');
        }
      },
      getHeight(){
        window.screenHeight = document.documentElement.clientHeight
        this.screenHeight = window.screenHeight
      },
      getLoginCaptchaStatus(){
        this.axios.get('/service?action=getLoginCaptchaStatus').then((data)=>{
          if(data.errno == 0){
            if(data.data.captcha_enabled == 1){
              this.showCaptcha = true
            }else{
              this.showCaptcha = false
            }
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getCaptcha(){
        this.axios.get('/service?action=GetCaptcha').then((data)=>{
          if(data.errno == 0){
            this.captchaUrl = data.data.src
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      login(){

        this.axios.get('/service',{
          params:{
            action: 'Login',
            username : this.username,
            password : md5(md5(md5((this.username).toLowerCase() + this.password))),
            captcha: this.captcha
          }
        }).then((data) => {
          //登录成功
          if(data.errno === 0){
            this.$router.push('/home')
            this.$cookie.set('USERTOKEN', data.data.token)
            this.SET_ISLOGIN(true)
            this.rememberUserName(this.username,(this.password).toLowerCase())
            if(data.data.is_change_pwd === 1){
              this.SET_IS_CHANGE_PWD(1)
            }else{
              if(data.data.is_notice_show === 1){
                this.$router.push('/account/shadow/message')
              }
            }


          }else{
            this.getLoginCaptchaStatus()
            this.getCaptcha()
            this.$message.error(data.error);
            this.SET_ISLOGIN(false)
          }
        }).catch((error) =>{
          this.$message.error('未知错误');
        })
      },
      openService(){
        window.open(this.serviceUrl,'_blank');
      }
    },
    created(){
      this.getLoginCaptchaStatus()
    },
    mounted() {
      window.addEventListener('resize',this.getHeight);
      //不显示顶部底部
      this.$emit("eventFromChild",false)

      if(this.$cookie.get('USERTOKEN') && this.$cookie.get('USERTOKEN') != ''){
        this.SET_ISLOGIN(true)
        this.$router.replace('/home')
      }
      //填充用户名
      if(this.$cookie.get('loginUserName') !== null ){
        this.rememberUser = true
        this.username = this.$cookie.get('loginUserName')
        this.password = this.$cookie.get('loginPassword')
      }

    },
    activated (){

    },
    deactivated (){
      //显示顶部底部
      this.$emit("eventFromChild",true)
      window.removeEventListener('resize',this.getHeight);
    },
    beforeDestroy(){
      this.$emit("eventFromChild",true)
      window.removeEventListener('resize',this.getHeight);
    }
  }
</script>
<style lang="scss" scoped>
  .page-login {
    background:#f7f7f7 url(../../assets/login/login.jpg) no-repeat center center;
    position: relative;
    min-height: 748px;
    .login-box {
      width: 1200px;
      left: 50%;
      margin-left: -600px;
      height: 748px;
      background: #fff;
      position: absolute;
      top: 50%;
      margin-top: -374px;
      z-index: 2;
      .left{
        width: 540px;
        padding: 37px 54px 0 54px;
        .logo{
          background: url(../../assets/login/login-logo.png) no-repeat;
          width: 95px;
          height: 131px;
          display: block;
          margin: 0 auto;
          margin-bottom: 30px;
        }
        .form{
          border-top: 2px solid #e9e9e9;
          .form-line{
            padding: 7px 30px;
            border: 2px solid #e9e9e9;
            border-top: none;
            display: -webkit-flex;
            display: flex;
            &.no-border{
              border: none;
              display: block;
              padding: 16px 0;
            }
            .rember {
              font-size: 14px;
            }
            .float-right {
              float: right;
              display: block;
            }
            .login-btn {
              background: #0e9cff;
              box-shadow: 0 4px 20px rgba(14,156,255,.4);
              text-align: center;
              font-size: 20px;
              height: 60px;
              line-height: 60px;
              letter-spacing: 10px;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
              color: #fff;
              display: block;
            }

            .line-right {
              padding: 0 10px;
              display: inline-block;
              vertical-align: middle;
              line-height: 72px;
              height: 72px;
              min-width: 120px;
              img {
                width: 120px;
                height: 30px;
                display: inline-block;
                vertical-align: middle;
              }
              .password-weak {
                width: 38px;
                height: 38px;
                line-height: 38px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                display: inline-block;
                color: #fff;
                text-align: center;
                &.level1{
                  background: #ffd1de;
                }
                &.level2{
                  background: #d1eef2;
                }
                &.level3{
                  background: #ff9000;
                }
              }
            }
          }
        }

        .login-types{
          padding-top: 34px;
          h3{
            text-align: center;
            position: relative;
            span{
              background: #fff;
              padding: 0 5px;
              font-size: 18px;
              display: inline-block;
              z-index: 2;
              position: relative;
            }
            &:before{
              content: '';
              display: block;
              width: 100%;
              position: absolute;
              top: 50%;
              left: 0;
              z-index: 1;
              border-bottom: 1px dashed #212121;
            }
          }
          .login-link {
            text-align: center;
            padding: 15px 0;
            letter-spacing: 50px;

            a{
              display: inline-block;
              width: 43px;
              height: 52px;
              background-repeat: no-repeat;
              background-size: 100% auto;
              &.qq{
                background-image: url(../../assets/login/qq.png);

              }
              &.wechat{
                background-image: url(../../assets/login/wechat.png);
                width: 52px;
              }
            }

          }
        }
      }

      .right {
        background: url(../../assets/login/right-bg.png) no-repeat;
        background-size: 100% 100%;
        height: 100%;
        width: 659px;
        float: right;
        position: relative;
        .browser{
          width: 460px;
          position: absolute;
          bottom: 30px;
          left: 102px;
          ul {
            padding: 20px 0;
            text-align: center;
            letter-spacing: 20px;
            li{
              display: inline-block;
              a{
                width: 55px;
                height: 55px;
                display: block;
                background-repeat: no-repeat;
                &.chrome{
                  background-image: url(../../assets/login/chrome.png);
                }
                &.sogou{
                  background-image: url(../../assets/login/sogou.png);
                }
                &.ie{
                  background-image: url(../../assets/login/ie.png);
                }
                &.firefox{
                  background-image: url(../../assets/login/firefox.png);
                }
              }
            }
          }
          h3{
            text-align: center;
            position: relative;
            span{
              padding: 0 5px;
              font-size: 18px;
              display: inline-block;
              z-index: 2;
              position: relative;
            }
            &:before,&:after{
              content: '';
              display: block;
              width: 35%;
              position: absolute;
              top: 50%;
              left: 0;
              z-index: 1;
              border-bottom: 1px dashed #212121;
            }
            &:after {
              right: 0;
              left: inherit;
            }
          }
        }

      }
      .button {
        position: absolute;
        left: 502px;
        top: 326px;
        width: 75px;
        height: 75px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: #ff185a;
        color: #fff;
        font-size: 28px;
        text-align: center;
        line-height: 75px;
      }
    }
    .login-float {
      width: 84px;
      position: absolute;
      top: 50%;
      margin-top: -100px;
      right: 50%;
      margin-right: -698px;
      a {
        height: 84px;
        display: block;
        background: #7fcaff;
        color: #fff;
        line-height: 84px;
        font-size: 46px;
        text-align: center;
        span {
        }
        &:hover{
          background: #0e9cff;
        }
      }
    }
    .login-footer {
      bottom: 4px;
      width: 1200px;
      left: 50%;
      margin-left: -600px;
      text-align: center;
      line-height: 24px;
      position: absolute;
    }
  }
</style>
<style lang="scss">
  .page-login{
    .el-checkbox__label {
      font-size: 16px;
    }
  }
</style>
