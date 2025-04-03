<template>
		<div>
			<form  id="commentForm" action="commentProcApp/insertComment" novalidate @submit="formSubmit">
			<input type='hidden' name='parent' id='parent' v-model="parent"/>
			<input type='hidden' name='parent_no' id='parent_no' v-model="parent_no"/>
			<input type='hidden' name='gno' id='gno'/>
			<input type='hidden' name='depth' id='depth' />
		    <input type='hidden' name='no' id='no' v-model="no"/>
			<input type='hidden' name='limit' id='limit' v-model="checklimit"/>

			<div class='form-group'>   
				<div class="md-field">
					<textarea name="content" id="content" style="width:90%;height:50px;margin:7px 0 0 5px;border:solid 1px #dfdfdf;" placeholder="상품문의를 입력하세요" v-model="content"  required="true"></textarea>
					<md-button class="md-primary md-raised md-mini"  style="height:50px;width:30px;" type="submit"><md-icon>edit</md-icon></md-button>
			   	</div>
				<div class="md-error-box" style='padding-left:10px;'>상품문의를 입력하세요</div>
				<md-button class="md-flat md-primary" v-if="editFlag" style='height:15px;padding:0;margin:0;' @click="cancleEdit()" type="button">취소</md-button>
		    </div>
			</form>
			
			<div style="clear:both;"></div>
			<md-list class="md-triple-line md-dense">
				<md-list-item v-for="item in dataList"
					 v-bind:no="item.no">
				  <md-avatar v-if="item.photo">
				    <img :src="item.photo" alt="People">
				  </md-avatar>
				  <div class="md-list-item-text">
				    <span style='font-size:12px;padding-bottom:4px;'>{{item.author}} {{item.rdate}}</span>
				    <p v-html="item.content"></p>
				  </div>
				  <div v-if="item.mbruid==memberNo">
				
					  <span @click="editComment(item.no,item.content)"><md-icon class="md-flat">edit</md-icon></span>
					  <span @click="removeComment(item.no)"><md-icon class="md-flat">delete</md-icon></span>
					  
				  </div>
				</md-list-item>
		
			</md-list>
			<md-button class="md-raised md-primary" style='width:100%;' v-if="pagingFlag" @click="moreData()" type="button">더보기</md-button>
		</div>
</template>

<script>
export default {
	name: 'CommentList',
	data() {
		return {
			dataList:[],
			total:0,
			total_page:1,
			page:1,
			content:'',
			editTop:0,
			no:'',
			isLogin:false,
			editFlag:false,
			pagingFlag:false,
			checklimit:10,
			
		}
	},
	props:['parent_no','parent','limit','memberNo'],
	created() {
		this.checklimit = this.limit;
		this.isLogin = (localStorage.getItem('memberkey'))?true:false;
		this.getCommentList();
	},
    methods: {
		setDatas(resp,mode) {
			
			this.dataList = this.dataList.concat(resp.datas);
			this.total = resp.total;
			if(mode!='pageFix')this.page = resp.page;
			
			this.total_page = (parseInt(this.total)/parseInt(this.checklimit))+1;
		
			if(parseInt(this.page) >= parseInt(this.total_page)) {
				this.pagingFlag = false;
			} else this.pagingFlag = true;
		},
		getCommentList() {
			var obj = this;
			var params = {parent:this.parent,parent_no:this.parent_no,limit:this.limit,page:this.page};
			this.$form.getServerData(params,'commentProcApp/loadComment',function(resp) {
				obj.setDatas(resp);
			});
				
		},
		moreData() {
			this.page++;
			this.getCommentList();
		},
		formSubmit(e) {
			if(!this.isLogin) {
				var obj = this;
				var params = {
					content:"로그인된 사용자만 사용이 가능합니다<br>로그인 페이지로 이동하시겠습니까?",
					cancleView:true,
					doAction:function() {
						
						obj.$router.push({name:'MemberLogin'});
					}
				};
				this.$eventBus.$emit('dialogOpen',params);
				e.preventDefault();
				return;
			}
			if(this.editFlag) {
				var limit = parseInt(this.limit) * parseInt(this.page);
				$('#limit').val(limit);
			} else $('#limit').val(this.limit);

			var $f = $('#commentForm');
			var obj = this;
			
			this.$form.validate($f,e,function(resp) {
				//console.log(resp);
				if(resp.result!='fail') {
					
					obj.dataList = [];
					if(obj.editFlag)obj.setDatas(resp,'pageFix');
					else obj.setDatas(resp);
					obj.no = '';
					obj.content = '';
					if(obj.editTop && obj.editFlag) {
						$('html, body').animate({
							scrollTop:obj.editTop
						}, 200);	
						obj.editTop = 0;
					}
					obj.editFlag = false;
				
				}
				
			});
		},
		removeComment(no) {
			var obj = this;
			var params = {
				content:"삭제하시겠습니까?",
				cancleView:true,
				doAction:function() {
					obj.actionRemove(no);					
				}
			};
			this.$eventBus.$emit('dialogOpen',params);
			
		},
		actionRemove(no) {

			var obj = this;
			var limit = parseInt(this.limit) * parseInt(this.page);
			var params = {no:no,parent:this.parent,parent_no:this.parent_no,limit:limit};
			var action = 'commentProcApp/deleteComment';
			this.$form.sendPost(params,action,function(resp) {
				if(resp!='fail') {	
					obj.dataList = [];
					obj.setDatas(resp,'pageFix');
					
				}
			});
		},
		editComment(no,content) {
			this.editTop = $(window).scrollTop();
			this.no = no;
			this.content = this.$util.strip_tags(content);
			this.editFlag = true;
			
			var top = parseInt($('#content').offset().top)-150;
			$('html, body').animate({
				scrollTop:top
			}, 200);	

			
		},
		cancleEdit() {
			var top = this.editTop;
			this.editTop = 0;
			this.no = '';
			this.content = '';
			this.editFlag = false;

			$('html, body').animate({
				scrollTop:top
			}, 200);	

			
		
		}
    }

}
</script>

<style lang="scss" scoped>
.md-list {
    width: 100%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .md-list-item {
    width: 100%;
    max-width: 100%;
    border-bottom: 1px solid rgba(#000, .12);
  }
</style>