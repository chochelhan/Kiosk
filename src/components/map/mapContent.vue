
<template>
	<div class="page-layout" style='width:100%;overflow:hidden;'>
		<div class="screen-box" v-if="transPopShow">

			<div class="trans-box">
				<div class="trans-title">{{transPopMessage[lang]}}</div>
				<div class="trans-list">
					<ul>

						<li v-for="trans in transPopList" :userTransIdxcode="trans.userTransIdxcode" :idxcode="trans.idxcode" :acode="trans.acode" :fcode="trans.fcode" :transKey="trans.transKey" :ttype="trans.ttype" :no="trans.no" v-touch="choiceTrans()">
							<img :src="trans.img" :userTransIdxcode="trans.userTransIdxcode" :idxcode="trans.idxcode" :acode="trans.acode" :fcode="trans.fcode"  :transKey="trans.transKey" :ttype="trans.ttype" :no="trans.no">
							<div class="sub-title" :userTransIdxcode="trans.userTransIdxcode" :idxcode="trans.idxcode" :acode="trans.acode" :fcode="trans.fcode" :transKey="trans.transKey" :ttype="trans.ttype" :no="trans.no">{{trans.name[lang]}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="screen-box" v-if="transFloorShow">
			<div class="trans-view-box">
				<div class="trans-title">{{transFloorMessage[lang]}}</div>
				<img src="../../assets/img/flr.png">
			</div>
		</div>
		<div class="screen-box" v-if="transEleShow">
			<div class="trans-view-box">
				<div class="trans-title">{{transEleMessage[lang]}}</div>
				<img src="../../assets/img/ele.png">
			</div>
		</div>
		<div class="screen-box" v-if="transEscShow">
			<div class="trans-view-box">
				<div class="trans-title">{{transEscMessage[lang]}} </div>
				<img src="../../assets/img/esc.png">
			</div>
		</div>
		<div class="screen-box" v-if="transOtherShow">
			<div class="trans-view-box">

				<div class="trans-title">{{transOtherMessage[lang]}} </div>
				<img src="../../assets/img/ico_m04.png">
			</div>
		</div>

		<div class="screen-box" v-for="item,index in facilitieList" v-if="item.view">
			<div class="trans-view-box facitybox">
				<div class="trans-header"><i class="fa fa-times" :indexcode="index"  v-touch="closeFacityPop()"></i></div>
				<div class="img-box"><img :src="item.defaultImage" /></div>
				<div class="trans-title">{{item.names[lang]}}</div>
				<div class="floor-content">
					<ul class="facity-floor-list" v-if="facityfloorList.length">
						<li v-for="data,index in facityfloorList" :class="data.gclass" v-touch="settingFacity()" :no="data.no">{{data.name}}</li>
					</ul>
					<md-button class="md-primary md-raised"  @click="guideFacity()">위치안내</md-button>
				</div>
			</div>
		</div>
		<div class="map-header-box">
			<div class="title">{{title}}</div>
			<div class="map-category-box">
				<ul>
					<li v-for="data,index in areaList" :class="data.gclass" :no="data.no" v-touch="getFloor()">{{data.names[lang]}}</li>
				</ul>
			</div>
		</div>
		<div class="map-info-layout">
				<ul class="floor-info" v-if="floorList.length">
					<li v-for="data in floorList" :class="data.gclass"  @click="getMapDataClick(data.no)">
						<span class="sub-name">{{data.name}}</span>
						<span class="sub-title">{{data.names[lang]}}</span>
						<span class="position"><i class="fas fa-map-marker-alt"></i></span>
					</li>
				</ul>
		</div>
		
		<div class="map-floor-box" v-if="floorList.length">
			<ul class="list">
				<li v-for="data,index in floorList" :class="data.gclass" :no="data.no"  v-touch="getMapData()">{{data.name}}</li>
			</ul>
			<ul class="list">
				<li id="floorAllinfo" v-touch="openFloorInfo()"> 층별<br>안내보기 </li>
			</ul>
		</div>
		<div class="content-container  map-group">
			<div class="map-title-box">
				<div class="floor-title">
					{{floorTitle}}
				</div>
				<!--div class="floor-title-info">
					{{floorTitleInfo}}
				</div-->
	
			</div>
			<div class="zoom-area" v-if="zoomView">
				<div class="move-box">
					<ul>
						<li>&nbsp;</li>
						<li class='top-zoom' v-touch="moveUp()"><i class="fa fa-caret-up" ></i></li>
						<li>&nbsp;</li>
					</ul>
					<ul class="middle-box">
						<li v-touch="moveLeft()"><i class="fa fa-caret-left" ></i></li>
						<li class="middle-zoom"><i class="fa fa-circle" style='font-size:20pt'></i></li>
						<li v-touch="moveRight()"><i class="fa fa-caret-right" ></i></li>
					</ul>
					<ul>
						<li>&nbsp;</li>
						<li  class='down-zoom' v-touch="moveDown()"><i class="fa fa-caret-down" ></i></li>
						<li>&nbsp;</li>
					</ul>
				</div>
				<div class="zoom-box">
					<ul>
						<li v-touch="zoomPlus()"><i  class="fa fa-plus"></i></li>
						<li v-touch="zoomMinus()"><i  class="fa fa-minus"></i></li>
					</ul>
				</div>
				
			</div>
			<div class="refresh-area" v-if="refreshView">
				<div class="refresh-box">
					<ul>
						<li v-touch="refresh()"><img src="../../assets/img/btn_re.png"/></li>
					</ul>
				</div>
			</div>
			<div class="map-area">
				<div id='mapImageLayout' style='position:relative;'>
					<div id='rect-container'>
						<div v-for="rect,idx in rectList" class="rect-box" v-touch="getItemInfo()" :idxcode="rect.idxcode"  :style="rect.gstyle">
						</div>
					</div>
					<div id='circle-container'>
						<div v-for="circle,idx in circleList" class="circle-box" v-touch="getItemInfo()" :idxcode="circle.idxcode" :style="circle.gstyle"></div>
					</div>
					<canvas id="guideMap" style="position:absolute;top:0;left:0;max-width:auto;max-height:auto;display:none;z-index:10000;"></canvas>
					<img id="orgImg" :src="mapImage" usemap="#mapdata" style='height:auto;'/>
					<map name="mapdata">
						<area  v-for="mapping in pointPolyTempList" shape="poly" :idxcode="mapping.idxcode" v-touch="getItemInfo()"  :coords="mapping.point" />
						
					</map>
					<div id='mark-container'>
						<div v-for="mark,idx in markList" class="mark-box" :gcode="mark.gtype" :mtype="mark.mtype"    :cnt="mark.cnt" :markCnt="idx+1" :idxcode="mark.idxcode"	 :dcode="mark.dcode" :style="mark.gstyle" v-touch="getItemInfo()">
							<span v-if="mark.dcode=='company' || mark.dcode=='direct' || mark.dcode=='item'" :style="mark.text.gstyle" v-touch="getItemInfo()" :idxcode="mark.idxcode">
								<div class="movebar"></div>
								<div style="clear:both;"></div>
								<div class="name-text" v-if="mark.dcode!='item'"  v-touch="getItemInfo()" :idxcode="mark.idxcode">
									{{mark.text.name[lang]}}
								</div>
								<i class="fas" :id="mark.idxcode+'markPosition'"><img :src="$VARS.baseUrl+'common/img/mm.gif'" style='width:30px;'/></i>
								<div :class="mark.no+'itembox name-text'" v-if="mark.dcode=='item'" v-touch="getItemInfo()" :idxcode="mark.idxcode">
									<img :src="$VARS.baseUrl+mark.img.def" class="defImage" />
									<img :src="$VARS.baseUrl+mark.img.act" class="actImage"/>
								</div>
							
								<div style="clear:both;"></div>
								<div class="resizebar"></div>
							</span>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
		<div class="facilities map-group">
			<ul>
				<li v-for="item in facilities">
					<img :src="item.defaultImage" v-if="targetFacyNo!=item.no"  :no="item.no" v-touch="choiceFacity()" />
					<img :src="item.activeImage"  v-if="targetFacyNo==item.no" :no="item.no" v-touch="choiceFacity()" />

					<div class="subtitle-box"  :no="item.no" v-touch="choiceFacity()">{{item.names[lang]}}</div>
				</li>
			</ul>
		</div>
	</div>	
</template>

<script>


export default {
  name: 'mapContent',
  data () {
	
	return {
  	   themeList:[],
	   selectedActive:null,
	   mapScale:1,
	   mainMapWidth:'',
	   mainMap2x:1.5,
	   mainMap3x:2,
	   mainMapBg:'',
	   mapOffsetTop:0,
	   mapOffsetLeft:0,
	   mapObjectPosition:{},
	   guideMapImg:false,
	   mapPosiCodeByNo:{},
	   mapGuideCheck:false,
	    pointerList:[],
		context:null,
		pointerDataList:[],
		orgX:0,
		orgY:0,
		rectPointerDataList:[],
		circlePointerDataList:[],
		targetElement:null,
		rectList:[],
		circleList:[],
		markList:[],
		canvasWidth:1300,
		markTextMove:false,
		mapImage:null,
		saveImgFlag:false,
		markTextMoveTemp:false,
		pointPolyTempList:[],
		zoomLevels:[],
		initZoomLevels:[],
		zoomCnt:1,
		zoomLevel:1,
		zoomLevelUpd:false,
		tempZoomLevel:1,
		updZoomCnt:1,
		mapOrgImgWidth:0,
		mapOrgImgHeight:0,
		mapImgfirstWidth:'',
		mapImgfirstHeight:'',
		zMoveFlag:false,
		divideX:0,
		divideY:0,
		zoomRate:1,
		textLevel:7,
		textLevels:[],
		areaList:[],
		floorList:[],
		polyTempMake:false,
		markPositionViewCode:'',

		areaData:{},
		etcData:{},
		guideData:{},
		acode:'',
		fcode:'',
		userAcode:'',
		userFcode:'',
		userStart:'',
		transPopList:[],
		transPopMessage:{},
		transPopShow:false,
		animateionIntervel:null,
		guideContext:null,
		animationPoints:[],
		aniColor:'',
		aniRadius:'',
		aniSpeed:'',
		animateionCnt:0,
		zoomView:false,

		saveTrans:{},
	    facilities:[],
		facilitieList:[],
							
		transFloorShow:false,
		transEscShow:false,
		transEleShow:false,
		transFloorMessage:{},
		transEleMessage:{},
		transEscMessage:{},
		floorListAll:{},
		transOtherShow:false,
		transOtherMessage:{},
		bottomText:{},
	    facityfloorList:[],
	    facityViewNo:'',
		facityViewIndex:'',
		isFloorList:{},
		facityChangeActive:false,
		mapAreaWidth:'',
		allfloorInfoViewButton:'',
		
		floorTitle:'',
		floorTitleInfo:'',
		targetFacyNo:'',
		choiceFacityNo:'',
		refreshView:false,
		
   }
  },
  props:["title","lang","mapguidKey","mapguidNo","mapguidKeyCheck","currentMenuCode"],
  watch: {
	  //mapguidKey() {
		
		//	this.getMapGuide()
	  //},
	 // mapguidNo() {
		//  	this.getMapGuide()
	  //},
	  mapguidKeyCheck() {
		    //this.mapguidNo = 13;
		  	if(this.mapguidKeyCheck) {
				this.selectedActive = true;
				this.getMapGuide()
			}
	  },
	  acode(code) {
		  var no = code.replace('a','');
		  var areaList = this.areaList;
		  this.areaList = [];
		  for(var i in areaList) {
			  var newData = areaList[i];
			  if(newData.no==no) {
					newData.gclass='active';		
			  } else {
				newData.gclass='';		
			  }
			  this.areaList.push(newData);
		  }
	  },
	  fcode(code) {
		  var no = code.replace('f','');
		  var floorList = this.floorList;
		  this.floorList = [];
		  for(var i in floorList) {
			  var newData = floorList[i];
			  if(newData.no==no) {
					newData.gclass='active';	
					this.floorTitle = newData.name;
					this.floorTitleInfo = newData.names[this.lang];
	
			  } else {
				newData.gclass='';		
			  }
			  this.floorList.push(newData);
		  }
		  this.allfloorInfoViewButton = '';
		
	  },
	  
  },
  created: function() {
	var ano = localStorage.getItem('mainThemeNo');
	var fno = localStorage.getItem('floor');
	var pno = localStorage.getItem('positionNo');
	this.userAcode = String(ano)+'a';
	this.userFcode = String(fno)+'f';
	this.userStart = localStorage.getItem('userStart');

	this.transPopMessage = {kor:'이동수단을 선택해주세요',eng:'',jan:'',cha:''};
	this.bottomText = {kor:'원하시는 업체를 선택하시면 상세정보를 확인하실수 있습니다',eng:'',jan:'',cha:''};
	this.getData();
	

  },
  methods: {
	  getMapGuide() {
			 $('#mark-container .mark-box span i.fas').hide();
			if(this.mapguidKey && !this.mapguidNo) {
				$('.zoom-area').hide();
				$('.map-item').hide();
				this.getMapGuideCompute(this.mapguidKey,'direct')
				this.mapguidKeyCheck = '';

			} else if(this.mapguidNo) {
				$('.zoom-area').hide();
				$('.map-item').hide();
				this.getMapGuideCompute(this.mapguidNo,'company')
				this.mapguidNo = '';
			}
			/*
			if(this.currentMenuCode!='MAP') {
			   switch(this.lang) {
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
				var data = 'AC:MS|LC:'+lang+'|MC:MAP';
				//alert(data);
				Unity.call(data); // 메뉴 동기화
			}
			*/
		
	  },
	  checkVaule(value) {
		  return (value)?value:10;
	  },
	  checkAreaMap(acode,fcode) {
			if(this.acode!=acode || this.fcode != fcode) {
				this.acode = acode
				this.getFloorListCompute();
				this.fcode = fcode
				this.areaMapInit();	
			} else {
				this.updateZoomCnt(1);
			}
	  },
	  getMapGuideCompute(no,dtype) {
			//console.log(this.userAcode+"@@"+this.userFcode);
		  	//console.log(this.etcData);
			var computeFlag = false;
			var animationPoints ={};
			for(var acode in this.areaData) {
				for(var fcode in this.areaData[acode]) {
					for(var idxcode in this.areaData[acode][fcode]) {	
						
						var data = this.areaData[acode][fcode][idxcode];
						switch(dtype) {
							case 'company':
								if(data.dtype=='company' && data.data.no==no && this.guideData[acode][fcode][idxcode]) {
									computeFlag = true;
									this.setKcounter(no,'company');
								}
							break;
							case 'direct':
								if(idxcode==no && this.guideData[acode][fcode][idxcode]) {
									computeFlag = true;
								}
							break;
						}
						if(computeFlag) {
							//console.log(data);
							//console.log(acode,fcode,idxcode);
							
							//console.log(this.guideData);
							this.markPositionViewCode = idxcode;
							if(this.guideData[acode][fcode][idxcode]) {
								//console.log(this.guideData[acode][fcode][idxcode]);
								if(this.userAcode==acode && this.userFcode == fcode) {	// 같은 건물 같은 층일때		
									if(this.guideData[acode][fcode][idxcode][this.userStart]) {
										
										this.checkAreaMap(acode,fcode);
										animationPoints = this.guideData[acode][fcode][idxcode][this.userStart];
										//console.log(animationPoints);
										this.aniColor = this.etcData[acode][fcode].color;
										this.aniRadius = this.checkVaule(this.etcData[acode][fcode].rad);
										this.aniSpeed = this.checkVaule(this.etcData[acode][fcode].speed);
										//console.log(this.aniColor+"@@"+this.aniRadius+"@@"+this.aniSpeed);
										this.aniPlay(animationPoints);
									}

								} else if(this.userAcode==acode) {	// 같은 건물일때		
									
									var userTransIdxcode = '';
									var transList=[];
									var transNewData = {};
									for(var transKey in this.guideData[acode][fcode][idxcode]) {
										var transInfo = this.areaData[acode][fcode][transKey];
										if(transInfo.dtype=='trans') {
											userTransIdxcode = this.transperCompute(transInfo.data.no);
											
											if(userTransIdxcode) {
												//console.log(transKey);
												transNewData = {};
												transNewData.userTransIdxcode = userTransIdxcode;
												transNewData.transKey = transKey;
												transNewData.info = transInfo;
												transList.push(transNewData);
											}
										}
										
									}
									if(transList.length>0) {
										if(transList.length>1) {
										
											this.openTransChoice(transList,idxcode,acode,fcode);
										} else {
											var goalAniPoints = this.guideData[acode][fcode][idxcode][transList[0].transKey];
											var ttype = this.saveTrans[transList[0].info.data.no].ttype;
											var no = String(fcode.replace('f',''));
											var fname = this.floorListAll[no].categorycode;
											
											this.transAniPlay(transList[0].userTransIdxcode,goalAniPoints,acode,fcode,ttype,fname);
										
										}
									}

								} else {	// 다른건물일때		
									
									var userTransIdxcode = '';
									var transList=[];
									var transNewData = {};
									var no = String(fcode.replace('f',''));
									var ano = String(acode.replace('a',''));

									var fname = this.floorListAll[no].categorycode;
									var titleName = '';
									for(var key in this.areaList) {
										var dts = this.areaList[key];
										if(String(dts.no)==ano) {
											titleName = dts.names[this.lang];
											break;
										}
									}

									for(var transKey in this.guideData[acode][fcode][idxcode]) {
										var transInfo = this.areaData[acode][fcode][transKey];
										
										if(parseInt(fname) == 1) { // 도착지가 1층이면
											if(transInfo.dtype=='start') {
												this.transOtherMessage = {kor:titleName+' 1층으로 이동',eng:'',cha:'',jan:''},
												this.transOtherShow = true;
												
												this.checkAreaMap(acode,fcode);

												animationPoints = this.guideData[acode][fcode][idxcode][transKey];
												this.aniColor = this.etcData[acode][fcode].color;
												this.aniRadius = this.checkVaule(this.etcData[acode][fcode].rad);
												this.aniSpeed = this.checkVaule(this.etcData[acode][fcode].speed);
												var obj = this;
												setTimeout(function() {
													obj.transOtherShow = false;
													obj.aniPlay(animationPoints);
												},3000);
												return;
											}
										} else { 
											if(transInfo.dtype=='trans') {
												this.transOtherMessage = {kor:titleName+' '+fname+'층으로 이동',eng:'',cha:'',jan:''},
												this.transOtherShow = true;
												
												this.checkAreaMap(acode,fcode);
											
											
												animationPoints = this.guideData[acode][fcode][idxcode][transKey];
												this.aniColor = this.etcData[acode][fcode].color;
												this.aniRadius = this.checkVaule(this.etcData[acode][fcode].rad);
												this.aniSpeed = this.checkVaule(this.etcData[acode][fcode].speed);
												var obj = this;
												setTimeout(function() {
													obj.transOtherShow = false;
													obj.aniPlay(animationPoints);
												},3000);
												return;
											}		
											
										}
										
									}
									
									
								
								}
							}
							return;
							
						}
					}
				}
			}
	  },
	  setKcounter(no,cmd) {
		
		   var params = {no:no,cmd:cmd}
		   this.$form.sendPost(params,'Map/setKcounter',function(response) {
				//console.log(response);
		   });
	  },
	  transperCompute(no) {
		
			for(var nkey in this.areaData[this.userAcode][this.userFcode]) {
				var info = this.areaData[this.userAcode][this.userFcode][nkey];
				if(info.dtype == 'trans') {
					if(info.data.no == no) { // 현재층의 이동수단 정보와 매칭됨
						return nkey;
					}
				}

			}
			return false;
	  },
	  transAniPlay(userTransIdxcode,goalAniPoints,acode,fcode,ttype,fname) {
		  if(this.guideData[this.userAcode][this.userFcode][userTransIdxcode]) {
			if(this.guideData[this.userAcode][this.userFcode][userTransIdxcode][this.userStart]) {
				this.checkAreaMap(this.userAcode,this.userFcode);
				
				var animationPoints = this.guideData[this.userAcode][this.userFcode][userTransIdxcode][this.userStart];
				
				this.aniColor = this.etcData[this.userAcode][this.userFcode].color;
				this.aniRadius = this.checkVaule(this.etcData[this.userAcode][this.userFcode].rad);
				this.aniSpeed = this.checkVaule(this.etcData[this.userAcode][this.userFcode].speed);
				this.aniPlay(animationPoints);
				
				var obj = this;
				var timeCheck = setInterval(function() {
					if(!obj.animateionIntervel) {
							
						obj.transMove(goalAniPoints,acode,fcode,ttype,fname);
						clearInterval(timeCheck);
						
					}
				},200);

			}
		  }
	  },
	  transMove(goalAniPoints,acode,fcode,ttype,fname) {
		 
		  var obj = this;
		  
	  	  setTimeout(function() {
				/// 이동수단에 대한 정보제공 
				if(obj.guideContext) {
					obj.guideContext.clearRect(0,0,$("#guideMap").width(),$("#guideMap").height());
					obj.guideContext = null;
				}
				switch(ttype) {
					case 'esc':
						obj.transEscMessage = {kor:'에스컬레이터를 타고 '+fname+'층으로 이동',eng:'',jan:'',cha:''}
						obj.transEscShow  = true;
					break;
					case 'ele':
						obj.transEleShow  = true;
						obj.transEleMessage = {kor:'엘리베이터를 타고 '+fname+'층으로 이동',eng:'',jan:'',cha:''}
					break;
					case 'flr':
						obj.transFloorShow = true;
						obj.transFloorMessage = {kor:'계단을 이용해서 '+fname+'층으로 이동',eng:'',jan:'',cha:''}
					break;
				}
				
				obj.acode = acode;
				obj.fcode = fcode;
				obj.areaMapInit();
				setTimeout(function() {
					switch(ttype) {
						case 'esc':
							obj.transEscShow  = false;
						break;
						case 'ele':
							obj.transEleShow  = false;
						break;
						case 'flr':
							obj.transFloorShow = false;
						break;
					}

					obj.aniColor = obj.etcData[acode][fcode].color;
					obj.aniRadius = obj.checkVaule(obj.etcData[acode][fcode].rad);
					obj.aniSpeed = obj.checkVaule(obj.etcData[acode][fcode].speed);
					
				
					obj.aniPlay(goalAniPoints);
				
				},3000);
		  },1000);
		
	  },
	  openTransChoice(transList,idxcode,acode,fcode) {
		
		this.transPopShow = true;										
		this.transPopList = [];
		for(var j in transList) {
			var info = transList[j].info;
			var newData = this.saveTrans[info.data.no];
			newData.userTransIdxcode = transList[j].userTransIdxcode;
			newData.transKey = transList[j].transKey;
			newData.idxcode = idxcode
			newData.acode = acode
			newData.fcode = fcode
			
			this.transPopList.push(newData);
		}
		
		
		
	  },
	  choiceTrans() {
		  var obj = this;
		  return function(direction,event) {
			  obj.runChoiceTrans(direction)
		 }
	  },
	  refresh() {
		  var obj = this;
		  return function(direction,event) {
			  obj.setRefresh();
		 }
	  },
	  setRefresh() {
		  this.refreshView = false;	
		  $('.map-group').show();
		  $('.map-info-layout').hide();
		  $('#guideMap').hide();
		  $('.zoom-area').show();
		  $('.map-item').show();
		 
		  $('#mark-container .mark-box span i.fas').hide();
		  $('.name-text .actImage').hide();
		  $('.name-text .defImage').show();

		  $('.map-floor-box').show();

		 // this.areaMapInit();
												
	  },
	  runChoiceTrans(direction) {

			 var idxcode = $(direction.target).attr('idxcode');
			 var ttype = $(direction.target).attr('ttype');
			 var userTransIdxcode = $(direction.target).attr('userTransIdxcode');
			 var transKey = $(direction.target).attr('transKey');
			 var acode = $(direction.target).attr('acode');
			 var fcode = $(direction.target).attr('fcode');
			 var no = String(fcode.replace('f',''));

			 var fname = this.floorListAll[no].categorycode;
				
			 var goalAniPoints = this.guideData[acode][fcode][idxcode][transKey];
			 this.transPopShow = false;
			 this.transAniPlay(userTransIdxcode,goalAniPoints,acode,fcode,ttype,fname);
	  },
	  closeFacityPop() {
		 var obj = this;
		 return function(direction,event) {
			obj.targetFacyNo = '';
			var index = $(direction.target).attr('indexcode');
			var newData = obj.facilitieList[index];
			newData.view = false;
			obj.$set(obj.facilitieList,index,1,newData);

		 }
	  },
	  choiceFacity() {
		 var obj = this;
		 return function(direction,event) {
			  obj.getFacity(direction)
		 }
	  },
	  getFacity(direction) {
		    this.choiceFacityNo = '';

		  	$('#mark-container .mark-box span i.fas').hide();
		    $('#guideMap').hide();
			$('.zoom-area').show();
			$('.map-item').show();

			$('.name-text .actImage').hide();
			$('.name-text .defImage').show();
			this.targetFacyNo = '';
						
			var no = $(direction.target).attr('no');
			for(var idxcode in this.areaData[this.acode][this.fcode]) {
				var data = this.areaData[this.acode][this.fcode][idxcode];
				if(data.dtype=='item') {
					if(data.data.no == no) {
			
						$('.'+no+'itembox .defImage').hide();
						$('.'+no+'itembox .actImage').show();
						this.targetFacyNo = no;
						
						if(this.mapScale!=1) {
							this.mapScale = 1;
							this.updateZoomCnt(1);
						}

						this.setKcounter(no,'facity');
						return;
					}
				}
			}
			this.facityViewNo = no;
			/// 현재 층에 편의시설이 없을 경우 ////
			this.isFloorList = {};
			this.facityViewIndex = false;
			for(var fcode in this.areaData[this.acode]) {
				for(var idxcode in this.areaData[this.acode][fcode]) {	
					var data = this.areaData[this.acode][fcode][idxcode];
					if(data.dtype=='item') {
						if(data.data.no == no) {
							this.isFloorList[fcode] = 1;
							this.facityViewIndex = true;
							this.targetFacyNo = no;
			
						}
					}
				}
			}
			var floorList = this.floorList;
			this.facityfloorList = [];
			for(var f in floorList) {
				var flr = floorList[f];
				var newData = {};
				var fcde = String(flr.no+'f');
				if(this.isFloorList[fcde]) {
					newData.gclass='active';
				
				} else newData.gclass='';
				newData.name = flr.name;
				newData.no = flr.no;
				this.facityfloorList.push(newData);	
			}
			
			var facilities = this.facilities;
			this.facilitieList = [];
			for(var j in facilities) {
				var newData = facilities[j];
				if(newData.no == no) {
					newData.view = true;
				
				} else newData.view = false;
				this.facilitieList.push(newData);
			}


	  },
	   settingFacity() {
		 
		  var obj = this;
		 return function(direction,event) {
			obj.choiceFacityNo = $(direction.target).attr('no');
			for(var key in obj.facityfloorList) {
				var newItem = 	obj.facityfloorList[key]
				if(newItem.gclass=='active' || newItem.gclass=='selected') {
					if(newItem.no == obj.choiceFacityNo)newItem.gclass='selected';
					else if(newItem.gclass=='selected')newItem.gclass='active';
				}
				obj.$set(newItem,key,1);
			}

		 }
	  },

	  guideFacity() {
		// var obj = this;
		 //return function(direction,event) {
			  this.getFacityGuide()
		 //}

	  },
	  getFacityGuide() {

			if(this.facityViewIndex) {
				//var ufcnt = parseInt(this.userFcode.replace('f',''));
				//var ufinfo = this.floorListAll[ufcnt]
				//var ufcntcode = ufinfo.categorycode;	
				//var minDistance = 100;
				var choiceFcode = this.choiceFacityNo;
				/*
				for(var fcode in this.isFloorList) {
					var fcnt = parseInt(fcode.replace('f',''));
					var finfo = this.floorListAll[fcnt]
					var fcntcode = finfo.categorycode;	
					var ret = parseInt(ufcntcode) - parseInt(fcntcode);
				    var result = Math.abs(ret);
					if(result<minDistance) {
						minDistance = result;
						choiceFcode = fcode;
					}
				}
				*/
				if(choiceFcode) {
					this.facityChangeActive = true;
					this.fcode = String(choiceFcode)+'f';
					this.areaMapInitalize();	
					this.facilitieList=[];
								
				} else {
					 var params = {};
					params.content = '해당층을 선택하세요';	
					this.$eventBus.$emit('dialogOpen',params);
				}
			} else {
				var params = {};
				params.content = '해당층을 선택하세요';	
				this.$eventBus.$emit('dialogOpen',params);
			
			}
			
	  },
	 
	  setMapGuide()	{ 
		if(this.mapguidKey) {	

			$('.zoom-area').hide();
			$('.map-item').hide();
		  }
	  },
	 
	  getImgIntro() {
		 
			
	  },
	  getFloorListCompute() {
	  		var ano = parseInt(this.acode.replace('a',''));
			this.floorList = [];
			for(var f in this.floorListAll) {
				 var dts = this.floorListAll[f];
				 if(ano == dts.pno) {
					
					dts.names = {kor:dts.kor_name,eng:dts.eng_name,cha:dts.cha_name,jan:dts.jan_name};
					this.floorList.push(dts);
				 }
			}

			/* 나이순으로 정렬 */
			var sortingField = "rank";
			this.floorList.sort(function(a, b) { // 오름차순
				 return a[sortingField] - b[sortingField];
			});

	  },	
	  getData() {
		     
			var jsonData = this.$store.getters.getJsonData;
    		//console.log(jsonData);

			this.areaList = jsonData.areaList;
			this.saveTrans = jsonData.saveTrans;
			this.facilities = jsonData.facilities;
			
			this.floorListAll= jsonData.floorListAll;
			this.areaData = jsonData.areaData;
			this.etcData =  jsonData.etcData;  
			this.guideData = jsonData.guideData;
			 
			this.acode = this.userAcode;
		    this.getFloorListCompute();
			
			this.fcode = this.userFcode;
			
			this.areaMapInitalize();
			  
	  },
	  getFloor() {
		var obj = this;
		 return function(direction,event) {
			 
			 
			 var no = $(direction.target).attr('no');
			 obj.getFloorCompute(no);
		 }	  
	  },	 
	  getFloorCompute(no) {
		   $('#mark-container .mark-box span i.fas').hide();
		  var checkFno = '';
		  for(var f in this.floorListAll) {
			   var dts = this.floorListAll[f];
			   if(no == dts.pno) {
					checkFno = dts.no;
					break;
				}
			}

		  if(this.acode==(String(no)+'a') && this.fcode == (String(checkFno)+'f')) {
			return;	
		  }
		  
		  this.acode = String(no)+'a';
		  
		  this.getFloorListCompute();
		  var fno = this.floorList[0].no;
		  this.fcode = String(fno)+'f';
		  
		  this.targetFacyNo = '';
		  $('.map-floor-box').show();
		  $('.map-group').show();
		  $('.map-info-layout').hide();
		  $('#guideMap').hide();
		  $('.zoom-area').show();
		  $('.map-item').show();

		  
		  
		  this.areaMapInitalize();		  
		  /*					
		  var params = {depth:2,no:no}
		  this.$form.sendPost(params,'Map/getCategory',function(response) {
			   
			   obj.floorList = [];
			   for(var f in response.datas) {
				     var dts = response.datas[f];
				     dts.names = {kor:dts.kor_name,eng:dts.eng_name,cha:dts.cha_name,jan:dts.jan_name};
					 obj.floorList.push(dts);
					 
			   } 
			   obj.floorList[0].gclass='active';
			   obj.fcode = String(obj.floorList[0].no)+'f';
				obj.areaMapInitalize();		  
		  });
		  */
				
	  },
	  getMapDataClick(no) {

			this.getMapDataCompute(no);
	  },
	  getMapData() {
		 var obj = this;
		 return function(direction,event) {
			  var no = $(direction.target).attr('no');
			 obj.getMapDataCompute(no);
		 }	  
		 
	  },
	  getMapDataCompute(no) {
		  
			
		  $('.map-group').show();
		  $('.map-info-layout').hide();
		  $('#guideMap').hide();
		  $('.zoom-area').show();
		  $('.map-item').show();
		 
		  $('#mark-container .mark-box span i.fas').hide();
		  $('.name-text .actImage').hide();
		  $('.name-text .defImage').show();

		
		 $('.map-floor-box').show();

		 if(this.fcode == String(no)+'f') {
			this.refreshView = false;
			return;
		  }
		  
		  this.targetFacyNo = '';	 
		  this.fcode = String(no)+'f';
		  this.areaMapInitalize();	
		   
		 
	  },
	  openFloorInfo() {
		 var obj = this;
		 return function(direction,event) {
		
			/*
			 var floorList = obj.floorList;
		     obj.floorList = [];
			 for(var i in floorList) {
			    var newData = floorList[i];
				newData.gclass='';		
			    obj.floorList.push(newData);
		     }
			 
			 obj.allfloorInfoViewButton = 'active';
			 */
			 $('.map-floor-box').hide();
			 $('.map-group').hide();
			 $('.map-info-layout').show();
		
			 
		 }	  
		

	  },
	  areaMapInit() {
		this.pointerList = []
		this.guideContext  = null
		this.pointerDataList  = []
		this.rectPointerDataList = []
		this.circlePointerDataList = []
		this.targetElement = null
		this.rectList = []
		this.circleList = []
		this.markList = []
		this.canvasWidth = 1300
		this.markTextMove = false
		this.saveImgFlag = false;
		this.markTextMoveTemp = false;
		this.pointPolyTempList=[];
		this.zoomLevels = []
		this.initZoomLevels = []
		this.updZoomCnt = 1
		this.mapOrgImgWidth = 0
		this.mapOrgImgHeight = 0
		this.mapImgfirstWidth = ''
		this.mapImgfirstHeight = ''
		this.zMoveFlag = false;
		this.divideX = 0
		this.divideY = 0
		this.zoomRate = 1;
		//this.lang = 'kor';
		this.textLevels = []
		this.zoomLevelUpd = false;
		this.polyTempMake = false;
		this.allfloorInfoViewButton = '';
		this.refreshView = false;
		var areaEtcDataList = this.etcData;
		
		var mimgFlag = false;
		var zlvFlag = false;
		var tlvFlag = false;
		if(areaEtcDataList[this.acode]) {
			if(areaEtcDataList[this.acode][this.fcode]) {
				if(areaEtcDataList[this.acode][this.fcode]['img']) {
					this.mapImage = areaEtcDataList[this.acode][this.fcode]['img'];
					mimgFlag = true;
				}
				if(areaEtcDataList[this.acode][this.fcode]['tlv']) {
					this.textLevel = areaEtcDataList[this.acode][this.fcode]['tlv'];
					tlvFlag = true;
				}
			} 
		} 
		if(!mimgFlag)this.mapImage = null;
		
		if(!tlvFlag)this.textLevel = 7;
		this.zoomLevel = 1
		

		var areaDataList = this.areaData;
		if(areaDataList[this.acode]) {
			if(areaDataList[this.acode][this.fcode]) {
				var isAreaData = areaDataList[this.acode][this.fcode];
				for(var idxcode in isAreaData) {
					var idxData = isAreaData[idxcode];
					
					switch(idxData.gtype) {
						case 'poly':
							var point = idxData.point;
							var tempdata = {point:point,idxcode:idxcode,mapZoomRate:1};
							this.pointerDataList.push(tempdata);
							var mapPointList = [];
							for(var kj in point) {
								mapPointList.push(point[kj].x);
								mapPointList.push(point[kj].y);
							}
							var tempdatacompute = {point:mapPointList.join(','),idxcode:idxcode};
							this.pointPolyTempList.push(tempdatacompute);
							
							
							this.setMrankTemp(idxData.mark)
						break;
						case 'rect':
							var point = idxData.point;
							var rectData = {};
							rectData.gstyle = {top:point.top+'px',left:point.left+'px',width:point.width+'px',height:point.height+'px'}
							rectData.idxcode = idxcode;
							this.rectList.push(rectData);
							point.idxcode = idxcode;
							this.rectPointerDataList.push(point);

							this.setMrankTemp(idxData.mark)
					
						break;
						case 'circle':
							var point = idxData.point;
							var circleData = {};
							circleData.gstyle = {top:point.top+'px',left:point.left+'px',width:point.width+'px',height:point.height+'px','border-radius':point.radius+'px'}
							circleData.idxcode = idxcode;
							this.circleList.push(circleData);
							
							point.idxcode = idxcode;
							this.circlePointerDataList.push(point);
							this.setMrankTemp(idxData.mark)
						break;
					}
						
					

				}
				
				//console.log(this.markList);
			}
		}

	  },
      areaMapInitalize() {
		this.pointerList = []
		this.guideContext  = null
		this.pointerDataList  = []
		this.rectPointerDataList = []
		this.circlePointerDataList = []
		this.targetElement = null
		this.rectList = []
		this.circleList = []
		this.markList = []
		this.canvasWidth = 1300
		this.markTextMove = false
		this.saveImgFlag = false;
		this.markTextMoveTemp = false;
		this.pointPolyTempList=[];
		this.zoomLevels = []
		this.initZoomLevels = []
		this.updZoomCnt = 1
		this.mapOrgImgWidth = 0
		this.mapOrgImgHeight = 0
		this.mapImgfirstWidth = ''
		this.mapImgfirstHeight = ''
		this.zMoveFlag = false;
		this.divideX = 0
		this.divideY = 0
		this.zoomRate = 1;
		//this.lang = 'kor';
		this.textLevels = []
		this.zoomLevelUpd = false;
		this.polyTempMake = false;
		this.allfloorInfoViewButton = '';	
		this.refreshView = false;	
		var areaEtcDataList = this.etcData;
		
		var mimgFlag = false;
		var zcntFlag = false;
		var zlvFlag = false;
		var tlvFlag = false;
		if(areaEtcDataList[this.acode]) {
			if(areaEtcDataList[this.acode][this.fcode]) {
				if(areaEtcDataList[this.acode][this.fcode]['img']) {
					this.mapImage = areaEtcDataList[this.acode][this.fcode]['img'];
					mimgFlag = true;
				}

				if(areaEtcDataList[this.acode][this.fcode]['zcnt']) {
					this.zoomCnt = areaEtcDataList[this.acode][this.fcode]['zcnt'];
					zcntFlag = true;
				}
				if(areaEtcDataList[this.acode][this.fcode]['zlv']) {
					//this.zoomLevelUpd = true,
					this.zoomLevel = areaEtcDataList[this.acode][this.fcode]['zlv'];
					zlvFlag = true;
				}
				if(areaEtcDataList[this.acode][this.fcode]['tlv']) {
					this.textLevel = areaEtcDataList[this.acode][this.fcode]['tlv'];
					tlvFlag = true;
				}
			} 
		} 
		if(!mimgFlag)this.mapImage = null;
		
		if(!zcntFlag) {
			this.zoomCnt = 1
		} 
		if(this.zoomCnt==1)this.zoomView = false;
		else this.zoomView = true;

		if(!tlvFlag)this.textLevel = 7;
		if(!zlvFlag) {
			this.zoomLevel = 1
		}

		

		var areaDataList = this.areaData;
		if(areaDataList[this.acode]) {
			if(areaDataList[this.acode][this.fcode]) {
				var isAreaData = areaDataList[this.acode][this.fcode];
				for(var idxcode in isAreaData) {
					var idxData = isAreaData[idxcode];
					
					switch(idxData.gtype) {
						case 'poly':
							var point = idxData.point;
							var tempdata = {point:point,idxcode:idxcode,mapZoomRate:1};
							this.pointerDataList.push(tempdata);
							var mapPointList = [];
							for(var kj in point) {
								mapPointList.push(point[kj].x);
								mapPointList.push(point[kj].y);
							}
							var tempdatacompute = {point:mapPointList.join(','),idxcode:idxcode};
							this.pointPolyTempList.push(tempdatacompute);
							
							
							this.setMrankTemp(idxData.mark)
						break;
						case 'rect':
							var point = idxData.point;
							var rectData = {};
							rectData.gstyle = {top:point.top+'px',left:point.left+'px',width:point.width+'px',height:point.height+'px'}
							rectData.idxcode = idxcode;
							this.rectList.push(rectData);
							point.idxcode = idxcode;
							this.rectPointerDataList.push(point);

							this.setMrankTemp(idxData.mark)
					
						break;
						case 'circle':
							var point = idxData.point;
							var circleData = {};
							circleData.gstyle = {top:point.top+'px',left:point.left+'px',width:point.width+'px',height:point.height+'px','border-radius':point.radius+'px'}
							circleData.idxcode = idxcode;
							this.circleList.push(circleData);
							
							point.idxcode = idxcode;
							this.circlePointerDataList.push(point);
							this.setMrankTemp(idxData.mark)
						break;
					}
						
					

				}
				
				//console.log(this.markList);
			}
		}
		
		
	  },
	  polyRedrawing() {
			
			if(this.pointerDataList.length>0) {
				this.pointPolyTempList = [];
				for(var cnt in this.pointerDataList) {
					var pointerList = this.pointerDataList[cnt].point;
					var mapZoomRate = this.pointerDataList[cnt].mapZoomRate;
					var idxcode = this.pointerDataList[cnt].idxcode;
					var mapPointList = [];	
					for(var k in pointerList) {
						var linedata = pointerList[k];
						if(mapZoomRate) {
							var resultX = parseFloat(linedata.x) / mapZoomRate;
							var resultY = parseFloat(linedata.y) / mapZoomRate;
							resultX = resultX * this.zoomRate
							resultY = resultY * this.zoomRate

						} else {
							var resultX = linedata.x;
							var resultY = linedata.y;
						}
						mapPointList.push(resultX);
						mapPointList.push(resultY);

					}
					var tempdatacompute = {point:mapPointList.join(','),idxcode:idxcode};
					this.pointPolyTempList.push(tempdatacompute);	
				}
							
			}
	  },		
	  setAreaShape() {	
			
			var markTempFlag = false;	
			if(this.pointerDataList.length>0) {
				this.polyRedrawing();
				markTempFlag = true;
			}
			if(this.rectPointerDataList.length>0) {
				this.rectList = [];
				for(var i in this.rectPointerDataList) {
					var point = this.rectPointerDataList[i];
					var rectData = {};
					if(point.mapZoomRate) {
						var top = parseFloat(point.top) /point.mapZoomRate 
						var left = parseFloat(point.left)/point.mapZoomRate
						var width = parseFloat(point.width)/ point.mapZoomRate
						var height = parseFloat(point.height)/ point.mapZoomRate
						top = top * this.zoomRate
						left = left * this.zoomRate
						width = width * this.zoomRate
						height = height * this.zoomRate
						
					} else {
						var top = point.top
						var left = point.left
						var width = point.width
						var height = point.height

					}
					rectData.gstyle = {top:top+'px',left:left+'px',width:width+'px',height:height+'px'}
					rectData.idxcode = point.idxcode
					this.rectList.push(rectData);
				}
				markTempFlag = true;
							
			}
			if(this.circlePointerDataList.length>0) {
				this.circleList = [];
				for(var i in this.circlePointerDataList) {
					var point = this.circlePointerDataList[i];
					var circleData = {};
					if(point.mapZoomRate) {
						var top = parseFloat(point.top) /point.mapZoomRate 
						var left = parseFloat(point.left)/point.mapZoomRate
						var width = parseFloat(point.width)/ point.mapZoomRate
						var height = parseFloat(point.height)/ point.mapZoomRate
						top = top * this.zoomRate
						left = left * this.zoomRate
						width = width * this.zoomRate
						height = height * this.zoomRate
					} else {
						var top = point.top
						var left = point.left
						var width = point.width
						var height = point.height
					}
					circleData.gstyle = {top:top+'px',left:left+'px',width:width+'px',height:height+'px','border-radius':(width/2)+'px'}
					circleData.idxcode = point.idxcode
					this.circleList.push(circleData);
				}	
				markTempFlag = true;
			}
			if(markTempFlag) {

				var markList = this.markList;
				this.markList = [];
				for(var i in markList) { 
					var oldMarkData = markList[i];

					if(!oldMarkData.mapZoomRate)oldMarkData.mapZoomRate = 1;
					if(oldMarkData.text.gstyle) {
						
						var width = String(oldMarkData.text.gstyle.width);
						width =parseFloat(width.replace('px','')) /oldMarkData.mapZoomRate ;
						width = width  * this.zoomRate
						if(oldMarkData.text.gstyle.left) {
							var left = String(oldMarkData.text.gstyle.left);
							left = parseFloat(left.replace('px','')) /oldMarkData.mapZoomRate ;
							left = left  * this.zoomRate
							
							var top = String(oldMarkData.text.gstyle.top);
							top = parseFloat(top.replace('px','')) /oldMarkData.mapZoomRate ;
							top = top  * this.zoomRate
						
							var spanGstyle = {top:top+'px',left:left+'px',width:width+'px'}
						} else {
							var spanGstyle = {width:width+'px'}
						}
						
					} else {
						var spanGstyle = {}
					}
					
					var top = String(oldMarkData.gstyle.top);
					var left = String(oldMarkData.gstyle.left);
					top = parseFloat(top.replace('px','')) /oldMarkData.mapZoomRate ;
					left = parseFloat(left.replace('px','')) /oldMarkData.mapZoomRate ;
					top = top  * this.zoomRate
					left = left  * this.zoomRate

					var gstyle = {top:top+'px',left:left+'px'}

					var markData = {}
					markData.gtype = oldMarkData.gtype;
					markData.mtype = oldMarkData.mtype;
					markData.cnt = oldMarkData.cnt;
					markData.idxcode = oldMarkData.idxcode;
					markData.dcode = oldMarkData.dcode;
					markData.gstyle = gstyle;
					markData.text = {}
					markData.text.name = oldMarkData.text.name;
					markData.text.gstyle = spanGstyle;
					markData.no = oldMarkData.no;
					if(oldMarkData.dcode == 'item')markData.img = oldMarkData.img;
					
					markData.textView = oldMarkData.textView;
					markData.mapZoomRate = this.zoomRate;
					this.markList.push(markData)
				}

				//this.markTextMoveTemp = true;
			}
	  
	  },		
	  setMrankTemp(markData) {	
		    this.markList.push(markData)
			this.markTextMoveTemp = true;
			

	  },
	  getCompanyDetail(no) {
		this.$emit('showCompanyEvent',no);
	  },
	  showMapDetail(no) {
		
		switch(no) {
			case 'all':
				$('#mainMap').show();
				$('.zoom-area').show();
				$('.map-item').hide();
			
			break;
			case '1':
				this.setMapInfo('map','d')
			break;
			case '10':
				this.setMapInfo('map','e')
			break;
			case '4':
				this.setMapInfo('map','f')
			break;
			case '5':
				this.setMapInfo('map','g')
			break;
			case '6':
				this.setMapInfo('map','h')
			break;
			case '7':
				this.setMapInfo('map','i')
			break;
			case '11':
				this.setMapInfo('map','j')
			break;
		}
	  },
	  setMapInfo(code,cmd) {
		if(code == 'table') {
			this.$emit('showMapInfoTableEvent',cmd);
		} else {
			$('#mainMap').hide();
			$('.zoom-area').hide();
			$('.map-item').hide();
			$('#infoMap-'+cmd).show();
			
			$('#mainThemeList li').removeClass('active');
			var code = 'all';
			switch(cmd) {
					case 'd':
						code ='1';
					break;
					case 'e':
						code ='10';
					break;
					case 'f':
						code ='4';
					break;
					case 'g':
						code ='5';
					break;
					case 'h':
						code = '6';
					break;
					case 'i':
						code = '7';
					break;
					case 'j':
						code = '11';
					break;
			}
			$('#mainThemeList li#tmenu-'+code).addClass('active');
		}
	  },
	  moveUp() {
		 var obj = this;
		 return function(direction,event) {
			 obj.move('up');
		 }	 
	  },
	  moveLeft() {
		 var obj = this;
		 return function(direction,event) {
			 obj.move('left');
		 }	 
	  },
	  moveRight() {
		 var obj = this;
		 return function(direction,event) {
			 obj.move('right');
		 }	 
	  },
	  moveDown() {
		 var obj = this;
		 return function(direction,event) {
			 obj.move('down');
		 }	 
	  },
	  
	  move(cmd) {
		 	
		  //if(this.mapScale == 1)return;
		 
			//alert(this.mapOffsetLeft);
		  switch(cmd) {
			case 'up':
				
				if(this.mapOffsetTop<=0)return;
				
				var top = this.mapOffsetTop - 80;
				if(top<0)top=0;
				this.mapOffsetTop = top;
				var obj = this;
				//if(this.mapOffsetTop<10)this.mapOffsetTop=0;
				 $('#mapImageLayout').animate({
					scrollTop:top
				 },100);
	    
			break;
			case 'down':
				var top = this.mapOffsetTop + 80;
				var height = $('#orgImg').height() - $('#mapImageLayout').height();
				if(parseFloat(height) < top) {
					top = parseFloat(height);
				}
				this.mapOffsetTop = top;
				$('#mapImageLayout').animate({
					scrollTop:top
				 },100);
	    
			break;
			case 'left':
				if(this.mapOffsetLeft<=0)return;
				var Left = this.mapOffsetLeft - 80;
				if(Left<0)Left=0;
				this.mapOffsetLeft = Left;	 

				 $('#mapImageLayout').animate({
					scrollLeft:Left
				 },100);
				
			break;
			case 'right':
				//alert(this.mapOffsetLeft);
                
				var left = this.mapOffsetLeft + 80;
				var width = $('#orgImg').width() - $('#mapImageLayout').width();
				if(width < left) {
					left = width;
				}
				this.mapOffsetLeft = left;	 
				
				var obj = this;
				 $('#mapImageLayout').animate({
					scrollLeft:left
				 },100);
	    
			break;
		  }
		
		
		 
	  },
	  zoomPlus() {
		 var obj = this;
		 return function(direction,event) {
			 obj.zoom('plus');
		 }	 
	  },
	  zoomMinus() {
		 var obj = this;
		 return function(direction,event) {
			 obj.zoom('minus');
		 }	 
	  },
	  zoom(cmd) {
		  //this.zoomLevel
		  if(this.mapScale==1) {
			if(cmd=='minus')return;	

		  } else if(this.mapScale>=parseInt(this.zoomCnt)) {
			if(cmd=='plus')return;	
		  
		  }
		
		  switch(cmd) {
			case 'plus':
				this.mapScale++;
			break;
			case 'minus':
				this.mapScale--;
			break;
		  }
			/*
		  var itemHeight = $('#navigation-bar').height();
		  
		  var height = $('.zoom-box .zoom-navigation').height() - (2*itemHeight);
		  if(this.zoomCnt>2) {
				var divideHeight = height/(parseInt(this.zoomCnt)-1);
		  }
		  if(this.mapScale==1) {
				var bottom = 0;
		  } else if(this.mapScale==parseInt(this.zoomCnt)) {
				var bottom = $('.zoom-box .zoom-navigation').height() - itemHeight -4; 
		  } else {

				var bottom = ((this.mapScale-1) * divideHeight) + (itemHeight/2);	
		  }
		  
		  $('#navigation-bar').css('bottom',bottom);
		 */
		
		  this.updateZoomCnt(this.mapScale);	
	  },
	  updateZoomCnt(ncnt) {
			var widthResult = this.mapOrgImgWidth - this.mapImgfirstWidth;
			var divide = parseInt(widthResult/(this.zoomCnt-1));
			var divideY = parseInt((this.mapOrgImgHeight - this.mapImgfirstHeight)/(this.zoomCnt-1));
			
			
			var nt = $("#mapImageLayout").scrollTop();
			var nl = $("#mapImageLayout").scrollLeft();
				
			var fw = $("#orgImg").width();
			
			if(ncnt == 1) {
				
				this.divideX = 0;
				this.divideY = 0;
				this.zMoveFlag = false;

				$("#orgImg").css({'max-width':this.mapImgfirstWidth+'px','width':this.mapImgfirstWidth+'px'});

			} else if(ncnt == this.zoomCnt) {

				$("#orgImg").css({'max-width':this.mapOrgImgWidth+'px','width':this.mapOrgImgWidth+'px'}); //,height:this.mapOrgImgHeight+'px'});
				//$("#orgImg").attr('width',this.mapOrgImgWidth);
				//$("#orgImg").attr('height',this.mapOrgImgHeight);
			
			
				var updt = parseFloat(this.mapImgfirstHeight)/2;
				var updl = parseFloat(this.mapImgfirstWidth)/2;
				$("#mapImageLayout").scrollTop(updt);
				$("#mapImageLayout").scrollLeft(updl);
				
				var updt = parseFloat(nt) + (divideY/2);
				var updl = parseFloat(nl) + (divide/2);
				
				$("#mapImageLayout").scrollTop(parseInt(updt));
				$("#mapImageLayout").scrollLeft(parseInt(updl));
		
				this.divideX = updl;
				this.divideY = updt;

			} else {
				var width = this.mapImgfirstWidth + (divide * (ncnt-1));
				var height = (width/this.mapImgfirstWidth) * this.mapImgfirstHeight;
				
				$("#orgImg").css({'max-width':width+'px','width':width+'px'}); //,height:height+'px'});
				//$("#orgImg").attr('width',width);
				//$("#orgImg").attr('height',height);
				if(parseFloat(fw) < width) {
					var updt = parseFloat(nt) + (divideY/2);
					var updl = parseFloat(nl) + (divide/2);
				} else {
					var updt = parseFloat(nt) - (divideY/2);
					var updl = parseFloat(nl) - (divide/2);

				}
				$("#mapImageLayout").scrollTop(parseInt(updt));
				$("#mapImageLayout").scrollLeft(parseInt(updl));
				
			
				this.divideX = updl;
				this.divideY = updt;
						
			}
		
			
			this.zoomRate = parseFloat($("#orgImg").width()) /this.canvasWidth;
			var size = this.textLevel * this.zoomRate;
			$('.mark-box .name-text').css('font-size',size+'pt');
			var imgSize = 60 * this.zoomRate;
			$('.mark-box .name-text img').css('width',imgSize+'px');

		    this.mapOffsetTop = $("#mapImageLayout").scrollTop();
		    this.mapOffsetLeft = $("#mapImageLayout").scrollLeft();
			//alert(this.mapOffsetLeft);
			
			this.setAreaShape();
	   },

	  getCodeByNo(no) {
		  var cmd = 'all';
		  switch(no) {
			case '1':
				cmd='d';
			break;
			case '10':
				cmd='e';
			break;
			case '4':
				cmd='f';
			break;
			case '5':
				cmd='g';
			break;
			case '6':
				cmd='h';
			break;
			case '7':
				cmd='i';
			break;
			case '11':
				cmd='j';
			break;
		 }
		 return cmd;
		  		
	  },
	
	/**
	*@ v-touch
	*
	**/
	getItemInfo() {
		 var obj = this;
		 return function(direction,event) {
			  var idxcode = $(direction.target).attr('idxcode');
			 obj.showDetail(idxcode);
		}
	},
	showDetail(idxcode) {
		var areaInfo = this.areaData[this.acode][this.fcode][idxcode];
		switch(areaInfo.dtype) {
			case 'direct':
				
				this.$emit('showMapInfoTableEvent',areaInfo.data.name,areaInfo.data.no,idxcode);
			break;
			case 'company':
				this.getCompanyDetail(areaInfo.data.no)
			break;


		}

		
	},
	

	
	   /***
	  *
	  *@ 애니매이션 설정
	  ***/
	  aniPlay(animationPoints) {
		 
		  $('#orgImg').css('width',this.mapAreaWidth+'px');
		  
		  $("#guideMap").attr('width',$('#orgImg').width()).attr('height',$('#orgImg').height()).show();
		  		
		  if(this.animateionIntervel) {
				 clearInterval(this.animateionIntervel)
				 if(this.guideContext) {
					 this.guideContext.clearRect(0,0,$("#guideMap").width(),$("#guideMap").height());
					 this.guideContext = null;
				 }
				this.animateionIntervel = null;
		  }
		    

		  //console.log(animationPoints);
		  
		  this.aniUpdateData(animationPoints);
		  var animationPoints = this.animationPoints;
		 // console.log(animationPoints);
		  
		  this.animationPoints = [];
		  var itemCheckList = {};
		  for(var key in animationPoints) {
				var item = animationPoints[key];
				var x = parseInt(item.x);
				var y = parseInt(item.y);
				var checkItem = x+'_'+y; 
				if(!itemCheckList[checkItem]) {
					this.animationPoints.push(item);
					itemCheckList[checkItem] = 1;
				}
				
		  }
		  var canvas = document.getElementById('guideMap');
		  this.guideContext = canvas.getContext('2d');
		  this.guideContext.fillStyle = this.aniColor;
		  this.guideContext.strokeStyle = this.aniColor;
		  this.guideContext.lineWidth = 1;
		  this.guideContext.beginPath(); //그릴준비가 되었는지 알수 있다.
            
		 var start = this.animationPoints[0];
		 this.guideContext.arc(start.x,start.y,this.aniRadius,0,Math.PI *2);	
														
		 this.guideContext.fill();
		 this.guideContext.closePath()
			
		 this.animateionCnt++;	
		 this.animateionIntervel = setInterval(this.animationGuideMap,(this.aniSpeed*10));
	  
	  },
	  animationGuideMap() {
			
			//console.log(this.animateionCnt);
			this.guideContext.beginPath(); //그릴준비가 되었는지 알수 있다.
            
			var linedata = this.animationPoints[this.animateionCnt];											
			this.guideContext.arc(linedata.x,linedata.y,this.aniRadius,0,Math.PI *2);	
			this.guideContext.fill();
			this.guideContext.closePath()
		
			// 컨버스에 선을 그린다.
			if(this.animationPoints.length == (this.animateionCnt+1)) { 
				this.animateionCnt=0;	
				if(this.animateionIntervel) {
					clearInterval(this.animateionIntervel)
					this.animateionIntervel = null;

					if($('#'+this.markPositionViewCode+'markPosition').attr('class')=='fas') {
						$('#'+this.markPositionViewCode+'markPosition').show();
						this.refreshView = true;
					}
		
				}
			} else this.animateionCnt++;
  
	  },
	   /***
	  *
	  *@ 길안내선 애니메이션에 맞게 재설정
	  ***/
	  aniUpdateData(animationPoints) {
		  this.animationPoints = [];
		  
		  var tempLineList = [];
		  var tempAllLineList = [];
		  var beforeItem = {};
		  var beforeMode = '';
		  var beforeGtype = '';
		  for(var i in animationPoints) {
			    var item = animationPoints[i]; // 현재 포인트
				if(i<1) {
					tempLineList.push(item);
				} else {
					var mode = item.type;
					var gtype = item.lgtype;
				
					beforeItem = animationPoints[i-1]; // 과거 포인트
					beforeMode = beforeItem.type;
					beforeGtype = beforeItem.lgtype;
				
						
					if(gtype!=beforeGtype) {
						var tempData = {data:tempLineList,mode:beforeMode,gtype:beforeGtype,last:false};
						tempAllLineList.push(tempData);
						tempLineList = [];
				
					}
					tempLineList.push(item);
					if(i>=(animationPoints.length-1)) {
						var tempData = {data:tempLineList,mode:mode,gtype:gtype,last:true};
						tempAllLineList.push(tempData);
						tempLineList = [];
					} 
				}
		  }
			
		  var firstXy = {};
		  for(var k in tempAllLineList) {
			  var tempList = tempAllLineList[k];
			  var last = tempList.last;
			  var mode = tempList.mode;
			  var gtype = tempList.gtype;
			  
			  firstXy = this.setLineCompute(tempList.data,mode,gtype,last,firstXy);				
			  
		  }

		  var zoomRate = parseFloat($("#orgImg").width()) / this.canvasWidth;
		  //alert(zoomRate);
		  for(var key in this.animationPoints) {
				var info = this.animationPoints[key];
				var newData = {};
				newData.x = parseFloat(info.x) * zoomRate;
				newData.y = parseFloat(info.y) * zoomRate;
				this.$set(this.animationPoints,key,newData);
		  }
 		 this.aniRadius = this.aniRadius *zoomRate;
		  
		
	  },
	  setLineCompute(tempLineList,mode,gtype,last,firstXy) {
		  if(mode=='round') {
			 return this.aniLoadPointerRoundUpdate(tempLineList,gtype,last);
		  } else {
			  switch(gtype) {
				case 'hor':
					if(!firstXy.x) {
						var check = parseFloat(tempLineList[0].x) - parseFloat(tempLineList[1].x);
						var firstX = tempLineList[0].x;
						var baseY = tempLineList[0].y;
					} else {
						var check = parseFloat(firstXy.x) - parseFloat(tempLineList[0].x);
						var firstX = firstXy.x;
						var baseY = tempLineList[0].y;
					}
					var firstY = baseY;
					if(check>0) var lineAddMode = 'fl'; //왼쪽
					else var lineAddMode = 'fr';//오른쪽
					
				break;
				case 'ver':
					if(!firstXy.y) {
						var check = parseFloat(tempLineList[0].y) - parseFloat(tempLineList[1].y);
						var firstY = tempLineList[0].y;
						var baseX = tempLineList[0].x;
					} else {
						var check = parseFloat(firstXy.y) - parseFloat(tempLineList[0].y);
						var firstY = firstXy.y;
						var baseX = tempLineList[0].x;
					}
					
					var firstX = baseX;
					if(check>0) var lineAddMode = 'fu'; //위로
					else var lineAddMode = 'fd';//아래로
				
				break;
				
				case 'angleHor':
				case 'angleVer':
					
					return this.aniLoadPointerAngleUpdate(tempLineList,gtype,last,firstXy);
					
				break;
			 }
			  
			 var lastY = firstY;
			 var lastX = firstX;
			 for(var i in tempLineList) {
				
				 var x = parseFloat(tempLineList[i].x);
				 var y = parseFloat(tempLineList[i].y);
				 
				 switch(gtype) {
					case 'hor':
						if(lineAddMode=='fl') {
							if(x < lastX)lastX =x;
						} else {
							if(x > lastX)lastX =x;
						}
					break;
					case 'ver':
						if(lineAddMode=='fu') {
							if(y < lastY)lastY = y;
						} else {
							if(y > lastY)lastY = y;
						}
					break;
				}
			}
			switch(gtype) {
				case 'hor':
					 this.aniLoadPointerRowsUpdate(firstX,lastX,baseY,lineAddMode);
					 return {x:lastX,y:baseY,gtype:gtype};
				break;
				case 'ver':
					 this.aniLoadPointerColsUpdate(firstY,lastY,baseX,lineAddMode);
					 return {x:baseX,y:lastY,gtype:gtype};
				break;
				
			}
		 }
	  },	
	  aniLoadPointerColsUpdate(firstY,lastY,baseX,lineAddMode) {
		
		    var cnt = this.aniRadius * 4;

			if(lineAddMode=='fu') {
				var  divideCnt = (firstY - lastY)/cnt;
				
				if(divideCnt <= 0.5) {
					var xyData = {};
					xyData.y = firstY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
					
				} else if(divideCnt >0.5 && divideCnt < 1.3) {
					var xyData = {};
					xyData.y = firstY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
					
					xyData = {};
					xyData.y = lastY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
				} else {
					if(divideCnt<2)divideCnt=2;
					var checkCnt = Math.round(divideCnt);
					var value = (firstY - lastY)/checkCnt;

					
					var k = 1;
					for(var i = firstY; i >= lastY; i= i-value) {
						var xyData = {};
						xyData.y = i;
						xyData.x = baseX;
						if(k<=checkCnt) {
							this.animationPoints.push(xyData);
						}
						k++;
					}
					var xyData = {};
					xyData.y = lastY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
				}
			} else {
				var  divideCnt = (lastY - firstY)/cnt;
				if(divideCnt<=0.5) {
					var xyData = {};
					xyData.y = firstY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
					
				} else if(divideCnt > 0.5 && divideCnt<1.3) {
					var xyData = {};
					xyData.y = firstY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
					
					xyData = {};
					xyData.y = lastY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
				} else {
					if(divideCnt<2)divideCnt=2;
					var checkCnt = Math.round(divideCnt);
					var value = (lastY - firstY)/checkCnt;
					var k = 1;
					for(var i = firstY; i <= lastY; i= i+value) {
						var xyData = {};
						xyData.y = i;
						xyData.x = baseX;
						if(k<=checkCnt) {
							this.animationPoints.push(xyData);
						}
						k++;
					}
					var xyData = {};
					xyData.y = lastY;
					xyData.x = baseX;
					this.animationPoints.push(xyData);
				}
			}
			
		
	  },
	  aniLoadPointerRowsUpdate(firstX,lastX,baseY,lineAddMode) {
			
		  
		    var cnt = this.aniRadius * 4;
			if(lineAddMode=='fl') {
				var  divideCnt = (firstX - lastX)/cnt;
				if(divideCnt<=0.5) {
					var xyData = {};
					xyData.x = firstX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
					
				} else if(divideCnt > 0.5 && divideCnt<1.3) {
					var xyData = {};
					xyData.x = firstX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
					
					xyData = {};
					xyData.x = lastX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
				} else {
					var checkCnt = Math.round(divideCnt);
					var value = (firstX - lastX)/checkCnt;
					
					var k = 1;
					for(var i = firstX; i >= lastX; i= i-value) {
						var xyData = {};
						xyData.x = i;
						xyData.y = baseY;
						if(k<=checkCnt) {
							this.animationPoints.push(xyData);
						}
						k++;
					}
					var xyData = {};
					xyData.x = lastX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
				
				}
			} else {
				var  divideCnt = (lastX - firstX)/cnt;
				if(divideCnt<=0.5) {
				
					var xyData = {};
					xyData.x = firstX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
					
				} else if(divideCnt > 0.5 && divideCnt<1.3) {
				
				
					var xyData = {};
					xyData.x = firstX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
					
					xyData = {};
					xyData.x = lastX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
				} else {
					var checkCnt = Math.round(divideCnt);
					var value = (lastX - firstX)/checkCnt;
					
					var k = 1;
					for(var i = firstX; i <= lastX; i= i+value) {
						var xyData = {};
						xyData.x = i;
						xyData.y = baseY;
						if(k<=checkCnt) {
							this.animationPoints.push(xyData);
						}
						k++;
					}
					var xyData = {};
					xyData.x = lastX;
					xyData.y = baseY;
					this.animationPoints.push(xyData);
				}
			}
			
			
	  },
	  aniLoadPointerAngleUpdate(tempLineList,gtype,last,firstXy) {
			 
			if(tempLineList.length<1)return; 
			if(firstXy.gtype == 'round' || firstXy.gtype=='angleHor' || firstXy.gtype=='angleVer') {
				// 시작점을 찍어야 될 경우
				var xyData = {};
				xyData.x = firstXy.x;
				xyData.y = firstXy.y;
				this.animationPoints.push(xyData);
			} 

		  		
				
			if(tempLineList.length==1) { // 시작점과 끝점 사이만 계산한다
				
				var startX = parseFloat(firstXy.x);
				var startY = parseFloat(firstXy.y);
				var endX = parseFloat(tempLineList[0].x);
				var endY = parseFloat(tempLineList[0].y);
				this.aniAngleUpdate(startX,startY,endX,endY);
				
				return {x:tempLineList[0].x,y:tempLineList[0].y,gtype:gtype};
			} else {

				if(!firstXy.x) {
					var xyData = {};
					xyData.x = tempLineList[0].x;
					xyData.y = tempLineList[0].y;
					this.animationPoints.push(xyData);	

					var startX = parseFloat(tempLineList[0].x);
					var startY = parseFloat(tempLineList[0].y);
					
					for(var i in  tempLineList) {
						if(i>0) {
						
							var endX = parseFloat(tempLineList[i].x);
							var endY = parseFloat(tempLineList[i].y);
							this.aniAngleUpdate(startX,startY,endX,endY);
							startX = parseFloat(tempLineList[i].x);
							startY = parseFloat(tempLineList[i].y);
					
							xyData = {};
							xyData.x = tempLineList[i].x;
							xyData.y = tempLineList[i].y;
							this.animationPoints.push(xyData);	
					
						}
					}

				
				} else {
					var startX = parseFloat(firstXy.x);
					var startY = parseFloat(firstXy.y);
					for(var i in  tempLineList) {
							
						var endX = parseFloat(tempLineList[i].x);
						var endY = parseFloat(tempLineList[i].y);
						this.aniAngleUpdate(startX,startY,endX,endY);
						startX = parseFloat(tempLineList[i].x);
						startY = parseFloat(tempLineList[i].y);

						//if(i>0) {
							var xyData = {};
							xyData.x = tempLineList[i].x;
							xyData.y = tempLineList[i].y;
							this.animationPoints.push(xyData);	
						//}
						
				
					}
				}
				return {x:endX,y:endY,gtype:gtype};
			}
			
	  },
	  aniAngleUpdate(startX,startY,endX,endY) {
		
			var checkX = startX - endX;
			var checkY = startY - endY;

			var lengthX = (checkX < 0)?checkX * -1:checkX;
			var lengthY = (checkY < 0)?checkY * -1:checkY;
			
			var rate = lengthY/lengthX;
		   
			var cnt = this.aniRadius * 4;
					
			if(checkX>0) { /// 오른쪽에서 왼쪽
				var sum = Math.pow(lengthX,2) + Math.pow(lengthY,2);
				var result = Math.sqrt(sum);
				var  divideCnt = result/cnt;
				
				if(divideCnt>=1.3) {
					if(divideCnt<2)divideCnt=2;
				
					var checkCnt = Math.round(divideCnt);
					var value = result/checkCnt;
					
					var resultXC = (startX-endX)/result;
					if(checkY > 0) { // 아래에서 위로 이동
						var resultYC = (startY-endY)/result;
						var addY = endY;
					} else {
						var resultYC = (endY-startY)/result;
						var addY = endY;
					}
					for(var i = result; i > 0; i= i-value) {
							var x2 = endX + (resultXC * i);  
							if(checkY > 0) { // 아래에서 위로 이동
								var y2 = endY + (resultYC * i);  
							} else {
								var y2 = endY - (resultYC * i);  
							}
							var xyData = {};
							xyData.x = x2;
							xyData.y = y2;
							this.animationPoints.push(xyData);
					}	
				}

			} else { // 왼쪽에서 오른쪽
				var sum = Math.pow(lengthX,2) + Math.pow(lengthY,2);
				var result = Math.sqrt(sum);
				var  divideCnt = result/cnt;
				
				if(divideCnt>=1.3) {
					if(divideCnt<2)divideCnt=2;
					var checkCnt = Math.round(divideCnt);
					var value = result/checkCnt;
					
					var resultXC = (endX - startX)/result;
					if(checkY > 0) { // 아래에서 위로 이동
						var resultYC = (startY-endY)/result;
						var addY = startY;
					} else {
						var resultYC = (endY-startY)/result;
						var addY = startY;
					}
					
					for(var i = 0; i < result; i= i+value) {
							var x2 = startX + (resultXC * i);  
							
							if(checkY > 0) { // 아래에서 위로 이동
								var y2 = addY - (resultYC * i);  
							} else {
								var y2 = addY + (resultYC * i);  
							}
					
							var xyData = {};
							xyData.x = x2;
							xyData.y = y2;
							//console.log(x2,y2);
							this.animationPoints.push(xyData);
					}
				}
			}
	  },
	  aniLoadPointerRoundUpdate(tempLineList,gtype,last) {
			if(tempLineList.length==1) {
				if(tempLineList[0].start || tempLineList[0].center) {
					if(tempLineList[0].start) {
						var startX = parseInt(tempLineList[0].start.x);
						var startY = parseInt(tempLineList[0].start.y);
					} else {
						var startX = parseInt(tempLineList[0].center.x);
						var startY = parseInt(tempLineList[0].center.y);
			
					}
					var centerX = parseInt(tempLineList[0].center.x);
					var centerY = parseInt(tempLineList[0].center.y);
				
					this.aniRoundUpdate(startX,startY,centerX,centerY,gtype);
				
					var endX = parseInt(tempLineList[0].end.x);
					var endY = parseInt(tempLineList[0].end.y);
					return {x:endX,y:endY,gtype:gtype};
				} else return {x:tempLineList[0].x,y:tempLineList[0].y,gtype:gtype};


				
			} else {

				var startX,startY,centerX,centerY,endX,endY;
						
				for(var i in tempLineList) {
					var item = tempLineList[i];
					if(item.type=='round') {

						startX = parseInt(tempLineList[i].start.x);
						startY = parseInt(tempLineList[i].start.y);
						centerX = parseInt(tempLineList[i].center.x);
						centerY = parseInt(tempLineList[i].center.y);
						gtype = tempLineList[i].lgtype;
						this.aniRoundUpdate(startX,startY,centerX,centerY,gtype);
				
						endX = parseInt(tempLineList[i].end.x);
						endY = parseInt(tempLineList[i].end.y);
				
					}

				}
				return {x:endX,y:endY,gtype:gtype};
			}
	  },
	  aniRoundUpdate(startX,startY,centerX,centerY,gtype) {
			
			var cnt = this.aniRadius * 4;
			
			var checkRX =  startX - centerX;
			var checkRY =  startY - centerY;
			
			checkRX = (checkRX<0)?checkRX*-1:checkRX;
			checkRY = (checkRY<0)?checkRY*-1:checkRY;
			var r = (checkRX>checkRY)?checkRX:checkRY;
			
			var arcW = (2 * Math.PI * r)/4;
			var divideCnt = arcW/cnt;
			if(divideCnt>=1.3) {
				if(divideCnt<2)divideCnt=2;
				var checkCnt = Math.round(divideCnt);
				var value = 90/checkCnt;
			} else return;
			

			switch(gtype) {
				/*********** complete ***********/
				case 'udlr': // 위에서 아래 왼쪽에서 오른쪽 
					for(var i = 180; i <= 270; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + x + r;
						xyData.y = startY-y;
						this.animationPoints.push(xyData);
					}
				
				break;
				/*********** complete ***********/
				case 'udrl': // 위에서 아래  오른쪽에서 왼쪽
					for(var i = 0; i <= 90; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + x -r;
						xyData.y = startY + y;
						this.animationPoints.push(xyData);
					}
				

				break;
				/*********** complete ***********/
				case 'dulr': // 아래에서 위 왼쪽에서 오른쪽
					for(var i = 0; i <= 90; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + (r-x);
						xyData.y = startY-y;
						this.animationPoints.push(xyData);
					}
					/*
					for(var i = 90; i >= 0; i= i-value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + (r-x);
						xyData.y = startY-y;
						this.animationPoints.push(xyData);
					}
					*/
				
				break;

				/*********** complete ***********/
				case 'durl': //  아래에서 위 오른쪽에서 왼쪽
				
					for(var i = 0; i <= 90; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX - (r-x);
						xyData.y = startY-y;
						this.animationPoints.push(xyData);
					}
				break;
				/*********** complete ***********/
				case 'lrud': // 왼쪽에서 오른쪽 위에서 아래로
					for(var i = 270; i <= 360; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + x;
						xyData.y = centerY+y;
						this.animationPoints.push(xyData);
					}
				break;

				/*********** complete ***********/
				case 'lrdu': // 왼쪽에서 오른쪽 아래에서 위로
					for(var i = 270; i <= 360; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + x;
						xyData.y = centerY - y;
						this.animationPoints.push(xyData);
					}
				break;
				/*********** complete ***********/
				case 'rlud': // 오른쪽에서 왼쪽 위에서 아래
					for(var i = 90; i <= 180; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX + x;
						xyData.y = startY + (r-y);
						this.animationPoints.push(xyData);
					}
				
				break;
				/*********** complete ***********/
				case 'rldu': //  오른쪽에서 왼쪽 아래에서 위 
				    for(var i = 90; i <= 180; i= i+value) {

						var a = this.degrees_to_radians(i)
						var x = r * Math.cos(a);
						var y = r * Math.sin(a);
						
						var xyData = {};
						xyData.x = startX - (r-x) + r;
						xyData.y = centerY + y;
						this.animationPoints.push(xyData);
					}
				
				break;
			}

			
	  },
	  degrees_to_radians(degrees) {
		  var pi = Math.PI;
		return degrees * (pi/180);
	  },
	  drawMapImage() {
			var initWidth = this.mapAreaWidth;
			//$('#orgImg').css('min-height',initWidth+'px');
			var obj = this;
			$('#orgImg').off('load');
			$('#orgImg').on('load',function() {
				
				    var tImg = new Image();
			        tImg.src = $(this).attr('src');
					obj.mapOrgImgWidth = tImg.width;
					obj.mapOrgImgHeight = tImg.height;
					
					var mapAreaHeight = $(window).height()-176;
					var orgImgHeight = (obj.mapOrgImgHeight/ obj.mapOrgImgWidth) * initWidth;
							
					if(initWidth>=obj.mapOrgImgWidth) {
						obj.zoomView = false;
						obj.mapImgfirstWidth = obj.mapOrgImgWidth;
						obj.mapImgfirstHeight = obj.mapOrgImgHeight;
						
						$("#mapImageLayout").css({width:obj.mapOrgImgWidth+'px','max-height':mapAreaHeight+'px',height:mapAreaHeight+'px'});
						
						obj.mapScale = 1;
					} else {
						obj.mapImgfirstWidth = initWidth;
						obj.mapImgfirstHeight = orgImgHeight;
						$("#mapImageLayout").css({width:initWidth+'px','max-height':mapAreaHeight+'px',height:mapAreaHeight+'px'});
						obj.mapScale = obj.zoomLevel;
					}
					
					
					
						
						
					/*
					var itemHeight = $('#navigation-bar').height();
		 			var height = $('.zoom-box .zoom-navigation').height() - (2*itemHeight);
					if(obj.zoomCnt>2) {
						var divideHeight = height/(parseInt(obj.zoomCnt)-1);
					}
			
					if(obj.mapScale==1) {
						var bottom = 0;
					} else if(obj.mapScale==parseInt(obj.zoomCnt)) {
						var bottom = $('.zoom-box .zoom-navigation').height() - itemHeight -4; 
					} else {
						var bottom = ((obj.mapScale-1) * divideHeight) + (itemHeight/2);	
					}
					
					$('#navigation-bar').css('bottom',bottom);
		 			*/
					obj.mapOffsetTop = 0;
					obj.mapOffsetLeft = 0;
					$("#mapImageLayout").scrollTop(0);
					$("#mapImageLayout").scrollLeft(0);
					
					obj.updateZoomCnt(obj.mapScale);	

					
					
			});
	 },

  },
  mounted: function() {
	    this.mapAreaWidth = 1105;
		
		
		$('.page-layout').height($(window).height());
		var infoHeight = $(window).height() -150;
		$('.map-info-layout').css('height',infoHeight+'px');
		$('.map-area').width(this.mapAreaWidth);
		this.drawMapImage();
			
  },
  updated() {
	  	var height = $(window).height()-237;
		$('.map-floor-box ul:first-child').css('height',height+'px');
		
		if(this.mapguidNo && !this.selectedActive) {
			setTimeout(this.getMapGuide,500);
			this.selectedActive = true;
		}
		
		//$('#mark-container .mark-box .name-text').css('font-size',this.textLevel+'pt');
		$('.screen-box').css('height',$(window).height()+'px');
		if(this.transPopShow) {
			$('.trans-list ul li').css('width',(100/this.transPopList.length)+'%');
		}
		var width = $(window).width();
		//$('.bottom-area').css({'width':width,'bottom':0});		

		
		if(this.facityChangeActive && this.facityViewNo) {			
			var no = this.facityViewNo;
			for(var idxcode in this.areaData[this.acode][this.fcode]) {
				var data = this.areaData[this.acode][this.fcode][idxcode];
				if(data.dtype=='item') {
					if(data.data.no == no) {
						$('.'+no+'itembox .defImage').hide();
						$('.'+no+'itembox .actImage').show();
						
						this.setKcounter(no,'facity');
						break;
					}
				}
			}
			this.facityChangeActive = false;
		}
  }

}
</script>

<style lang="scss" scoped>
.overlaout-box {
	.content-container {
		-ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;
		margin-left:120px;
		position:relative;
		padding:0;
		.map-title-box {
			position:absolute;
			top:20px;
			left:25px;
			z-index:100000;
			.floor-title {
				font-size:25pt;
				font-weight:bold;
				color:#000;
				margin-bottom:10px;
			}
			.floor-title-info {
				font-size:11pt;
				color:#999;

			}
		}
		.bottom-area {
			padding:20px 0 0 0;
			color:#000;
			font-size:10pt;
		}
		.refresh-area {
			position:absolute;
			z-index:1000000;
			top:40px;
			right:168px;
			.refresh-box {
				position:relative;
				clear:both;
				ul {
					li {
						width:50px;
						min-height:40px;
						text-align:center;
						cursor:pointer;
						padding-top:4px;
						img {
							width:100%;
						}
						
						
					}
				}
			}
		}
		.zoom-area {
			position:absolute;
			z-index:100000;
			top:20px;
			right:110px;
			.zoom-box {
				
				ul {
					padding-top:30px;
					li {
						width:48px;
						min-height:40px;
						text-align:center;
						line-height:40px;
						border:solid 1px #ccc;
						background:#fff;
						i {
							color:#000;
							font-size:15pt;
						}
						
						
					}
					li:first-child {
						border-radius:5px 5px 0 0;
						cursor:pointer;
						padding-top:5px;
						height:30px;
					}
					li:last-child {
						border-radius:0 0 5px 5px;
						cursor:pointer;
						padding-top:5px;
						height:30px;
					}
				}
			}
			
			.move-box {
				width:105px;
				height:105px;
				position:relative;
				right:30px;
				ul {
					display:flex;
					clear:both;
					li {
						width:30px;
						height:30px;
						cursor:pointer;
						line-height:30px;
						text-align:center;
						color:#000;
						i {
							font-size:22pt;	
						}
					}
				}
				ul:first-child {
					li {
						i {
							margin:0;
						}
					}
					li.top-zoom {
						width:48px;
						border:solid 1px #ccc;
						border-bottom:none;
						background:#F8F8F8;
						border-radius:5px 5px 0 0;
					}
				}
				ul.middle-box {
					li {
						height:48px;
						background:#F8F8F8;
						i {
							margin:10px 0 0 0;
						}
						i.fa-circle {
							margin:5px 0 0 0;
							color:#F8F8F8;
						
						}
					}
					li.middle-zoom {
						cursor:default;
						width:48px;
					}
					li:first-child {
						border:solid 1px #ccc;
						border-right:none;
						border-radius:5px 0 0 5px;
					}
					li:last-child {
						border:solid 1px #ccc;
						border-left:none;
						border-radius:0 5px 5px 0;
					}
					
				}
				ul:last-child {
					li {
						i {
							margin:0;
						}
					}
					
					li.down-zoom {
						width:48px;
						border:solid 1px #ccc;
						border-top:none;
						border-radius:0 0 5px 5px;
						background:#F8F8F8;
					}
				}

			}
		}
	}
}	
.screen-box {
	z-index:10000000000;
	position:fixed;
	.trans-box {
		width:800px;
		height:500px;

		background:#ffff;
		margin:200px auto 0  auto;
		.trans-header {

		}
		.trans-title {
			padding-top:90px;
			font-weight:bold;
			text-align:center;
			font-size:25pt;
		}
		.trans-list {
			padding:40px;
			ul {
				width:100%;
				display:flex;
				li {
					margin:30px 0 0 0;
					text-align:center;
					img {
						max-width:50%;

					}
					.sub-title {
						padding-top:30px;
						font-size:17pt;
					}
				}
			}
		}
	}
	.trans-view-box {
		width:800px;
		height:500px;
		background:#ffff;
		margin:200px auto 0  auto;
		text-align:center;
		.trans-title {
			padding-top:100px;
			font-weight:bold;
			text-align:center;
			font-size:25pt;	
		}
		img {
			margin-top:80px;
			width:200px;
		}
	}
	.facitybox {
		.trans-header {
			width:100%;
			text-align:right;
			padding:10px 15px 0 0;
			i {
				font-size:30pt;
			}
		}
		.img-box {
			margin:30px 0 0 0;
			text-align:center;
			img {
				width:120px;
				height:120px;
				border-radius:60px;
				margin-top:0;
			
			}
		}
		.trans-title {
			padding-top:20px;
			font-size:17pt;	
		}
		.floor-content {
			width:681px;
			margin:30px auto;
			text-align:center;
			.facity-floor-list {
				display:flex;
				height:130px;
				li {
					width:20%;
					height:60px;
					text-align:center;
					line-height:60px;
					border:solid 1px #ccc;
					border-left:none;
					background:#dfdfdf;
					font-size:14pt;
					color:#111;
				}
				li:first-child {
					border-left:solid 1px #ccc;
				}
				li.active {
					background:#fff;
					color:#111;
				}
				li.selected {
					background:#576CEC;
					color:#fff;
				}
			}
			.md-button {
				width:200px;
				height:50px;
				margin:20px auto;
				font-size:14pt;
			}
		}
	}
}
		
.map-header-box {
	position:relative;
	width:100%;
	padding:20px 18px 0 30px;
	height:75px;
	border-bottom:solid 1px #dfdfdf;
	.title {
		position:absolute;
		top:28px;
		font-size:27pt;
		font-weight:bold;
		color:#000;
		
	}
	.map-category-box {
		position:relative;
		top:-5px;
		ul {
			width:auto;
			li {
				float:right;
				padding:0 35px;
				height:45px;
				text-align:center;
				font-size:14pt;
				cursor:pointer;
				line-height:45px;
				background:#999999;
				color:#fff;
				
			}
			li.active {
				background:#3D8BFF;
			}

		}
	}
}
.map-floor-box {
	position:absolute;
	margin:0;
	ul {
		padding:0;
		margin:0;
		width:120px;
		background:#333333;
		li {
			padding:0 25px;
			height:44px;
			text-align:center;
			font-size:15pt;
			cursor:pointer;
			line-height:44px;
			color:#fff;
			
		}
		li.active {
			background:#3D8BFF;
		}

	}
	.list:last-child {
		margin-top:2px;
		li {
			padding:10px 0;
			height:60px;
			text-align:center;
			font-size:13pt;
			cursor:pointer;
			line-height:110%;
			background:#333333;
			color:#fff;
		}
		
	}
	
}
.facilities {
	width:100%;
	padding:10px 0;
	position:fixed;
	height:100px;
	bottom:0;
	z-index:100;
	background:#F4F4F4;
	border-top:solid 1px #dfdfdf;
	ul {
		width:100%;
		display:flex;
		align-content:center;
		li {
			margin:5px 5px;
			width:300px;
			flex-wrap:wrap;
			align-content:center;
			align-items: center;
			justify-content: center;
			text-align:center;
			cursor:pointer;
				
			img {
				width:50px;
				border-radius:25px;
				height:50px;
			}
			.subtitle-box {
				padding-top:3px;
				text-align:center;
				font-size:10pt;
				color:#000;
			}
		}
		li.active {
			background:#3D8BFF;
		}

	}
	
}
 
	
#mapImageLayout {
	-ms-overflow-style: none; 
	position:relative;
	overflow:hidden;
	#orgImg {
		position:absolute;
	
	}
	#mark-container {
		height:0;
		.mark-box {
			position:absolute;
			z-index:1;
			width:25px;
			text-align:center;
			padding-top:2px;
			height:20px;
			border-radius:3px;
			background:none;
			.movebar {
				height:10px;
			}
			span {
				position:absolute;
				top:25px;
				left:20px;
				display:inline-block;
				min-width:20px;
				min-height:40px;
				height:auto;
				padding:0;
				cursor:pointer;
				border:none;
				background:none;
				color:#000;
				i.fas {
					display:none;
					position:relative;
					top:-50px;
				}
				.name-text {
					text-align:center;
					cursor:default;
					font-size:7pt;
					line-height:120%;
					
					.defImage {
						width:60px;
					}
					.actImage {
						width:60px;
						display:none;
					}
				}
				
			}
		}
		
	
	}
	#rect-container {
		height:0;
		.rect-box {
			position:absolute;
			z-index:100;
			border:none;
			cursor:pointer;
			
		}	
	}
	#circle-container {
		height:0;
		.circle-box {
			position:absolute;
			z-index:100;
			background:none;
			border:none;
			border-radius:50%;
			cursor:pointer;
			
		}
	}
}

#mapImageLayout::-webkit-scrollbar {
	display:none;
}

.map-area {
	margin:0;
	position:relative;
	overflow:hidden;
	z-index:1000;
	
	
}

.map-info-layout {
	width:94%;
	min-height:640px;
	display:none;
	margin:20px auto 0 auto;
	overflow-y:auto;
	border:none;
	.floor-info {
		li {
			width:100%;
			background:#EEEEEE;
			height:60px;
			line-height:60px;
			margin-bottom:2px;
			position:relative;
			cursor:pointer;
			.position {
				display:inline-block;
				width:34px;
				height:34px;
				padding:0;
				margin:0;
				border-radius:17px;
				background:#333333;
				text-align:center;
				position:absolute;
				right:12px;
				top:12px;
				line-height:44px;
				i {
					font-size:16pt;
					color:#fff;
				}
			}
			.sub-name {
				display:inline-block;
				width:50px;
				text-align:center;
				font-size:18pt;
				font-weight:bold;
				padding-left:15px;
				
			}
			.sub-title {
				display:inline-block;
				text-align:left;
				font-size:14pt;
				color:#888;
				padding-left:15px;

			}
					
		}
		li.active {
			background:#333333;
			color:#fff;
			.position {
				background:#fff;
				i {
					color:#333333;
				}
			}
			.sub-title {
				color:#fff;
			}
		}
	}

}

</style>