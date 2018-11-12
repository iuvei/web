<template>
  <section class="page-account">
    <div class="container">
      <div class="left">
        <top-menu></top-menu>
        <div class="side-profile left">
          <profile></profile>
        </div>
        <div class="main-content right">
          <report-menu class="report-menu"></report-menu>
          <agent-menu v-if="isAgent" class="agent-menu"></agent-menu>
          <div class="my-profile">
            <el-tabs v-model="activeName">
              <el-tab-pane label="我的资料" name="first">
                <table class="info-table">
                  <tr>
                    <td>账户头像</td>
                    <td colspan="3"><img src="../../assets/account/user-head.png"></td>
                  </tr>
                  <tr>
                    <td>用户名：</td>
                    <td>{{userInfo.username}}</td>
                    <td>用户昵称：</td>
                    <td>{{userInfo.nickname}}</td>
                  </tr>
                  <tr>
                    <td>账户类型：</td>
                    <td>{{userTypeName}}</td>
                    <td>注册时间：</td>
                    <td>{{userInfo.register_at}}</td>
                  </tr>
                  <tr>
                    <td>手机号：</td>
                    <td>{{userInfo.mobile}}</td>
                    <td>绑定取款人：</td>
                    <td>{{userInfo.name}}</td>
                  </tr>
                </table>
              </el-tab-pane>
              <el-tab-pane label="我的银行卡" name="second">
                <div class="bankcard-list" :class="{locked:isLocked}">
                    <ul>
                      <li v-for="item,key in bankcardList">
                        <div class="bankcard-title">银行卡{{key+1}}：</div>
                        <div class="bankcard-info">
                          <span class="bank-logo ico-bank" :class="banks[item.bank_id]"></span>
                          <span class="bank-info">{{item.account}}</span>
                        </div>
                        <div class="bankcard-status">
                          <span class="btn-disabled">已锁定</span>
                         <router-link class="btn-enable" to="/account/shadow/bankcard?opt=update">修改</router-link>
                         <router-link class="btn-enable" to="/account/shadow/bankcard?opt=delete">删除</router-link>
                        </div>
                      </li>
                      <li v-show="bankcardList.length<4">
                        <div class="bankcard-title">银行卡{{bankcardList.length+1}}：</div>
                        <div class="bankcard-info border-dashed">
                          <p>没有绑定银行卡，请点击添加按钮添加银行卡</p>
                        </div>
                        <div class="bankcard-status">
                          <span class="btn-disabled">禁止添加</span>
                          <router-link to="account/shadow/bankcard" class="btn-enable">
                            <span class="el-icon-plus"></span>
                            <p>添加银行卡</p>
                          </router-link>
                        </div>
                      </li>
                    </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="登录记录" name="third">
                <table class="info-table">
                  <tr>
                    <td>用户名：</td>
                    <td>{{userInfo.username}}</td>
                  </tr>
                  <tr>
                    <td>登录ip:</td>
                    <td>{{userInfo.login_ip}}</td>
                  </tr>
                  <tr>
                    <td>登录时间</td>
                    <td>{{userInfo.signin_at}}</td>
                  </tr>
                </table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="security-content">
        <div class="security-status">
          <h3>账户安全设置</h3>
          <p>安全系数：<span class="color-red">{{rate}}%</span><span class="color-red">{{statusText}}</span></p>
          <div class="status-bar">
            <div :style="'width:'+ rate +'%'" class="bar-inner"></div>
          </div>
        </div>
        <div class="security-list">
          <div class="security-item pass">
            <dl>
              <dt><span class="icon-key"></span></dt>
              <dd>登录密码</dd>
              <dd>中</dd>
            </dl>
            <div class="message">建议使用字母和数字组合、混合大小写在组合中加入下划线等符号。</div>
            <div class="operate">
              <router-link class="operate-link-pass" to="/account/shadow/password">修改</router-link>
            </div>
          </div>
          <div class="security-item" :class="{pass:fundsPwdSetted}">
            <dl>
              <dt class="c-yellow"><span class="icon-password-box"></span></dt>
              <dd>资金密码</dd>
              <dd></dd>
            </dl>
            <div class="message message2">在进行银行卡绑定，转账等资金操作时需要进行安全密码确认，以提高您的资金安全性。</div>
            <div class="operate">
              <router-link class="operate-link-pass" to="/account/shadow/password?type=funds">修改</router-link>
              <router-link class="operate-link-set" to="/account/shadow/password?type=funds">设置</router-link>
            </div>
          </div>
          <div class="security-item" :class="{pass:nameSetted}">
            <dl>
              <dt><span class="icon-id-card"></span></dt>
              <dd>绑定取款人</dd>
              <dd></dd>
            </dl>
            <div class="message">绑定取款人后您可以绑定银行卡且只能绑定与取款人相同的银行卡资料。</div>
            <div class="operate">
              <span class="operate-link-pass">已绑定</span>
              <router-link class="operate-link-set" to="/account/shadow/password?type=name">添加</router-link>
            </div>
          </div>
          <div class="security-item" :class="{pass:hasBankCard}">
            <dl>
              <dt><span class="icon-credit-card"></span></dt>
              <dd>绑定银行卡</dd>
              <dd></dd>
            </dl>
            <div class="message">绑定银行卡就能取款，还有平台内部转账等功能。</div>
            <div class="operate">
              <span class="operate-link-pass">已绑定</span>
              <router-link class="operate-link-set" to="/account/shadow/bankcard">添加</router-link>
            </div>
          </div>
          <div class="security-item" :class="{pass:setQuestion}">
            <dl>
              <dt><span class="icon-question-mark"></span></dt>
              <dd>密保问题</dd>
              <dd></dd>
            </dl>
            <div class="message">绑定安全问题后可以通过安全问题找回账号资料。</div>
            <div class="operate">
              <span class="operate-link-pass">已设置</span>
              <router-link class="operate-link-set"  to="/account/shadow/password?type=security">设置</router-link>
            </div>
          </div>
          <!--<div class="security-item">-->
            <!--<dl class="low">-->
              <!--<dt><span class="icon-smartphone"></span></dt>-->
              <!--<dd>手机认证</dd>-->
              <!--<dd></dd>-->
            <!--</dl>-->
            <!--<div class="message">绑定手机号用于取款认证及找回用户资料。</div>-->
            <!--<div class="operate">-->
              <!--<a href="#">已绑定</a>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <router-view ></router-view>

  </section>
</template>

<script>
  import CommonHeader from  '../../components/CommonHeader'
  import CommonFooter from  '../../components/CommonFooter'
  import Profile from  '../../components/account/Profile'
  import TopMenu from '../../components/account/TopMenu'
  import AgentMenu from '../../components/account/AgentMenu'
  import ReportMenu from '../../components/account/ReportMenu'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'

  export default {
    name: 'account',
    components: {
      CommonHeader,
      CommonFooter,
      Profile,
      TopMenu,
      AgentMenu,
      ReportMenu,
    },
    data() {
      return {
        activeName: 'first',
        num: 1
      }
    },
    computed: {
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
      ...mapState('common',['userInfo','rate']),
      ...mapState('bankcard',['bankcardList','banks']),
      ...mapGetters('common',['fundsPwdSetted','setQuestion','hasBankCard','isAgent','userTypeName','nameSetted']),
      ...mapGetters('bankcard',['isLocked'])
    },
    methods: {
      ...mapActions('common',['getUserInfo','getSecurityRate']),
      ...mapActions('bankcard',['getBankCardList'])
    },
    created() {
      this.getUserInfo()
      this.getSecurityRate()
    },
    mounted(){
      this.getBankCardList()
    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  .page-account {
    .container{
      .left{
        width: 920px;
        .side-profile {
          width: 257px;
        }
        .main-content {
          width: 652px;
          margin-bottom: 10px;
          .content-wrap {
            widht: 100%;
            .agent-menu {
              width: 656px;
              margin-right: 10px;
              float: left;
            }
            .report-menu {
              width: 469px;
              float: right;
            }
          }
        }
      }
      .my-profile {
        background: #fff;
      }
      .security-content {
        background: #fff;
        width: 473px;
        float: right;
        height: 866px;
        padding: 18px;

        .security-status {
          margin-bottom: 24px;
          h3{
            font-size: 24px;
            display: inline-block;
            vertical-align: middle;
          }
          p{
            display: inline-block;
            vertical-align: middle;
            float:right;
          }
          .status-bar {
            height: 16px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            background: #ececec;
            margin: 19px 0;
            overflow: hidden;
            .bar-inner{
              background-size: 20px 20px;
              width: 0;
              height: 100%;
              transition: all 1s ease-in-out;
              background-color: #5ebbda;
              background-image: -webkit-gradient(linear, 0 0, 100% 100%,
                color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent),
                color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)),
                color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent),
                to(transparent));
              background-image: linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
                transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%,
                transparent 75%, transparent);
            }
          }
        }
        .security-list {
          .security-item {
            padding: 25px 0;
            width: 100%;
            dl{
              display: inline-block;
              vertical-align: middle;
              width: 78px;
              text-align: center;
              dt{
                width: 38px;
                height: 38px;
                line-height: 34px;
                font-size: 24px;
                color: #fff;
                -webkit-border-radius: 19px;
                -moz-border-radius: 19px;
                border-radius: 19px;
                display: block;
                margin: 3px auto;
                background: #e3dadc;
              }
              dd{
                font-size: 15px;
                &:last-child{
                  display: none;
                  font-size: 14px;
                  line-height: 20px;
                }
              }

            }

            .message {
              display: inline-block;
              vertical-align: middle;
              background: url(../../assets/account/message.png);
              height: 68px;
              width: 280px;
              padding: 12px 14px 0 30px;
              line-height: 24px;
              font-size: 14px;
              &.message2{
                background: url(../../assets/account/message2.png);
                height: 99px;
              }
            }
            .operate {
              display: inline-block;
              vertical-align: middle;

              .operate-link-pass {
                display: none;
              }
              .operate-link-set {
                display: block;
              }
            }

            &.low{
              dt{
                background: #ff3131;
                dd{
                  &:last-child{
                    display: block;
                    color: #ff3131;
                  }
                }
              }
            }
            &.middle{
              dt{
                background: #ffc375;
                dd{
                  &:last-child{
                    display: block;
                    color: #ffc375;
                  }
                }
              }
            }
            &.pass{
              dt{
                background: #63c683;
                dd{
                  &:last-child{
                    color: #63c683;
                  }
                }
              }
              .operate {
                .operate-link-pass {
                  display: block;
                }
                .operate-link-set {
                  display: none;
                }
              }
            }
          }
        }
      }
    }

    .info-table {
      border: 0;
      border-collapse: collapse;
      width: 100%;
      tr{
        td {
          padding: 17px 5px 17px 40px;
          &:nth-child(2n){
            color: #19abc0;
          }
        }
        &:nth-child(2n+2){
          td {
            background: #f7f8fa;
          }
        }
      }
    }
    //我的银行卡
    .bankcard-list {
      ul{
        padding: 10px 50px;
        li{
          border-bottom: 1px dashed #e9e9e9;
          padding: 10px 0;
          &>div{
            display: inline-block;
            vertical-align: middle;
          }
          .bankcard-info {
            border: 1px solid #e2e2e2;
            padding: 0px 10px;
            width: 350px;
            height: 46px;
            line-height: 40px;
            span{
              display: inline-block;
              vertical-align: middle;
            }
            .bank-info {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 190px;
            }
            &.border-dashed{
              border-style: dashed;
              p{
                color: #9c96a0;
              }
            }
          }
          .bankcard-status{
            border: 1px dashed #e2e2e2;
            height: 46px;
            width: 88px;
            text-align: center;
            font-size: 13px;
            padding-top: 4px;
            cursor: pointer;
            &.actived {
              background: #d86c2b;
              border: 1px solid #d86c2b;
              color: #fff;
            }
          }
        }

        .btn-disabled{
          display: none;
        }
        .btn-enable {
          display: block;
        }
      }

      &.locked{
        .btn-disabled{
          display: block;
        }
        .btn-enable {
          display: none;
        }
      }
    }
  }
</style>
<style lang="scss">
  .my-profile{
    .el-tabs__item {
      padding: 0 67px;
    }
    .el-tabs--bottom .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs__item:nth-child(2),
    .el-tabs--bottom .el-tabs__item:last-child, .el-tabs--top .el-tabs__item:last-child{
      padding: 0 67px;
    }
    .el-tabs__content {
      padding: 18px 0;
      min-height: 320px;
    }
  }
</style>
