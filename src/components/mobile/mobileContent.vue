
<template>
	<div class="content-container">
		<div class="mobile-area">
			<div class="title-box">		
				<div class="title">{{mobileTitle}}</div>
				<div class="desctiption" v-html="description"></div>
			</div>
			<div class="mobile-contents-box">
				<div class="qrcode-area">
					<img :src="qrimg">
				</div>
				<div class="input-area">
					<div class="input-box">
						<div :class="'text-box '+holderClass">{{placeholderText}}</div>
					</div>
					<div class="keyboard-area">
						<div class="keyboard-box">
							<ul>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('1')">1</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('2')">2</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('3')">3</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('4')">4</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('5')">5</md-button></li>
								<li class="back-button" v-touch="keyboardDel()">
									<img src="../../assets/img/btn_del.png"/>
								</li>
							</ul>
							<div style="clear:both;"></div>
							<ul>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('6')">6</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('7')">7</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('8')">8</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('9')">9</md-button></li>
								<li><md-button  class="md-dense md-primary" style="background:#FAFAFA;" v-touch="setKeyboard('0')">0</md-button></li>
								<li class="send-button"><md-button  class="md-raised md-primary" style="background:#337FEC;" v-touch="sendMobile()">{{sendButton}}</md-button></li>
							</ul>
							<div style="clear:both;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-layout">
			<div class="bottom-area">
				{{bottomText}}
			</div>
		</div>
	</div>	
</template>

<script>


export default {
  name: 'mobileContent',
  data () {
	
	return {
		mobileTitle:'',
		description:'',
		placeholderText:'',
		holderText:'',
		sendButton:'',
		bottomText:'',
		phone:'',
		holderClass:'',
		succSendPhone:'',
		qrimg:'',
   }
  },
  props:["lang","mobileHeight","compKeyNo"],
  watch: {
	  lang() {
		this.introLanguage();		
	  }
  },
  created: function() {
	 this.introLanguage();
	 this.placeholderText = this.holderText;


	 var obj = this;
	 var params = {}
	 this.$form.sendPost(params,'setting/getQrcodeImage',function(response) {
		obj.qrimg = response.img;
  
	 });
  },
  methods: {
	 introLanguage() {
		var lang = this.lang;
		if(!lang)lang = 'kor';
		var langList = this.$store.getters.getLangList;
		this.mobileTitle = langList.mobileTitle[lang];
		this.description = langList.description[lang];
		this.holderText = langList.holderText[lang];
		this.sendButton = langList.sendButton[lang];
		this.bottomText = langList.bottomText[lang];
		this.confirmPhone = langList.confirmPhone[lang];
		this.succSendPhone = langList.succSendPhone[lang];

		if(!this.phone) {
			this.holderClass = '';
			this.placeholderText = this.holderText;
		} else {
			this.placeholderText = this.phone;
		}
	  },
	  sendData() {
		   var obj = this;
		   var params = {phone:this.phone,pno:this.compKeyNo}

		   this.$form.sendPost(params,'setting/sendPhone',function(response) {
			   console.log(response);
			   if(response.result== 'succ') {
					var params = {};
					params.content = obj.succSendPhone;	
					obj.$eventBus.$emit('dialogOpen',params);	
					//obj.$emit('hideMobileEvent');
					obj.introLanguage();
					obj.placeholderText = obj.holderText;
					obj.phone = '';


			   } else {
					var params = {};
					params.content = 'fail';	
					obj.$eventBus.$emit('dialogOpen',params);
			   }
			   
		   });
	  },
	  setKeyboard(num) {
	        var obj = this;
			 return function(direction, event) {
				 obj.setKeyboardActive(num);
			}
	  },
	  setKeyboardActive(num) {
		  	this.holderClass = 'bold';
			this.phone = this.phone+num;
			this.placeholderText = this.phone;
	  },
	  keyboardDel() {
	        var obj = this;
			 return function(direction, event) {
				 obj.keyboardDelActive();
			}
	  },
	  keyboardDelActive() {
		   if(this.phone) {
				var number = this.phone.substring(0,this.phone.length - 1);
				this.phone = number;
				if(!this.phone) {
					this.holderClass = '';
					this.placeholderText = this.holderText;
				} else {
					this.placeholderText = this.phone;
				}
		   } 
	  },
	  sendMobile() {
	        var obj = this;
			 return function(direction, event) {
				 obj.sendMobileActive();
			}
	  },
	  sendMobileActive() {
			var flag = true;
			if(this.phone) {
				var checkNum = this.phone.substring(0,3);
				if(checkNum != '010' && checkNum != '011' && checkNum != '016' && checkNum != '017' && checkNum != '018' && checkNum != '019') {
					 flag = false;
				}

				if(this.phone.length<10 || this.phone.length>11) {
					 flag = false;
				}
			} else flag = false;

			if(flag) {
				this.sendData();
			} else {
				var params = {};
				params.content = this.confirmPhone;	
				this.$eventBus.$emit('dialogOpen',params);

			}

	  },
  },
  mounted: function() {
		
  },
  updated() {
		
		
  }	

}
</script>

<style lang="scss" scoped>
.mobile-area {
	padding:130px 0 0 0;
	width:1000px;
	margin:auto;
	.title-box {
		text-align:center;
		.title {
			padding:10px 0;
			font-weight:bold;
			color:#000;
			font-size:40pt;
		}
		.desctiption {
			padding:40px 0 0 0;
			color:#777;
			font-size:19pt;
			line-height:130%;
		}
	}
	.mobile-contents-box {
		position:relative;
		.qrcode-area {
			position:absolute;
			top:40px;
			left:0;
			width:302px;
			height:300px;
			border-right:solid 2px #000;
			img {
				width:300px;
			}
		 }	
		.input-area {
			margin-left:315px;
			padding-top:45px;
			.input-box {
				border:solid 1px #D9D9D9;
				width:90%;
				height:70px;
				border-radius:6px;
				.text-box {
					line-height:70px;
					font-size:17pt;
					color:#999;
					padding-left:20px;
				}
				.bold {
					color:#000;
					font-size:25pt;
				}
			}
			.keyboard-area {
				padding-top:40px;
				.keyboard-box {
					width:90%;
					background:#E0E0E0;
					padding:10px 20px 20px 20px;
					ul {
						margin:11px 0;
						display:flex;
						li {
							width:118px;
							margin-right:10px;
							height:60px;
							background:#FAFAFA;
							border-radius:10px;
							text-align:center;
							.md-button {
								width:100%;
								height:60px;
								margin:0;
								padding:0;
								border-radius:10px;
								font-size:27pt;
								color:#000;
								line-height:100%;
							}
						}
						li:last-child {
							margin-right:0;
						}
						li.back-button {
							background:#C4C4C4;
							img {
								width:100%;
								height:60px;
							}
						}
						li.send-button {
							.md-button {
								width:100%;
								height:60px;
								margin:0;
								padding:0;
								border-radius:10px;
								font-size:18pt;
								line-height:100%;
								color:#fff;
							}
						}
					}
				}	
			}
		}
	}
	
}
.bottom-layout {
	width:100%;
	.bottom-area {
		width:100%;
		position:fixed;
		bottom:0;
		height:70px;
		text-align:center;
		font-size:19pt;
		color:#fff;
		line-height:70px;
		background:#1F1F1F;
	}
}					
</style>