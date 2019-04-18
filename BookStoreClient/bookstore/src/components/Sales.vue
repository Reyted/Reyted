<template>
    <div class="box">
        <span>销量：</span>
        <span style="color:red">{{sales}}</span>
        <span>册</span>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name:"Sales",
    props:{
      bookidSales:Number,
    },
    data:function(){
        return {
            sales:0,
        }
    },
    mounted: function() {
    /**
     * 发送ajax获取 销量
     */
    axios
      .get("http://localhost:7778/get-sales", {
        params: {
          id: this.bookidSales,
        }
      })
      .then(response => {
        // console.log(response);
        this.sales=response.data[0].sales;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
<style scoped>
    .box {
        height: 37px;
        /* background-color: aquamarine; */
        margin-top: 10px;
        line-height: 37px;
        font-size: 13px;
        padding-left: 10px;
        color: #999;
        border-top: 1px dashed #eee;
        border-bottom: 1px dashed #eee;
    }
</style>

