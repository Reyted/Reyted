<template>
  <div class="box">
    <h3 class="h3">《{{bookNameDescribe.bookName}}》</h3>
    <p class="p">{{bookNameDescribe.bookDescribe}}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "BooknameDescribe",
  props:{
    bookidBooknamedescribe:Number,
  },
  data: function() {
    return {
      bookNameDescribe: {
        bookName: "",
        bookDescribe:"",
      }
    };
  },
  mounted: function() {
    /**
     * 发送ajax获取 图书的名字和简介
     */
    axios
      .get("http://localhost:7778/get-bookname-describe", {
        params: {
          id: this.bookidBooknamedescribe
        }
      })
      .then(response => {
        // console.log(response.data[0]);
        //设置书的名字
        this.bookNameDescribe.bookName=response.data[0].bookname;
        //设置书的介绍
        this.bookNameDescribe.bookDescribe=response.data[0].introduce;  
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
h3,
p {
  margin: 0;
  padding: 0;
}
.box {
  width: 520px;
  /* background-color: aqua */
}
.box .p {
  padding-top: 10px;
  text-align: justify;
  font-size: 15px;
}
</style>


