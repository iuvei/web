/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';


if (process.env.NODE_ENV == 'development') {
  baseUrl = '//dev.ms6.vip';

}else if(process.env.NODE_ENV == 'production'){
}

export {
  baseUrl,
  routerMode
}
