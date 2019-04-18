<template>
  <div class="box">
    <p class="oldprice">
      <span class="text">价格：</span>
      <span class="unit">￥</span>
      <span class="old">{{price.oldprice}}</span>
    </p>
    <p class="price">
      <span class="text">促销价：</span>
      <span class="unit">￥</span>
      <span class="now">{{price.price}}</span>
    </p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Price",
  props:{
    bookidPrice:Number,
  },
  data: function() {
    return {
      price: {
        oldprice: 0,
        price: 0,
      }
    };
  },
  mounted: function() {
    /**
     * 发送ajax获取 原价 和 现价
     */
    axios
      .get("http://localhost:7778/get-oldprice-price", {
        params: {
          id: this.bookidPrice
        }
      })
      .then(response => {
        // console.log(response);
        this.price=response.data[0];
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #999;
}
.box {
  height: 70px;
  background-color: #eee;
  margin-top: 10px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.box .oldprice {
  height: 20px;
  line-height: 20px;
}

.box .price {
  height: 40px;
  line-height: 40px;
}
.box p .text {
  display: inline-block;
  width: 70px;
}
.box .oldprice .unit {
  color: #000;
  font-size: 13px;
}
.box .oldprice .old {
  color: #000;
  text-decoration: line-through;
  font-size: 13px;
}
.box .price .unit {
  color: red;
  font-size: 17px;
  font-weight: bold;
}
.box .price .now {
  color: red;
  font-size: 30px;
  font-weight: bold;
}
</style>


