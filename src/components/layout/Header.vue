<template>
	<div class="header">
		<div class="logo">
			<img :src="logoImg"/>
		</div>
		<div class="company">
			<img v-for="img in bannerImgs" :src="img"/>
		</div>
		<div style="clear:both;"></div>
	</div>
</template>

<script>
export default {
	name: 'HeaderLayout',
	props:["logoImg","bannerImgs"],
	data() {
		return {
  	  }
	},
	created() {
	},
    methods: {
		mainInit() {
			//this.$emit('logoEvent');
		}
    },
	updated() {
			
	}

}
</script>
<style lang="scss" scoped>
.header {
	position:relative;
	top:0;
	left:0;
	z-index:5;
	width:100%;
	height:74px;
	background:#fff;
	padding:18px 20px 0 20px;
	.logo {
		float:left;
		img {
			width:280px;
		}
	}
	.company {
		padding-top:5px;
		float:right;
		img {
			width:420px;
		}
	}

}
</style>