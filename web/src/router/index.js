import App from '../App'

const Deposite = r => require.ensure([], () => r(require('../pages/account/children/deposite/deposite')), 'deposite')
const Withdraw = r => require.ensure([], () => r(require('../pages/account/children/withdraw/withdraw')), 'withdraw')
const Transfer = r => require.ensure([], () => r(require('../pages/account/children/transfer/transfer')), 'transfer')
const Message = r => require.ensure([], () => r(require('../pages/account/children/message/message')), 'message')
const Password = r => require.ensure([], () => r(require('../pages/account/children/setting/password/password')), 'password')

const Bankcard = r => require.ensure([], () => r(require('../pages/account/children/setting/bankcard/bankcard')), 'bankcard')

const Agent = r => require.ensure([], () => r(require('../pages/account/children/proxy/agent/agent')), 'agent')
const Profit = r => require.ensure([], () => r(require('../pages/account/children/proxy/profit/profit')), 'profit')
const proxyTeamAccount = r => require.ensure([], () => r(require('../pages/account/children/proxy/teamAccount/teamAccount')), 'teamAccount')
const Contract = r => require.ensure([], () => r(require('../pages/account/children/proxy/contract/contract')), 'contract')
const Salary = r => require.ensure([], () => r(require('../pages/account/children/proxy/salary/salary')), 'salary')
const UserProfit = r => require.ensure([], () => r(require('../pages/account/children/proxy/userProfit/userProfit')), 'userProfit')



const ReportFunds = r => require.ensure([], () => r(require('../pages/account/children/report/funds/funds')), 'reportFunds')
const ReportRecharge = r => require.ensure([], () => r(require('../pages/account/children/report/recharge/recharge')), 'reportRecharge')
const ReportWithdraw = r => require.ensure([], () => r(require('../pages/account/children/report/withdraw/withdraw')), 'reportWithdraw')
const ReportGame = r => require.ensure([], () => r(require('../pages/account/children/report/game/game')), 'reportGame')
const ReportTrace = r => require.ensure([], () => r(require('../pages/account/children/report/trace/trace')), 'reportTrace')
const ReportPersonal = r => require.ensure([], () => r(require('../pages/account/children/report/profit/profit')), 'reportPersonal')

const Account = r => require.ensure([], () => r(require('../pages/account/account')), 'account')
const Shadow = r => require.ensure([], () => r(require('../pages/account/shadow')), 'shadow')
const Activity = r => require.ensure([], () => r(require('../pages/activity/activity')), 'activity')
const Help = r => require.ensure([], () => r(require('../pages/help/help')), 'help')


const Home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const Game = r => require.ensure([], () => r(require('../pages/game/game')), 'game')
const Login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')
const Register = r => require.ensure([], () => r(require('../pages/register/register')), 'login')
const Retrieve = r => require.ensure([], () => r(require('../pages/retrieve/retrieve')), 'retrieve')

const Download = r => require.ensure([], () => r(require('../pages/download/download')), 'login')

const NotFound = r => require.ensure([], () => r(require('../pages/notfound/notfound')), 'notfound')




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [
      {
        path: '/',
        redirect: 'login'
      },
      {
        path:'account',
        component: Account,
          children:[
            {
              path: 'shadow',
              component: Shadow,
              children:[
                {
                  path: 'deposite',
                  component: Deposite
                },
                {
                  path: 'withdraw',
                  component: Withdraw
                },
                {
                  path: 'transfer',
                  component: Transfer
                },
                {
                  path: 'bankcard',
                  component: Bankcard
                },

                {
                  path: 'message',
                  component: Message
                },
                {
                  path: 'password',
                  component: Password
                },
                {
                  path: 'agent',
                  component: Agent
                },
                {
                  path: 'contract',
                  component: Contract
                },
                {
                  path: 'salary',
                  component: Salary
                },
                {
                  path: 'reportFunds',
                  component: ReportFunds
                },
                {
                  path: 'reportRecharge',
                  component: ReportRecharge
                },
                {
                  path: 'reportWithdraw',
                  component: ReportWithdraw
                },
                {
                  path: 'reportGame',
                  component: ReportGame
                },
                {
                  path: 'reportTrace',
                  component: ReportTrace
                },
                {
                  path: 'profit',
                  component: Profit
                },
                {
                  path: 'teamAccount',
                  component: proxyTeamAccount
                },
                {
                  path: 'userProfit',
                  component: UserProfit
                },
                {
                  path: 'reportPersonal',
                  component: ReportPersonal
                }
              ]
            }

          ]
      },
      {
        path:'home',
        component: Home,
      },
      {
        path:'game',
        component: Game,
      },
      {
        path:'activity',
        component: Activity
      },
      {
        path:'help',
        component: Help
      },

      {
        path:'login',
        component: Login,
        meta: { noRequiresAuth: true }
      },
      {
        path:'register',
        component: Register,
        meta: { noRequiresAuth: true }
      },
      {
        path:'retrieve',
        component: Retrieve,
        meta: { noRequiresAuth: true }
      },
      {
        path:'download',
        component: Download,
        meta: { noRequiresAuth: true }
      },


      {
        path: '*',
        component: NotFound,
        meta: { noRequiresAuth: true }
      },

    ]
  }

]
