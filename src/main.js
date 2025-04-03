import Vue from 'vue'
import router from './router'
import App from './App.vue'


import VueJsonp from 'vue-jsonp'

import 'expose-loader?$!expose-loader?jQuery!jquery'



import Vuex from 'vuex'
import 'es6-promise/auto'



import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import form from './common/form'
import util from './common/util'

Vue.prototype.$VARS = {
	baseUrl:'http://kisksol.peso.co.kr/',
	authKey:'zldhtmzm',
	callBack:'returnScript',
	debug:false,
	app:'app' // app,server
}


library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


Vue.use(Vuex)

import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)


import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
}
    
Storage.prototype.getObject = function(key) {
      return JSON.parse(this.getItem(key));
}
const store = new Vuex.Store({
	state: {
		historyInfo: {
			pageHistory:[],
			back:false
		},
		codeConfig:{
			//'M01':'한국어', 
			//M02	영어 
			'M03':'map',	//지도안내
			'M04':'evt', //	이벤트
			'M05':'fes', //	주요행사 안내
			'M06':'ser', //	검색
			'M07':'inf', //	전시업체 안내
			'M08':'mob', //	모바일에서 이용하기
			'M09':'', //음성으로 대화하기
			'M10':'', //	교통안내
			'M11':'', //	행사개요
		},
		mainEventCodes: {
			'F01':'3',	//개막식 및 기조연설
			'F02':'4',	//	핀테크기업, 성공과 도전
			'F03':'5',	//	핀테크 기업 해외진출 세미나
			'F04':'7',	//	레그테크 섭테크 쇼케이스
			'F05':'11',	//	채용 설명회
			'F06':'14',	//	아이디어 공모전
			'F07':'15',	//	핀테크 어워즈
			'F08':'23',	//	어른이 금융강의 (금알못 구조대)
			'F09':'25',	//	핀테크 라이브 퀴즈쇼
			'F10':'21',	//	경품추첨
			'F11':'6',	//	핀테크 기업 투자데이
			'F12':'8',	//	글로벌 핀테크 정책 동향
			'F13':'12',	//	샌드박스 글로벌 코리아
			'F14':'16',	//	핀테크와 4차산업혁명
			'F15':'17',	//	인슈어테크
			'F16':'18',	//	자본시장과 핀테크
			'F17':'24',	//	실버 금융상담
			'F18':'27',	//	어린이 금융교육
			'F19':'9',	//	해외진출 비즈니스 상담회
			'F20':'13',	//	멘토링
		},
		snsAccept:false,
		langList: {
			useMobileButton:{'kor':'모바일에서 이용하기','eng':'Use on mobile'},
			eventInfoTitle:{'kor':'이벤트 정보','eng':'Event information'},
			maineventInfoTitle:{'kor':'행사 상세 정보','eng':'Major Event Details'},
			searchButton:{'kor':'검색','eng':'Search'},
			searchPlacholder:{'kor':'검색어를 입력해주세요','eng':'Please enter search text'},
			noResultText:{'kor':'검색결과가 존재하지 않습니다','eng':'No search result'},
			companyInfoText:{'kor':'업체 정보','eng':'Business information'},
		    positionGuide:{'kor':'위치 안내','eng':'Location guide'},
			showMobileAndQuestion:{'kor':'모바일에서 상세보기/문의하기','eng':'View details on mobile / Contact us'},
			mobileTitle:{'kor':'키오스크 모바일에서 이용하기','eng':'Using on Kiosk Mobile'},
			description:{'kor':'휴대폰번호를 입력하신 후 확인 버튼을 선택하시면<br>문자로 URL을 보내 드립니다!','eng':'Enter your mobile phone number and select the OK button,<br>we will send you a URL by letter!'},
			holderText:{'kor':'- 없이 입력','eng':"Enter without '-'"},
			sendButton:{'kor':'전송','eng':'Send'},
			bottomText:{'kor':'모바일 키오스크는 이동중에도 이용이 가능합니다','eng':'Mobile kiosk is available on your way'},
			confirmPhone:{'kor':'전화번호를 확인하세요','eng':'Please check your phone number'},
			succSendPhone:{'kor':'이제 키오스크를 모바일에서 이용 하실 수 있습니다. 문자 메시지를 확인해주세요!','eng':'Kiosk is now available on mobile. Please check the mobile message!'},
			mapPopupTitle:{'a':{'kor':'준비실 행사안내','eng':'Consulting Hall Details'},'b':{'kor':'메인이벤트관 행사안내','eng':'Main Event Hall Details'},'c':{'kor':'국제회의장 행사안내','eng':'International Conference Hall Details'},'gma':{'kor':'상담관 행사안내','eng':'Consulting Hall  Details'}},
			mainEventCategorys:{'all':{'kor':'전체 일정','eng':'ALL'},'1d':{'kor':'1일차 프로그램','eng':'Day 1'},'2d':{'kor':'2일차 프로그램','eng':'Day 2'},'3d':{'kor':'3일차 프로그램','eng':'Day 3'},'every':{'kor':'상시체험 프로그램','eng':'Regular experience'}},

		},
		mainEventDatas:[],
		
		areaList:[],
		floorListAll:{},
		facilities:[],
		saveTrans:{},
		areaData:{},
		etcData:{},
		guideData:{},

	},


	getters: {
		getCodeConfig: state=> {
			return state.codeConfig;
		},
		
		getMainEventCodes: state=> {
			return state.mainEventCodes;
		},
		getHistoryInfo: state=> {
			return state.historyInfo;
		},
		getLangList: state=> {
			return state.langList;
		},
		getSnsAccept: state=> {
			return state.snsAccept;
		},
		getMainEventDatas: state=> {
			return state.getMainEventDatas;
		},
		getJsonData: state=> {
			var result = {};
			result.areaList = state.areaList;
			result.floorListAll = state.floorListAll
			result.facilities = state.facilities
			result.saveTrans = state.saveTrans
			result.areaData = state.areaData
			result.etcData = state.etcData
			result.guideData = state.guideData
			
			return result;
		}
		
	},
	mutations: {
		insertHistory(state,name) {
			state.historyInfo.pageHistory.push(name);
			state.historyInfo.back = false;

		},
		removeHistory(state) {
			state.historyInfo.pageHistory.pop();
			state.historyInfo.back = true;

		},
		insertSnsAccept(state,code) {
			state.snsAccept = code;

		},
		removeSnsAccept(state) {
			state.snsAccept = false;
		},
		insertMainEventDatas(state,datas) {
			state.getMainEventDatas = datas;
		},
		insertJsonData(state,data) {
			state.areaList = data.areaList;
			state.floorListAll = data.floorListAll
			state.facilities = data.facilities
			state.saveTrans = data.saveTrans
			state.areaData = data.areaData
			state.etcData = data.etcData
			state.guideData = data.guideData
		}
	},
	modules: {
	
	}

})

Vue.prototype.$form = form;
Vue.prototype.$util = util;

var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
	$eventBus: {
		get: function () {
			return EventBus;
		}
	}
});
Vue.use(VueJsonp);


router.beforeEach(function (to, from, next) {

  next();
});


window.chatbotBusVue = function(params) {
	return;
	
	
	var data = 'LC:KO|TC:mic';
	Unity.call(data);
	/*
	if(params.mode=='button') { 
		getChatFrameView(bView);
	} else {
		var bInit = 0;
		var	icon = params.icon;

		if(typeof window['getChatbotView']=== "function") {
			getChatbotView(bView, bInit, icon);

		} else {
			var timeout = setTimeout(function() {
				if(typeof window['getChatbotView']=== "function") {
					getChatbotView(bView, bInit, icon);
				}
				
			},1000);
		}
		
	}
	*/
}
var vue = new Vue({
  store,
  created: function () {
	  this.$form.initalize(this);
	  localStorage.setItem('mainUid','');
	  this.$router.push({path:'/setMain'});
	
	  
  },	
  router,
  render: h => h(App)
}).$mount('#app')
	
//window.addEventListener("message", function(e) {
	// vue.$eventBus.$emit('chatbotSend',e.data);
   
//});


window.WebCall = function(code) {
	//alert(JSON.stringify(code));
	vue.$eventBus.$emit('chatbotSend',{code:code});
}
