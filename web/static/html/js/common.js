;
(function(w, $) {
    w.host = window.location.origin + "/service";
    w.forward = window.location.href;
    w.terminal_id = 5;

    var getWebsiteOfHost = function(){
        return  window.location.origin + "/service";
    };

    /*ajax封装1111111111*/
    function ajaxData(obj) {
        var type = obj["type"] || "GET";
        var async = true;
        var data = obj["data"] || "";
        if (typeof obj["async"] !== "undefined") {
            async = obj["async"];
        }
        $.ajax({
            url: obj["url"],
            type: type,
            data: data,
            async: async,
            success: function(msg) {
                if(typeof msg  === 'string'){
                    msg = JSON.parse(msg);
                }
                //console.log(msg);
                if (msg.errno == 0) {
                    if (typeof obj.successCallback === "function") {
                        obj.successCallback(msg.data);
                    }
                } else if (msg.errno == 3004) {
                    window.location.href = "/view/page/login.shtml";
                } else {
                    if (typeof obj.errorCallback === "function") {
                        obj.errorCallback(msg);
                    } else {
                        layer.alert(msg.error);
                    }
                }
            }
        })
    }

   

    /*
    options = {
        tmplObj:  selector id
        data: data
        needClear: boolean
        prependDom : boolean
    }
    */
    function doTrender(options) {
        var tmpl = $(options.tmplObj).html(),
            doTtmpl = doT.template(tmpl);
        var content = doTtmpl(options.data);
        if (options.needClear) {
            $(options.container).html('');
        }
        if (options.prependDom) {
            $(options.prependDom).before(content);
        } else {
            $(options.container).append(content);
        }
    }

    var lotteryNavObj = (function() {
        var l115Url = '/view/game/l115.shtml?';
        var k3 = '/view/game/k3.shtml?';
        var kl12 = '/view/game/kl12.shtml?';
        var klsf =  '/view/game/klsf.shtml?';
        var pk10 = '/view/game/pk10.shtml?';
        var ssc = '/view/game/ssc.shtml?';
        var kl8 = '/view/game/kl8.shtml?';
        var mmc = '/view/game/mmc.shtml?';
        var d3 = '/view/game/3d.shtml?';
        var pg115mmc = '/view/game/pg115mmc.shtml?';
        var sport = '';
        return {
            '2': l115Url,
            '8': l115Url,
            '9': l115Url,
            '14': l115Url,
            '22': l115Url,
            '23': l115Url,
            '24': l115Url,
            '25': l115Url,
            '27': l115Url,
            '29': l115Url,
            '32': l115Url,
            '34': l115Url,
            '43': pg115mmc,
            '44': l115Url,
            '47': l115Url,
            '15': k3,
            '17': k3,
            '18': k3,
            '21': k3,
            '30': k3,
            '33': k3,
            '48': k3,
            '39': kl12,
            '40': klsf,
            '41': klsf,
            '42': kl12,
            '50': klsf,

            '10': pk10,
            '19': pk10,

            '31': sport,

            '1': ssc,
            '3': ssc,
            '4': d3,
            '6': ssc,
            '7': ssc,
            '13': ssc,
            '16': ssc,
            '20': d3,
            '26': mmc,
            '28': ssc,
            '45': ssc,
            '49': ssc,

            '11': d3,
            '12': ssc,
            '37': kl8
        };
    })(); 

 
    //左边导航 
    $(document).on('click', '.ucenter-left .item', function() {
        if ($(this).parent().hasClass('active')) {
            $(this).next().slideToggle();
            $(this).parent().removeClass('active');
            return;
        }
        $('.ucenter-left li.active').find('.item-list').slideUp();
        $('.ucenter-left li.active').removeClass('active');
        $(this).parent().addClass('active');
        $(this).next().slideDown();
    });

    //金额输入格式话
    $(document).on("keyup","[formatmoney]",function(e){
        var v = $.trim(this.value),
            arr = [],
            code = e.keyCode;
        if (code == 37 || code == 39) {
            return;
        }
        v = v.replace(/[^\d|^\.]/g, '');
        arr = v.split('.');
        if (arr.length > 2) {
            v = '' + arr[0] + '.' + arr[1];
        }
        arr = v.split('.');
        if (arr.length > 1) {
            arr[1] = arr[1].substring(0, 2);
            v = arr.join('.');
        }
        this.value = v;
        v = v == '' ? '&nbsp;' : v;
    }).on("blur","[formatmoney]",function(e){
        var v = Number(this.value),
            maxNum = Number($(this).attr('max-data'));
            if(maxNum > 0){
                v = v > maxNum ? maxNum : v;
            }
        this.value = v;
    })




    var formatMoneyUnit = function(moneyUnit) {
        var text = "";
        switch (moneyUnit + '') {
            case '1.000':
                text = "2元";
                break;
            case '0.500':
                text = "1元";
                break;
            case '0.100':
                text = "2角";
                break;
            case '0.050':
                text = "1角";
                break;
            case '0.010':
                text = "2分";
                break;
            case '0.001':
                text = "2厘";
                break;
        }
        return text;
    };

    //序列化对象
    var serializeObj2Params = function(obj) {
        var str = "";
        for (var key in obj) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + obj[key];
        }
        return str;
    }

    //取url参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }



    var XCOOKIE = {
        /**
         * 设置cookie
         * @param {string} name  键名
         * @param {string} value 键值
         * @param {integer} days cookie周期
         */
        setCookie: function(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else {
                var expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        // 获取cookie
        getCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        // 删除cookie
        deleteCookie: function(name) {
            setCookie(name, "", -1);
        }
    }

    var formatMoney = function(num, digit) {
        num = "" + num;
        if(!num){
            return "";
        }
        num = num.replace(/,/g,'');
        if(num == '--') return num;
        var num = Number(num),
            digit = (digit == undefined || digit < 0) ? 2 : digit,
            re = /(-?\d+)(\d{3})/;
        if (Number.prototype.toFixed) {
            num = (num).toFixed(digit)
        } else {
            num = Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit)
        }
        num = '' + num;
        while (re.test(num)) {
            num = num.replace(re, "$1,$2")
        }
        return num
    };
    
    w.formatMoney = formatMoney;
    w.XCOOKIE = XCOOKIE;
    w.getQueryString = getQueryString;
    w.serializeObj2Params = serializeObj2Params;
    w.getWebsiteOfHost = getWebsiteOfHost;
    w.formatMoneyUnit = formatMoneyUnit;
    w.lotteryNavObj = lotteryNavObj;
    w.doTrender = doTrender;
    w.ajaxData = ajaxData; 
})(this, jQuery)