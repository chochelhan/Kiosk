
<template>
	<div class="content-container">
		<div class="padding-area">
			<div class="title">{{title}}</div>
			<ul id="mainThemeList">
				<li v-for="cate,index in themeList" :class="cate.gclass" v-touch="setTimeTableEvent(cate.no,cate.allchk)">{{cate.names[lang]}}</li>
			</ul>
			<div style="clear:both"></div>
			
		</div>

		<div class="data-area">
			<div id='time-table-layout'>
				<table id='time-table' cellspacing="0" cellpadding="0" border=0>
				<thead>
					<tr>
						<th  class="set-box">
							구분
						</th>
						<th  v-for="item in categoryList"  v-html="item.names[lang]" :colspan="item.cols">
							&nbsp;
						</th>
					</tr>
					<tr>
						<th  class="set-box">
							시간/장소
						</th>
						<th  v-for="item in areaList">
							{{item.names[lang]}}
						</th>
					</tr>

				</thead>
				<tbody>
					<tr class="fixed-box">
						<th  class="set-box">
							{{allName[lang]}}
						</th>
						<td :colspan="allCols"  :class="allGclass+' '+allLinkclass+' description-box'" v-html="allContent[lang]">
							
						</td>
					</tr>
					<tr v-for="items,index in timeTableList">
						<th  class="set-box">
							{{items.tname}}
						</th>
						<td v-for="item in items.list" :colspan="item.cols" :rowspan="item.rows" :class="item.gclass+' description-box'">
							<div v-html="item.contents[lang]" :class="item.linkClass" v-touch="setLinkEvent(item.link)">
							</div>
						</td>
					</tr>
				</tbody>
				</table>
			</div>
			<div class="data-box">
				<ul>
					<li v-for="comp in maineventList" @click="showDetail(comp.no)">
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
  name: 'maineventContent',
  data () {
	
	return {
		languages:{},
  	    themeList:[],
	    selectedActive:null,
	    maineventList:[],
	    themeCode:'all',
	    timeTableList:[],
		areaList:[],
		categoryList:[],
		tempCategoryList:[],
	    allCols:1,
		allGclass:'',
		allLinkclass:'',
		allContent:'',
		allContents:{},
		allName:'',
		allLink:'',
		allChk:'',

   }
  },
  props:["title","lang","mainEventCategory"],
  watch: {
	  lang() {
	  },
	  mainEventCategory() {
		  //this.setCategoryData();
	  }
  },
  created: function() {
	    
	    this.introLanguage();		
  },
  methods: {
	  introLanguage() {
			
			this.themeList = [];
			var lang = this.lang;
			if(!lang)lang = 'kor';

			this.languages = {'kor':'전체 일정','eng':'ALL','cha':'중국어','jan':'일본어'};

			this.themeList.push({no:'all',names:this.languages,gclass:'active'});
			this.getData();

	  },
	  getData() {
		   var obj = this;
		   var params = {}
		   this.$form.sendPost(params,'mainevent/getMaineventList',function(response) {
			   //console.log(response);
			   for(var k in response.categoryList) {
					var item = response.categoryList[k];
					var allNames = {};
					for(var key in obj.languages) {
						allNames[key] = item[key+'_name']; 
					}
					
					var newitem = {no:item.no,allchk:item.allchk,names:allNames};
					obj.themeList.push(newitem);
			   }
			   
			   obj.maineventList = response.maineventList;
			   var categoryList = response.categoryResult;
			   
			   for(var k in categoryList) {
				   var item = categoryList[k];
				   var cols = item.sub.length;
				   
				    var allNames = {};
					for(var key in obj.languages) {
						allNames[key] = item[key+'_name']; 
					}
					
					var newitem = {names:allNames,cols:cols,no:item.no,sub:item.sub};
					
				   obj.categoryList.push(newitem);
				   obj.tempCategoryList.push(newitem);
				   for(var j in item.sub) {
					    var subitem = item.sub[j];
						var allNames = {};
						for(var key in obj.languages) {
							allNames[key] = subitem[key+'_name']; 
						}
						var newitem = {names:allNames};
					
						obj.areaList.push(newitem)
				   }
			   }
			   for(var key in response.descriptionList) {
				   for(var subkey in response.descriptionList[key].list) {
						if(!response.descriptionList[key].list[subkey].contents) {
							response.descriptionList[key].list[subkey].contents = {};
						}
				   }
			   }

			   obj.timeTableList = response.descriptionList;
			   console.log(obj.timeTableList);
			   localStorage.setObject('timeTableList',response.descriptionList);

			   if(response.allChkData.contents) {
				    
					obj.allContent = response.allChkData.contents;
					if(response.allChkData.link) {
						obj.allLink = response.allChkData.link;
						obj.allLinkclass = 'linkActive';
					}
					
			   }
			   
			   var allNames = {};
			   for(var key in obj.languages) {
				  allNames[key] = response.allchkResult[0][key+'_name']; 
			   }	
					
			   obj.allName = allNames;
			   obj.allCols = obj.areaList.length
			   
				
			   

		   });
	  },
	  setLinkEvent(no) {
		  if(!no)return;
			 var obj = this;
			 return function(direction, event) {
				 obj.showDetail(no);
			}
	  },
	  showDetail(no) {
			this.$emit('showMaineventEvent',no);
	  },
	  setTimeTableEvent(code,allchk) {
			 var obj = this;
			 return function(direction, event) {
				 obj.setTimeTable(code,allchk);
			}
	  },
	  setTimeTable(code,allchk) {
	  		if(allchk=='yes') {
				this.allChk = 'every';	
			} else {
				this.allChk = '';	
			}
			this.themeCode = code;
			
			this.getTableData();
	
	  },
	  getTableData() {
		  	var orgTimeTableList = localStorage.getObject('timeTableList');
;			for(var k in this.themeList) {
				var newItem = this.themeList[k];
				
				if(newItem.no == this.themeCode) {
					newItem.gclass = 'active';
					
				} else newItem.gclass = '';
				this.themeList.splice(k,1,newItem);		
			}
			if(this.allChk == 'every') {
				$('#time-table-layout').hide()
				$('.data-box').show();
			} else {
			   	$('#time-table-layout').show()
				$('.data-box').hide();
					
				switch(this.themeCode) {
					
					case 'all':
						this.categoryList = [];
						this.areaList = [];
						for(var key in this.tempCategoryList) {
							var item = this.tempCategoryList[key];
							this.categoryList.push(item);
							for(var j in item.sub) {
							    var subitem = item.sub[j];
								var allNames = {};
								for(var key in this.languages) {
									allNames[key] = subitem[key+'_name']; 
								}
								var newitem = {names:allNames};
								this.areaList.push(newitem)
							}
							
						}
						this.timeTableList = [];
						this.timeTableList = orgTimeTableList;
						this.allCols = this.areaList.length;

				   
						
					break;
					
					default:
						this.categoryList = [];
						for(var key in this.tempCategoryList) {
							var item = this.tempCategoryList[key];
							if(item.no == this.themeCode) {
								this.categoryList.push(item);
								this.areaList = [];
								for(var j in item.sub) {
								    var subitem = item.sub[j];
									var allNames = {};
									for(var key in this.languages) {
										allNames[key] = subitem[key+'_name']; 
									}
									var newitem = {names:allNames};
									this.areaList.push(newitem)
								}
								break;
							}
							
						}
						this.allCols = this.areaList.length;
						var timeTableList = orgTimeTableList;
						this.timeTableList=[];
						var saveItems = {};
						var svItem = {};
						var insItems = [];
						for(var j in timeTableList) {
							saveItems = timeTableList[j];
							
							var insItems = [];
							for(var i in saveItems.list) {
								svItem = saveItems.list[i];
								if(svItem.pno == this.themeCode) {
									insItems.push(svItem);
								}
							}
							saveItems.list = insItems;
							this.timeTableList.push(saveItems);
						}
						//console.log(orgTimeTableList);

					break;

				}
			}
	  },
	  setCategoryData() {
			$('#mainThemeList li').removeClass('active');
			switch(this.mainEventCategory) {
				case 'P01':
					$('#mainThemeList li:first-child').addClass('active');
					this.themeCode = 'all';
				break;
				case 'P02':
					$('#mainThemeList li#1did').addClass('active');
					this.themeCode = '1d';
				break;
				case 'P03':
					$('#mainThemeList li#2did').addClass('active');
					this.themeCode = '2d';
				break;
				case 'P04':
					$('#mainThemeList li#3did').addClass('active');
					this.themeCode = '3d';
				break;
				case 'P05':
					$('#mainThemeList li#everyid').addClass('active');
					this.themeCode = 'every';
				break;
			}
			this.getTableData()
	  }
  },
  mounted: function() {
		
		
  },
  updated() {
	  
		var ulWidth = $('#mainThemeList').width() -200;
		var width = ulWidth/(this.themeList.length -1);
		var obj = this;
		$('#mainThemeList li').css('width',width+'px');
		$('#mainThemeList li:first-child').css('width','200px');
		
		if(!this.selectedActive) {
			//this.setCategoryData();
		}
			
		this.selectedActive = true;
		var height = $(window).height() -205;
		$('.data-area').css('height',height);	
		var winwidth = $(window).width();
		if(winwidth <1700) {
			$('#mainThemeList li').css('font-size','13pt'); 
				
		}	

  }	

}
</script>

<style lang="scss" scoped>
.padding-area {padding:30px}
 #mainThemeList {
	margin:30px 0;
	width:100%;
	li {
		width:auto;
		height:60px;
		background:#999999;
		color:#fff;
		text-align:center;
		line-height:60px;
		font-size:17pt;
		float:left;
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

 .data-area {
 	padding:30px 15px 30px 30px;
	width:100%;
	border-top:solid 2px #DCDCDC;	
	background:#F4F8FD;
	overflow-y:auto;
	.data-box {
		display:none;
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
				
			}
		}
	}
}				
.height_1 {height:30px}
.height_2 {height:50px}
.bg_gray {background:#ffffff}
.item_role{
     margin:16px 0 10px 0;
     background:#D2E9E9;
     padding:2px 0 2px 0;
     width:100px;
     color:#000000;
     border-radius: 4px;
     font-size:12px; 
     line-height:22px;
     text-align:center;
}
#time-table {
		width:100%;
		thead {
			background:#fff;
			tr:first-child {
				th {
					background:#333;
					color:#fff;
					font-size:13pt;
					font-weight:normal;
					height:70px;
					border-right:solid 1px #dcdcdc;
				
				}
				th:last-child {
					border-right:none;
				}
				th:first-child {
					border-left:none;
				}
			}
			th {
				height:35px;
				background:#fafafa;
				font-weight:normal;
				border-right:solid 1px #dcdcdc;
				border-bottom:solid 1px #dcdcdc;
					
			}
			th.set-box {
				width:140px;
			}
			th:last-child {
				border-right:solid 1px #dcdcdc;
			}
			th:first-child {
				border-left:solid 1px #dcdcdc;
			}

		}
		tbody {
			background:#fff;
			tr.fixed-box {
				th,td {
				}
			}
			
			td {
				width:200px;
				height:60px;
				padding:10px;
				border-right:solid 1px #dcdcdc;
				border-bottom:solid 1px #dcdcdc;
				div {
					display:flex;
					align-items: center;
					justify-content: center;
					word-break:break-all;
				}
				div.active {
					color:#0066cc;
					cursor:pointer;
				}
			}
			td.linkActive {
				color:#0066cc;	
				cursor:pointer;
			}
			th.set-box {
				width:140px;
				background:#fafafa;
				font-weight:normal;
				text-align:center;
				border-right:solid 1px #dcdcdc;
				border-bottom:solid 1px #dcdcdc;
				border-left:solid 1px #dcdcdc;
				
			}
			td.description-box {
			}
			td.none-box {
				display:none;

			}
			td:last-child {
					
			}
			tr:last-child {
				th,td {
					border-bottom:solid 1px #dcdcdc;	
				}
			}
		}

	}

.table-box {
	margin-bottom:30px;
	table {
		border-top:solid 2px #000;
		td {
			background:#fff;
			
		}
		td.title_cell_1 {
			background:#00b6c4;padding:5px 0; color:#ffffff; text-align: center; border-right:1px #cccccc solid; border-bottom:1px #cccccc solid;
			font-size:12pt;
			p {
				line-height:50%;
			}
		}
		td.title_cell_2 {background:#F5FAFB; padding:5px 0 5px 0; text-align: center; font-size:14px; border-right:1px #999999 solid; border-bottom:1px #999999 solid; vertical-align: middle}
		td.ssn_cell {padding:5px 0 5px 0; text-align: center; font-size:14px; border-right:1px #999999 solid; border-bottom:1px #999999 solid; vertical-align: middle}
		td.border_right_x {border-right:none;}
		td.click-box {
			.ssn_title {
				color:#249BDB;
				cursor:pointer;
			}
		}
	}
}
	

</style>