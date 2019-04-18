<template>
	<p class="classitem">{{text}}</p>
</template>

<script>
	export default{
		name:'ClassItem',
		props:{
			text:String
		},
		methods:{
			active:function(){
				
			}
		}
	}
</script>

<style scoped="scoped">
	.classitem{
		line-height: 40px;
		width: 90px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		font-family: "微软雅黑";
		letter-spacing: 0.2em;
	}
	.active{
		background-color: #f60;
		color: white;
	}
</style>