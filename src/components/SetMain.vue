<template>
	<div class="page-layout">
		<img :src="mainBg" class="bg-img" />
		<div class="md-content">
			<div class="logo-box">
				<img :src="logo"/>
			</div>
			<div class="intro-box">
				<md-button class="md-raised md-primary" @click="goPosition()"  type="button">위치변경</md-button>
				<md-button class="md-raised md-primary" @click="goMain()"  type="button">메인화면</md-button>
				
			</div>
		</div>
		
	</div>	
</template>

<script>
export default {
  name: 'Intro',
  data() {

	  return {
		mainBg:'',
		logo:'',
  	  }
  },
  created() {
		var params = {};
	    var obj = this;
		this.$form.sendPost(params,'map/setKioskIntro',function(response) {
			 //console.log(resp);
			 obj.logo = response.logo;
			 obj.mainBg = response.bg;
			 var areaList = [];
			 for(var k in response.areaList) {
				var newData = response.areaList[k];
				newData.names = {kor:newData.kor_name,eng:newData.eng_name,jan:newData.jan_name,cha:newData.cha_name};	
				areaList.push(newData);
			 }
			 var saveTrans = {};
			 for(var i in response.trans) {
				    var data = response.trans[i];
					var img = '';
					switch(data.suse) {
						case 'flr':
							img = obj.$VARS.baseUrl+'common/img/flr.png';
						break;
						case 'esc':
							img = obj.$VARS.baseUrl+'common/img/esc.png';
						break;
						case 'ele':
							img = obj.$VARS.baseUrl+'common/img/ele.png';
						break;
					}
					var name = {kor:data.kor_name,eng:data.eng_name,cha:data.cha_name,jan:data.jan_name};
					var newData = {img:img,name:name,no:data.no,ttype:data.suse};
					saveTrans[data.no] = newData;
			   }
			   var facilities = [];
			   for(var j in response.facilities) {
					var newData = response.facilities[j];
					newData.names = {kor:newData.kor_name,eng:newData.eng_name,cha:newData.cha_name,jan:newData.jan_name};
					newData.activeImage = obj.$VARS.baseUrl+newData.infos.activeImage.replace('/common','common');
					newData.defaultImage = obj.$VARS.baseUrl+newData.infos.defaultImage.replace('/common','common');
					facilities.push(newData);
				
			   }
			   var areaData = {};
			   var etcData =  {};
			   var guideData = {};
			   var floorListAll= response.floorListAll;
			   var saveDatas = response.saveDatas;
			   if(saveDatas.areaData != 'fail') {
					areaData = saveDatas.areaData;
					etcData =  saveDatas.etcData;  
					guideData = saveDatas.guideData;
					
			   }
			
			   var result = {};
			   result.areaData = areaData;
			   result.etcData =  etcData;
			   result.guideData = guideData;
			   result.floorListAll= floorListAll;
			   result.areaList = areaList;
			   result.facilities = facilities;
			   result.saveTrans = saveTrans;
			   obj.$store.commit('insertJsonData',result);

			   obj.setUserStart(areaData);		   
			

		});

  },
  methods: {
	  goPosition() {
		  var mainUid = localStorage.getItem('mainUid');
		  if(mainUid) {
			 this.$router.push({ path:'/intro'})
		  } else {	
			 this.$router.push({ path:'/member/login'})
		  }
	  },
	  goMain() {
		  if(localStorage.getItem('userStart')) {
			  this.$router.push({ path:'/'})
			  var data = 'AC:MAIN|LC:KO';
			  Unity.call(data);

		  } else {
			var params = {};
			params.content = '시작 위치를 선택하세요';	
			this.$eventBus.$emit('dialogOpen',params);
			return;
		  }
	  },
	  setUserStart(areaDataList) {
			var ano = localStorage.getItem('mainThemeNo');
		    var fno = localStorage.getItem('floor');
			var positionNo = localStorage.getItem('positionNo');
			var acode = String(ano)+'a';
			var fcode = String(fno)+'f';
			
			localStorage.setItem('userStart','');
			if(areaDataList[acode]) {
				if(areaDataList[acode][fcode]) {
					var isAreaData = areaDataList[acode][fcode];
					for(var idxcode in isAreaData) {
						var idxData = isAreaData[idxcode];
						if(idxData.dtype=='start') {
							//console.log(idxData);
							if(idxData.mark.no==positionNo) {
								localStorage.setItem('userStart',idxcode);
								break;
							}
						}
					}
				}
			}
		}
	  
  },
  mounted: function() {
	$('.page-layout').css('height',$(window).height());

	
	
  },
  updated: function() {
	
  }
}
</script>

<style lang="scss" scoped>
.page-layout {
	width:100%;
	max-height:100%;
	padding:0;
	margin:0;
	overflow-y:hidden;
	position:relative;
}
.bg-img {
	width:100%;
	min-height:100%;
	height:auto;
	position:absolute;
	top:0;
	left:0;
}
.md-content {
	position:relative;
	width:1000px;
	margin:200px auto 0 auto;
	min-height:550px;
	z-index:1000;
	text-align:center;
	.logo {
		width:280px;
		margin:10px auto 50px auto;
		height:100px;
		text-align:center;
		img {
			width:280px;
		}
	}
	.intro-box {
		width:100%;
		margin-top:100px;
		.md-button {
			margin:0 0 0 50px;
			border-radius:15px;
			height:150px;
			font-size:20pt;
			line-height:100%;
			width:250px;
			font-weight:bold;
			border:solid 5px #fff;

		}
		.md-button:first-child {
			margin-left:0;
		}
	
	}
}  	


</style>