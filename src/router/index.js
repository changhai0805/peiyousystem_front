import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Index from '@/view/Index'
import AutoMonitor from '@/view/autoMonitor'
import Test from '@/view/test'
import Result from '@/view/result'
import AlarmMessage from '@/view/alarmMessage'
import Indextwo from '@/view/indextwo'
import SalesManagement from '@/view/salesManagement'
import SalesReturnManagement from '@/view/salesReturnManagement'
import SalesPersonal from '@/view/salesPersonal'
import Indexthree from '@/view/indexthree'
import PurchasingGoodsManagement from '@/view/purchasingGoodsManagement'
import PurchaseReturnManagement from '@/view/purchaseReturnManagement'
import PurchasePersonal from '@/view/purchasePersonal'
import Personnews from '@/view/personnews'
import CustomerServe from '@/view/customerServe'
import ExitMoney from '@/view/exitMoney'
import ChangePass from '@/view/changePass'
import PersonCore from '@/view/personCore'
import NewsCore from '@/view/newsCore'
import ClassManagment from '@/view/classManagment'
import SchoolByAdmin from '@/view/schoolByAdmin'
import imServer from '@/components/imServer/imServer'
import imClient from '@/components/imClient/imClient'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name:'login',
      component: Login,
    },
    {
      path:'/index',
      name:'index',
      component: Index,
      redirect: '/alarmMessage',
      children:[
        {
          path: '/alarmMessage',
          name: 'alarmMessage',
          component: AlarmMessage,
        },
        {
          path: '/test',
          name: 'test',
          component: Test
        },
        {
          path: '/result',
          name: 'result',
          component: Result
        },
        {
          path: '/result',
          name: 'result',
          component: Result
        },
        {
          path: '/classManagment',
          name: 'classManagment',
          component: ClassManagment
        },
        {
          path: '/personnews',
          name: 'personnews',
          component: Personnews
        }
      ]
    },
    {
      path:'/indextwo',
      name:'indextwo',
      component: Indextwo,
      redirect: '/schoolByAdmin',
      children:[
        {
          path: '/schoolByAdmin',
          name: 'schoolByAdmin',
          component: SchoolByAdmin
        },
        {
          path: '/salesManagement',
          name: 'salesManagement',
          component: SalesManagement
        },
        {
          path: '/salesReturnManagement',
          name: 'salesReturnManagement',
          component: SalesReturnManagement
        },
        {
          path: '/salesPersonal',
          name: 'salesPersonal',
          component: SalesPersonal
        },
        {
          path: '/customerServe',
          name: 'customerServe',
          component: CustomerServe
        },
        {
          path: '/exitMoney',
          name: 'exitMoney',
          component: ExitMoney
        },
        {
          path: '/changePass',
          name: 'changePass',
          component: ChangePass
        },
        {
          path: '/imServer',
          name: 'imServer',
          component: imServer
        },
      ]
    },
    {
      path:'/indexthree',
      name:'indexthree',
      component: Indexthree,
      redirect: '/purchasingGoodsManagement',
      children:[
        {
          path: '/purchasingGoodsManagement',
          name: 'purchasingGoodsManagement',
          component: PurchasingGoodsManagement
        },
        {
          path: '/purchaseReturnManagement',
          name: 'purchaseReturnManagement',
          component: PurchaseReturnManagement
        },
        {
          path: '/purchasePersonal',
          name: 'purchasePersonal',
          component: PurchasePersonal
        },
        {
          path: '/personCore',
          name: 'personCore',
          component: PersonCore
        },
        {
          path: '/newsCore',
          name: 'newsCore',
          component: NewsCore
        },
        {
          path: '/imClient',
          name: 'imClient',
          component: imClient
        }
      ]
    },
  ]
})
export default router;
