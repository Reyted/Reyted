<template>
  <div class="boxBuy">
    <my-fangdajing :bookid-fangdajing="bookid"></my-fangdajing>
    <div class="left">
      <my-booknamedescribe :bookid-booknamedescribe="bookid"></my-booknamedescribe>
      <my-author :bookid-author="bookid"></my-author>
      <my-price :bookid-price="bookid"></my-price>
      <my-sales :bookid-sales="bookid"></my-sales>
      <my-buynum :bookid-buynum="bookid" :uid-buynum="uid" :searchShopping="updatenum" :username='username'></my-buynum>
    </div>
    <div class="tuijian-box">
      <div class="tuijian">
        <p>········推荐图书········</p>
        <my-tuijian :cid-tuijian="cid"></my-tuijian>
      </div>
    </div>
  </div>
</template>
<script>
import FangDaJing from "./FangDaJing";
import BooknameDescribe from "./BooknameDescribe";
import Author from "./Author";
import Price from "./Price";
import Sales from "./Sales";
import BuyNum from "./BuyNum";
import TuiJian from "./TuiJian";

export default {
  name: "Buy",
  data:function(){
    return {
      // bookid:8,
      bookid:Number(this.$route.query.bookid),
      uid:0,
      cid:1,
      searchShopping:'',
      username:''
    }
  },
  beforeMount:function(){
  	this.searchShopping=this.$route.query.searchShopping;
  },
  mounted:function(){
  	this.uid=this.$route.query.uid;
    this.bookid=Number(this.$route.query.bookid)
    this.username=this.$route.query.username;
  },
  components: {
    "my-fangdajing": FangDaJing,
    "my-booknamedescribe": BooknameDescribe,
    "my-author": Author,
    "my-price": Price,
    "my-sales": Sales,
    "my-buynum": BuyNum,
    "my-tuijian": TuiJian
  },
  methods:{
  	updatenum:function(){
  		this.searchShopping()
  	}
  }
};
</script>
<style scoped>
.boxBuy {
  display: flex;
  /* background-color: red; */
  width: 1200px;
  margin: 80px auto;
}
.left {
  width: 520px;
  /* background-color: rebeccapurple; */
}
.tuijian-box {
  margin-left: 30px;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
}
.tuijian {
  border: 1px solid #eee;
  padding: 10px 0px 0px 0px;
  border-radius: 0 0 5px 5px;
}
.tuijian p {
  margin: 0;
  font-size: 14px;
  color: #999;
  text-align: center;
}
.button {
  margin: 10px auto;
}
</style>


