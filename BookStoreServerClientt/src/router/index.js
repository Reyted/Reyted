import Vue from 'vue'
import Router from 'vue-router'
import AddGoods from '@/components/AddGoods'
import Business from '@/components/Business'
import ShangPinGuanLi from '@/components/ShangPinGuanLi'
import Editor from '@/components/Editor'
import ServerClient from '@/components/ServerClient'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 添加商品的路由
      path: '/AddGoods',
      name: 'AddGoods',
      component: AddGoods
    },
    {
      // 查看营业状况路由   设置为首页
      path: '/Business',
      name: 'Business',
      component: Business
    },
    {
      // 商品管理路由
      path: '/ShangPinGuanLi',
      name: 'ShangPinGuanLi',
      component: ShangPinGuanLi
    },
    {
      // 编辑商品路由
      path: '/Editor',
      name: 'Editor',
      component: Editor
    },
    {
    	path:'/ServerClient',
    	name:'ServerClient',
    	component:ServerClient
    },
    {
    	path:'/',
    	name:'User',
    	component:User
    }
  ]
})
