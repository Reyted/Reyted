<template>
  <dir class="box">
    <h2>请输入收货信息:</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="收货人">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <h2>送货清单:</h2>
      <div class="goodsListTitle">
        <div class="goodsinf">商品信息</div>
        <div class="unitprice">单价</div>
        <div class="num">数量</div>
        <div class="xiaoji">小计</div>
      </div>
      <div class="goodsList" v-for="(item,index) in sendList" :key="index">
        <div class="goodsinf">
          <img :src="item.mainurl" alt srcset>
          <div class="name">《{{item.bookname}}》</div>
        </div>
        <div class="unitprice">￥{{(item.price).toFixed(2)}}</div>
        <div class="num">{{item.booknum}}件</div>
        <div class="xiaoji">￥{{(item.price*item.booknum).toFixed(2)}}</div>
      </div>
      <h2>结算信息：</h2>
      <div class="billing-nfo">
        <div class="num">
          <span style="color:#f60">{{allNumber}}</span>
          件商品&nbsp;&nbsp;&nbsp;共计：￥{{allMoney.toFixed(2)}}
        </div>
        <div class="yunfei" v-if="allMoney<99">运费：￥6</div>
        <div class="yunfei" v-else>已享受满99包邮~</div>
        <div class="paymoney">
          应付金额：
          <span style="font-size:25px;color:red;font-weight:bold">￥{{payMoney.toFixed(2)}}</span>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交订单</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </dir>
</template>
<script>
import axios from "axios";
export default {
  name: "Payment",
  data() {
    return {
      form: {
        name: "",
        contact: "",
        address: ""
      },
      //购买书的数量
      booknum: null,
      //用户的Id
      uid: null,
      //送货清单
      sendList: [],
      //选中商品的信息
      selectBookArray: [],
      //存送货清单当中，每本书的数量
      temBookNumArray: [],
      //存送货清单当中，每本书的id
      temBookidArray: []
    };
  },
  mounted: function() {
    // this.booknum = this.$route.query.num;
    this.uid = this.$route.query.uid;

    this.selectBookArray = this.$route.query.selectBookArray;

    //this.selectBookArray表示一个选中商品的对象数组，每个元素中的bookid表示书的Id，每个元素中的booknum表示该本书的数量
    // console.log(this.selectBookArray)
    //循环遍历上面这个数组，将每个元素书的Id，重新存到一个新的数组当中；将每本书的数量存到一个新的数组当中
    for (var i = 0; i < this.selectBookArray.length; i++) {
      this.temBookidArray.push(this.selectBookArray[i].bookid);
      this.temBookNumArray.push(this.selectBookArray[i].booknum);
    }

    //加载完成后，获取用户的Id，书的Id，购买的数量
    // console.log(this.$route.query.uid,this.$route.query.bookid,this.$route.query.num);
    /**
     * 发送ajax获取 送货清单 根据书的Id获取，送货订单的信息，包括  书的图片、书的名字、单价、
     */
    axios
      .get("http://localhost:7778/get-delivery-list", {
        params: {
          bookid: this.temBookidArray
        }
      })
      .then(response => {
        // console.log(response.data);
        this.sendList = response.data;
        // console.log(this.sendList);
        //将每件产品的数量加入sendList这个数组当中
        for (var i = 0; i < this.sendList.length; i++) {
          //给这个数组中的每一个对象，添加一个booknum的属性，并给这个属性存值
          this.sendList[i].booknum = this.temBookNumArray[i];
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    //点击提交订单
    onSubmit() {
      //获取当前的时间 年/月/日
      var time = new Date().toLocaleDateString();
      /**
       * 发送ajax 将 当前交易的uid，time，money，  发送给后台服务器
       */
      axios
        .get("http://localhost:7778/add-jiaoyi-list", {
          params: {
            time: time,
            userid: this.uid,
            money: this.payMoney,
            name: this.form.name,
            contact: this.form.contact,
            address: this.form.address
          }
        })
        .then(response => {
          // console.log(response);
          if(!this.form.name&&!this.form.contact&&!this.form.address){
          	this.$message.error('请完善收货信息！');
          	return;
          }
          this.$message({
	          message: '交易成功！感谢您的支持',
	          type: 'success'
	        });
          //////////////////////////////该库存
          /**
           * 购买成功后 发送ajax  获取送货清单中 每本书的数量 然后改变库存
           */
          axios
            .get("http://localhost:7778/get-booknum-kucun", {
              params: {
                //根据每本书的Id
                changeKuCunBookidArray:this.temBookidArray,
              }
            })
            .then(response => {
              // console.log(response);
              // console.log(this.selectBookArray)
              var updateKucunArray=[]
              for(var i=0;i<this.selectBookArray.length;i++){
                for(var j=0;j<response.data.length;j++){
                  if(this.selectBookArray[i].bookid==response.data[j].id){
                    updateKucunArray.push({id:this.selectBookArray[i].bookid,kucun:response.data[j].kucun-this.selectBookArray[i].booknum})
                  }
                }
              }
              //updateKucunArray包含书的id和该书的库存
              // console.log(updateKucunArray)
              //循环这个数组，每次发送一个ajax，修改对应的书的库存
              for(var i=0;i<updateKucunArray.length;i++){
                // console.log(111)
                /**
               * 发送ajax 修改对应书的 库存
               */
              axios
                .get("http://localhost:7778/update-kucun", {
                  params: {
                    id: updateKucunArray[i].id,
                    kucun:updateKucunArray[i].kucun
                  }
                })
                .then(response => {
                  // console.log(response.data);
                })
                .catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
            ///////////////////////////////改销量
            /**
           * 购买成功后 发送ajax  获取送货清单中 每本书的数量 然后改变销量
           */
          axios
            .get("http://localhost:7778/get-booksales-sales", {
              params: {
                //根据每本书的Id
                changeSalesBookidArray:this.temBookidArray,
              }
            })
            .then(response => {
              // console.log(response);
              // console.log(this.selectBookArray)
              var updateSalesArray=[]
              for(var i=0;i<this.selectBookArray.length;i++){
                for(var j=0;j<response.data.length;j++){
                  if(this.selectBookArray[i].bookid==response.data[j].id){
                    updateSalesArray.push({id:this.selectBookArray[i].bookid,sales:response.data[j].sales+this.selectBookArray[i].booknum})
                  }
                }
              }
              // console.log(updateSalesArray)
              //updateKucunArray包含书的id和该书的库存
              // console.log(updateKucunArray)
              //循环这个数组，每次发送一个ajax，修改对应的书的库存
              for(var i=0;i<updateSalesArray.length;i++){
                // console.log(111)
                /**
               * 发送ajax 修改对应书的 销量
               */
              axios
                .get("http://localhost:7778/update-sales", {
                  params: {
                    id: updateSalesArray[i].id,
                    sales:updateSalesArray[i].sales
                  }
                })
                .then(response => {
                  // console.log(response.data);
                })
                .catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      history.back(-1);
    }
  },
  computed: {
    //计算送货清单当中共有几件商品
    allNumber: function() {
      var allNumber = 0;
      for (var i = 0; i < this.temBookNumArray.length; i++) {
        allNumber += this.temBookNumArray[i];
      }
      return allNumber;
    },
    //计算送货清单当中的商品共多少钱
    allMoney: function() {
      var allMoney = 0;
      for (var i = 0; i < this.sendList.length; i++) {
        allMoney += this.temBookNumArray[i] * this.sendList[i].price;
      }
      return allMoney;
    },
    //实际应付金额
    payMoney: function() {
      //满99的情况
      if (this.allMoney >= 99) {
        return this.allMoney;
      } else {
        //不包邮的情况
        return this.allMoney + 6;
      }
    }
  }
};
</script>
<style scoped>
.box {
  width: 600px;
  margin: 80px auto;
}
.goodsListTitle {
  height: 30px;
  /* background-color: blueviolet; */
  border: 1px solid #eee;
  border-top: 4px solid #eee;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.goodsListTitle .goodsinf {
  width: 250px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodsListTitle .unitprice {
  width: 80px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodsListTitle .num {
  width: 80px;
  /* background-color: yellow; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodsListTitle .xiaoji {
  width: 80px;
  /* background-color: blue; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.goodsList {
  height: 100px;
  background-color: #fffbf2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -1px;
  border: 1px solid #eee;
  font-size: 13px;
}
.goodsList .goodsinf {
  width: 250px;
  /* background-color: red; */
  padding-left: 10px;
  box-sizing: border-box;
  display: flex;

  align-items: center;
}
.goodsList .goodsinf img {
  width: 80px;
  height: 80px;
}
.goodsList .goodsinf .name {
  margin-left: 10px;
  width: 100%;
  /* background-color: aqua; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goodsList .unitprice {
  width: 80px;

  /* background-color: blue; */
  text-align: center;
}
.goodsList .num {
  width: 80px;
  text-align: center;

  /* background-color: rgb(45, 177, 182); */
}
.goodsList .xiaoji {
  width: 80px;
  text-align: center;

  /* background-color: rgb(34, 16, 134); */
}
.billing-nfo {
  height: 50px;
  /* background-color: aquamarine; */
  border: 1px solid #eee;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}
.billing-nfo .num {
  height: 33px;
  display: flex;
  align-items: center;
}
.billing-nfo .yunfei {
  height: 33px;
  display: flex;
  align-items: center;
}
.billing-nfo .paymoney {
  display: flex;
  align-items: center;
}
</style>


