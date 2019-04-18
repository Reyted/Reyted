<template>
	<div class="body" @mousewheel="mouseWheel($event)">
		<my-nav :searchProducts="searchProducts" :changeactive="changeactive" :changesort='changesort'></my-nav>
		<my-classfy :changeClass="changeClass" :changeactive="changeactive"></my-classfy>
		<my-sort :changesort="changesort" :comprehensive="comprehensive"></my-sort>
		<my-all :text="text" :val1="val1" :todetail='todetail' :insertShopping='insertShopping' :val2="val2" :allProductss="allProductss"></my-all>
	</div>
</template>

<script>
	import Nav from "./Nav"
	import Classfy from "./Classfy"
	import Sort from "./Sort"
	import AllProducts from "./AllProducts"
	export default {
		name:'Body',
		props:{
			searchProducts:Function,
			changeactive:Function,
			changesort:Function,
			changeClass:Function,
			comprehensive:Function,
			text:Number,
			val1:String,
			val2:String,
			allProductss:Array,
			insertShopping:Function,
			mouseWheel:Function,
			isshow:Boolean,
			todetail:Function
		},
		components:{
			"my-nav":Nav,
			"my-classfy":Classfy,
			"my-sort":Sort,
			'my-all':AllProducts
		}
	}
</script>

<style scoped="scoped">
	.body{
		margin-top: 36px;
	}
</style>