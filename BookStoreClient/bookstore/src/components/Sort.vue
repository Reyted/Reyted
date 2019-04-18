<template>
	<div class="sort" @click="change($event)">
		<p class="sort-item sortactive" @click="changesort($event)">综合</p>
		<p class="sort-item" @click="changesort($event)">销量<span class="iconfont icon-jiantouarrow505 arrow"></span></p>
		<p class="sort-item" @click="changesort($event)">价格<span class="iconfont icon-jiantouarrow505 arrow"></span></p>
		<div class="section">
			<div class="sort-text">价格区间  :</div>
			<div class="sort-inp">
				<div class="row">
					<input class="inp1" v-model="val1" type="number" />
					  --  
					<input class="inp1" v-model="val2" type="number"/>
				</div>
				<div class="row row-two">
					<p @click="comprehensive(val1,val2);toZero()">确定</p>
					<p @click="toZero">取消</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Sort',
		props:{
			changesort:Function,
			comprehensive:Function
		},
		data:()=>{
			return {
				val1:'',
				val2:''
			}
		},
		methods:{
			change:function(e){
				if(e.target.tagName=="P"){
					document.querySelectorAll(".sort-item").forEach(function(item){
						item.classList.remove("sortactive");
					})
					e.target.classList.add("sortactive");
					if(e.target.children.length){
						if(e.target.children[0].classList.contains("icon-jiantouarrow505")){
							e.target.children[0].classList.remove("icon-jiantouarrow505");
							e.target.children[0].classList.add("icon-jiantouarrow499");
						}else{
							e.target.children[0].classList.add("icon-jiantouarrow505");
							e.target.children[0].classList.remove("icon-jiantouarrow499");
						}
					}
				}
			},
			toZero:function(){
				this.val1=this.val2='';
			}
		}
	}
</script>

<style scoped="scoped">
	.sort{
		width: 1190px;
		height: 38px;
		background-color: #F8F8FA;
		margin:36px auto;
		display: flex;
		line-height: 38px;
		font-size: 14px;
		position: relative;
	}
	.sort-item{
		height: 100%;
		width: 80px;
	}
	.sortactive{
		color: #f60;
		border-bottom: 2px solid #f60;
	}
	.rotate{
		transform: rotate(180deg);
	}
	.section{
		display: flex;
		position: relative;
	}
	.sort-inp{
		position: absolute;
		display: flex;
		flex-direction: column;
		height: 38px;
		left: 78px;
		width: 120px;
		border: 1px solid transparent;
		border-radius: 3px;
	}
	.inp1{
		width: 47px;
		height: 23px;
		font-size: 11px;
		border-radius: 10px;
		border: 1px solid #E5E5E5;
		outline: none;
		padding-left: 6px;
		box-sizing: border-box;
	}
	.inp1:focus{
		border: 1px solid #f60;
	}
	.sort-inp:hover{
		border: 1px solid #E5E5E5;
		background-color: white;
		height: 80px;
	}
	.sort-inp:hover .row-two{
		display: flex;
	}
	.row{
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		margin-left: 5px;
	}
	.row-two{
		display: none;
	}
	.row>p{
		width: 42%;
		height: 30px;
		text-align: center;
		line-height: 30px;
		position: absolute;
		top: 5px;
		cursor: pointer;
	}
	.row>p:nth-child(1){
		border: 1px solid #E5E5E5;
		border-radius: 3px;
		left: 0;
	}
	.row>p:nth-child(1):hover{
		color: #f60;
		border: 1px solid #f60;
	}
	.row>p:nth-child(2){
		right: 5px;
		color: #999;
	}
	.row>p:nth-child(2):hover{
		color: black;
	}
	.el-input--suffix{
		width: 50px;
	}
	.sort-text{
		width: 78px;
	}
</style>