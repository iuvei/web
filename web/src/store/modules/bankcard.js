import * as types from '../mutation-types'
import {getBankCardList} from '../../service/getData'
// initial state

const state = {
  isLocked: 0,
  limit_num: 4,
  banks: {},
  bankcardList: [],
  checkedToken: null
}

// getters
const getters = {
  isLocked:(state)=>{
    return state.isLocked != 0
  }
}

// actions
const actions = {
  //获取银行卡列表
  getBankCardList : ({ commit }) =>{
    getBankCardList().then(({data})=>{
      commit(types.GET_BANKCARD_LIST, data)
    }).catch((err)=>{
      console.log(err)
    })
  }

}

// mutations
const mutations = {
  [types.GET_BANKCARD_LIST] (state, data) {
    state.isLocked =  data.is_locked
    state.limitNum =  data.limit_num
    state.bankcardList = [...data.list]
    state.banks = {...data.banks}
  },
  [types.SET_BANKCARD_TOKEN] (state, data) {
    state.checkedToken =  data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
