<template>
	<div class="page-layout">
		<div class="screen-box" v-if="screenView">
			<companyInfo :lang="selectedLang" v-if="companyInfoView"  :no="companyNo" @hideBoxEvent="hideCompanyInfo" @showMapPosition="openMapPositionByNo" @showMobile="openMobile" ></companyInfo>
			<eventInfo :lang="selectedLang" v-if="eventInfoView" :no="eventNo" @hideBoxEvent="hideEventInfo"></eventInfo>
			<maineventInfo :lang="selectedLang" v-if="maineventInfoView" :no="maineventNo" @hideBoxEvent="hideMaineventInfo"></maineventInfo>
			<mapTableInfo :lang="selectedLang" v-if="mapTableInfoView" :mapImage="mapImage" :names="mapTableNames" @showMapPosition="openMapPosition" @hideBoxEvent="hideMapTableInfo"></mapTableInfo>
		

		</div>
		<!--div class="menu-box" style='height:30px;width:100%;background:#fff;'>
			<div class="menu-group">
				<ul id="menuList" style='display:flex;'>
					<li v-for="menu in menuList"   @click="openComponent(menu.code,menu.name)" style='margin-left:20px;'>{{menu.name}}</li>
				</ul>
			</div>
		</div-->
			
		<div class="container">
			<div class="overlaout-box" v-if="contentView">
				<mapContent v-if="mapView"  :mapguidKeyCheck="mapguidKeyCheck" :currentMenuCode="currentMenuCode" :mapguidKey="mapguidKey" :mapguidNo="mapguidNo" :lang="selectedLang" :title="mapTlt"  @showCompanyEvent="openCompanyInfo"	 @showMapInfoTableEvent="openMapTable"></mapContent>
				<companyContent v-if="companyView" :lang="selectedLang" @showCompanyEvent="openCompanyInfo"  :title="compTlt"></companyContent>
				<eventContent v-if="eventView" :lang="selectedLang" @showEventEvent="openEventInfo" :title="evTlt"></eventContent>
				<mobileContent v-if="mobileView" :compKeyNo="compKeyNo" :mobileHeight="mobileHeight" :lang="selectedLang" @hideMobileEvent="hideMobile"></mobileContent>
				<searchContent v-if="searchView" :mainEventTitle="mainEvTlt" :eventTitle="evTlt" :mapTitle="mapTlt" :companyTitle="compTlt" :lang="selectedLang" @showCompanyEvent="openCompanyInfo" @showMaineventEvent="openMaineventInfo"	 @showEventEvent="openEventInfo" @showMapEvent="openMapInfo" :title="serTlt"></searchContent>
				<maineventContent v-if="maineventView" :lang="selectedLang" :mainEventCategory="mainEventCategory" @showMaineventEvent="openMaineventInfo":title="mainEvTlt"></maineventContent>
				<trafficContent v-if="trafficView" :lang="selectedLang"  :title="traTlt"></trafficContent>
				
			</div>
		</div>
	</div>
</template>

<script>
import mapContent from '@/components/map/mapContent'
import mapTableInfo from '@/components/map/mapTableInfo'

import companyContent from '@/components/company/companyContent'
import companyInfo from '@/components/company/companyInfo'
import eventContent from '@/components/event/eventContent'
import eventInfo from '@/components/event/eventInfo'
import mobileContent from '@/components/mobile/mobileContent'
import searchContent from '@/components/search/searchContent'
import maineventContent from '@/components/mainevent/maineventContent'
import maineventInfo from '@/components/mainevent/maineventInfo'
import trafficContent from '@/components/traffic/trafficContent'




export default {
	name: 'Main',
	components: {
		mapContent,
		companyContent,
		companyInfo,
		eventContent,
		eventInfo,
		mobileContent,
		searchContent,
		maineventContent,
		maineventInfo,
		mapTableInfo,
		trafficContent,
		
	},
	data() {
		return {
			mapViewMode:'no',
			menuList:[],
			mapTlts:{},
			mapTlt:'',
			compTlts:{},
			compTlt:'',
			evTlts:{},
			evTlt:'',
			mainEvTlts:{},
			serTlts:{},
			languageList:[],
			todate:'',
			time:'',
			langView:true,
			mapView:false,
			companyView:false,
			companyInfoView:false,
			eventView:false,
			eventInfoView:false,
			mobileView:false,
			searchView:false,
			trafficView:false,
			title:'',
			screenView:false,
			companyNo:'',
			eventNo:'',
			selectedLang:'',
			useMobileButton:'',
			maineventView:false,
			maineventInfoView:false,
			maineventNo:'',
			mainEvTlt:'',
			eventTitle:'',
			companyTitle:'',
			serTlt:'',
			mapCompNo:'',
			contentView:false,
			mobileHeight:'',
			logoImg:'',
			bannerImgs:[],
			mapguidKey:'',
			compKeyNo:'',
			mapguidCode:'',
			mapguidNo:'',
			mapTableInfoView:false,
			mapguidKeyCheck:'',
			activeFlag:false,
			mainEventCategory:'P01',
			currentMenuCode:false,


			mapImage:'',
			mapTableNames:{},
			mapDirectIdxcode:'',
			


  	  }
	},
	created() {
		//var date = new Date();
		//var string = date.toDateString();
		//this.todate = string.substring(4,15);
		/*
		var mainUid = localStorage.getItem('mainUid');
		if(!mainUid) {
			 this.$router.push({ path:'/member/login'})
			 return;
		} else if(!localStorage.getItem('location')) {
			this.$router.push({path:'/intro'});
			return;
		}
		*/
		//localStorage.setItem('lang','kor');

	    this.$eventBus.$on('chatbotSend', this.goLocation);	
	 
		if(localStorage.getItem('lang')) {
			
			this.selectedLang = localStorage.getItem('lang');
		} else {
			this.selectedLang = 'kor';
			localStorage.setItem('lang','kor');
		}
			
		this.getMenus();	
		this.setMobileButtonLang()
	},
    methods: {
	   initMain() {
		    this.contentView = false,
			localStorage.setItem('lang','kor');
			this.selectedLang = localStorage.getItem('lang');
			//this.getMenus();	
			//this.setMobileButtonLang();
				
	   },
	   setLang(code) {
			localStorage.setItem('lang',code);
			this.selectedLang = code;
			
			this.mapTlt = this.mapTlts[code];
			this.compTlt = this.compTlts[code];
			this.evTlt = this.evTlts[code];
			this.mainEvTlt = this.mainEvTlts[code];
			this.serTlt = this.serTlts[code];
			

	   },
	   setMobileButtonLang() {
		    var lang =  localStorage.getItem('lang');
			if(!lang)lang = 'kor';
			var langList = this.$store.getters.getLangList;
			this.useMobileButton = langList.useMobileButton[lang];
			
	   },
	   getMenus() {
			var obj = this;
			var sendparams = {acceptMode:'pc'};
			this.$form.sendPost(sendparams,'setting/getMenuData',function(resp) {
				//console.log(resp);

				//obj.menuList = [];
				if(resp.menuList.length > 0) {
					//obj.menuList = resp.menuList;
					$(resp.menuList).each(function(k,data) {
						
						switch(data.code) {
							case 'map':
								obj.mapTlts = {kor:data.kor_name,eng:data.eng_name}
								obj.mapTlt = data.name;
							break;
							case 'inf':
								obj.compTlts = {kor:data.kor_name,eng:data.eng_name}
								obj.compTlt = data.name;
								
							break;
							case 'evt':
								obj.evTlts = {kor:data.kor_name,eng:data.eng_name}
								obj.evTlt = data.name;
							break;
							case 'fes':
								obj.mainEvTlts = {kor:data.kor_name,eng:data.eng_name}
								obj.mainEvTlt = data.name;
							break;
							case 'ser':
								obj.serTlts = {kor:data.kor_name,eng:data.eng_name}
								obj.serTlt = data.name;
							break;
							case 'tra':
								obj.traTlt = data.name;
							break;
						}

					});
					
					//obj.openComponent('INF','')
				} 

				
			});
	   },
	   openComponent(code,title) {
		    this.mapguidKey = '';
			this.compKeyNo = '';
			this.mapguidNo = '';
			this.openComponentView(code,title);
	   },
	   openComponentView(code,title) {
			
		   this.contentView = true;
		   var menuCode = '';
		   code = code.toUpperCase();
		   switch(code) {
			    case 'MAP':
					this.mobileView = false;
					this.mapView = true;
					this.mapViewMode = 'mapview';
					this.companyView = false
					this.eventView = false;
					this.searchView = false;
					this.maineventView = false;
					this.trafficView = false;
					this.title =	this.mapTlt;
					menuCode = 'M03';
					
				break;
				case 'INF':
					this.mobileView = false;
					this.mapViewMode = 'no';
					this.mapView = false;
					this.eventView = false;
					this.searchView = false;
					this.maineventView = false;
					this.companyView = true
					this.trafficView = false;
					this.title =	this.compTlt
					menuCode = 'M07';
				
				break;
				case 'EVT':
					this.mobileView = false;
					this.mapView = false;
					this.companyView = false;
					this.searchView = false;
					this.maineventView = false;
					this.eventView = true;
					this.trafficView = false;
					this.title =	this.evTlt
					menuCode = 'M04';
			
				break;
				case 'MOB':
					
					this.mobileView = true;
					this.mapView = false;
					this.companyView = false
					this.eventView = false;
					this.searchView = false;
					this.maineventView = false;
					this.trafficView = false;
					//this.title =	this.evTlt
					if(title)this.title = title

					menuCode = 'M08';
				break;
				case 'SER':
					this.mobileView = false;
					this.mapView = false;
					this.companyView = false
					this.eventView = false;
					this.searchView = true;
					this.maineventView = false;
					this.trafficView = false;
					this.title =	this.serTlt
					menuCode = 'M06';
				break;
				case 'FES':
					this.mobileView = false;
					this.mapView = false;
					this.companyView = false
					this.eventView = false;
					this.searchView = false;
					this.maineventView = true;
					this.trafficView = false;
					this.title =	this.mainEvTlt
					menuCode = 'M05';
					
				break;
				case 'TRA':
					this.mobileView = false;
					this.mapView = false;
					this.companyView = false
					this.eventView = false;
					this.searchView = false;
					this.maineventView = false;
					this.trafficView = true;
					this.title =	this.traTlt
				break;
				default:
					if(title)this.title = title
				break;
		   }
		   this.closeAllPopup();	

		   if(this.currentMenuCode != code) {
			   switch(this.selectedLang) {
				   case 'kor':
					var lang = 'KO';
				   break;
				   case 'eng':
					var lang = 'EN';
				   break;
				   case 'cha':
					var lang = 'ZH';
				   break;
				   case 'jan':
					var lang = 'JA';
				   break;
			   }			
				var data = 'AC:MS|LC:'+lang+'|MC:'+code;
				alert(data);
				Unity.call(data); // 메뉴 동기화
			}
			
			this.currentMenuCode = code;

	   },
	   openCompanyInfo(no) {
			this.companyNo = no;
			this.screenView = true;
			this.companyInfoView = true;
	   },
	   hideCompanyInfo() {
		   this.screenView = false;
		   this.companyInfoView = false;

	   },
	    openMapPosition(type) {
		  	this.hideCompanyInfo();
			this.mapTableInfoView = false;
			if(type=='direct') {
				var code = this.mapDirectIdxcode;
			} else {
				var code = type;
			}
			this.mapguidKey = code;
			var result = Math.floor(Math.random() * 10000000) + 1;

			this.mapguidKeyCheck = result
			this.mapguidNo = '';
			
			//$('#menuList li').removeClass('active');
			//$('#menuList li#map').addClass('active');
			this.openComponentView('map',this.mapTlt)
	   },
	   openMapPositionByNo(no) {
		  	this.hideCompanyInfo();
			this.mapTableInfoView = false;
			
			
			this.mapguidKey = '';
			var result = Math.floor(Math.random() * 10000000) + 1;
			this.mapguidKeyCheck = result
			this.mapguidNo = no;
			//$('#menuList li').removeClass('active');
			//$('#menuList li#map').addClass('active');
			this.openComponentView('map',this.mapTlt)
	   },
	   openMobile(no) {
		    
			//var lang = (this.selectedLang == 'kor')?'KO':'EN';
			//var data = 'AC:MS|LC:'+lang+'|MC:M08';
			//Unity.call(data); // 메뉴 동기화
	
			this.hideCompanyInfo();
			this.compKeyNo = no;
			this.openComponentView('mob','')

	   },
	   openEventInfo(no) {
			this.eventNo = no;
			this.screenView = true;
			this.eventInfoView = true;
	   },
	   hideEventInfo() {
		   this.screenView = false;
		   this.eventInfoView = false;
			
	   },
	   openMaineventInfo(no) {
			this.maineventNo = no;
			this.screenView = true;
			this.maineventInfoView = true;
	   },
	   hideMaineventInfo() {
		   this.screenView = false;
		   this.maineventInfoView = false;

	   },
	   hideMobile() {
			this.mobileView = false;
			this.contentView = false;
	   },
	   openMapInfo(code,no) {
			this.title = this.mapTlt;
			this.mobileView = false;
			this.mapView = true;
			this.companyView = false
			this.eventView = false;
			this.searchView = false;
			this.maineventView = false;

			this.mapguidKey = code;
			this.mapguidNo = no;
			


			
	   },
	   openMapTable(names,img,idxcode) {
			this.mapImage = img;
			this.mapTableNames = names;
			this.screenView = true;
			this.mapDirectIdxcode = idxcode;
			this.mapTableInfoView = true;

	   },
	   hideMapTableInfo() {
			this.screenView = false;
			this.mapTableInfoView = false;
			
	   },
	   closeAllPopup() {
			this.screenView = false;
			this.mapTableInfoView = false;
			this.maineventInfoView = false;
			this.eventInfoView = false;
		    this.companyInfoView = false;
			
	   },
	   goLocation(params) {
		  	var code = params.code;
			if(code) {
				//console.log(code);
				var LocationPosiList = {
						'L01':'d',	// 금융핀테크관1
						'L02':'b',	//	메인 이벤트관
						'L03':'e',	//	금융핀테크관2
						'L04':'gma',	//	상담관
						'L05':'a',	//	준비실
						'L06':'f',	//	핀테크주제관1
						'L07':'g',	//	핀테크주제관2
						'L08':'h',	//	핀테크주제관3
						'L09':'i',	//	핀테크주제관4
						'L10':'c',	//	국제회의장
						'L11':'j',	//	핀테크 체험관
 				}
				var LocationMainEventList = {
						'F01':'b',
						'F02':'b',
						'F03':'b',	
						'F04':'b',	
						'F07':'b',	
						'F10':'b',	
						'F05':'b',
						'F06':'b',
						'F09':'b',
						'F08':'b',
						'F11':'c',	
						'F12':'c',	
						'F13':'c',	
						'F18':'c',	
						'F14':'c',	
						'F15':'c',	
						'F16':'c',	
						'F17':'c',	
						'F20':'gma',	
						'F19':'gma',	
				}

				var codes = code.split(',');
				if(codes.length<3) {
					codes = code.split('.');
				}
				var lang = codes[0];
				var type = codes[1];
				var mcode = codes[2];
				var scode = codes[3];
				var scodeV = scode.substring(0,1);
				var codeConfig = this.$store.getters.getCodeConfig;
				var url = '';
				switch(mcode) {
					    case 'G04': // 메뉴이동
							switch(scode) {
								case 'M01':
									this.setLang('kor');
								break;
								case 'M02':
									this.setLang('eng');
								break;
								case 'M03':
									this.setLang('cha');
								break;
								case 'M04':
									this.setLang('jan');
								break;
								default:
									this.closeAllPopup();
									this.openComponent(scode,'')
								break;
							}
						break;
						case 'G01': //언어
							switch(scodeV) {
								case 'C': // 업체정보
									var code = scode.substring(1,4);
									var no = parseInt(code);
									no = no.toString();
									this.openMapPositionByNo('',no)

								break;
								case 'F':
									this.openMapPosition(LocationMainEventList[scode]) 
								break;
								case 'L':
									this.openMapPosition(LocationPosiList[scode]) 
								break;
							}
							
						break;
						case 'G02': // 정보
							//console.log(scode);	
							var scodeList = scode.split(',');
							if(scodeList.length>1) {
								scode = scodeList[scodeList.length-1];
								scodeV = scode.substring(0,1);
							}
							switch(scodeV) {
								case 'C': // 업체정보
									
									var code = scode.substring(1,4);
									var no = parseInt(code);
									no = no.toString();
									this.openComponent('inf','')
									this.openCompanyInfo(no)
									
								break;
								case 'F': // 행사정보
									var mainEventCodes = this.$store.getters.getMainEventCodes;
									this.mainEventCategory = 'P01';
									this.openComponent('fes','')
									this.openMaineventInfo(mainEventCodes[scode])
								break;
								case 'E': // 이벤트정보
									this.openComponent('evt','')
									
								break;
								case 'P': // 행사일정
									this.mainEventCategory = scode;
									this.openComponent('fes','')
									
								break;
								case 'M':
									this.openComponent(codeConfig[scode],'')
								break;
								
							}
						break;

				}
				
			}

	   }
    },
	mounted() {
		
		
    },
	updated() {
		var obj = this;
		if(!this.activeFlag) {
			/*
			$('#menuList li').on('click',function() {
				$('#menuList li').removeClass('active');
				$(this).addClass('active');
				var code = $(this).attr('code');
				var title= $(this).attr('title');
				obj.openComponent(code,title);
			});
			*/
			this.activeFlag = true;
		}
		//var height= $(window).height();
		this.mobileHeight = 822;
		

		//$('.overlaout-box').css({'width':'100%','min-height':height});		
		//$('.screen-box').css('min-height',$(window).height());
		//$('.page-layout').css('min-height',$(window).height());
		//alert($(window).width()+"@@"+$(window).height()); 
	}

}
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.overlaout-box {
	width:1245px;
	height:822px;
	padding:0;
	margin:0;
	overflow:hidden;
	background:#fff;
	.content-container {
		padding:0;
		width:100%;
		height:100%;
		margin:0;
		overflow:hidden;
		background:#fff;
		.title {
			font-size:27pt;
			font-weight:bold;
			color:#000;
		}
	}
}
.screen-box {
	width:1245px;
	height:822px;
	overflow:hidden;
	background:rgba(0,0,0,.7);
	position:fixed;
	top:0;
	left:0;
	padding:0;
	margin:0;
	z-index:100;
}
.page-layout {
	width:1245px;
	height:822px;
	max-height:822px;
	overflow:hidden;
	padding:0;
	margin:0;
	position:relative;
}
.container {
	width:1245px;
	height:822px;
	overflow:hidden;
	padding:0;
	margin:0;
	position:relative;
	z-index:5;
	background:none;
	
}
</style>