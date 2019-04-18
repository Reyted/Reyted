<template>
	<div class="bookitem" @click="todetail(id)">
		<div class="bookitem-content">
			<div class="img-box" :title="presstime+'  出版'">
				<img :src="mainurl" class="bookitem-img" />
			</div>
			<div class="text-box">
				<div class="money">
					<p class="bookname">{{bookname}}</p>
					<div class="price">
						<span class="money-icon">￥</span>
						<p>{{price}}</p>
					</div>
					<div class="oldprice">
						<span class="money-icon">￥</span>
						<p>{{oldprice}}</p>
					</div>
				</div>
				<p class="bookitem-p">{{introd}}</p>
			</div>
			<div class="inventory">
				<p>库存：{{inventory}} 册</p>
				<p>月销：{{sales}} 册</p>
			</div>
			<div class="sort-button">
				<el-button class="btn">{{cls}}</el-button>
				<el-button class="btn" @click="insertShopping($event,id)">加入购物车</el-button>
			</div>
			<div class="bookitem-message">
				<p class="message-left">{{author}}  著</p> |
				<p class="message-right">{{press}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'BookItem',
		props:{
			mainurl:String,
			price:Number,
			introd:String,
			press:String,
			author:String,
			oldprice:Number,
			cls:String,
			inventory:Number,
			sales:Number,
			id:Number,
			bookname:String,
			presstime:String,
			insertShopping:Function,
			todetail:Function
		},
		data:()=>{
			return{
				main:'',
				prce:'',
				ind:'',
				prs:'',
				aut:'',
				old:'',
				cl:''
			}
		},
		watch:{
			mainurl(newval,oldval){
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.bookitem{
		width: 238px;
		height: 487px;
		padding: 30px 0 0 0;
		box-sizing: border-box;
		cursor: pointer;
	}
	.bookitem:hover{
		box-shadow:2px 2px 10px #E5E5E5,-2px 2px 10px #E5E5E5,2px -2px 10px #E5E5E5,-2px -2px 10px #E5E5E5;
	}
	.bookitem:hover .bookitem-message{
		display: flex;
	}
	.bookitem-content{
		width: 220px;
		height: 100%;
	}
	.img-box{
		width: 220px;
		height: 220px;
		margin-bottom: 20px;
		padding: 0 10px;
	}
	.bookitem-img{
		width: 100%;
		height: 100%;
	}
	.text-box{
		width: 100%;
		height: 87px;
		margin-bottom: 10px;
		padding: 0 10px;
	}
	.inventory{
		width: 238px;
		height: 35px;
		display: flex;
		font-size: 11px;
		align-items: center;
		color: #666;
	}.inventory>p{
		width: 50%;
	}
	.money{
		text-align: left;
		font-size: 16px;
		font-weight: 600;margin-bottom: 10px;
		display: flex;
	}
	.bookname{
		font-size: 15px;
		margin-right: 15px;
	}
	.price{
		color: #f60;
		display: flex;
		line-height: 20px;
	}
	.oldprice{
		color: #666;
		display: flex;
		margin-left: 15px;
		text-decoration: line-through;
		font-size: 12px;
		line-height: 18px;
	}
	.money-icon{
		font-size: 10px;
	}
	.bookitem-p{
		width: 100%;
		height: 40px;
		font-size: 12px;
		text-align: left;
	}
	.bookitem-p:hover{
		color: #f60;
	}
	.el-button{
		height: 100%;
		line-height: 0px;
	}
	.btn{
		width: 40%;
		text-align: center;
		display: flex;justify-content: center;
	}
	.sort-button{
		height: 30px;
		display: flex;
		justify-content: space-around;
		margin-top: 15px;
	}
	.bookitem-message{
		width: 238px;
		height: 30px;
		margin-top: 10px;
		background-color: #F0F0F0;
		display: none;
		line-height: 30px;
	}
	.message-left,.message-right{
		width: 49%;
		height: 100%;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		overflow: hidden;
	}
</style>