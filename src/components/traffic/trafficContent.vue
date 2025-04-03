
<template>
	<div class="content-container">
		<div class="padding-area">
			<div class="title">{{title}}</div>
			<div style="clear:both"></div>
			
		</div>

		<div class="data-area">
			<div class="img-box">
				<img :src="img">
			</div>
			<div class="info-box">
				<div class="info-item">
					<div class="info-title">{{subwayTitle[lang]}}</div>
					<div class="info-text">
						{{subway[lang]}}
					</div>	
				</div>

				<div class="info-item">
					<div class="info-title">{{busstTitle[lang]}}</div>
					<div class="info-text">
						{{busst[lang]}}
					</div>	
				</div>

				<div class="info-subitem">
					<div class="info-title">{{bus1Title[lang]}}</div>
					<div class="info-text">
						{{bus1[lang]}}
					</div>	
				</div>

				<div class="info-subitem">
					<div class="info-title">{{bus2Title[lang]}}</div>
					<div class="info-text">
						{{bus2[lang]}}
					</div>	
				</div>
				<div class="info-subitem">
					<div class="info-title">{{bus3Title[lang]}}</div>
					<div class="info-text">
						{{bus3[lang]}}
					</div>	
				</div>
				<div class="info-subitem">
					<div class="info-title">{{bus4Title[lang]}}</div>
					<div class="info-text">
						{{bus4[lang]}}
					</div>	
				</div>

			</div>
		</div>
		<div class="bottom-layout">
			<div class="bottom-area">
				{{bottomText[lang]}}
			</div>
		</div>
	</div>	
</template>

<script>


export default {
  name: 'trafficContent',
  data () {
	
	return {
		img:'',
		subway:{},
		busst:{},
		bus1:{},
		bus2:{},
		bus3:{},
		bus4:{},
		subwayTitle:{},
		busstTitle:{},
		bus1Title:{},
		bus2Title:{},
		bus3Title:{},
		bus4Title:{},
		bottomText:{},

   }
  },
  props:["title","lang"],
  watch: {
	  lang() {
		this.introLanguage();		
	  },
	  
  },
  created: function() {
	    this.subwayTitle = {'kor':'지하철','eng':'SUBWAY','cha':'','jan':''};
		this.busstTitle = {'kor':'버스정류장','eng':'SUBWAY','cha':'','jan':''};
		this.bus1Title = {'kor':'지선버스','eng':'SUBWAY','cha':'','jan':''};
		this.bus2Title = {'kor':'광역버스','eng':'SUBWAY','cha':'','jan':''};
		this.bus3Title = {'kor':'간선버스','eng':'SUBWAY','cha':'','jan':''};
		this.bus4Title = {'kor':'공항버스','eng':'SUBWAY','cha':'','jan':''};
		this.bottomText = {'kor':'방문해주셔서 감사합니다. 가까운 교통수단 정보를 안내해 드리겠습니다','eng':'SUBWAY','cha':'','jan':''};
		this.introLanguage();		
	
  },
  methods: {
	  introLanguage() {
			
		   var obj = this;
		   var params = {}
		   this.$form.sendPost(params,'setting/getTraffic',function(response) {
			  // console.log(response);
			   obj.img = response.logo;
			   obj.subway= response.subway;
			   obj.busst = response.busst;
			   obj.bus1= response.bus1;
			   obj.bus2= response.bus2;
			   obj.bus3= response.bus3;
			   obj.bus4= response.bus4;

		   });	   
	  },
	  
  },
  mounted: function() {
		
		
  },
  updated() {
	  
  }	

}
</script>

<style lang="scss" scoped>
.padding-area {padding:30px}
.data-area {
	position:relative;
  .img-box {
		position:absolute;
		top:0;
		left:30px;
		width:550px;
		img {
			width:100%;
			height:auto;
		}
	}
	.info-box {
		margin:0 0 0 610px;
		.info-item {
			margin-bottom:40px;
			.info-title {
				font-weight:bold;
				font-size:15pt;
				color:#000;
			}
			.info-text {
				margin-top:20px;
				font-size:12pt;
				color:#888;
			}
		}
		.info-subitem {
			margin-bottom:30px;
			.info-title {
				font-weight:bold;
				font-size:12pt;
				color:#000;
			}
			.info-text {
				margin-top:13px;
				font-size:12pt;
				color:#888;
			}
		}
	}
}
.bottom-layout {
	width:100%;
	.bottom-area {
		width:100%;
		bottom:0;
		position:fixed;
		height:70px;
		text-align:center;
		font-size:19pt;
		color:#fff;
		line-height:70px;
		background:#1F1F1F;
	}
}	
</style>