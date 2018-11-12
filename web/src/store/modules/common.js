import * as types from '../mutation-types'
import * as api from '../../service/getData'
// state
const state = {
  gameIframeLink: '',
  isShowGameIframe: false,
  iframeName: '',
  //用户是否登录
  isLogin: false,
  isLoading: false,
  unreadMessage: 0,
  windowScrollTop: 0,
  rate: 0,
  rateOperate: null,
  serviceUrl: '',
  //用户信息
  userInfo: {
    "id": null,
    "is_agent": null,
    "username": "", //用户名
    "parent_id": null,
    "forefather_ids": "",
    "parent": "",
    "forefathers": "",
    "account_id": null,
    "prize_group": "",
    "blocked": null,
    "portrait_code": null,
    "name": "", //昵称
    "nickname": "",
    "email": "",
    "mobile": "",
    "is_tester": null,
    "qq": "",
    "skype": "",
    "bet_coefficient": "",
    "login_ip": "", //登录ip
    "signin_at": "", // 上次登录时间
    "register_at": "", //注册时间
    "is_top": 1,
    "set_question": 0,
    "can_withdrawal": 1,
    "fund_pwd_seted": 0, //是否设置资金密码
    "has_bank_card": 0,
    "withdraw_limit_times": "",
    "withdraw_times": 0,
    "max_amount": "",
    "min_amount": "",
    "abalance": "",
    "frozen": "",
    "available": "",  //余额
    "withdrawable": "", // 可提现余额
    "prohibit": "",
    "contract_dividend_status": null,
    "contract_salary_status": null,
    "user_level": 0,
    "transfer_status": 1,
    "is_change_pwd": 0
  }
}

// getters
const getters = {
  fundsPwdSetted:(state)=>{
    return state.userInfo.fund_pwd_seted != 0
  },
  setQuestion:(state)=>{
    return state.userInfo.set_question != 0
  },
  nameSetted: (state)=>{
    return !!state.userInfo.name
  },
  hasBankCard:(state)=>{
    return state.userInfo.has_bank_card != 0
  },
  isAgent:(state)=>{
    return state.userInfo.is_agent != 0
  },
  isShowContract:(state)=>{
    return (state.userInfo.contract_dividend_status == 0 || state.userInfo.contract_dividend_status == 1)
  },
  isShowContractAgree:()=>{
    return state.userInfo.contract_dividend_status == 0
  },
  isShowSalary:(state)=>{
    return (state.userInfo.contract_salary_status == 0 || state.userInfo.contract_salary_status == 1)
  },
  isShowSalaryAgree:(state)=>{
    return state.userInfo.contract_salary_status == 0
  },
  canWithdrawal:(state)=>{
    return state.userInfo.can_withdrawal == 1
  },
  canTransfer: (state)=>{
    return state.userInfo.transfer_status == 1
  },
  userTypeName: (state) => {
    if(state.userInfo.is_agent == '1'){
      var str = ''
      switch(state.userInfo.user_level){
        case 0 :
          str = '总号'
          break;
        case 1 :
          str = '线长'
          break;
        case 2 :
          str = '股东'
          break;
        case 3 :
          str = '主管'
          break;
        case 4 :
          str = '招商'
          break;
        default:
          str = '招商'
          break;
      }
      return str
    }else{
      return "玩家"
    }
  },

}

// actions
const actions = {
  getUserInfo : ({ commit }) =>{
    return new Promise(async (resolve, reject)=>{
      api.getUserInfo().then(({data}) => {
        commit(types.GET_USER_INFO, data)
        resolve() // 接口请求完成
      }).catch((err)=>{
        console.log(err)
        reject()
      })
    })
  },
  getUnreadNum : ({ commit }) =>{
    api.getUnreadNum().then(({data}) => {
      commit(types.SET_UNREAD_NUM, data.num)
    }).catch((err)=>{
      console.log(err)
    })
  },
  getSecurityRate : ({ commit }) => {
    return new Promise(async (resolve, reject)=>{
      api.getSecurityRate().then(({data}) => {
        commit(types.SET_SECURITY_RATE, data)
        resolve() // 接口请求完成
      }).catch((err)=>{
        console.log(err)
        reject()
      })
    })
  },
  getUserMoney : ({ commit }) =>{
    return new Promise(async (resolve, reject)=>{
      api.getUserMoney().then(({data}) => {
        commit(types.SET_USER_MONEY, data.available)
        resolve() // 接口请求完成
      }).catch((err)=>{
        console.log(err)
        reject()
      })

    })


  },
}

// mutations
const mutations = {
  [types.GET_USER_INFO] (state, data) {
    state.userInfo = { ...data }
  },
  [types.SET_GAME_IFRAME_LINK](state,_link){
    state.gameIframeLink = _link
  },
  [types.SET_GAME_IFRAME_SHOW](state,_bool){
    state.isShowGameIframe = _bool
  },
  [types.SET_ISLOGIN](state,_bool){
    state.isLogin = _bool
  },
  [types.SET_AMOUNT](state,amount){
    state.userInfo.available = Number(state.userInfo.available.replace(/,/g,''))+ Number(amount)
  },
  [types.SET_ISLOADING](state,bool){
    state.isLoading = bool
  },
  [types.SET_FUND_PWD](state,bool){
    state.userInfo.fund_pwd_seted = bool
  },
  [types.SET_USERINFO_CONTRACT_STATUS](state,bool){
    state.userInfo.contract_dividend_status = bool
  },
  [types.SET_USERINFO_SALARY_STATUS](state,bool){
    state.userInfo.contract_salary_status = bool
  },
  [types.SET_UNREAD_NUM](state,num){
    state.unreadMessage = num
  },
  [types.SET_WINDOW_SCROLLTOP](state,num){
    state.windowScrollTop = num
  },
  [types.SET_HAS_BANKCARD](state,num){
    state.userInfo.has_bank_card = num
  },
  [types.SET_SECURITY_RATE](state,data){
    state.rate = data.rate
    state.rateOperate = data.rate_content
  },
  [types.SET_SERVICE_URL](state,data){
    state.serviceUrl = data
  },
  [types.SET_USER_MONEY](state,data){
    state.userInfo.available = data
  },
  [types.SET_IS_CHANGE_PWD](state,bool){
    state.userInfo.is_change_pwd = bool
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
