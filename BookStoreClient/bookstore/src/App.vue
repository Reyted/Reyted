<template>
	<div id="app">
		<my-head :username='username' :cart='cart' :exit='exit' :changephoto='changephoto' :text="text" :num='num' :headphoto="headphoto"></my-head>
		<router-view :mouseWheel='mouseWheel' :todetail='todetail' :isshow='isshow' :login='login' :searchProducts='searchProducts' :insertShopping='insertShopping' :changeactive='changeactive' :changeClass='changeClass' :changesort='changesort' :comprehensive='comprehensive' :text="sort" :val1="val1" :val2="val2" :allProductss="allProductss"></router-view>
	</div>
</template>

<script>
	import Head from "./components/Head"
	import Nav from "./components/Nav"
	import Classfy from "./components/Classfy"
	import Sort from "./components/Sort"
	import Body from "./components/Body"
	export default {
		name: 'App',
		components: {
			'my-head': Head,
			"my-nav": Nav,
			"my-classfy": Classfy,
			"my-sort": Sort,
			"my-body": Body
		},
		data: () => {
			return {
				sort: 0,
				val1: '',
				val2: '',
				searchProduct: [],
				allProductss: [],
				original: [],
				username: '',
				headphoto: '',
				userid: 0,
				num: 0,
				text: '未登录',
				shopping: [],
				booknumber:20,
				times:1,
				classfy:0,
				keywords:0,
				isshow:false
			}
		},
		mounted: function() {
			this.times=1;
			this.axios.get('http://localhost:7778/allproducts',{params:{start:(this.times-1)*this.booknumber,end:(this.times)*this.booknumber,classfy:this.classfy}}).then((response) => {
//				console.log(response.data)
				this.original=response.data;
				this.allProductss=response.data;
			}).catch((response) => {
				console.log(response);
			})
		},
		watch:{
			'$route' (to,from){
				//this.allProductss.pop();
//				console.log(this.allProductss)
			}
		},
		methods: {
			changesort: function(e, inp) {
				if(inp) {
					if(e.target.tagName == "BUTTON" || e.target.parentNode.tagName == "BUTTON") {
						this.sort = 5;
						return;
					}
				}
				if(e.target.innerText == "销量" && e.target.children[0].classList.contains("icon-jiantouarrow505")) {
					this.sort = 2;
					return;
				}
				if(e.target.innerText == "销量" && e.target.children[0].classList.contains("icon-jiantouarrow499")) {
					this.sort = 1;
					return;
				}
				if(e.target.innerText == "价格" && e.target.children[0].classList.contains("icon-jiantouarrow505")) {
					this.sort = 4;
					return;
				}
				if(e.target.innerText == "价格" && e.target.children[0].classList.contains("icon-jiantouarrow499")) {
					this.sort = 3;
					return;
				}
				if(e.target.innerText == "综合") {
					this.sort = 5;
					return;
				}
			},
			comprehensive: function(a, b) {
				this.val1 = a;
				this.val2 = b;
			},
			searchProducts: function(a) {
				if(!a) {
					return;
				}
				this.keywords=a;
				let params = {
					keywords: a
				};
				this.axios.get('http://localhost:7778/searchProducts', {
					params: {
						keywords: a
					}
				}).then((response) => {
					this.searchProduct = response.data;
					this.allProductss = response.data;
				}).catch((response) => {
					console.log(response);
				})
			},
			changeClass: function(a) {
				if(a.target.innerText == "童书") {
					this.classfy=1;
					this.allProductss = this.original.filter((item) => {
						return item.class == "童书";
					})
					return;
				}
				if(a.target.innerText == "全部商品") {
					this.classfy=0;
					this.allProductss = this.original;
					return;
				}
				if(a.target.innerText == "小说") {
					this.classfy=2;
					this.allProductss = this.original.filter((item) => {
						return item.class == "小说";
					})
					return;
				}
				if(a.target.innerText == "文学") {
					this.classfy=3;
					this.allProductss = this.original.filter((item) => {
						return item.class == "文学";
					})
					return;
				}
				if(a.target.innerText == "励志") {
					this.classfy=4;
					this.allProductss = this.original.filter((item) => {
						return item.class == "励志";
					})
					return;
				}
				if(a.target.innerText == "养生") {
					this.classfy=5;
					this.allProductss = this.original.filter((item) => {
						return item.class == "养生";
					})
					return;
				}
				if(a.target.innerText == "动漫") {
					this.classfy=6;
					this.allProductss = this.original.filter((item) => {
						return item.class == "动漫";
					})
					return;
				}
				if(a.target.innerText == "时尚") {
					this.classfy=7;
					this.allProductss = this.original.filter((item) => {
						return item.class == "时尚";
					})
					return;
				}
				if(a.target.innerText == "科普") {
					this.classfy=8;
					this.allProductss = this.original.filter((item) => {
						return item.class == "科普";
					})
					return;
				}
			},
			changeactive: function(e, inp) {
				if(e.target.tagName == "P") {
					document.querySelectorAll(".classitem").forEach(function(item) {
						item.classList.remove("active");
					})
					e.target.classList.add("active");
				}
				if(e.target.tagName == "BUTTON" || e.target.parentNode.tagName == "BUTTON" && inp) {
					document.querySelectorAll(".classitem").forEach(function(item) {
						item.classList.remove("active");
					})
				}
			},
			mouseWheel: function(e) {
				let bodyHeight=document.querySelector(".body").offsetHeight+37;
				let scroolHeight=document.documentElement.scrollTop;
				let clientHeight=document.body.clientHeight;
				if((clientHeight+scroolHeight)>bodyHeight-30 && this.keywords==0){
					this.times++;
					this.axios.get('http://localhost:7778/allproducts',{params:{start:(this.times-1)*this.booknumber+1,end:(this.times)*this.booknumber,classfy:this.classfy,keywords:this.keywords}}).then((response) => {
						if(response.data){
							this.original=this.original.concat(response.data);
							this.allProductss=this.allProductss.concat(response.data);
						}else{
							this.isshow=true;
						}
					}).catch((response) => {
						console.log(response);
					})
				}
				if(e.wheelDelta<0){
					if((document.querySelector('.sort').offsetTop-scroolHeight)<150){
						$('.sort').css({
							'position': 'fixed',
							'top': 0,
							'left': 0,
							'bottom': 0,
							'right':0
						})
					}
				}else{
					if((-document.querySelector('.sort').offsetTop+scroolHeight)<180){
						$('.sort').css({
							'position': 'relative'
						})
					}
				}
			},
			insertShopping: function(ev,id) {
//				console.log(id);
				if(this.username) {
					ev.stopPropagation();
					this.axios.get('http://localhost:7778/insertShopping', {
						params: {
							userid: this.userid,
							bookid: id,
							num: 1
						}
					}).then((response) => {
						this.num = response.data;
					}).catch((response) => {
						console.log(response);
					})
				} else {
					ev.stopPropagation();
					this.$alert('您还没有登录!', '提示', {
						confirmButtonText: '确定'
					});
				}
			},
			updateNum:function(num){
				this.num=num;
			},
			login: function(a) {
				this.username = a[0][0].username;
				this.userid = a[0][0].id;
				this.text = '已登录';
				this.num = a[1].length;
				this.shopping = a[1];
				this.headphoto = a[0][0].headphoto;
			},
			exit: function() {
				this.username = '';
				this.userid = '';
				this.text = '未登录';
				this.num = 0;
			},
			changephoto: function(a) {
				console.log(a);
				this.headphoto = a;
				this.axios.get('http://localhost:7778/changephoto', {
					params: {
						headphoto: a,
						userid: this.userid
					}
				}).then((response) => {
					if(!response.data) {
						this.$alert('这是一段内容', '标题名称', {
							confirmButtonText: '确定'
						});
					}
				}).catch((response) => {
					console.log(response);
				})
			},
			searchShopping:function(){
				this.axios.get('http://localhost:7778/searchShopping', {
					params: {
						userid: this.userid
					}
				}).then((response) => {
					this.num=response.data.length;
				}).catch((response) => {
					console.log(response);
				})
			},
			todetail:function(id){
				this.$router.push({path:'/buy',query:{bookid:id,uid:this.userid,searchShopping:this.searchShopping,username:this.username}});
			},
			cart:function(){
//				console.log(this.shopping)
				this.$router.push({path:'/ShopingCar',query:{uid:this.userid,updateNum:this.updateNum,num:this.num}})
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
	}
</style>