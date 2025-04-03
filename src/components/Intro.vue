<template>
	<div class="page-layout">
		<img :src="mainBg" class="bg-img" />
		<div class="md-content">
			<!--div class="logo">
				<img :src="logo"/>
			</div-->
			<div class="intro-box" v-if="themeView">
				<div class="title">위치 선택</div>
				<ul>
					<li v-for="data,index in dataList" :class="data.gclass" @click="setTheme(data)">{{data.name}}</li>
				</ul>
				<div style='clear:both;'></div>
				<p style='padding-top:40px;text-align:center;'>
					<md-button class="md-raised md-primary" @click="goFloor()"  type="button">다음</md-button>
				</p>
			</div>
			<div class="intro-box" v-if="floorView">
				<div class="title">층 수 선택</div>
				<div class="floor-box">
					<div class="input-box">
						<select v-model="floorCode">
							<option value="">층 수 선택</option>
							<option v-for="floor in floorList" :value="floor.no">{{floor.name}}</option>
						</select>
					</div>
					<div class="keyboard-box">

					</div>
				</div>
				<p style='padding-top:40px;text-align:center;'>
					<md-button class="md-raised md-primary" style='background:#999999;margin-right:40px;' @click="goPrev('t')"  type="button">이전</md-button>
					<md-button class="md-raised md-primary" @click="goPosition()"  type="button">다음</md-button>
				</p>
			</div>
			<div class="intro-box" v-if="positionView">
				<div class="title">상세 위치 선택</div>
				<ul>
					<li v-for="info,index in positionList" :class="info.gclass" @click="setPosition(info)">{{info.name}}</li>
				</ul>
				<div style='clear:both;'></div>
				<div style='clear:both;'></div>
				<p style='padding-top:40px;text-align:center;'>
					<md-button class="md-raised md-primary" style='background:#999999;margin-right:40px;' @click="goPrev('f')"  type="button">이전</md-button> <md-button class="md-raised md-primary" @click="goPage()"  type="button">완료</md-button>
				</p>
			</div>
		</div>
		
	</div>	
</template>

<script>
export default {
  name: 'Intro',
  data() {

	  return {
        dataList:[],
		themeView:true,
		floorView:false,
		positionView:false,
		floorList:[],
		floorListAll:[],
		floorCode:'',
		positionList:[],
		mainBg:'',
		logo:'',
  	  }
  },
  created() {
		var params = {};
	    var obj = this;
		var no = localStorage.getItem('mainThemeNo');
		//localStorage.setItem('positionNo','');
		//localStorage.setItem('positionName','');
		//localStorage.setItem('location','');

		this.$form.sendPost(params,'map/getKioskIntro',function(resp) {
			//console.log(resp);
			//obj.logo = resp.logo;
			obj.mainBg = resp.bg;
			$(resp.areaList).each(function(k,dt) {
				if(no == dt.no) {
					dt.gclass = 'active';
					obj.dataList.push(dt);
				} else {
					dt.gclass = '';
					obj.dataList.push(dt);
				}
			});
			obj.floorListAll = resp.floorListAll;
			console.log(obj.floorListAll);

		});

  },
  methods: {
	  goFloor() {
		var no = localStorage.getItem('mainThemeNo');
		var name = localStorage.getItem('mainThemeName');
		var fno = localStorage.getItem('floor');
	  	
		if(!no) {
			var params = {};
			params.content = '위치를 선택하세요';	
			this.$eventBus.$emit('dialogOpen',params);
			return;
		} 
		this.themeView = false;
		this.floorView = true;
		this.floorCode = '';
		this.floorList = [];
		for(var i in this.floorListAll) {
			var item = this.floorListAll[i];
			if(item.pno == no) {
				if(fno==item.no) {
					this.floorCode = fno;				
				} 
				this.floorList.push(item);
			}
		}
		
		
	  },
	  goPosition() {
		if(!this.floorCode) {
			var params = {};
			params.content = '층수를 선택하세요';	
			this.$eventBus.$emit('dialogOpen',params);
			return;
		}
		for(var i in this.floorList) {
			var item = this.floorList[i];
			if(this.floorCode == item.no) {
				localStorage.setItem('floorName',item.name);
				break;
			}
		}
		localStorage.setItem('floor',this.floorCode);
	  	this.floorView = false;
		this.positionView = true;
		var no = localStorage.getItem('mainThemeNo');
		var sendparams = {ano:no,fno:this.floorCode};
		var obj = this;
		var positionNo = localStorage.getItem('positionNo');
		
		this.$form.sendPost(sendparams,'map/getPosition',function(resp) {
			obj.positionList = [];
			$(resp).each(function(k,dt) {

				if(positionNo == dt.no) {
					dt.gclass = 'active';
					obj.positionList.push(dt);
				} else {
					dt.gclass = '';
					obj.positionList.push(dt);
				}
			});
			
		});
	  },
	  goPrev(cmd) {
		switch(cmd) {
			case 't':
				this.themeView = true;
				this.floorView = false;
			break;
			case 'f':
				this.floorView = true;
				this.positionView = false;
			break;
			
		}

	  },
	  goPage() {
		  if(!localStorage.getItem('positionNo')) {
			var params = {};
			params.content = '상세위치를 선택하세요';	
			this.$eventBus.$emit('dialogOpen',params);
			return;
		  }
		  //localStorage.setItem('location','yes');
		
		  var name = localStorage.getItem('mainThemeName');
		  var posiname = localStorage.getItem('positionName');
		  var floorName = localStorage.getItem('floorName');
		  this.$router.push({ path:'/setMain'})
		  /*
		  var resultName = name+' '+floorName+'F '+posiname;

		  
		  var params = {};
		  params.content = '입력한 위치를 저장하시겠습니까?<br>다음 로그인 시 설정된 위치로<br>자동 입력됩니다.<div style="color:#337FEC;">'+resultName+'<div>';
		  params.doAction = function() {
			
			 this.$router.push({ path:'/'})
		  }
		  params.confirm = true;
		  params.cancleButton = '저장안함';
		  params.cancleAction = function() {
			
			localStorage.setItem('mainThemeNo','');
			localStorage.setItem('positionNo','');
			localStorage.setItem('positionName','');
			localStorage.setItem('mainThemeName','');
			
			this.$router.push({ path:'/'})
		  }
		  params.cancleView  = true;
		  this.$eventBus.$emit('dialogOpen',params);
		*/
	  },
	  
	  
	  setTheme(data) {
		var obj = this;
		var dataList = this.dataList;
		this.dataList = [];
		$(dataList).each(function(k,dt) {
			if(data.no == dt.no) {
				dt.gclass = 'active';
				obj.dataList.push(dt);
			} else {
				dt.gclass = '';
				obj.dataList.push(dt);
			}
		});
		localStorage.setItem('mainThemeNo',data.no);
		localStorage.setItem('mainThemeName',data.name);
		//localStorage.setItem('mainThemeFloor',data.categorycode);
	
	  },
	  setPosition(info) {
		var obj = this;
		var dataList = this.positionList;
		this.positionList = [];
		$(dataList).each(function(k,dt) {
			if(info.no == dt.no) {
				dt.gclass = 'active';
				obj.positionList.push(dt);
			} else {
				dt.gclass = '';
				obj.positionList.push(dt);
			}
		});
		localStorage.setItem('positionNo',info.no);
		localStorage.setItem('positionName',info.name);
	
	  },
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
.header {
	position:relative;
	top:0;
	left:0;
	z-index:5;
	width:100%;
	height:74px;
	background:#fff;
	padding:18px 20px 0 20px;
	.logo {
		float:left;
		img {
			width:280px;
		}
	}
	.company {
		padding-top:5px;
		float:right;
		img {
			width:420px;
		}
	}

}
.md-content {
	.intro-box {
		width:1000px;
		min-height:550px;
		background:#F4F8FD;
		margin:50px auto 0 auto;
		z-index:10;
		position:relative;
		padding:40px 0 40px 0;
		.title {
			text-align:center;
			font-size:23pt;
			font-weight:bold;
			color:#000;
			margin-bottom:25px;
		}
		ul {
			margin-left:75px;
			li {
				box-shadow: 7px 7px 7px -6px rgba(0,0,0,0.47);
				margin:25px 50px 0 0;
				float:left;
				width:250px;
				height:120px;
				border-radius:15px;
				background:#fff;
				text-align:center;
				line-height:110%;
				font-size:19pt;
				color:#000;
				padding:40px 10px 0 10px;
			}
			li.active {
				background:#66AAFF;
				color:#fff;
			}

		}
		.md-button {
			margin:auto;
			border-radius:35px;
			height:70px;
			font-size:20pt;
			line-height:100%;
			width:330px;
			font-weight:bold;
		}
		.floor-box {
			margin:auto;
			width:720px;
			.input-box {
				padding:80px 0 140px;
				select {
					width:100%;
					height:70px;
					background:#fff;
					border-radius:7px;
					border:solid 1px #D6D6D6;
					line-height:70px;
					padding:0 15px;
					font-size:18pt;
					color:#999;
				}
			}
		}
	}
}  	


</style>