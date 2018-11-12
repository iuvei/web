<template>
  <section class="page-register" ref="login" :style="'height:'+ screenHeight+'px'" :class="{isMobile: isMobile}">
    <div v-if="isMobile" class="outer-box">
      <div class="mobile-box">
        <div class="logo"></div>
        <div class="form">
          <ar-input label="用户名" v-model.trim="form.username" placeholder="请输入用户名">
            <span slot="right" v-if="check.username" class="color-red"><i class="el-icon-error"></i>{{check.usernameMsg}}</span>
          </ar-input>
          <ar-input label="密码" type="password" v-model.trim="form.password" placeholder="请输入密码">
            <span slot="right" v-if="check.password" class="color-red"><i class="el-icon-error"></i>请输入6-16位字母数字组合</span>
          </ar-input>
          <ar-input label="确认密码" type="password" v-model.trim="form.passwordConfirm" placeholder="请输入确认密码">
            <span slot="right" v-if="check.passwordConfirm" class="color-red"><i class="el-icon-error"></i>确认密码不一致</span>
          </ar-input>
          <ar-input label="验证码" v-model.trim="form.captcha" placeholder="请输入验证码" class="right-code">
            <div slot="right" style="display: inline-block">
              <span v-if="check.captcha" class="color-red"><i class="el-icon-error"></i>错误</span>
              <img @click="getCaptcha" :src="captchaUrl">
            </div>
          </ar-input>
          <div class="form-line no-border">
            <a class="register-btn" href="javascript:;" @click="register" >注册</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="register-box">
        <div class="left">
          <div class="logo"></div>
          <div class="form">
            <div  class="form-line" style="display: none">
              <dl>
                <dt>选择头像：</dt>
                <dd>
                  <div class="avatar-show">
                    <img class="J-show-img" :src="'/static/images/register/'+form.avatarid+'.jpg'" alt="">
                  </div>
                </dd>
              </dl>
              <div class="avatar-list">
                <a v-for="item,key in avatarList" :key="key" @click="setActive(item)" :class="{active:form.avatarid==item }">
                  <img :src="'/static/images/register/'+item+'.jpg'" alt="">
                </a>
              </div>
            </div>
            <ar-input label="用户名" v-model.trim="form.username" placeholder="请输入用户名">
              <span slot="right" v-if="check.username" class="color-red"><i class="el-icon-error"></i>{{check.usernameMsg}}</span>
            </ar-input>
            <ar-input label="密码" type="password" v-model.trim="form.password" placeholder="请输入密码">
              <span slot="right" v-if="check.password" class="color-red"><i class="el-icon-error"></i>请输入6-16位字母数字组合</span>
            </ar-input>
            <ar-input label="确认密码" type="password" v-model.trim="form.passwordConfirm" placeholder="请输入确认密码">
              <span slot="right" v-if="check.passwordConfirm" class="color-red"><i class="el-icon-error"></i>确认密码不一致</span>
            </ar-input>
            <ar-input label="验证码" v-model.trim="form.captcha" placeholder="请输入验证码">
              <div slot="right" style="display: inline-block">
                <span v-if="check.captcha" class="color-red"><i class="el-icon-error"></i>错误</span>
                <img @click="getCaptcha" :src="captchaUrl">
              </div>
            </ar-input>
            <div class="form-line no-border">
              <a class="register-btn" href="javascript:;" @click="register" >注册</a>
            </div>
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

      <div class="register-float">
        <a href="javascript:;" @click="openService"><span class="icon-shopping-online"></span></a>
        <a href="/static/html/speed.html" target="_blank"><span class="icon-electricity"></span></a>
        <router-link to="/download" target="_blank"><span class="icon-finger-touching"></span></router-link>
      </div>
      <div class="register-footer">
        <p>www.mofangyouxi.com</p>
        <p>© 2014 魔方娱乐版权所有菲律宾政府合法博彩牌照认证</p>
      </div>
    </div>

  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import ArInput from '../../components/util/ArInput'

  export default {
    name: 'page-register',
    components: {
      ArInput
    },
    data() {
      return {
        form:{
          avatarid: 1,
          username: "",
          password: "",
          passwordConfirm: "",
          captcha: ""
        },
        check:{
          username: false,
          password: false,
          passwordConfirm: false,
          captcha: false,
          usernameMsg: ''
        },
        avatarList: [1,2,3,4,5,6],
        screenHeight: document.documentElement.clientHeight,
        checked: false,
        captchaUrl: "",
        height: 0,
        isMobile: false
      }
    },
    computed:{
      ...mapState('common',['isLogin','serviceUrl']),
      checkPass: function(){
        var result = true
        Object.keys(this.check).map((val,key,arr)=>{
          if(this.check[val]){
            result = false
          }
        })
        return result
      }
    },
    watch:{

    },
    methods: {
      ...mapMutations('common',['SET_ISLOGIN']),
      formReset(){
        this.form = {...{
          avatarid: 1,
            username: "",
            password: "",
            passwordConfirm: "",
            captcha: ""
        }}
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
      checkUsername: function(){
        if(!(/^[a-zA-Z][a-zA-Z0-9]*$/).test(this.form.username)){
          this.check.username = true
          this.check.usernameMsg = '首字母必须为字母'
        }else if (this.form.username.length<6 || this.form.username.length>16){
          this.check.username = true
          this.check.usernameMsg = '账号长度为6-16位'
        }else{
          this.check.username = false
          this.check.usernameMsg = ''
        }
      },
      checkPassword: function(){
        if(!(/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,16}$/).test(this.form.password)){
          this.check.password = true
        }else{
          this.check.password = false
        }
      },
      checkPasswordconfirm: function(){
        if(this.form.passwordConfirm != this.form.password || this.form.passwordConfirm==""){
          this.check.passwordConfirm = true
        }else{
          this.check.passwordConfirm = false
        }
      },
      checkCaptcha: function(){
        if(!(/^[a-zA-Z0-9]{5}$/).test(this.form.captcha)){
          this.check.captcha = true
        }else{
          this.check.captcha = false
        }
      },
      setActive(value){
        this.form.avatarid = value
      },
      getHeight(){
        window.screenHeight = document.documentElement.clientHeight
        this.screenHeight = window.screenHeight
      },

      logout() {
        this.axios.get('/service',{
          params: {
            action: 'logout'
          }
        }).then((res) => {
          if (res.errno == 0) {
            this.$cookie.delete('USERTOKEN')
            this.SET_ISLOGIN(false)
            this.$router.push('/login')
          }else{
            this.$router.push('/login')
          }
        }).catch((err) =>{
          this.$cookie.delete('USERTOKEN')
          this.SET_ISLOGIN(false)
          this.$router.push('/login')
        })
      },

      register(){

        this.checkUsername()
        this.checkPassword()
        this.checkPasswordconfirm()
        this.checkCaptcha()
        if(!this.checkPass){
          return
        }
        this.axios.post('/service?action=linkCreateUser',{
          avatarid: 1,
          username : this.form.username,
          nickname: this.form.username,
          password : this.form.password,
          password_confirmation: this.form.passwordConfirm,
          captcha: this.form.captcha,
          prize: this.$route.query.hasOwnProperty('prize')?this.$route.query.prize:''
        }).then((data) => {
          //注册成功
          if(data.errno === 0){
            this.$alert('<i style="color:green" class="el-icon-success"></i>恭喜您，注册成功！', '提示', {
              dangerouslyUseHTMLString: true,
              callback: action => {
                this.logout()
                if(window.ISMOBILE){
                  window.location.href = '//app.gw881.com'
                }
              }
            });
            this.formReset()
          }else{
            this.$alert(data.error, '注册失败', {
              confirmButtonText: '确定',
              center: true
            });
            this.getCaptcha()
          }
        }).catch((error) =>{
          this.$alert('未知错误', '注册失败', {
            confirmButtonText: '确定',
            center: true
          });
        })
      },
      openService(){
        window.open(this.serviceUrl,'_blank');
      }
    },
    mounted() {
      if(window.ISMOBILE){
        this.isMobile = true
      }else{
        window.addEventListener('resize',this.getHeight);
      }
      //不显示顶部底部
      this.$emit("eventFromChild",false)
      this.getCaptcha()
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
  .page-register {
    background:#f7f7f7 url(../../assets/login/login.jpg) no-repeat center center;
    position: relative;
    min-height: 748px;
    .register-box {
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
            input {
              border: none;
              outline: none;
              font-size: 16px;
            }
            dl{
              font-size: 16px;
              line-height: 30px;
              flex: 1;
              -webkit-flex: 1;
              dt{
                color:#b7b7b7;
              }
              dd{

              }
            }
            &:first-child{
              border-left-color:#ff0f53;
            }
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


            .line-right {
              display: inline-block;
              vertical-align: middle;
              line-height: 72px;
              height: 72px;
              min-width: 130px;
              text-align: right;
              span {
                display: inline-block;
                vertical-align: middle;
              }
              img {
                width: 110px;
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

        .register-types{
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
          .register-link {
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
    .register-float {
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
    .register-footer {
      bottom: 4px;
      width: 1200px;
      left: 50%;
      margin-left: -600px;
      text-align: center;
      line-height: 24px;
      position: absolute;
    }

    .choose-avatar {

    }
    .avatar-list {
      position: absolute;
      left: 230px;
      height: 112px;
      width: 250px;
    }
    .avatar-list a {
      display: inline-block;
      width: 56px;
      height: 56px;
      padding: 5px;
      border-radius: 50%;
      margin-right: 20px;
      border: 1px solid #dfdfdf;
      position: relative;
      background-color: #fff;
      margin-bottom: 2px;
    }
    .avatar-show {
      width: 90px;
    }
    .avatar-show img,
    .avatar-list a img {
      display: block;
      max-width: 100%;
      border-radius: 50%;
    }
    .avatar-list a.active {
      border-color: #32b89f;
    }

  }
</style>
<style lang="scss">
  .page-register{
    .el-checkbox__label {
      font-size: 16px;
    }

    .register-btn {
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
  }
  .ISMOBILE {
    .el-message-box {
      width: 100%;
    }
    .page-register {
      background: none;
      font-size: 14px;
    }
    .outer-box {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .mobile-box {
      width: 100%;
      height: 100%;
      padding: 5%;
      background: #fff;
      .form {
        border-top: 2px solid #e9e9e9;
      }
      .logo {
          background: url(../../assets/login/login-logo.png) no-repeat;
          width: 55px;
          height: 101px;
          background-size: 100% auto;
          display: block;
          margin: 0 auto;
      }

      .form-line {
        position: relative;
        padding: 5px 20px 18px;
        input {
          font-size: 14px;
        }
        dl {
          line-height: 24px;
        }
        .line-right {
          line-height: 20px;
          height: 20px;
          position: absolute;
          bottom: 0
        }
      }
      .right-code {
        .line-right {
          position: inherit;
          min-width: auto;
          width: 35%;
          margin-right: -5%;
          > div {
            img {
              width: 100%;
            }
          }
        }
      }

    }
  }
</style>
