<template>
	<div class="all-container">
		<div class="all-content">
			<all-item v-for="item in allProducts":insertShopping="insertShopping" :todetail='todetail' :id="item.id" :bookname="item.bookname" :presstime="item.presstime" :inventory="item.inventory" :sales="item.sales" :mainurl="item.mainurl" :cls="item.class" :oldprice="item.oldprice" :author="item.author" :price="item.price" :introd="item.introd" :press="item.press"></all-item>
		</div>
		<div class="aside" @click="toTop">置顶</div>
	</div>
</template>

<script>
	import BookItem from "./BookItem"
	export default {
		name:'AllProducts',
		props:{
			text:Number,
			val1:String,
			val2:String,
			allProductss:Array,
			insertShopping:Function,
			todetail:Function
		},
		components:{
			"all-item":BookItem
		},
		data:()=>{
			return {
				allProducts:[],
				original:[],
				count:20
			}
		},
		methods:{
			toTop:function(){
//				clearInterval(timer);
//				var timer=setInterval(function(){
					window.scrollTo(0,0);
//				},1000)
				document.querySelector('.aside').style.display='none';
				$('.sort').css({
					'position': 'relative'
				})
			}
		},
		mounted:function(){
			this.axios.get('http://localhost:7778/allproducts',{params:{start:0,end:20,classfy:0}}).then((response)=>{
//				console.log(response.data)
				this.original=response.data;
				this.allProducts=response.data;
			}).catch((response)=>{
				console.log(response);
			})
		},
		watch:{
			allProductss(ne,ol){
//				console.log(ne);
				this.original=ne;
				this.allProducts=ne;
			},
			text(newval,oldval){
//				console.log(11);
				if(newval==2){
					let len=this.allProducts.length;
					for(var i=0;i<len;i++){
						for(var j=0;j<len-1-i;j++){
							if(this.allProducts[j].sales>this.allProducts[j+1].sales){
								var temp=this.allProducts[j+1];
								this.allProducts[j+1]=this.allProducts[j];
								this.allProducts[j]=temp;
							}
						}
					}
					this.allProducts.push(1);
					this.allProducts.pop();
					return;
				}
				if(newval==1){
					let len=this.allProducts.length;
					for(var i=0;i<len;i++){
						for(var j=0;j<len-1-i;j++){
							if(this.allProducts[j].sales<this.allProducts[j+1].sales){
								var temp=this.allProducts[j+1];
								this.allProducts[j+1]=this.allProducts[j];
								this.allProducts[j]=temp;
							}
						}
					}
					this.allProducts.push(1);
					this.allProducts.pop();
					return;
				}
				if(newval==3){
					let len=this.allProducts.length;
					for(var i=0;i<len;i++){
						for(var j=0;j<len-1-i;j++){
							if(this.allProducts[j].price<this.allProducts[j+1].price){
								var temp=this.allProducts[j+1];
								this.allProducts[j+1]=this.allProducts[j];
								this.allProducts[j]=temp;
							}
						}
					}
					this.allProducts.push(1);
					this.allProducts.pop();
					return;
				}
				if(newval==4){
					let arr=this.allProducts;
					let len=arr.length;
					for(var i=0;i<len;i++){
						for(var j=0;j<len-1-i;j++){
							if(arr[j].price>arr[j+1].price){
								var temp=arr[j+1];
								arr[j+1]=arr[j];
								arr[j]=temp;
							}
						}
					}
					this.allProducts.push(1);
					this.allProducts.pop();
					return;
				}
				if(newval==5){
					let arr=this.allProducts;
					let len=arr.length;
					for(var i=0;i<len;i++){
						for(var j=0;j<len-1-i;j++){
							if(arr[j].id>arr[j+1].id){
								var temp=arr[j+1];
								arr[j+1]=arr[j];
								arr[j]=temp;
							}
						}
					}
					this.allProducts.push(1);
					this.allProducts.pop();
					return;
				}
			},
			val1(ne,ol){
				this.allProducts=this.original.filter((item)=>{
					return item.price>=ne;
				})
			},
			val2(ne,ol){
				this.allProducts=this.original.filter((item)=>{
					return item.price<=ne;
				})
			}
		}
	}
	document.onmousewheel=function(){
		var aside=document.querySelector('.aside');
		let scroolTop=document.documentElement.scrollTop;
		if(scroolTop>200){
			aside.style.display='block';
		}else{
			aside.style.display='none';
		}
	}
</script>

<style scoped="scoped">
	.all-container{
		width: 100%;
	}
	.all-content{
		width: 1190px;
		min-height: 300px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
	}
	.aside{
		width: 50px;
		height: 50px;
		position: fixed;
		color: white;
		right: 35px;
		top: 70%;
		background: rgba(0,0,0,0.3);
		border-radius: 25px;
		text-align: center;
		line-height: 50px;
		cursor: pointer;
		display: none;
	}
	.aside:hover{
		background: rgba(0,0,0,0.7);
	}
</style>