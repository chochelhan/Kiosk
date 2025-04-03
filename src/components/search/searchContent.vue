
<template>
	<div class="content-container">
		<div class="padding-area">
			<div class="title">{{title}}</div>
			<div class="input-area">
				<div class="input-box">
					<input type="text" class="text-box" v-model="searchString" :placeholder="placeholderText" />
				</div>
				<div class="search-button">
					<md-button  class="md-raised md-primary" style="background:#337FEC;" @click="search()">{{searchButton}}</md-button>
				</div>
			</div>
		</div>
		<div class="data-area" v-if="resultView">
			<div class="not-result" v-if="noResultView">{{noResultText}}</div>
			<div v-if="!noResultView">
				<div class="data-box">
					<div class="sub-title">{{mapTitle}}({{companyList.length}})</div>
					<ul class="company-ul">
						<li v-for="comp in companyList" v-touch="showMapDetail(comp.categoryNo,comp.no)">
							<div class="img">
								<img :src="comp.img" />
							</div>
							<div class="text-box">
								<div class="comp-name">
									{{comp.name}}
								</div>
								<div class="category-name">
									{{comp.category}}
								</div>
							</div>
						</li>
					</ul>
		
				</div>
				<div style="clear:both;"></div>
				<div class="data-box">
					<div class="sub-title">{{companyTitle}}({{companyList.length}})</div>
					<ul  class="company-ul">
						<li v-for="comp in companyList" v-touch="showDetail(comp.no)">
							<div class="img">
								<img :src="comp.img" />
							</div>
							<div class="text-box">
								<div class="comp-name">
									{{comp.name}}
								</div>
								<div class="category-name">
									{{comp.category}}
								</div>
							</div>
						
						</li>
					</ul>
		
				</div>
				<div style="clear:both;"></div>
				<div class="data-box">
					<div class="sub-title">{{eventTitle}}({{eventList.length}})</div>
					<ul class="eventUl">
						<li v-for="comp in eventList" v-touch="showEventDetail(comp.no)">
							<div class="img">
								<img :src="comp.img" />
							</div>
							<div class="comp-name">
								{{comp.name}}
							</div>
						
						</li>
					</ul>
		
				</div>
				<div style="clear:both;"></div>
				<div class="data-box">
					<div class="sub-title">{{mainEventTitle}}({{maineventList.length}})</div>
					<ul class="mainEvent">
						<li v-for="comp in maineventList" v-touch="showMaineventDetail(comp.no)">
							<div class="img">
								<img :src="comp.img" />
							</div>
							<div class="comp-name">
								{{comp.name}}
							</div>
						
						</li>
					</ul>
		
				</div>
				<div style="clear:both;"></div>
				
			</div>
		</div>
		
	</div>	
</template>

<script>


export default {
  name: 'searchContent',
  data () {
	
	return {
  	   companyList:[],
	   eventList:[],
	   maineventList:[],
	   searchString:'',
	   placeholderText:'',
	   searchButton:'',
	   searchPlacholder:'',
	   resultView:false,
	   noResultView:false,
	   noResultText:'',
   }
  },
  props:["title","lang","mainEventTitle","eventTitle","companyTitle","mapTitle"],
  watch: {
	  lang() {
		this.introLanguage();		
	  }
  },
  created: function() {
		//alert('ssgeg');
		this.introLanguage();
  },
  methods: {
	  introLanguage() {
		var lang = this.lang;
		if(!lang)lang = 'kor';
		
		var langList = this.$store.getters.getLangList;
		this.searchButton = langList.searchButton[lang];
		this.searchPlacholder = langList.searchPlacholder[lang];
		this.noResultText = langList.noResultText[lang];

		if(!this.searchString) {
			this.placeholderText = this.searchPlacholder;
		} else {
			this.doSearch();
		}
	  },
	  search() {
		  //var obj = this;
		  //return function(direction, event) {
			this.doSearch();
		  //}
		 
	  },
	  doSearch() {
		  if(!this.searchString) {
				var params = {};
				params.content = this.searchPlacholder;	
				this.$eventBus.$emit('dialogOpen',params);
				return;
		   }
		   var obj = this;
		   var params = {keyword:this.searchString}
		   obj.companyList = [];
		   obj.eventList = [];
		   obj.maineventList = [];

		   this.$form.sendPost(params,'search/getSearch',function(response) {
			   console.log(response);
			   obj.resultView = true;
			   if(response.companyList.length>0 || response.eventList.length>0 || response.maineventList.length>0) {
					
				   obj.noResultView = false;
				   obj.companyList = response.companyList;
			       obj.eventList = response.eventList;
				   obj.maineventList = response.maineventList;

			   } else {
				   obj.noResultView = true;
				   obj.companyList = [];
			       obj.eventList = [];
				   obj.maineventList = [];
				  
			   }
				//alert('geg');
				
				
		   });
	  },
	  showDetail(no) {
		  var obj = this;
		  return function(direction, event) {
			
			obj.$emit('showCompanyEvent',no);
		  }
	  },
	  showEventDetail(no) {
		   var obj = this;
		  return function(direction, event) {
			
			obj.$emit('showEventEvent',no);
		  }
	  },
	   showMaineventDetail(no) {
		  var obj = this;
		  return function(direction, event) {
			obj.$emit('showMaineventEvent',no);
		  }
	  },
	  showMapDetail(category,no) {
		var code = '';
		switch(category) {
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
		var obj = this;
		return function(direction, event) {
			
			obj.$emit('showMapEvent',code,no);
		}
	  },
  },
  mounted: function() {
	
  },
  updated() {
		var height = $(window).height() -180; 
		$('.data-area').css('height',height);
		
		
  }	

}
</script>

<style lang="scss" scoped>
.padding-area {padding:30px}
.input-area {
	padding-top:30px;
	position:relative;
	.input-box {
		border:solid 1px #D9D9D9;
		width:100%;
		height:70px;
		border-radius:7px;
		.text-box {
			border-radius:6px;
			border:none;
			line-height:100%;
			width:100%;
			height:100%;
			font-size:17pt;
			color:#999;
			background:#fff;
			padding-left:20px;
			margin-right:150px;
		
		}
		.text-box:focus {
			outline:none;
		}
		.bold {
			color:#000;
			font-size:25pt;
		}
	}
	.search-button {
		position:absolute;
		top:23px;
		right:0;
		width:170px;
		.md-button {
			width:100%;
			height:70px;
			font-size:20pt;
			line-height:100%;
			border-radius:0 7px 7px 0;

		}
	}

}
 .data-area {
 	padding:30px 15px 40px 30px;
	height:auto;
	width:100%;
	border-top:solid 2px #DCDCDC;	
	background:#F4F8FD;
	overflow-y:auto;
	.not-result {
		font-weight:bold;
		color:#000;
		font-size:20pt;
		text-align:center;
		padding:50px 0;
	}
	.data-box {
	    .sub-title {
			padding:50px 0 15px 0;
			color:#56A2FE;
			font-size:18pt;
		}
		ul {
			li {
				cursor:pointer;
				float:left;
				width:200px;
				height:200px;
				border:solid 2px #DCDCDC;	
				border-radius:10px;
				margin:0 15px 15px 0;
				background:#fff;
				.img {
					width:100%;
					height:130px;
					overflow-y:hidden;
					img {
						border-radius:10px 10px 0 0;
						width:100%;
						height:auto;
					}
				}
				.comp-name {
					padding:10px 10px 6px 10px;
					font-weight:bold;
					color:#000;
					font-size:15pt;
				}
				.category-name {
					padding:0 10px;
					color:#999;
					font-size:11pt;
				}
			}
		}
		ul.mainEvent {
			li {
				height:215px;
			}
		
		}
		ul.eventUl {
			li {
				.img {
					height:120px;
					img {
						height:100%;
					}
				}
				.comp-name {
					padding:20px 10px 6px 10px;
				}
			}
		}
		ul.company-ul {
			li {
				cursor:pointer;
				float:left;
				width:200px;
				height:235px;
				border:solid 2px #DCDCDC;	
				border-radius:10px;
				margin:0 15px 15px 0;
				.img {
					width:100%;
					height:130px;
					overflow-y:hidden;
					img {
						border-radius:10px 10px 0 0;
						width:100%;
						height:auto;
					}
				}
				.text-box {
					padding:10px;
					background:#fff;
					height:100px;
					width:100%;
					border-radius:0 0 10px 10px;
					.comp-name {
						padding:2px 0 0 0;
						font-weight:bold;
						color:#000;
						font-size:15pt;
						height:55px;
					}
					.category-name {
						padding:6px 0 0 0;
						color:#999;
						font-size:11pt;
					}
				}
			}
		}
	}
	.data-box:first-child {
		.sub-title {
			padding-top:0;
		}
	}

		
}
					
</style>