
<template>
	<div class="content-container">
		<div class="padding-area">
			<div class="title">{{title}}</div>
			<ul id="mainThemeList" v-if="themeList.length>1">
				<li v-for="cate in themeList" :class="cate.gclass"  v-touch="getCategory(cate.no)">{{cate.name}}</li>
			</ul>
		</div>
		
		<div style="clear:both"></div>
		<div class="data-area">
			<div class="data-box">
				<ul>
					<li v-for="comp in companyList" v-touch="showDetail(comp.no)">
						<div class="img">
							<img :src="comp.img" />
						</div>
						<div class="comp-name">
							{{comp.name}}
						</div>
					
					</li>
					
				</ul>
		
			</div>
		</div>
		
	</div>	
</template>

<script>


export default {
  name: 'eventContent',
  data () {
	
	return {
  	   themeList:[],
	   selectedActive:null,
	   companyList:[],
	   themeCode:'all',
	  
   }
  },
  props:["title","lang"],
  watch: {
	  lang() {
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
	  getData() {
		   var obj = this;
		   var params = {searchCode:this.themeCode}
		   this.$form.sendPost(params,'event/getEventList',function(response) {
			   //console.log(response);
			   obj.themeList = response.themeList;
			   obj.companyList = response.eventList;
			   
				//obj.goodsList = response;
				//obj.gno = response[0].gno;
				
		   });
	  },
	  getSearchData() {
		   var obj = this;
		    obj.companyList = [];
		   var params = {searchCode:this.themeCode}
		   this.$form.sendPost(params,'event/getEventSearchList',function(response) {
			   obj.companyList = response.eventList;
				//alert('geg');
				//obj.goodsList = response;
				//obj.gno = response[0].gno;
				
		   });

	  },
	  showDetail(no) {
		  var obj = this;
		  return function(direction, event) {
			
			obj.$emit('showEventEvent',no);
		  }
	  }
  },
  mounted: function() {
	
  },
  updated() {
		
		/*
		$('#mainThemeList li').css('width',width+'px');
		$('#mainThemeList li:first-child').css('width','100px');
		if(!this.selectedActive) {
			$('#mainThemeList li:first-child').addClass('active');
		}
	
		$('#mainThemeList li').off('click');
		$('#mainThemeList li').on('click',function() {
			$('#mainThemeList li').removeClass('active');
			$(this).addClass('active');
			obj.themeCode = $(this).attr('code');
			$('#searchPrefix li').removeClass('active');
			$('#searchPrefix li:first-child').addClass('active');
			obj.getSearchData();
		});

		var winwidth = $(window).width();
		if(winwidth <1700) {
			$('#mainThemeList li').css('font-size','13pt'); 
				
		}
		*/
		this.selectedActive = true;

		var height = $(window).height() -170;
		$('.data-area').css('height',height);

	

  }	

}
</script>

<style lang="scss" scoped>
.padding-area {padding:30px}
 #mainThemeList {
	margin:30px 0 0 0;
	width:100%;
	display:flex;
	li {
		width:80%;
		height:60px;
		background:#999999;
		color:#fff;
		padding:0 10px;
		text-align:center;
		line-height:60px;
		font-size:17pt;
		cursor:pointer;

	}
	li:first-child {
		border-radius:10px 0 0 10px;
		width:140px;
	}
	li:last-child {
		border-radius:0 10px 10px 0;
	}
	li.active {
		background:#3D8BFF;
	
	}
}

 .data-area {
 	padding:30px 15px 30px 30px;
	width:100%;
	border-top:solid 2px #DCDCDC;	
	background:#F4F8FD;
	overflow-y:auto;
	.data-box {
		ul {
			li {
				cursor:pointer;
				float:left;
				width:200px;
				height:200px;
				border:solid 2px #DCDCDC;	
				background:#fff;
				border-radius:10px;
				margin:0 15px 15px 0;
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
				.comp-name {
					padding:20px 10px 6px 10px;
					font-weight:bold;
					color:#000;
				
					font-size:15pt;
				}
				
			}
		}
	}
}
					
</style>