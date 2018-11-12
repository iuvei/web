<template>
  <section class="page-retrieve" :style="'height:'+ screenHeight+'px'">
    <div class="retrieve-box">
      <div class="left">
        <div class="logo"></div>
        <div class="form">
          <div class="form-line">
            <dl>
              <dt>用户名：</dt>
              <dd>
                <input v-model="form.username" placeholder="请输入用户名" @blur="checkUsername">
              </dd>
            </dl>
            <div class="line-right">
              <span v-if="check.username" class="color-red"><i class="el-icon-error"></i>格式不正确</span>
            </div>
          </div>
          <div class="form-line">
            <dl>
              <dt>新密码：</dt>
              <dd>
                <input v-model="form.fundsPassword" type="password" placeholder="请输入密码"  @blur="checkFundsPassword">
              </dd>
            </dl>
            <div class="line-right">
              <span v-if="check.fundsPassword" class="color-red"><i class="el-icon-error"></i>格式不正确</span>
            </div>
          </div>
          <div class="form-line">
            <dl>
              <dt>新密码：</dt>
              <dd>
                <input v-model="form.password" type="password" placeholder="请输入密码"  @blur="checkPassword">
              </dd>
            </dl>
            <div class="line-right">
              <span v-if="check.password" class="color-red"><i class="el-icon-error"></i>格式不正确</span>
            </div>
          </div>
          <div class="form-line">
            <dl>
              <dt>确认密码：</dt>
              <dd>
                <input v-model="form.passwordConfirm" type="password" placeholder="请输入确认密码"  @blur="checkPasswordconfirm">
              </dd>
            </dl>
            <div class="line-right">
              <span v-if="check.passwordConfirm" class="color-red"><i class="el-icon-error"></i>确认密码不一致</span>
            </div>
          </div>
          <div class="form-line">
            <dl>
              <dt>验证码：</dt>
              <dd>
                <input v-model.trim="form.captcha" placeholder="请输入验证码" @blur="checkCaptcha">
              </dd>
            </dl>
            <div class="line-right">
              <span v-if="check.captcha" class="color-red"><i class="el-icon-error"></i>错误</span>
              <img @click="getCaptcha" :src="captchaUrl">
            </div>
          </div>
          <div class="form-line no-border">
            <a class="retrieve-btn" href="javascript:;" @click="retrieve" >找回登录密码</a>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="browser">
          <ul>
            <li><a class="chrome" href="#"></a></li>
            <li><a class="firefox" href="#"></a></li>
            <li><a class="sogou" href="#"></a></li>
            <li><a class="ie" href="#"></a></li>
          </ul>
          <h3><span>推荐浏览器</span></h3>
        </div>
      </div>
      <div class="button"><i class="el-icon-caret-right"></i></div>
    </div>

    <div class="retrieve-float">
      <a href="#"><span class="icon-shopping-online"></span></a>
      <a href="/static/html/speed.html" target="_blank"><span class="icon-electricity"></span></a>
      <router-link to="/download" target="_blank"><span class="icon-finger-touching"></span></router-link>
    </div>
    <div class="retrieve-footer">
      <p>www.mofangyouxi.com</p>
      <p>© 2014 魔方娱乐版权所有菲律宾政府合法博彩牌照认证</p>
    </div>
  </section>
</template>

<script>
  import md5 from 'js-md5'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'retrieve',
    components: {
    },
    data() {
      return {
        form:{
          username: "",
          password: "",
          fundsPassword: false,
          passwordConfirm: "",
          captcha: ""
        },
        check:{
          username: false,
          fundsPassword: false,
          password: false,
          passwordConfirm: false,
          captcha: false
        },
        avatarList: [1,2,3,4,5,6],
        screenHeight: document.documentElement.clientHeight,
        checked: false,
        captchaUrl: "",
      }
    },
    computed:{
      ...mapState('common',['isLogin']),
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
        if(!(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/).test(this.form.username)){
          this.check.username = true
        }else{
          this.check.username = false
        }
      },
      checkFundsPassword: function(){
        if(!(/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,16}$/).test(this.form.fundsPassword)){
          this.check.fundsPassword = true
        }else{
          this.check.fundsPassword = false
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
      retrieve(){

        this.checkUsername()
        this.checkPassword()
        this.checkPasswordconfirm()
        this.checkCaptcha()
        if(!this.checkPass){
          return
        }
        this.axios.get('/service?action=findPwd',{params:{
          avatarid: 1,
          username : this.form.username,
          fund_password: this.form.fundsPassword,
          new_password : this.form.password,
          new_password_confirmation: this.form.passwordConfirm,
          captcha: this.form.captcha
        }
        }).then((data) => {
          //找回成功
          if(data.errno === 0){
            this.formReset()
            this.$alert('<i style="color:green" class="el-icon-success"></i>恭喜您，找回密码成功！', '提示', {
              dangerouslyUseHTMLString: true,
              callback: action => {
                this.$router.replace('/login')
              }
            });
          }else{
            this.$alert(data.error, '注册失败', {
              confirmButtonText: '确定'
            });
            this.getCaptcha()
          }
        }).catch((error) =>{
          this.$alert('未知错误', '注册失败', {
            confirmButtonText: '确定'
          });
        })
      }
    },
    mounted() {
      window.addEventListener('resize',this.getHeight);
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
  .page-retrieve {
    background:#f7f7f7 url(../../assets/login/login.jpg) no-repeat center center;
    position: relative;
    min-height: 748px;
    .retrieve-box {
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
            .retrieve-btn {
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

        .retrieve-types{
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
          .retrieve-link {
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
    .retrieve-float {
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
    .retrieve-footer {
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
  .page-retrieve{
    .el-checkbox__label {
      font-size: 16px;
    }
  }
</style>
