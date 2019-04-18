<template>
	<div class="classfy">
		<div class="class-content" @click="changeactive($event);changeClass($event)">
			<router-link to="/"><class-item text="全部商品" class="active"></class-item></router-link>
			<class-item text="童书"></class-item>
			<class-item text="小说"></class-item>
			<class-item text="文学"></class-item>
			<class-item text="励志"></class-item>
			<class-item text="养生"></class-item>
			<class-item text="动漫"></class-item>
			<class-item text="时尚"></class-item>
			<class-item text="科普"></class-item>
		</div>
	</div>
</template>

<script>
	import ClassItem from "./ClassItem"
	export default{
		name:'Classfy',
		components:{
			"class-item":ClassItem
		},
		props:{
			changeClass:Function,
			changeactive:Function
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.classfy{
		width: 100%;
		height: 40px;
		border-bottom: 2px solid black;
	}
	a{
		text-decoration: none;
		color: black;
	}
	.class-content{
		width: 1190px;
		height: 100%;
		margin: 0 auto;
		display: flex;
	}
</style>