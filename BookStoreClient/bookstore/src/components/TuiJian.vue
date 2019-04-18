<template>
  <div class="xixi">
    <div class="box" v-for="(item,index) in TuiJianBookArray" :key="index">
      <div class="img">
        <img :src="item.mainurl" alt @click="clickTuijian(item.id)">
      </div>
      <p class="price">￥{{item.price}}</p>
      <p class="bookname">《{{item.bookname}}》</p>
    </div>
    <el-button size="mini" type="primary" @click="click" class="button">换一批</el-button> 
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TuiJian",
  props:{
    cidTuijian:Number,
  },
  data: function() {
    return {
      //用来装推荐图书的数组
      TuiJianBookArray: [],
    };
  },
  methods: {
    //发送ajax的函数
    sendajax:function() {
      /**
       * 发送ajax获取 推荐图书
       */
      axios
        .get("http://localhost:7778/get-tuijian", {
          params: {
            //根据当前的类推荐
            cid: this.cidTuijian
          }
        })
        .then(response => {
          //将获取的随机3本书设置在数组里面
          this.TuiJianBookArray = response.data;
          // console.log(this.TuiJianBookArray)
        })
        .catch(error => {
          console.log(error);
        });
    },
    click:function(){
      //点击按钮时，换一批同类型的书籍
      this.sendajax();
    },
    clickTuijian(bookid){
      // console.log(bookid)
      this.$router.push({path:"/buy",query:{bookid:bookid}})
      window.location.reload();
    }
  },
  mounted: function() {
    //调用发送ajax函数
    this.sendajax();
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.xixi {
  display: flex;
  flex-direction: column;
}
.box {
  width: 200px;
  margin-top: 10px;
  /* height: 200px; */
  /* background: aquamarine; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box .img {
  width: 150px;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box .img img {
  width: 90%;
  height: 90%;
  transition: all 0.3s
}
.box img:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.box .price {
  font-size: 14px;
  color: red;
}
.box .bookname {
  font-size: 15px;
}
.button {
  margin-top: 10px;
}
</style>


