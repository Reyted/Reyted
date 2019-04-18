<template>
  <div class="box">
    <span>数量：</span>
    <el-input-number
      size="small"
      v-model="num8"
      controls-position="right"
      @change="handleChange"
      :min="1"
      :max="max"
    ></el-input-number>
    <span class="unit">册</span>
    <span class="kucun">库存</span>
    <span>{{booknum}}册</span>
    <div class="box2">
      <div class="shoping" @click="buyNow">立即购买</div>
      <!-- <router-link to="/ShopingCar" style="text-decoration: none"> -->
      <div class="shpingCar" @click="jionCar">加入购物车</div>
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "BuyNum",
  props:{
    bookidBuynum:Number,
    uidBuynum:Number,
    searchShopping:Function,
    username:String
  },
  data() {
    return {
      //默认选择数量
      num8: 1,
      //设置最大的选择量，最大选择量与库存相同
      max: 0,
      //库存数量
      booknum: 0,
      
    };
  },
  methods: {
    handleChange(value) {
      // console.log(value);
    },
    //点击立即购买按钮 带参数 uid bookid 购买数量num8
    buyNow(){
      //将选中的书的Id和数量存入这个数组当中
      if(!this.username){
      	this.$alert('您还没有登录！', '消息提示', {
          confirmButtonText: '确定'
        });
        return;
      }
      var selectBookArray=[{bookid:this.bookidBuynum,booknum:this.num8}];
      this.$router.push({path:"Payment",query:{uid:this.uidBuynum,selectBookArray:selectBookArray}})
    },
    //点击加入购物车按钮
    jionCar() {
      // console.log(147)
      /**
       * 发送ajax 将用户的id 书的id 商品的数量  加入购物车表中
       */
      if(!this.username){
      	if(!this.username){
	      	this.$alert('您还没有登录！', '消息提示', {
	          confirmButtonText: '确定'
	        });
	        return;
	      }
      }
      let that=this;
      axios
        .get("http://localhost:7778/insertShopping", {
          params: {
            userid: this.uidBuynum,
            bookid:this.bookidBuynum,
            num:this.num8
          }
        })
        .then(response => {
          // console.log(response);
          console.log(that.searchShopping())
//        if(confirm("加入购物车成功，是否前往购物车?")){
////          this.$router.push({path:'ShopingCar',query:{uid:this.uidBuynum}})
//        }
          
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    /**
     * 发送ajax获取 库存 根据书的Id
     */
    axios
      .get("http://localhost:7778/get-kucun", {
        params: {
          bookid: this.bookidBuynum
        }
      })
      .then(response => {
        // console.log(response);
        this.booknum = response.data[0].inventory;
        //最大选择量与库存相同
        this.max = this.booknum;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.box {
  padding-left: 10px;
  font-size: 13px;
  color: #999;
  margin-top: 10px;
}
.box .unit {
  margin-left: 5px;
}
.box .kucun {
  margin-left: 30px;
}

.box2 {
  height: 100px;
  /* background-color: aqua; */
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box2 .shoping {
  width: 180px;
  height: 40px;
  border: 1px solid red;
  box-sizing: border-box;
  background-color: #ffeded;
  text-align: center;
  line-height: 40px;
  color: red;
  cursor: pointer;
}
.box2 .shoping:hover {
  background-color: #ffd1d1;
}
.box2 .shpingCar {
  width: 180px;
  height: 40px;
  /* border: 1px solid red; */
  box-sizing: border-box;
  background-color: #f60;
  text-align: center;
  line-height: 40px;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
}
.box2 .shpingCar:hover {
  background-color: #ff3000;
}
</style>


