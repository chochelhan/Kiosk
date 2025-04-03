
<template>
	<div class="detail-container">
		<div class="header-box">
			<div class="title">{{eventInfoTitle}}</div>
			<div class="closebutton" v-touch="hideDetail()"><img src="../../assets/img/btn_close.png" /></div>
		</div>
		<div class="content-layout">
			<div class="info-title">{{infoTitle}}</div>
			<div class="info-text">
				<span>{{periodText[lang]}} : </span> {{infoPeriod}}
			</div>
			<div class="info-text">
				<span>{{victoryText[lang]}} : </span> 
				{{infoVictory}}
			</div>
			<div class="big-img">
				<img  v-for="img in infoImgs"  :src="img"/>
			</div>
		</div>
		
	</div>	
</template>

<script>


export default {
  name: 'eventInfo',
  data () {
	
	return {
		eventInfoTitle:'',
		infoTitle:'',
		infoPeriod:'',
		infoVictory:'',
		infoImgs:'',
		periodText:{},
        victoryText:{},
   }
  },
  props:["no","lang"],
  created: function() {
	    var lang = this.lang;
		if(!lang)lang = 'kor';
		var langList = this.$store.getters.getLangList;
		this.eventInfoTitle = langList.eventInfoTitle[lang];
		this.getServerData();	
		this.periodText = {'kor':'이벤트 기간','eng':'','cha':'','jan':''};
		this.victoryText = {'kor':'당첨자 발표','eng':'','cha':'','jan':''};
		
  },
  methods: {
	  hideDetail() {
		  var obj = this;
		  return function(direction, event) {
		
			obj.$emit('hideBoxEvent');
		  }
	  },
	  getServerData() {
		   var obj = this;
		   var params = {no:this.no}
		   this.$form.sendPost(params,'event/getEventInfo',function(response) {
			    obj.infoTitle = response.subject;
				obj.infoPeriod = response.period;
				obj.infoVictory = response.victory;
				obj.infoImgs  = response.imgs;
	 
				
		   });
	  }
  },
  mounted: function() {
	  var height = ($(window).height() - 600)/2;
	  $('.detail-container').css('margin-top',height);	
  },

}
</script>

<style lang="scss" scoped>
.detail-container {
	width:600px;
	height:620px;
	background:#fff;
	margin:auto;
	.header-box {
		background:#337FEC;
		height:70px;
		position:relative;
		.title {
			color:#fff;
			font-size:22pt;
			font-weight:bold;
			line-height:70px;
			text-align:center;
		}
		.closebutton {
			position:absolute;
			top:22px;
			right:22px;
			cursor:pointer;
			img {
				width:27px;
			}
		}
	}
	.content-layout {
		padding:30px;
		height:550px;
		overflow:auto;
		.info-title {
			font-size:15pt;
			font-weight:bold;
			margin-bottom:10px;
		}
		.info-text {
			margin-bottom:10px;
		}
		.big-img {
			
			width:100%;
			height:370px;
			overflow-y:hidden;
			img {
				width:100%;
				height:auto;
			}
		}
	}		
}
					
</style>