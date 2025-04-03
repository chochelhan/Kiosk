<template>
	<div class="page-layout">
		<img :src="mainBg" class="bg-img" />
		
		<div class="contents">
			<div class="from-box">
					<div class="logo">
						<img :src="logo"/>
					</div>
			
					<form  id="submitForm" novalidate  @submit="formSubmit">
					<div class='input-box'>   
						<input type="text" name="uid" id="uid" placeholder="ID"  />
				    </div>
					
					<div class='input-box'>   
						<input type="password"  name="upass" placeholder="PASSWORD" id="upass" />
					</div>	
					<p style='padding-top:40px;color:#fff;'>
						<md-button class="md-raised md-primary" style='width:100%;margin:0;height:70px;' type="submit">LOGIN</md-button>
					</p>
					</form>
				</div>
		</div>
		
	</div>	
</template>


<script>
export default {
  name: 'MemberLogin',
  data () {
	
	return {
  	   mainBg:'',
	   logo:'',
   }
  },
  created() {
	
	 var mainUid = localStorage.getItem('mainUid');
	 if(mainUid) {
		if(localStorage.getItem('location')) {
			this.$router.push({path:'/'});
		 } else {
			this.$router.push({path:'/intro'});
		 }
		 return;
	 }
	 this.getData();
	  
  },
  methods: {
      formSubmit(e) {
		var obj = this;
		if(!$('#uid').val()) {
			var params = {};
			params.content = '아이디를 입력하세요';	
			params.doAction = function() {
				$('#uid').focus();
			}
			
			obj.$eventBus.$emit('dialogOpen',params);
			e.preventDefault();
			return;
		}
		if(!$('#upass').val()) {
			var params = {};
			params.content = '비밀번호를 입력하세요';	
			params.doAction = function() {
				$('#upass').focus();
			}
			
			obj.$eventBus.$emit('dialogOpen',params);
			
			e.preventDefault();
			return;
		}

		var sendparams = {uid:$('#uid').val(),upass:$('#upass').val()};
			
		this.$form.sendPost(sendparams,'memberProc/memberLogin',function(resp) {
			//console.log(resp);
			var result = resp.result;
			var params = {}
			switch(result) {
			  default:
				  params.content = '잘못된 아이디 또는 비밀번호입니다';
				  
			  break;
			  case 'succ':
				  params.content = '로그인 되었습니다';	
				  localStorage.setItem('mainUid',$('#uid').val());
				  params.doAction = function() {
					 if(localStorage.getItem('location')) {
						obj.$router.push({path:'/'});
					 } else {
						obj.$router.push({path:'/intro'});
					 }
				  }
				
			  break;
		   }
		   obj.$eventBus.$emit('dialogOpen',params);
		
		});
		e.preventDefault();
		
	  },
	  getData() {
		  	var obj = this;
			var sendparams = {};
			this.$form.sendPost(sendparams,'setting/getIntro',function(resp) {
				obj.logo = resp.logo;
				obj.mainBg = resp.bg;

				//console.log(resp);
				//var result = resp.result;
			
			});
	  },
	  goPage(cmd) {
		 switch(cmd) {
			case 'join':
				var url = '/member/join';
			break;
			case 'findId':
				var url = '/member/findPw/id';
			break;
			case 'findPw':
				var url = '/member/findPw/pw';
			break;

		 }
		 this.$router.push({path:url});
	  }
  },
  mounted: function() {
	$('.page-layout').css('height',$(window).height());
	
  }

}
</script>

<style lang="scss" scoped>
.page-layout {
	width:100%;
	max-height:100%;
	padding:0;
	margin:0;
	overflow-y:hidden;
	position:relative;
}
.bg-img {
	width:100%;
	min-height:100%;
	height:auto;
	position:absolute;
	top:0;
	left:0;
}	
.contents {
	margin:200px auto 0 auto;
	width:40%;
	max-width:500px;
	.from-box {
		margin:0;
		color:#fff;
		z-index:10;
		position:relative;
		.logo {
			text-align:center;
			width:100%;
			margin:0 0 40px 0;
			img {
				width:280px;

			}
		}
		.input-box {
			margin-top:30px;
			input {
				background:#fff;
				width:100%;
				height:50px;
				border-radius:10px;
				border:solid 2px #dfdfdf;
				padding:10px;
				font-size:15pt;
			}
			input:focus {
				outline:none;
			}
		}
		.md-button {
			border-radius:10px;
			font-size:25pt;
				
		}
	}
}  	


</style>