
<template>
	<div class="content-container" style="width:1245px;height:822px;overflow-y:hidden;">
		<div class="padding-area">
			<div class="title">{{title}}</div>
			<ul id="mainThemeList">
				<li v-for="info in themeList" :class="info.gclass" v-touch="getCategory(info.no)">{{info.name}}</li>
			</ul>
			<div style="clear:both"></div>
			<ul id="searchPrefix">
				<li v-for="info in searchPrefix"  :class="info.gclass" v-touch="getSubCategory(info.name)">{{info.name}}</li>
			</ul>
			<div style="clear:both"></div>
		</div>
		<div class="data-area">
			<div class="data-box">
				<ul>
					<li v-for="comp in companyList" @click="showDetail(comp.no)">
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
		</div>
		
	</div>	
</template>

<script>


export default {
  name: 'companyContent',
  data () {
	
	return {
  	   themeList:[],
	   selectedActive:null,
	   companyList:[],
	   searchPrefix:[],
	   themeCode:'all',
	   searchCode:'all',
   }
  },
  props:["title","lang"],
  watch: {
	  lang() {
		  this.searchCode = 'all';
		  $('#searchPrefix li').removeClass('active');
		  $('#searchPrefix li:first-child').addClass('active');
		 this.getData();
	  }
  },
  created: function() {
	this.getData();
  },
  methods: {
	  getCategory(code) {
			 var obj = this;
			 return function(direction, event) {
				 obj.themeCode = code;
				 var themeList = obj.themeList;
				 obj.themeList = [];
				 for(var key in themeList) {
					 var newItem = themeList[key];
					 if(newItem.no == code) {
						newItem.gclass = 'active';
					 } else newItem.gclass = '';
					 obj.themeList.push(newItem);
				 }

				 obj.getSearchData();
			}
	  },
	  getSubCategory(code) {
			 var obj = this;
			 return function(direction, event) {
				 obj.searchCode = code;
				 var themeList = obj.searchPrefix;
				 obj.searchPrefix = [];
				 for(var key in themeList) {
					 var newItem = themeList[key];
					 if(newItem.name == code) {
						newItem.gclass = 'active';
					 } else newItem.gclass = '';
					 obj.searchPrefix.push(newItem);
				 }

				 obj.getSearchData();
			}
	  },
	  
		
	  getData() {
		   var obj = this;
		   var params = {}
		   var params = {themeCode:this.themeCode,searchCode:this.searchCode}
		   this.$form.sendPost(params,'company/getCompanyList',function(response) {
			   //console.log(response);
			   obj.themeList = response.themeList;
			   obj.searchPrefix = response.searchPrefix;
			   obj.companyList = response.companyList;
				//alert('geg');
				//obj.goodsList = response;
				//obj.gno = response[0].gno;
				
		   });
	  },
	  getSearchData() {
		   var obj = this;
		   var params = {themeCode:this.themeCode,searchCode:this.searchCode}
		   this.companyList =[];

		   this.$form.sendPost(params,'company/getCompanySearchList',function(response) {
			  // console.log(response);
			   obj.companyList = response.companyList;
				//alert('geg');
				//obj.goodsList = response;
				//obj.gno = response[0].gno;
				
		   });

	  },
	  /*
	  showDetail(no) {
		 var obj = this;
		 return function(direction, event) {
			
			obj.$emit('showCompanyEvent',no);
		 }
	  }
	  */
	  showDetail(no) {
		 this.$emit('showCompanyEvent',no);
		
	  }
  },
  mounted: function() {
	
  },
  updated() {
		
		var ulWidth = $('#mainThemeList').width() - 100;
		var width = ulWidth/(this.themeList.length - 1);
		var obj = this;

		$('#mainThemeList li').css('width',width+'px');
		$('#mainThemeList li:first-child').css('width','100px');
		
		
		var ulWidth = $('#searchPrefix').width()-80;
		var width = ulWidth/(this.searchPrefix.length - 1);

		$('#searchPrefix li').css('width',width+'px');
		$('#searchPrefix li:first-child').css('width','80px');
		if(!this.selectedActive) {
			var winwidth = $(window).width();
			if(winwidth <1700) {
				$('#mainThemeList li').css('font-size','13pt'); 
				
			}
		}
	
		var height = 822 -240; 
		$('.data-area').css('height',height);
		this.selectedActive = true;
		//alert($(window).height());
		//if($(window).height()>100) {
		//	$('.content-container').css('height',$(window).height()+'px');
		//}

		
  }	

}
</script>

<style lang="scss" scoped>
.padding-area {padding:30px}
 #mainThemeList {
	margin:30px 0 20px 0;
	width:100%;
	display:flex;
	align-content:center;
	text-align:center;
	li {
		width:auto;
		height:60px;
		background:#999999;
		color:#fff;
		display:flex;
		text-align:center;
		flex-wrap:wrap;
		align-content:center;
		align-items: center;
		justify-content: center;
		line-height:20px;
		font-size:17pt;
		cursor:pointer;
	}
	li:first-child {
		border-radius:10px 0 0 10px;
	}
	li:last-child {
		border-radius:0 10px 10px 0;
	}
	li.active {
		background:#3D8BFF;
	
	}
}

#searchPrefix {
	margin:0;
	width:100%;
	padding-top:0;
	li {
		width:auto;
		height:50px;
		background:#fff;
		color:#000;
		text-align:center;
		line-height:45px;
		font-size:17pt;
		float:left;
		border-top:solid 2px #DCDCDC;
		border-bottom:solid 2px #DCDCDC;
		cursor:pointer;
	}
	li:first-child {
		border-radius:10px 0 0 10px;
		border-left:solid 2px #DCDCDC;
	}
	li:last-child {
		border-radius:0 10px 10px 0;
		border-right:solid 2px #DCDCDC;
	}
	li.active {
		background:#D2E5FF;
	
	}
 }

 .data-area {
 	padding:30px .5%;
	height:auto;
	width:100%;
	border-top:solid 2px #DCDCDC;	
	background:#F4F8FD;
	overflow-y:auto;
	.data-box {
		padding-bottom:50px;
		ul {
			display:flex;
			flex-wrap:wrap;
			li {
				cursor:pointer;
				width:19%;
				height:220px;
				border:solid 2px #DCDCDC;	
				border-radius:10px;
				margin:0 .5% 15px .5%;
				background:#fff;
				.img {
					width:100%;
					height:120px;
					overflow-y:hidden;
					img {
						border-radius:10px 10px 0 0;
						width:100%;
						height:100%;
					}
				}
				.text-box {
					padding:10px 10px 0 10px;
					height:60px;
					width:100%;
					border-radius:0 0 10px 10px;
					.comp-name {
						padding:10px 7px 0 7px;
						font-weight:bold;
						color:#000;
						font-size:14pt;
						height:45px;
					}
					.category-name {
						padding:10px 7px 0 7px;
						color:#999;
						font-size:10pt;
					}
				}
			}
		}
	}
}
					
</style>