const filters = {
    /**
     * 功能：将时间戳按照给定的 时间/日期 格式进行处理
     * @param {Number} date 时间戳
     * @param {String} fmtExp 时间格式 'hh:ss'
     * @returns {String} 规范后的 时间/日期 字符串
     */
    fmtDate: function(date, fmtExp) {
        var date = new Date(date)
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmtExp))
            fmtExp = fmtExp.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmtExp))
                fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmtExp;
    },
    fAmount: function(s, n){
      n = n > 0 && n <= 20 ? n : 4;
      if(!s){
        return 0
      }
      s = s+''
      var isF = false
      if(s.indexOf('-')>-1){
        isF = true
        s = s.replace('-','')
      }
      if(isNaN(Number(s))){
        return s
      }


      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "", i;
      for(i = 0; i < l.length; i ++ ) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      if(isF){
        return '-' + t.split("").reverse().join("") + "." + r;
      }else{
        return t.split("").reverse().join("") + "." + r;
      }

    },
    fMoneyUnit: function(moneyUnit) {
      var text = ""
      switch (Number.parseFloat(moneyUnit) + '') {
        case '1':
          text = "2元"
          break;
        case '0.5':
          text = "1元"
          break;
        case '0.1':
          text = "2角"
          break;
        case '0.05':
          text = "1角"
          break;
        case '0.01':
          text = "2分"
          break;
        case '0.001':
          text = "2厘"
          break;
        default:
          text = ''
              break;
      }
      return text;
    },
}
export default (Vue) => {

    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}
