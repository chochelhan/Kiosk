
<template>
	<div class="detail-container">
		<div class="header-box">
			<div class="title">{{title}}</div>
			<div class="closebutton" v-touch="hideDetail()"><img src="../../assets/img/btn_close.png" /></div>
		</div>
		<div class="content-layout">
			<div class="content-box">
			<img :src="mapImage">
			</div>
		</div>
		<div class="button-box">
			<md-button class="md-raised md-primary" style='background:#66AAFF' v-touch="getMapPosition()"  type="button">{{positionGuide}}</md-button>
		</div>
	</div>	
</template>

<script>


export default {
  name: 'mapTableInfo',
  data () {
	
	return {
		title:{},
		positionGuide:'',
		
   }
  },
  props:["mapImage","names","lang"],
  created: function() {

	  
	var lang = this.lang;
	if(!lang)lang = 'kor';
	var langList = this.$store.getters.getLangList;
	
	this.title = this.names[lang];
	this.positionGuide = langList.positionGuide[lang];
		
  },
  methods: {
	  hideDetail() {
		 var obj = this;
		 return function(direction,event) {
		
			obj.$emit('hideBoxEvent');
		 }
	  },
	  getMapPosition() {
		 var obj = this;
		 return function(direction,event) {
		
			obj.$emit('showMapPosition','direct');
		 }
	  },
	  
  },
  mounted: function() {
	   var height = ($(window).height() - 740)/2;
		$('.detail-container').css('margin-top',height);	
	
  },

}
</script>

<style lang="scss" scoped>
.detail-container {
	width:1100px;
	height:740px;
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
			cursor:pointer;
			right:22px;
			img {
				width:27px;
			}
		}
	}
	.content-layout {
		padding:30px;
		height:570px;
		.content-box {
			height:530px;
			overflow-y:auto;
		}
	}
	.button-box {
		bottom:0;
		text-align:center;
		width:96%;
		margin:auto;
		.md-button {
			height:64px;
			font-size:22pt;
			font-weight:bold;
			line-height:100%;
			border-radius:32px;
			width:70%;
		}

	}
}
					
</style>