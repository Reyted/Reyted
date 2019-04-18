<template>
	<div class="cart" @click="cart">
		<i class="iconfont icon-gouwuche gouwuche"></i>
		<p class="cart-p">购物车</p>
		<span>{{num}}</span>
	</div>
</template>

<script>
	export default{
		props:{
			num:Number,
			cart:Function
		},
		name:'Cart',
		methods:{

		}
	}
</script>

<style scoped="scoped">
	.gouwuche{
		font-size: 24px;
	}
	.cart{
		line-height: 36px;
		color: #f60;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
</style>