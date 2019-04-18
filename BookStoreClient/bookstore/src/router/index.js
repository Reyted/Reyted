import Vue from 'vue'
import Router from 'vue-router'
import AllProducts from "@/components/AllProducts"
import regist from "@/components/regist"
import Login from "@/components/Login"
import Body from "@/components/Body"
import Buy from '@/components/Buy'
import ShopingCar from '@/components/ShopingCar'
import Payment from '@/components/Payment'

Vue.use(Router)

export default new Router({
	mode:'history',
	base:'/vue-bookstore/',
  routes: [
    {
    	path:"/",
    	name:'Body',
    	component:Body
    },
    {
    	path:"/regist",
    	name:'regist',
    	component:regist
    },
    {
    	path:"/login",
    	name:'login',
    	component:Login
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/ShopingCar',
      name: 'ShopingCar',
      component: ShopingCar
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment
    }
  ]
})
