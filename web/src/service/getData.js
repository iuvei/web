import axios from 'axios'

/**
 * 获取用户信息
 */
export const getUserInfo = () =>{
  return axios.get('/service',{
    params:{
      action:'getCurrentUserInfo'
    }
  })
}


/**
 * 修改登录密码
 *
 */
export const changeLoginPassword = () =>{
  return axios.get('/service',{
    params:{
      action:'getCurrentUserInfo'
    }
  })
}

/**
 * 获取银行卡列表
 */
export const getBankCardList = () => {
  return axios.get('/service',{
    params:{
      action:'getBankCardList'
    }
  })
}


/**
 * 绑定银行卡
 */
export const bindBankCard = (data) =>{
  return axios.post('/service?action=bindBankCard',data)
}
/**
 * 更新银行卡
 */
export const changeBankCard = (data) =>{
  return axios.post('/service?action=changeBankCard',data)
}

/**
 * 检查银行卡是否可用
 */
export const checkBankCard = (data) => {
  return axios.post('/service?action=checkBankCard',data)
}

/**
 * 获取游戏菜单
 * @returns {AxiosPromise<any>}
 */
export const getGameMenu = () => {
  return axios.get('/service',{
    params:{
      action:'getGameMenu'
    }
  })
}

/**
 * 获取未读数量
 */
export const getUnreadNum = () => {
  return axios.get('/service',{
    params:{
      action:'getUnreadNum'
    }
  })
}
/**
 * 获取用户评分
 * @returns {AxiosPromise<any>}
 */
export const getSecurityRate = () => {
  return axios.get('/service',{
    params:{
      action:'getSecurityRate'
    }
  })
}


/**
 * 获取余额
 * @returns {AxiosPromise<any>}
 */
export const getUserMoney = () => {
  return axios.get('/service',{
    params:{
      action:'getUserMoney'
    }
  })
}


