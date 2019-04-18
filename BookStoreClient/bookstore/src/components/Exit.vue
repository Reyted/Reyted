<template>
	<span class="exit" @click="exit">退出</span>
</template>

<script>
	export default {
		name:'Exit',
		props:{
			exit:Function
		}
	}
</script>

<style scoped="scoped">
	.exit{
		line-height: 36px;
		cursor: pointer;
	}
	.exit:hover{
		color: #f60;
	}
</style>