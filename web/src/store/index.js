import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import common from './modules/common'
import bankcard from './modules/bankcard'


Vue.use(Vuex)


export default new Vuex.Store({
  actions,
  modules: {
    common,
    bankcard
  }
})
