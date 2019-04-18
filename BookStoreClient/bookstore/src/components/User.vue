<template>
	<div class="user">
		<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" title="更换头像" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon" title="更换头像"></i>
		</el-upload>
		<span class="user-span">{{username}}</span>
	</div>
</template>

<script>
	export default {
		name: 'User',
		props: {
			username: String,
			headphoto: String,
			changephoto: Function
		},
		data:function(){
			return {
				imageUrl:this.headphoto
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.changephoto(this.imageUrl);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return  isLt2M;
			}
		}
	}
</script>

<style scoped="scoped">
	.user {
		height: 100%;
		line-height: 36px;
		display: flex;
	}
	
	.headpboto {
		width: 36px;
		height: 36px;
		border-radius: 18px;
		margin-right: 10px;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 36px;
		height: 36px;
		line-height: 178px;
		text-align: center;
	}
	.avatar-uploader-icon::before{
		content: '\E62B';
		display: block;
		margin-top: -71px;
	}
	.avatar {
		width: 36px;
		height: 36px;
		display: block;
		border-radius: 18px;
	}
	
	.user-span {
		margin-left: 10px;
	}
</style>