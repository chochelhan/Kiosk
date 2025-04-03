
<template>
	<div class="detail-container">
		<div class="header-box">
			<div class="title">{{maineventInfoTitle}}</div>
			<div class="closebutton" @click="hideDetail()"><img src="../../assets/img/btn_close.png" /></div>
		</div>
		<div class="content-layout">
			<div class="content-box">
				<div class="subject">{{subject}}</div>			
				<div class="info">{{period}}</div>			
				<div class="info">{{area}}</div>			
				
			</div>
			<div class="img-box">
				<div class="content" v-html="content"></div>			
				<ul class="big-img">
					<li v-for="img in imgs"><img :src="img"/></li>
				</ul>
				<div style="clear:both;"></div>
			</div>
			<div style="clear:both;"></div>
		</div>
		
		
	</div>	
</template>

<script>


export default {
  name: 'eventInfo',
  data () {
	
	return {
		maineventInfoTitle:'',
		subject:'',
		content:'',
		imgs:[],
		period:'',
		area:'',

   }
  },
  props:["no","lang"],
  created: function() {
	var lang = this.lang;
	if(!lang)lang = 'kor';
	var langList = this.$store.getters.getLangList;
	this.maineventInfoTitle = langList.maineventInfoTitle[lang];
	this.getData();
  },
  methods: {
	  getData() {
		   var obj = this;
		   var params = {no:this.no}
		   this.$form.getServerData(params,'mainevent/getMaineventInfo',function(resp) {
			  // console.log(resp);
			   obj.imgs = resp.imgs;
			   obj.subject = resp.subject;
			   obj.period = resp.period;
			   obj.area = resp.area;
			   obj.content = resp.content;

		   });
	  },
	  hideDetail() {
			this.$emit('hideBoxEvent');
		 
	  },
	 
  },
  mounted: function() {
	  var height = ($(window).height() - 700)/2;
	  $('.detail-container').css('margin-top',height);	
  },

}
</script>

<style lang="scss" scoped>
.detail-container {
	width:1200px;
	height:720px;
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
		height:400px;
		.content-box {
			padding:40px 10px 0 30px;
			width:38%;
			float:left;
			.subject {
				color:#000;
				font-size:24pt;
				font-weight:bold;
				padding-bottom:30px;
				line-height:110%;
			}
			.info {
				font-size:18pt;
				color:#999;
				padding-bottom:10px;
				line-height:110%;
			}
			
		}
		.img-box {
			width:62%;
			float:right;
			border-left:solid 2px #DCDCDC;
			background:#F4F8FD;
			padding:40px;
			overflow-y:auto;
			height:650px;
			.content {
				color:#777;
				line-height:150%;
				font-size:18pt;
				

			}
			.big-img {
				li {
					width:100%;
					margin:30px 0 0 0;
					img {
						width:100%;
						height:auto;
					}
				}
			}

		}
	}
}
						
</style>