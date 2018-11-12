<template>
  <section class="page-help">
    <div id="wrapper">
      <div id="nav-mobile" class="side-nav">
        <div class="logo">
          <dl>
            <dt>H</dt>
            <dd>帮助中心</dd>
            <dd class="dd-little">elp</dd>
          </dl>
        </div>
        <div class="help-list" id="helpList">
          <div v-for="item,key in menuList" class="help-list-item">
            <div class="help-list-item-title" @click="showList(key,item)">{{item.name}}</div>
            <ul class="item-list" v-show="item.pannel">
              <li v-for="obj in item.children"><a @click="setCurrentArticle(obj.id)" href="javascript:;">{{obj.title}}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="help-center">
        <div class="help-con">
          <div class="help-con-main">
            <div class="common_tab_1_right" >
              <h1 class="help-title"><strong><i>QA</i>{{currentArticle.title}}</strong></h1>
              <div v-html="currentArticle.content">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    name: 'help',
    components: {
    },
    data() {
      return {
        titleList2: {
          "4": {
            "id": 4,
            "name": "常见问题",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-10-29 07:49:54",
            "updated_at": "2014-10-30 21:16:34",
            "children": [
              {
                "id": 3,
                "title": "充提类",
                "category_id": 4,
                "content": "<p><span style=\"color: rgb(255, 0, 0);\">1、完成银行转账15分钟以上充值仍未到账的原因及解决办法</span>：</p><p>&nbsp;</p><p>（1）汇款未使用平台提供的最新银行信息</p><p>（2）汇款时候附言填写错误或者未填写</p><p>（3）平台填写金额与实际汇款金额不一致</p><p>（4）平台填写充值信息之后，超过30分钟才进行汇款</p><p>&nbsp;</p><p>以上任何一点都会引起您的充值未到账，请及时联系客服，并提供银行回单截图等相关证明。</p><p>&nbsp;</p><p>注：需提供的证明——平台账户名、银行转账汇款回执单截图（截图需包含汇款人姓名、汇款银行卡号以及金额和汇款的具体时间）</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">2、未能成功提现的原因及解决办法：</span></p><p>&nbsp;</p><p>（1）会员账户的投注额未满足30%存款额要求</p><p>（2）提现绑定的银行卡信息有误</p><p>（3）银行卡被银行冻结或过期</p><p>&nbsp;</p><p>&nbsp; &nbsp; 由（1）引起的提现失败，请玩家自行遵守平台提现规定后再进行提现操作；</p><p>&nbsp; &nbsp; 由（2）、（3）引起的提现失败，请玩家选择匹配正确的银行卡再进行提现操作。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">3、如何修改已经锁定的取款人信息：</span></p><p>&nbsp;</p><p>联系在线客服并提供正确的平台账号、银行卡号、取款人姓名等信息，经客服核实无误后完成修改。</p><p>&nbsp;</p><p><br/></p>",
                "created_at": "2015-01-30 13:14:13"
              },
              {
                "id": 4,
                "title": "游戏类",
                "category_id": 4,
                "content": "<p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">1、第三方开奖机构不开奖，投注单如何处理？</span></p><p>&nbsp;</p><p>金苹果针对时时彩、11选5类游戏，超过30分钟未获得开奖号码，则对超过的期数进行系统撤单返款，依次顺延下去。撤单之后，如果官方开奖，平台仍维持撤单处理。游戏撤单无手续费。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">2、参加游戏时提示“奖金超过上限”是怎么回事？</span></p><p>&nbsp;</p><p>每个彩种在每一期里所购买的每一注号码，所获得的最大奖金不能超过40万上限</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">3、购买“混合组选”和“特殊号码”提示超过“奖金限额”？</span></p><p>&nbsp;</p><p>“混合组选”包含：</p><p>“组三”、“组六”号码，您实际可购买倍数=奖金限额40万除以“组三”单倍奖金；同理，“特殊号码”您实际可购买倍数=奖金限额40万除以“豹子”单倍奖金。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">4、可追号期数是怎么算的？</span></p><p>&nbsp;</p><p>高频游戏最大可追号期数为该彩种24小时内全部期数。</p><p>&nbsp;</p><p><br/></p>",
                "created_at": "2015-01-30 13:17:57"
              },
              {
                "id": 5,
                "title": "安全类",
                "category_id": 4,
                "content": "<p><span style=\"color: rgb(255, 0, 0);\">1、如何避免账户被盗用？</span></p><p>&nbsp;</p><p>（1）提高网络安全意识，请不要随意上不明的网站，不接受不明信息来源的文件，防止木马入侵电脑，并定期对电脑进行安全检查，避免电脑中病毒和木马导致账户被盗；</p><p>（2）首次登录平台，修改初始登录密码并设定账户资金密码，同时锁定您需要用来提款的银行账户；</p><p>（3）妥善保管您的登录密码和资金密码，同时切勿相信他人以任何理由向您索要金苹果账户的登录密码及资金密码。&nbsp;</p><p><br/></p>",
                "created_at": "2015-01-30 13:19:23"
              }
            ]
          },
          "5": {
            "id": 5,
            "name": "账户",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-10-29 07:50:32",
            "updated_at": "2014-10-30 21:16:38",
            "children": [
              {
                "id": 6,
                "title": "注册开户",
                "category_id": 5,
                "content": "<p>金苹果游戏不支持平台自主开户，仅代理用户有权限开设下级账号并为其设置相应信息。</p><p>&nbsp;</p><p><strong>代理用户开设下级用户流程：</strong></p><p>&nbsp;</p><p><span style=\"color: rgb(0, 0, 0);\">1、使用代理账号登录金苹果游戏平台；</span></p><p>&nbsp;</p><p>2、在“用户管理”栏目下选择<strong>链接开户</strong>或<strong>精准开户</strong>即可；</p><p>&nbsp;</p><p>3、不同代理账号拥有不同的奖金组开户配额，具体可以咨询上级或代理招商人员。</p><p><br/></p>",
                "created_at": "2015-01-30 13:23:54"
              },
              {
                "id": 7,
                "title": "密码",
                "category_id": 5,
                "content": "<p><span style=\"color: rgb(255, 0, 0);\">1、登陆密码</span>：</p><p>&nbsp;</p><p>（1）设置密码</p><p>代理代为开户：因初始登录密码由代理代为设定，为保障玩家的账号安全，在初次登录时系统会提示玩家修改登录密码。</p><p>&nbsp;</p><p>自主链接开户：因是玩家在注册时自行设定的登录密码，初次登录时无需再修改登录密码。</p><p>&nbsp;</p><p>（2）修改密码</p><p>登录平台后，您可以在“账户资料”---“修改登录密码”一项进行修改，即可修改登录密码。</p><p>&nbsp;</p><p>（3）遗失密码</p><p>如果您忘记了自己的登录密码，可联系金苹果游戏在线客服并按照流程指示提供相关资料后，即可找回密码。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">2、资金密码：</span></p><p>&nbsp;</p><p>（1）设置资金密码</p><p>初始账号未设置资金密码，需玩家登录平台后自行设置（不能与登录密码相同）。为了自身资金安全，请仔细保管资金密码，切勿轻易泄露。</p><p>&nbsp;</p><p>温馨提示：金苹果游戏客服及工作人员绝对不会以任何形式向您索要资金密码～</p><p>&nbsp;</p><p>（2）修改</p><p>玩家登录平台后，可在“账户资料”---“修改资金密码”一项进行修改，</p><p>&nbsp;</p><p>修改流程：</p><p>1、输入旧的资金密码；</p><p>2、再次输入新的资金密码，即可完成资金密码的修改。</p><p>&nbsp;</p><p>（3）遗失密码</p><p>如果玩家忘记资金密码，需联系在线客服进行处理，并配合提供相关信息，一旦确认信息完全无误，客服将为玩家重置资金密码，请用户在获得新密码后及时修改。</p><p><br/></p>",
                "created_at": "2015-01-30 13:24:43"
              },
              {
                "id": 8,
                "title": "个人资料",
                "category_id": 5,
                "content": "<p><span style=\"line-height: 1em;\"></span></p><p>登录金苹果游戏平台后，进入“账户资料”页面，点击修改昵称，即可输入新的昵称，请记得修改后保存哦～ 一个闪亮的名号一定会让您赢取更多真金哒～</p><p><span style=\"line-height: 1em;\"></span><br/></p>",
                "created_at": "2015-01-30 13:25:32"
              }
            ]
          },
          "6": {
            "id": 6,
            "name": "充值提现",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-12-07 06:33:04",
            "updated_at": "2014-12-07 06:33:04",
            "children": [
              {
                "id": 9,
                "title": "充值方式",
                "category_id": 6,
                "content": "<p>金苹果游戏目前支持的充值方式包括：银行转账及快捷充值两种方式。</p><p>银行转账业务目前支持：工商银行</p><p>&nbsp;</p><p>金苹果游戏一直在努力为用户创造最便捷、最全面的充值渠道，金苹果游戏后续将支持更多银行及第三方支付渠道，我们届时将会以公告的形式通知您，敬请期待。</p><p><br/></p>",
                "created_at": "2015-01-30 13:28:55"
              },
              {
                "id": 10,
                "title": "网银充值",
                "category_id": 6,
                "content": "<p>目前金苹果游戏支持工商银行高额充值渠道，满足您快速充值的需求，同时配备多条快捷充值通道，方便您更高效购彩。</p><p><br/></p>",
                "created_at": "2015-01-30 13:30:49"
              },
              {
                "id": 11,
                "title": "快捷充值",
                "category_id": 6,
                "content": "<p>目前金苹果游戏快捷充值支持下列银行：</p><p>工行、建行、招行、农行、交行、中信、浦发、民生、光大、兴业、华夏、中行、平安、邮政。</p><p><br/></p>",
                "created_at": "2015-01-30 13:31:27"
              },
              {
                "id": 12,
                "title": "充值相关",
                "category_id": 6,
                "content": "<p>金苹果游戏充值正常情况下5分钟内到账</p><p>&nbsp;</p><p>1、充值时间</p><p>&nbsp;</p><p>工商银行充值时间为24小时。</p><p>快捷充值时间为24小时。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>2、充值限额</p><p>&nbsp;</p><p>&nbsp;</p><p>银行转账：</p><p>&nbsp;</p><p>工商银行最低限额100元，最高限额45,000元；</p><p>&nbsp;</p><p>快捷充值：</p><p>单笔最低限额50元，最高限额70,000元。</p><p><br/></p>",
                "created_at": "2015-01-30 13:32:16"
              },
              {
                "id": 13,
                "title": "提现相关",
                "category_id": 6,
                "content": "<p>提现正常情况下5分钟内到账</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">1、提现时间</span></p><p>&nbsp;</p><p>金苹果游戏目前支持工行、建行、农行、招行、中信、浦发、民生、交通银行的提现业务，均可进行提现。</p><p>正常情况下，提款到账时间在5分钟内，具体参照不同银行的系统时间为准。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">2、提现限额</span></p><p>&nbsp;</p><p>单次最低提现额度为100元，最高为150,000元，当日最高提现次数为5次。</p><p>&nbsp;</p><p>温馨提示：（1）会员账户的投注额未满足30%存款额要求</p><p>。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">3、提现手续费</span></p><p>&nbsp;</p><p>金苹果游戏提现无须缴纳任何手续费，全免。</p><p><br/></p>",
                "created_at": "2015-01-30 13:33:24"
              },
              {
                "id": 14,
                "title": "银行卡相关",
                "category_id": 6,
                "content": "<p><span style=\"color: rgb(255, 0, 0);\">1、绑定银行卡：</span></p><p>&nbsp;</p><p>一个账号最多可以绑定4张银行卡，同一张卡同时只能绑定在一个平台账号上，不能在其他账号上再次绑定该银行卡，客户在前台无法看到本人绑定的银行卡账户名和开户行地址，绑定或者修改银行卡两个小时后才能提款。</p><p>&nbsp;</p><p>重新绑定或者删除银行卡都需要输入已绑定银行卡信息。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">2、锁定银行卡：</span></p><p>&nbsp;</p><p>银行卡信息锁定后，不能增加新卡绑定，锁定的银行卡信息不能进行修改和删除。</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><span style=\"color: rgb(255, 0, 0);\">3、注意事项</span>：</p><p>&nbsp;</p><p>（1）请务必正确填写开户行和银行卡号码、匹配姓名。匹配姓名作为取款、重置密码等凭证，用户不能自行修改。</p><p>&nbsp;</p><p>（2）银行卡资料仅作取款用，在注册时可以不填，不过在提款之前请务必填写详细。真实姓名必须与银行卡户名相同，否则提款将不成功。</p><p><br/></p>",
                "created_at": "2015-01-30 13:39:42"
              }
            ]
          },
          "7": {
            "id": 7,
            "name": "游戏玩法",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-12-07 06:33:17",
            "updated_at": "2014-12-07 06:33:17",
            "children": [
              {
                "id": 15,
                "title": "时时彩玩法",
                "category_id": 7,
                "content": "<p>时时彩属于高频彩，投注区分为万位、千位、百位、十位和个位，各位号码范围为0～9，每期从各位上开出1个号码组成中奖号码。</p><p>玩法即是竞猜5位开奖号码的全部号码、部分号码或部分号码特征。</p><p>时时彩分星彩玩法和大小单双玩法。金苹果平台目前上线了重庆、黑龙江、江西、新疆、天津五省市的时时彩,金苹果自主研发的1分钟开一期奖的分分彩,3分钟开一期的3分彩,以及上海时时乐。</p><p><br/></p><p>下列是金苹果游戏全部时时彩开奖具体时间及奖期规则介绍：</p><p><img src=\"/cms/upload/image/20150907/1441627986630047.png\" title=\"1441627986630047.png\" alt=\"1.png\"/></p><p><br/></p><p>&nbsp;<img src=\"/cms/upload/image/20150908/1441718375222504.jpg\" title=\"1441718375222504.jpg\" alt=\"7.JPG\" width=\"756\" height=\"71\" style=\"width: 756px; height: 71px;\"/></p><p>&nbsp;</p><p>&nbsp;<img src=\"/cms/upload/image/20150908/1441696472901191.jpg\" title=\"1441696472901191.jpg\" alt=\"6.JPG\" width=\"388\" height=\"100\" style=\"width: 388px; height: 100px;\"/></p><p><br/></p><p><br/></p>",
                "created_at": "2015-01-30 13:45:58"
              },
              {
                "id": 16,
                "title": "11选5玩法",
                "category_id": 7,
                "content": "<p>11选5是从01-11共11个号码中任选1-8个号码进行投注，每期开出5个号码为中奖号码，竞猜5位开奖号码的全部或部分号码。</p><p><br/></p><p>投注方式灵活，开奖频次高，全面满足不同彩民的投注需要。</p><p><br/></p><p>金苹果目前上线了广东、江西、山东三省的11选5。</p><p><br/></p><p>下列是金苹果游戏全部11选5游戏开奖具体时间及奖期规则介绍：</p><p><img src=\"/cms/upload/image/20150907/1441628015174598.png\" title=\"1441628015174598.png\" alt=\"2.png\"/></p>",
                "created_at": "2015-01-30 13:46:51"
              },
              {
                "id": 38,
                "title": "P3/P5",
                "category_id": 7,
                "content": "<p>P3投注区分为百位、千位和万位，各位置号码范围为0～9。P5投注区分为个位、十位、百位、千位和万位，各位号码范围为0～9。</p><p><br/></p><p>每期从各位上开出1个号码作为中奖号码，即开奖号码为5位数。</p><p><br/></p><p>下列是金苹果游戏P3/P5的开奖具体时间及奖期规则介绍：</p><p><img src=\"/cms/upload/image/20150907/1441627958272764.png\" title=\"1441627958272764.png\" alt=\"3.png\"/></p>",
                "created_at": "2015-04-30 11:10:48"
              },
              {
                "id": 39,
                "title": "3D",
                "category_id": 7,
                "content": "<p>一个3位自然数为投注号码的彩种，投注者从000-999的数字中选择一个3位数进行投注。</p><p><br/></p><p>下列是金苹果游戏3D的开奖具体时间及奖期规则介绍：</p><p><img src=\"/cms/upload/image/20150907/1441627973119904.png\" title=\"1441627973119904.png\" alt=\"4.png\"/></p>",
                "created_at": "2015-04-30 11:45:12"
              }
            ]
          },
          "8": {
            "id": 8,
            "name": "购彩",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-12-07 06:33:23",
            "updated_at": "2014-12-07 06:35:07",
            "children": [
              {
                "id": 17,
                "title": "购彩",
                "category_id": 8,
                "content": "<p><span style=\"color: rgb(255, 0, 0);\">一、单式&nbsp;&nbsp; &nbsp;</span>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br/></p><p>什么是单式投注？</p><p>单式投注是最基本的投注形式，即购买者根据相应彩票的规则直接选择规定数量的号码组成一注彩票。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">二、复式&nbsp;</span>&nbsp; &nbsp; &nbsp;</p><p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p>复式投注相对于单式投注而言的，指购买者在购买彩票时，选择超过常规开奖的号码个数，并组成一组的投注方式。超过规定数量的号码会依据规定的开奖号码个数排列组合成多注彩票，在提高中奖机会的同时，投注金额也会相应增加。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">三、直选</span> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p>直选即所选号码与开奖号码相同，且顺序一致才中奖。</p><p><br/></p><p>例：</p><p>时时彩五星直选，投注方案为23456，开奖号码为23456，即为中奖。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">四、组选 </span>&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p>直选之外的号码类型称为组选。组选所选出的号码可以和开奖号码的位置、顺序不一样，但是数字必须完全一样才能中奖。</p><p><br/></p><p>例：</p><p>时时彩组选如开奖号码为598，那么投注方案为589、859、958、985都算组选中奖。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">五、组三组六&nbsp;&nbsp;</span> &nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p>1注号码中，3个数字有2个数字相同，这样的号码称为组三，如122、133等。</p><p><br/></p><p>组三单式投注即从0~9中选择两个数字，如3，5，则形成两注彩票的投注，开奖号码为2个3,1个5或1个3,2个5，即为中奖，次序不限，则形成两注彩票的投注。</p><p><br/></p><p>例：</p><p>时时彩后三组三投注方案为5、8，开奖号码为：558、885，都可中奖（顺序不限）。</p><p><br/></p><p>3个数字各不相同的号码称为组六，如123、124、245等。</p><p><br/></p><p>组六共计720注直选，合并为组选共120注。组六单式投注即从0~9中选择三个数字，组成一注彩票的投注。</p><p><br/></p><p>例：</p><p>时时彩后三组六投注方案为2、5、8，开奖号码后三位与投注号码相同（顺序不限）如528,852等，即为中奖。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">六、和值</span> &nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p><p>和值就是基本号码数值的总和。</p><p><br/></p><p>例：</p><p>时时彩后三和值投注方案为和值6，如开奖号码为：123，相加等于6，即可中奖。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">七、跨度 </span>&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p><p>跨度是指所选号码的前三位或者后三位数字中，最大的数字和最小的数字之间相差之数。</p><p><br/></p><p>例：</p><p>时时彩前三投注方案为8，若开奖号码为1、2、9，则最大数为9，最小数为1，两者之差为8，即为中奖。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">八、追号 &nbsp;</span></p><p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p><p>1、什么是追号？</p><p><br/></p><p>追号是指连续多期购买同一注号码；会员在平台发起一个任务后，系统将按任务要求连续多期地自动购买投注号码。</p><p><br/></p><p>金苹果提供同倍追号、翻倍追号、利润率追号3种追号方式。</p><p><br/></p><p><strong>同倍追号：</strong></p><p>同倍追号，即设定追号期数和倍数之后，所有的期数的投注倍数都与设置倍数相同；</p><p><br/></p><p><strong>翻倍追号：</strong></p><p>需要设置“隔期”、“翻倍”，点击“立即生成”，系统将立即生成为与设置一致的投注；</p><p><br/></p><p><strong>利润率追号：</strong></p><p>指追号计划中保证中奖的最低利润，设定“最低利润率”、“起始倍数”、“追号期数”，点击“立即生成”之后，系统会为您计算投注倍数。</p><p><br/></p><p>2、追号规则</p><p>（1）玩家可以随时发起追号任务，玩家进行追号的同时，不影响其他彩票的购买；</p><p>（2）发起追号任务订单，将一次性扣除追号所需金额，账户余额不满足时，任务将不予发起；</p><p>（3）当追号任务符合玩家设置的追号停止条件时，系统将自动终止追号任务，如还有剩余未追期数，系统将剩余期数的追号金额自动退还至玩家购彩账户；</p><p>（4）玩家可以随时取消任意一期未开奖的追号任务或者终止整个追号任务，未追期数的追号金额自动退还至玩家的购彩账户。</p><p>（5）高频游戏最大可追号期数为该彩种24小时内全部期数。如遇撤单，会跳过该期继续追下一期直至符合玩家设置的追号停止条件或者追号完成。</p><p><br/></p><p><br/></p><p><br/></p><p><span style=\"color: rgb(255, 0, 0);\">九、撤单&nbsp;&nbsp;</span> &nbsp; &nbsp;</p><p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p><p>玩家主动撤单：</p><p>任何彩种游戏的撤单都必须在停止投注之前进行，当期投注时间截止后将无法再进行撤单操作，追号单的撤单需要到“查看追号信息”内进行撤单。</p><p><br/></p><p>因官方未开奖撤单：</p><p>金苹果针对时时彩、11选5类游戏，超过30分钟未获得开奖号码，则对超过的期数进行系统撤单返款，依次顺延。撤单之后，如果官方开奖，平台仍维持撤单处理。</p><p><br/></p><p><br/></p><p><br/></p><p>十、购彩记录查看&nbsp;&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p><p>购买彩票以后，从购彩平台进入&quot;我的账户&quot;，在&quot;游戏记录&quot;中查看；</p><p><br/></p><p>购买彩票后会显示结算状态和奖金，如果结算状态显示为已成功，则表示您的方案已经完全成功，等待开奖即可；</p><p><br/></p><p>玩家还可以通过后台查询自己的游戏记录、追号记录、资金明细及盈亏报表，系统将为玩家保留5天以内的账变明细。</p><p><br/></p>",
                "created_at": "2015-01-30 13:48:57"
              }
            ]
          },
          "9": {
            "id": 9,
            "name": "兑奖",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-12-07 06:35:23",
            "updated_at": "2014-12-07 06:35:23",
            "children": [
              {
                "id": 18,
                "title": "平台各彩种开奖时间表",
                "category_id": 9,
                "content": "<p>金苹果游戏全部彩种起售及开奖时间表：</p><p>&nbsp;<img src=\"/cms/upload/image/20150907/1441627509250201.png\" title=\"1441627509250201.png\" alt=\"1.png\" width=\"741\" height=\"224\" style=\"width: 741px; height: 224px;\"/></p><p>&nbsp;</p><p>&nbsp;&nbsp;<img src=\"/cms/upload/image/20150907/1441627514103652.png\" title=\"1441627514103652.png\" alt=\"2.png\"/></p><p><br/></p><p>&nbsp;&nbsp;<img src=\"/cms/upload/image/20150908/1441718591421487.jpg\" title=\"1441718591421487.jpg\" alt=\"7.JPG\" width=\"736\" height=\"66\" style=\"width: 736px; height: 66px;\"/></p><p><br/></p><p>&nbsp;&nbsp;<img src=\"/cms/upload/image/20150907/1441627519579559.png\" title=\"1441627519579559.png\" alt=\"3.png\" width=\"577\" height=\"96\" style=\"width: 577px; height: 96px;\"/></p><p><br/></p><p>&nbsp;&nbsp;<img src=\"/cms/upload/image/20150907/1441627523737638.png\" title=\"1441627523737638.png\" alt=\"4.png\"/></p><p><br/></p><p>&nbsp;&nbsp;<img src=\"/cms/upload/image/20150907/1441627526831346.png\" title=\"1441627526831346.png\" alt=\"5.png\"/></p><p><br/></p><p>&nbsp;&nbsp;<img src=\"/cms/upload/image/20150908/1441696554265155.jpg\" title=\"1441696554265155.jpg\" alt=\"6.JPG\" width=\"400\" height=\"107\" style=\"width: 400px; height: 107px;\"/></p><p><br/></p><p><br/></p>",
                "created_at": "2015-01-30 13:52:57"
              },
              {
                "id": 19,
                "title": "派奖流程",
                "category_id": 9,
                "content": "<p>当您中奖后，系统将自动进行派奖，奖金将全部派送到您的账户中，可在余额中刷新进行查看。</p><p><br/></p><p>金苹果游戏官方不收取任何手续费及佣金，更不扣除税金。</p><p><br/></p><p>金苹果游戏祝您奖金多多，好运连连～</p>",
                "created_at": "2015-01-30 13:53:36"
              },
              {
                "id": 21,
                "title": "奖金限额",
                "category_id": 9,
                "content": "<p>每个彩种在每一期里所购买的每一注号码，所获得的最大奖金不能超过40万上限。</p>",
                "created_at": "2015-01-30 13:54:32"
              }
            ]
          },
          "10": {
            "id": 10,
            "name": "安全保障",
            "parent_id": 3,
            "parent": "帮助中心",
            "template": "help",
            "created_at": "2014-12-07 06:35:43",
            "updated_at": "2014-12-07 06:35:43",
            "children": [
              {
                "id": 23,
                "title": "账号安全",
                "category_id": 10,
                "content": "<p><span style=\"line-height: 1em;\">金苹果游戏目前使用登录密码与资金密码的双重密码管理机制，确保您的账号安全及资金安全。金苹果游戏还会在未来陆续推出更多安全保障性产品，例如：手机密保令牌，声音识别支付等。</span><br/></p><p><br/></p><p><strong>关于银行卡锁定：</strong></p><p>您在锁定银行卡后将不允许再次自行修改密码，如需要修改，可向在线客服进行申请，申请时需要您提供相应的身份资料信息，金苹果游戏之所以这么做，是为了确保您的账号资金安全。请填写您的真实身份信息，以免修改时出现信息误差。</p>",
                "created_at": "2015-01-30 13:56:06"
              },
              {
                "id": 26,
                "title": "购彩安全",
                "category_id": 10,
                "content": "<p>金苹果游戏根据国家彩票管理部门的官方开奖号码进行开奖。</p><p><br/></p><p>若用户自购彩票中奖，本站在开奖后，将奖金全额派发至中奖用户在本站的账户中。</p><p><br/></p><p>用户可以在任意工作时间内对自己在本站的账户中的资金进行提现。</p>",
                "created_at": "2015-01-30 13:58:56"
              },
              {
                "id": 28,
                "title": "加密防盗技术",
                "category_id": 10,
                "content": "<p>为保证用户在游戏过程中信息和资金的安全性，金苹果游戏采用了256位SSL国际安全标准的数据加密技术，并设置了多重加密，以确保金苹果平台用户的资料及投注数据在网络传输过程中不被篡改和窃取。</p>",
                "created_at": "2015-01-30 14:00:14"
              }
            ]
          }
        },
        titleList: {},
        listOpen: {},
        menuList: [],
        articleList: [],
        currentArticle: {}
      }
    },
    methods: {
      showList(key,item){
        item.pannel = !item.pannel
        this.$set(this.menuList, key, item)
      },
      setCurrentArticle(id){
        Object.keys(this.titleList).map((value, index,arr)=>{
          this.titleList[value].children.map((value2, index2,arr2)=>{
            if(value2.id == id){
              this.currentArticle = {...value2}
              return
            }
          })
        })
      },
      getTitle:function(){
        this.axios.get('/service?action=helpCenter').then((data)=>{
          if(data.errno == 0){
            var obj = {...data.data}
            var array = []
             Object.keys(obj).map((value,index,arr)=>{
                obj[value]['pannel'] = false
                array.push(obj[value])
             })
            this.menuList = [...array]
            this.titleList = {...obj}
            var num = Object.keys(this.titleList)[0]
            this.currentArticle = {...this.titleList[num].children[0]}
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      }
    },
    created() {
      this.getTitle()
    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  .page-help {
    font-family: Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", STXihei, STHeiti, Heiti, SimSun, sans-serif;
    color: #333;
    text-align: left;
    background-color: #f8f8f8;

    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 18px;
    }
    h3 {
      padding: 5px 0;
      font-size: 14px;
    }
    h1, h2 {
      font-weight: normal;
    }
    #header, .main-nav li a {
      font-size: 18px;
    }
    .tabs-ul li a, .tabs-menu a {
      font-size: 16px;
    }
    /*字色*/
    .txt-red {
      color: #ff5237!important;
    }
    .txt-blue {
      color: #0e9cff!important;
    }
    .txt-green {
      color: #00b29f!important;
    }
    /**/
    .btn-tab:hover, .tab-on, .tabs-ul a:hover, .tabs-menu a:hover, .tabs-menu li.on a, .tabs-ul li.on a {
      color: #ff5237;
    }
    /*按钮点下动画*/
    .btn-effect {
      position: relative;
      cursor: pointer;
      display: inline-block;
      overflow: hidden;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      vertical-align: middle;
      z-index: 1;
      will-change: opacity, transform;
      -webkit-transition: all .3s ease-out;
      -moz-transition: all .3s ease-out;
      -o-transition: all .3s ease-out;
      -ms-transition: all .3s ease-out;
      transition: all .3s ease-out;
    }
    .btn-effect .btn-ripple {
      position: absolute;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      opacity: 0;
      background: rgba(255, 255, 255, 0.4);
      -webkit-transition: all 0.7s ease-out;
      -moz-transition: all 0.7s ease-out;
      -o-transition: all 0.7s ease-out;
      -ms-transition: all 0.7s ease-out;
      transition: all 0.7s ease-out;
      -webkit-transition-property: -webkit-transform, opacity;
      -moz-transition-property: -moz-transform, opacity;
      -o-transition-property: -o-transform, opacity;
      transition-property: transform, opacity;
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      -ms-transform: scale(0);
      -o-transform: scale(0);
      transform: scale(0);
      pointer-events: none;
    }
    .btn-effect.btn-red .btn-ripple {
      background-color: rgba(255, 82, 55, 0.1);
    }
    /* Firefox Bug: link not triggered */
    a.btn-effect .btn-ripple {
      z-index: -1;
    }
    /*二级菜单tabs=========================================================================================================
    ============================================================================================*/
    .tabs-box {
    }
    .tabs-box-menu {
    }
    .tabs-ul {
      height: 50px;
      border-bottom: 1px solid #dddddd;
      position: relative;
    }
    .tabs-ul li {
      margin-right: 60px;
      float: left;
    }
    .tabs-ul li a {
      height: 50px;
      margin-bottom: -1px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      display: block;
      -webkit-transition: color .3s ease-out;
      -moz-transition: color .3s ease-out;
      -o-transition: color .3s ease-out;
      -ms-transition: color .3s ease-out;
      transition: color .3s ease-out;
    }
    .tabs-ul a:hover {
    }
    .tabs-ul li.on a {
      border-bottom: 1px solid #ff5237;
    }
    .tabs-ul .indicator {
      position: absolute;
      bottom: 0;
      height: 1px;
      background-color: #ff5237;
      will-change: left, right;
    }
    .tabs-r-txt {
      width: auto;
      text-align: right;
      font-size: 12px;
      position: absolute;
      right: 0;
      top: 12px;
      z-index: 32;
    }
    .tabs-r-txt strong {
      margin: 0 3px;
    }
    /*表格=========================================================================================================
    ============================================================================================*/
    table {
      border-collapse: collapse;
      border-spacing: 0px;
    }
    .table-box {
      font-size: 12px;
      border: 1px solid #eee;
      border-radius: 5px;
    }
    .table-body {
      background-color: #fffcf7;
      border-radius: 5px;
      line-height: 50px;
      text-align: center;
    }
    .table-th {
      min-width: 80px;
      background: #f3eadc;
    }
    .table-body td {
      line-height: 36px;
      padding: 3px;
      vertical-align: middle;
      border-width: 0 1px 1px 0;
      border-color: #eee;
      border-style: solid;
    }
    .table-td {
    }
    /*表单*/
    .form-row-1 {
      margin-bottom: 15px;
      overflow: hidden;
      clear: both;
    }
    /*行*/
    .row-1 {
      padding-bottom: 15px;
      margin-bottom: 25px;
      border-bottom: 1px dashed #cccccc;
    }
    /*banner*/
    .banner {
      width: 870px;
      height: 90px;
      margin-bottom: 15px;
    }
    /*footer*/
    .footer {
      padding: 15px 0;
      border-top: 1px solid #aaa;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
    /*头部==================================================================================================================
    ===============================================================================================================*/
    #header {
      height: 80px;
      padding-left: 200px;
      background-color: #1c1f21;
      color: #fff;
      position: relative;
    }
    /*菜单*/
    .main-nav {
      width: 1000px;
      margin: 0 auto;
    }
    .main-nav ul {
      overflow: hidden;
      clear: both;
    }
    .main-nav li {
      height: 74px;
      float: left;
      position: relative;
      line-height: 80px;
      border-bottom: transparent 6px solid;
    }
    .main-nav li a {
      padding: 0 30px;
      color: #fff;
      font-family: "Microsoft YaHei";
    }
    .main-nav li:hover {
      background-color: #3f4150;
    }
    .main-nav li.on {
      background-color: #3f4150;
      border-color: #FFAA0D;
    }
    li.into-game {
      height: 42px;
      margin-top: 17px;
      padding-left: 20px;
      line-height: 42px;
      border: 1px solid #fff;
      border-radius: 22px;
      position: relative;
      float: right;
    }
    li.into-game a {
      padding-left: 40px;
    }
    .ico-intoGame {
      width: 30px;
      height: 19px;
      background: url(../../assets/help/help_ico.png) no-repeat -3px -2px;
      display: block;
      position: absolute;
      left: 5px;
      top: 10px;
    }

    @media only screen and (max-width : 1160px) {
      .main-nav {
        padding-left: 112px;
      }
    }
    /*内容==================================================================================================================
    ===============================================================================================================*/
    #wrapper {
      width: 1400px;
      position: relative;
      margin: 0 auto;
    }

    @media only screen and (max-width : 1160px) {
      #header, #wrapper {
        padding-left: 0;
      }
    }
    /*左侧边栏==================================================================================================================
    ===============================================================================================================*/
    .side-nav {
      width: 200px;
      min-height: 780px;
      padding: 0 0 15px 0;
      background-color: #f8f8f8;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.18), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
      top: 0;
      position: absolute;
      left: 0;
      z-index: 99;
      will-change: left;
      overflow-y: auto;
      max-height: 860px;
    }
    .side-nav.right-aligned {
      will-change: right;
      right: -105%;
      left: auto;
    }
    .side-nav .collapsible {
      margin: 0;
    }
    .side-nav.fixed {
      left: 0;
      position: fixed;
      will-change: left;
      -webkit-transition: left .2s ease-out;
      -moz-transition: left .2s ease-out;
      -o-transition: left .2s ease-out;
      -ms-transition: left .2s ease-out;
      transition: left .2s ease-out;
    }
    .side-nav.fixed.right-aligned {
      right: 0;
      left: auto;
    }

    #sidenav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 120vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 98;
      will-change: opacity;
    }
    /*logo*/
    .logo {
      height: 92px;
      background: #ffffff;
      border-bottom: 1px solid #dbdbdb;
      color: #4b4b4b;
      text-align: left;
      font-size: 24px;
      line-height: 79px;
    }
    .logo dl {
      margin: 0;
      padding: 24px 0 0 19px;
    }
    .logo dl dt {
      float: left;
      height: 64px;
      font-size: 64px;
      line-height: 50px;
      color: #0e9cff;
    }
    .logo dl dd {
      margin: 0;
      padding: 0;
      float: left;
      font-size: 24px;
      line-height: 24px;
      width: 120px;
    }
    .logo dl dd.dd-little{
      color: #a2a2a2;
    }
    /*用户信息*/

    /*菜单缩小*/
    .container {
      margin: 0 auto;
      width: 1200px;
    }
    a.button-collapse.top-nav {
      position: absolute;
      text-align: center;
      height: 32px;
      width: auto;
      padding: 24px 14px;
      background-color: #FFAA0D;
      font-size: 16px;
      left: 0px;
      top: 0;
      float: none;
      z-index: 2;
    }
    a.button-collapse.top-nav.full {
      line-height: 32px;
    }


    /*彩种列表*/


    .side-list {
      padding: 20px 0;
    }
    .side-list ul {
    }
    .side-list li {
      height: 52px;
      margin-bottom: 5px;
      padding-left: 40px;
      background: #eaeaea url(../../assets/help/side_li.png) no-repeat 30px 15px;
      line-height: 52px;
      cursor: pointer;
      color: #333;
    }
    .side-list li a {
      padding-left: 20px;
      width: 140px;
      color: #333;
      display: block;
      text-align: left;
      font-size: 16px;
    }
    .side-list li:hover {
      box-shadow: 0px 0px 2px 2px #ddd;
      background-color: #f4f4f4;
    }
    .side-list li:hover a {
    }
    .side-list li:active, .side-list li.on {
      background: #FFAA0D url(../../assets/help/side_li.png) no-repeat 30px -26px;
    }
    .side-list li.on a {
      color: #fff;
      font-weight: bold;
    }
    /*中间主内容==================================================================================================================
    ===============================================================================================================*/
    #help-center {
      margin-left: 220px;
    }
    .main-center-iframe {
      width: auto;
      height: auto;
      min-height: 800px;
      border: none;
    }
    .help-con {
      width: 1000px;
      padding: 15px 0 170px 0;
      margin: 0 auto;
      position: relative;
    }
    .help-con-main {
      min-height: 700px;
    }
    .help-title {
      height: 60px;
      line-height: 60px;
      margin-bottom: 25px;
      border-bottom: 1px solid #dddddd;
    }
    .help-title strong {
      height: 60px;
      margin-bottom: -1px;
      border-bottom: 1px solid #111;
      display: inline-block;
      font-weight: normal;
    }
    .part-tit {
      height: 32px;
      margin-bottom: 10px;
      line-height: 32px;
      position: relative;
      background: url(../../assets/help/row-title-bg.gif) no-repeat left bottom;
    }
    /*.part-tit span {*/
    /*width: 4px;*/
    /*height: 18px;*/
    /*background-color: #FFAA0D;*/
    /*border-radius: 3px;*/
    /*display: block;*/
    /*position: absolute;*/
    /*left: 6px;*/
    /*top: 5px;*/
    /*}*/
    .p-txt-bd {
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      line-height: 24px;
    }
    .p-txt-bd strong, .p-txt-bd span {
      margin: 0 2px;
    }
    .help-con ol {
      padding-left: 30px;
    }
    .help-con ul, .help-con ul li {
      display: block;
    }
    .help-con ol li {
      list-style: decimal;
      display: list-item;
    }
    .help-tips-box {
      padding: 10px;
      margin: 5px 0 10px 0;
      background-color: #fff9ef;
      border-radius: 5px;
      font-size: 12px;
    }



    /*新菜单*/
    .help-list {

    }
    .help-list-item {
    }
    .help-list-item-title {
      background: #ffffff;
      height: 58px;
      line-height: 58px;
      padding-left: 18px;
      font-size: 18px;
      position: relative;
      cursor: pointer;
      border-bottom: 1px solid #dbdbdb;
    }
    .help-list .help-list-item .help-list-item-title:hover {
      background: #e4e4e4;
      border-color: #e4e4e4;
    }
    .help-list-item-title:before,
    .help-list-item-title:after {
      content: "+";
      display: block;
      font-size: 24px;
      color: #9b9b9b;
      position: absolute;
      right: 15px;
      top: 50%;
      margin-top: -15px;
      line-height: 24px;
    }
    .help-list-item-title:before{
      content: "";
      border-bottom: 3px solid #9b9b9b;
      width: 11px;
      right: 16px;
      margin-top: -3px;
      display: none;
    }
    .help-list-item.expand .help-list-item-title{
      background: #f8f8f8;
      border-color: #f8f8f8;
    }
    .help-list-item.expand .help-list-item-title:before {
      display: block;
    }
    .help-list-item.expand .help-list-item-title:after {
      display: none;
    }
    .item-list {
      height: auto;
      overflow: hidden;
    }
    .expend{
      .item-list {
        height: auto;
      }
    }
    .item-list li {
      width: 100%;
      font-size: 14px;
      line-height: 36px;
    }
    .item-list li a {
      padding-left: 18px;
    }
    .item-list li a:hover,
    .item-list li .active{
      color: #0e9cff;
    }

  }
</style>
