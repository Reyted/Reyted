<template>
	<div class="hello">
		<div class="box">
			<h1>用户登录入口</h1>
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="请输入账号" prop="name">
					<el-input type="text" v-model="ruleForm2.name" prefix-icon="el-icon-service" placeholder="用户名/手机/邮箱" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="请输入密码" prop="pass">
					<el-input type="password" v-model="ruleForm2.pass" prefix-icon="el-icon-goods" placeholder="密码" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
				</el-form-item>
				<router-link class="regist" to="regist">还没有账号 免费注册 ></router-link>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "login",
		props:{
			login:Function
		},
		data() {
			var validatename = (rule, value, callback) => {
				if(!value) {
					callback(new Error("账号不能为空"));
				}
				callback();
			};

			var validatePass = (rule, value, callback) => {
				if(!value) {
					callback(new Error("请输入密码"));
				} else {
					if(this.ruleForm2.checkPass !== "") {
						this.$refs.ruleForm2.validateField("checkPass");
					}
					callback();
				}
			};

			return {
				ruleForm2: {
					name: '',
					pass: "",
					checkPass: "",
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
						trigger: "blur"
					}],

				}
			};
		},
		methods: {
			submitForm(formName,login) {
				let that=this;
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.axios.get('http://localhost:7778/log',{params:{username:this.ruleForm2.name,pwd:this.ruleForm2.pass}}).then((response)=>{
							console.log(response.data)
							if(response.data[0]){
								console.log(10)
								this.login(response.data);
								this.$router.push({path:'/'})
							}else{
								this.$alert('用户名或密码错误!', '提示', {
									confirmButtonText: '确定'
								});
							}
						}).catch((response)=>{
							console.log(response);
						})
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		margin-top: 120px;
	}
	
	.box {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		width: 370px;
		height: 290px;
		margin: 0 auto;
	}
	
	h1 {
		text-align: center;
	}
	
	.el-input {
		width: 240px;
		height: 40px;
	}
	
	.regist {
		font-size: 12px;
		color: #333;
		text-decoration: none;
		margin-left: 20px;
	}
	
	.regist:hover {
		color: #0E70F1;
		text-decoration: underline;
	}
	
	.el-button {
		width: 200px;
	}
</style>