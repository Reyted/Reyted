<template>
	<div class="head">
		<div class="content">
			<div class="tomain" @click="tomain">
				<i class="iconfont icon-home"></i>
				<p class="tomain-p">主页面</p>
			</div>
			<head-item :text="text" :checked="checked"></head-item>
			<head-item text="注册" :checked="checked"></head-item>
			<head-cart :num="num" :cart='cart'></head-cart>
			<head-user v-if="username" :headphoto="headphoto" :username="username" :changephoto="changephoto"></head-user>
			<head-exit :exit='exit'></head-exit>
		</div>
		
	</div>
</template>

<script>
	import headItem from "./headItem"
	import Cart from "./Cart"
	import User from "./User"
	import Exit from "./Exit"
	export default{
		name:'Head',
		components:{
			"head-item":headItem,
			"head-cart":Cart,
			"head-user":User,
			"head-exit":Exit
		},
		props:{
			headphoto:String,
			username:String,
			num:Number,
			login:Function,
			text:String,
			exit:Function,
			changephoto:Function,
			cart:Function
		},
		data:function(){
			return {
				
			}
		},
		methods:{
			checked:function(e){
				console.log(e.target.innerText);
				if(e.target.innerText=="注册"){
					this.$router.push({name:'regist'});
					return;
				}if(e.target.innerText=="未登录"){
					this.$router.push({name:'login'});
					return;
				}
			},
			tomain:function(){
				this.$router.push({path:'/'})
			}
		}
	}
</script>

<style scoped="scoped">
.head{
	width: 100%;
	height: 36px;
	position: relative;
    min-width: 990px;
    border-bottom: 1px solid #eee;
    background: #f5f5f5;
    position: fixed;
    top: 0;
    z-index: 1000;
}
.content{
	width: 570px;
	height: 100%;
	float: right;
	display: flex;
	justify-content: space-around;
	font-size: 12px;
	margin-right: 30px;
}
.tomain{
	display: flex;line-height: 35px;cursor: pointer;
}
.tomain:hover{
	color: #f60;
}
.tomain-p{
	margin-left: 8px;
	line-height: 39px;
}
</style>