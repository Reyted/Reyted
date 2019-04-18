<template>
	<p class="headitem" @click="checked($event)">{{text}}</p>
</template>

<script>
	export default{
		name:'headItem',
		props:{
			text:String,
			checked:Function,
			login:Function
		}
	}
</script>

<style scoped="scoped">
	.headitem{
		height: 100%;
		color: #666;
		line-height: 36px;
	}
	.headitem:hover{
		color: #f60;
		cursor: pointer;
	}
</style>