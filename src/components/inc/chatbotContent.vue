<template>
	<div class="page-layout">
		
	</div>
</template>

<script>
export default {
	name: 'chatbotContent',
	data() {
		return {
			
  	  }
	},
	created() {
		var code = this.$route.params.code;
		this.$store.commit('insertSnsAccept',code);
		this.$router.push({ path:'/'})
		
	},
    methods: {
	   
    },
	mounted() {
		$('.page-layout').css('height',$(window).height());
		chatbotBusVue({view:0});
	},
	updated() {
		
	}

}
</script>

<style lang="scss" scoped>
.container {
	padding:0;
	margin:0;
	z-index:5;
	background:none;
	width:100%;
	padding:0;
	margin:0;
	z-index:5;
	background:none;
	width:100%;
	.header-box {
		.header-area {
			padding:16px 0 0 0;
			position:relative;
			.back {
				position:absolute;
				top:16px;
				left:15px;
				.md-icon {
					color:#fff;
					font-size:20pt;
				}
			}
			.title-box {
				text-align:center;
				img {
					width:160px;
				}
			}
			.lang-box {
				position:absolute;
				top:14px;
				right:15px;
				.md-button {
					border:solid 1px #fff;
					color:#fff;
					padding:0;
					margin:0;
					min-width:65px;
					width:65px;
					font-size:9pt;
					height:27px;
					line-height:100%;
				
				}
			}

		}
		.design-area {
			margin:40px 0 10px 0;
			text-align:center;
			color:#fff;
			font-size:10pt;
			span {
				display:inline-block;
				width:65%;
				border-top:solid 1px #fff;
				margin-top:-1px;
				vertical-align:middle;
			}
		}
	}
	
	
}
</style>