<template>
	<div class="nav">
		<div class="nav-content">
			<div class="nav-logo">
				<img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1555427649&di=70b097e2df6886caafc969dce94b6919&src=http://img.zcool.cn/community/01fd8159b73f66a8012028a9677c75.jpg@1280w_1l_2o_100sh.jpg" alt="" />
			</div>
			<div class="nav-search">
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入搜索内容" v-model="input5" type="text" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="searchProducts(input5);changeactive($event,input5);changesort($event,input5)">搜索</el-button>
					</el-input>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Nav",
		data() {
		    return {
		      input5: ''
		    }
  		},
  		props:{
  			searchProducts:Function,
  			changeactive:Function,
  			changesort:Function
  		}
	}
</script>

<style scoped>
	.nav {
		width: 100%;
		height: 110px;
		min-width: 1190px;
	}
	
	.nav-content {
		width: 1190px;
		height: 100%;
		display: flex;
		margin: 0 auto;
		align-items: center;
	}
	
	.nav-logo {
		width: 400px;
		height: 100%;
		padding-top: 10px;
		display: flex;
		justify-content: flex-start;
	}
	.nav-logo>img{
		height: 100%;
		width: 220px;
	}
	
	.nav-search {
		width: 550px;
		height: 63px;
	}
	.el-select .el-input {
    	width: 130px;
	}
	.input-with-select .el-input-group__prepend {
	   background-color: #fff;
	}
</style>