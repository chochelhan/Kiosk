
<template>
	<div class="detail-container">
		<div class="header-box">
			<div class="title">{{companyInfoText}}</div>
			<div class="closebutton" v-touch="hideDetail()"><img src="../../assets/img/btn_close.png" /></div>
		</div>
		<div class="content-layout">
			<div class="content-box">
				<div class="subject">{{subject}}</div>			
				<div class="content" v-html="content"></div>			
			</div>
			<div class="img-box">
				<div class="big-img">
					<div class="video-box" v-if="videoView">
						<div id='youtube-video' style="width:100%;height:290px;"></div>
					</div>
					<img v-else :src="bigimg"/>
				</div>
				
					
				<ul class="img-list">
					<li v-for="img in imgs">
						<div v-if="img.code">
							<span  @click="openMovie(img.code)" ><i  class="fa fa-play"></i></span>
							<img :src="img.img" alt="">
						</div>
						<div v-else>	
							<img :src="img.img" alt="" v-touch="showBigImg(img.img)">
						</div>
					</li>
				</ul>
				<div style="clear:both;"></div>
			</div>
			<div style="clear:both;"></div>
		</div>
		<div class="button-box">
			<md-button class="md-raised md-primary" style='background:#66AAFF' v-touch="getMapPosition()"  type="button">{{positionGuide}}</md-button>
			<md-button class="md-raised md-primary" style='background:#337FEC;'  v-touch="getMobile()" type="button">{{showMobileAndQuestion}}</md-button>
		</div>
	</div>	
</template>

<script>


export default {
  name: 'companyInfo',
  data () {
	
	return {
		subject:'',
		content:'',
		imgs:[],
		bigimg:'',
		companyInfoText:'',
		positionGuide:'',
		category:'',
		showMobileAndQuestion:'',
		videoView:false,
		
   }
  },
  props:["no","lang"],
  created: function() {

	  
	var lang = this.lang;
	if(!lang)lang = 'kor';
	var langList = this.$store.getters.getLangList;
	this.companyInfoText = langList.companyInfoText[lang];
	this.positionGuide = langList.positionGuide[lang];
	this.showMobileAndQuestion = langList.showMobileAndQuestion[lang];
	this.getData();
  },
  methods: {
	  getData() {
		   var obj = this;
		   var params = {no:this.no}
		   this.$form.getServerData(params,'company/getCompanyInfo',function(resp) {
			   obj.subject = resp.subject;
			   obj.content = resp.contents;
			   obj.category = resp.category;
			   obj.imgs = [];
			   $(resp.imgs).each(function(k,img) {
				   var data = {};
				   if(resp.movies[k]) {
						data.code = resp.movies[k];
				   } else {
						data.code = false;	
				   }
				  
				   data.img = img;
				   obj.imgs.push(data)
			   });
			   obj.bigimg = obj.imgs[0].img;
		   });


	  },
	  hideDetail() {
		 var obj = this;
		 return function(direction, event) {
			obj.$emit('hideBoxEvent');
		 }
	  },
	  showBigImg(img) {
		 var obj = this;
		 return function(direction, event) {
			 obj.videoView = '';
			obj.bigimg = img;
		 }
		 
	  },
	  getMapPosition() {
		
		/*
		var code = '';
		switch(this.category) {
			case '1':
				code ='d';
			break;
			case '10':
				code ='e';
			break;
			case '4':
				code ='f';
			break;
			case '5':
				code ='g';
			break;
			case '6':
				code = 'h';
			break;
			case '7':
				code = 'i';
			break;
			case '11':
				code = 'j';
			break;
		}
		if(!code)return;
		*/
		
		 var obj = this;
		 return function(direction, event) {
			obj.$emit('showMapPosition',obj.no);
		 }
	  },
	  getMobile() {
		  var obj = this;
		  return function(direction, event) {
			obj.$emit('showMobile',obj.no);
		  }

	  },
	  openMovie(videoId) {
		  this.videoView = videoId;

		
	  },
	  getPlayer(videoId) {
	  	//var date = new Date();
		if(this.player) {
			this.player.destroy(); 
			this.player = null;
		}
		var obj = this;
		this.player = new YT.Player('youtube-video', {
			height: 290,
            width: '100%',
            videoId: videoId,
			playerVars:{
				showinfo:0,
				rel : 0, //0으로 해놓아야 재생 후 관련 영상이 안뜸
				autoplay:1,
				fs:0, // 전체화면
				controls:0, 
				playsinline:1,
				v_load_policy:3,
				modestbranding:1,
			},
            events: {
                'onReady': obj.onPlayerReady,
                'onStateChange': obj.onPlayerStateChange,
                'onError':obj.onPlayerError

            }
           
	  });

	  

	},	
	onPlayerError(event) {

		alert('Sorry for the inconvenience. This video is not available at the moment.');

	},
	onPlayerReady(event) {
		this.player.playVideo();
		//this.player.playVideo();
		//playerTotalTime = player.getDuration();
		//playerState = player.getPlayerState();
    },
	onPlayerStateChange(event) {
		
	},
  },
  mounted: function() {
	  var height = ($(window).height() - 600)/2;
		$('.detail-container').css('margin-top',height);	
  },
  updated() {
	 if(this.videoView) {
	  this.getPlayer(this.videoView);
	 }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
	width:1100px;
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
			cursor:pointer;
			right:22px;
			img {
				width:27px;
			}
		}
	}
	.content-layout {
		padding:40px 30px 30px 30px;
		height:400px;
		.content-box {
			width:47%;
			float:left;
			.subject {
				color:#000;
				font-size:24pt;
				font-weight:bold;
				line-height:107%;
				height:70px;
				
			}
			.content {
				padding-top:20px;
				color:#777;
				line-height:170%;
				overflow:auto;
				height:320px;

			}
		}
		.img-box {
			width:47%;
			float:right;
			.big-img {
				width:100%;
				height:290px;
				margin-bottom:20px;
				background:#000;
				overflow-y:hidden;
				border:solid 1px #dcdcdc;
				img {
					width:100%;
					height:auto;
				}
				.video-box {
					#youtube-video {
					}
				}
			}
			.img-list {
				li {
					float:left;
					width:20%;
					position:relative;
					height:80px;
					img {
						border:solid 1px #dcdcdc;
						width:90%;
						height:auto;
						max-height:80px;
					}
					span {
						position:absolute;
						top:11px;
						left:22%;
						color:#fff;
						border-radius:23px;
						width:46px;
						height:46px;
						text-align:center;
						line-height:40px;
						border:solid 5px #fff;
						display:inline-block;
						i {
							font-size:20pt;
							text-align:center;
							margin:5px 0 0 7px;
						}
					}
				}
			}

		}
	}
	.button-box {
		bottom:0;
		text-align:center;
		width:96%;
		margin:50px auto 0 auto;
		.md-button {
			height:64px;
			font-size:18pt;
			font-weight:bold;
			line-height:100%;
			border-radius:32px;
			width:48%;
		}
		.md-button:first-child {
			margin-right:20px;
			
		}

	}
}
					
</style>