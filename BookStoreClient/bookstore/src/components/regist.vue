<template>
	<div>
		<div class="header">
			<img class="logo" src="../assets/timg.jpg" />
			<div class="welcome">欢迎注册</div>
			<router-link class="login" to="login">我已经注册，马上登录 ></router-link>
		</div>
		<div class="container">
			<div class="inner">
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					<el-form-item label="账号" prop="name">
						<el-input type="text" v-model="ruleForm2.name" prefix-icon="el-icon-mobile-phone" placeholder="请输入账号" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input type="password" prefix-icon="el-icon-goods" placeholder="请输入密码" v-model="ruleForm2.pass"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="password" prefix-icon="el-icon-goods" placeholder="请再次输入密码" v-model="ruleForm2.checkPass"></el-input>
					</el-form-item>
					<el-form-item label="年龄" prop="age">
						<el-input v-model.number="ruleForm2.age"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
						<el-button @click="resetForm('ruleForm2')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "regist",
		data() {
			var validatename = (rule, value, callback) => {
				if(!value ) {
					callback(new Error("账号不能为空"));
				} 
					callback();
			};

			var checkAge = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('年龄不能为空'));
				}
				setTimeout(() => {
					if(!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if(value < 18) {
							callback(new Error('必须年满18岁'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					checkPass: '',
					age: '',
					name: ''
				},
				rules2: {
					name: [{
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 11,
							message: '长度在 6到 11个字符',
							trigger: 'blur'
						},
						{
							validator: validatename,
							trigger: "blur"
					}
					],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					age: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.axios.get('http://localhost:7778/reg',{params:{username:this.ruleForm2.name,pwd:this.ruleForm2.pass}}).then((response)=>{
							console.log(response.data);
						}).catch((response)=>{
							console.log(response);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.header {
		width: 990px;
		height: 88px;
		margin: 0px auto;
		margin-top: 36px;
	}
	
	.logo {
		width: 190px;
		height: 88px;
		float: left;
		margin-right: 24px;
	}
	
	.welcome {
		float: left;
		font-size: 18px;
		color: #666;
		line-height: 88px;
	}
	
	.login {
		float: right;
		margin-top: 63px;
		text-decoration: none;
		color: #333;
	}
	
	.login:hover {
		color: #0E70F1;
	}
	
	.container {
		width: 990px;
		height: 446px;
		margin: 0 auto;
		border: 1px solid #ddd;
		border-top: 3px solid #0E70F1;
		background: #fff;
		padding: 55px 0;
	}
	
	.el-input {
		width: 291px;
		height: 38px;
	}
	
	.el-form-item {
		width: 380px;
		height: 40px;
		margin: 20px auto;
	}
	
	.el-button {
		margin-left: 40px;
	}
</style>