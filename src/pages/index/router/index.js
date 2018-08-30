import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import ImmediatePay from '../components/ImmediatePay'
import Order from '../components/Orders'
import Payment from '../components/Payment'
import OrderDetail from '../components/OrderDetail'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/mp/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/immediatePay',
      name: 'ImmediatePay',
      component: ImmediatePay
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    }
  ]
})
