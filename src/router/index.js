import Vue from 'vue'
import Router from 'vue-router'
import VueLodash from 'vue-lodash'




import Intro from '@/components/Intro'
import SetMain from '@/components/SetMain'

import MemberLogin from '@/components/Member/Login'
import Main from '@/components/Main/Main'
import chatbotContent from '@/components/inc/chatbotContent'




const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options) // options is optional

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
	if(savedPosition) {
		//console.log(JSON.stringify(savedPosition));
		return savedPosition;
	} else {
		return { x: 0, y:0}
	}
	
  },
  routes: [
    {
      path: '/',
      name: 'Main',
      component:Main
    },
    {
      path: '/intro',
      name: 'Intro',
      component:Intro
    },
    {
      path: '/setMain',
      name: 'SetMain',
      component:SetMain
    },
    {
      path: '/member/login',
      name: 'MemberLogin',
      component:MemberLogin
	  
    },
    {
      path: '/api/:code',
      name: 'chatbotContent',
      component:chatbotContent
    }
  ]
})

