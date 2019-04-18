<template>
    <div class="box">
        <span>作者：<span style="color:blue">{{author.author}}</span></span>
        <span style="margin-left:20px">出版社：<span style="color:blue">{{author.press}}</span></span>
        <span style="margin-left:20px">出版时间：<span style="color:blue">{{author.presstime}}</span></span>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name:"Author",
    props:{
      bookidAuthor:Number
    },
    data:function(){
        return {
            author:{},
        }
    },
    mounted: function() {
    /**
     * 发送ajax获取书的 作者 出版社 出版时间
     */
    axios
      .get("http://localhost:7778/get-author-publish-publishTime", {
        params: {
          id: this.bookidAuthor
        }
      })
      .then(response => {
        // console.log(response);
        this.author=response.data[0];
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
<style scoped>
    .box {
        border-top: 1px solid #eee;
        margin-top: 5px;
        padding-top: 5px;
        font-size: 13px;
        /* background: red; */
    }
</style>


