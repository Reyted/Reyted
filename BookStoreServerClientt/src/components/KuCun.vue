<template>
  <div class="box">
      <div class="name" :style="mystyleTop">{{className}}</div>
      <div class="num" :style="mystyleBom">{{num}}</div>
      <div class="unit" :style="mystyleBom">单位(册)</div>
  </div>
</template>
<script>

import '../../static/animate.css'

export default {
  name: "KuCun",
  props:{
    className:String,
    num:Number,
    mystyleTop:Object,
    mystyleBom:Object,
  }
  
};
</script>
<style scoped>
.box {
    width: 10%;
    height: 65%;

    animation:  flipInY 1s;
    /* border: 1px solid #999; */
}
.box .name {
    height: 20%;
    background: #46A1D8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    /* font-weight: bold; */
    color: #fff;
}
.box .num {
    height: 60%;
    background: #65AEDA;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #fff;
    font-size: 25px;
}
.box .unit {
    height: 20%;
    background: #65AEDA;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    padding-bottom: 5px;
    box-sizing: border-box;
}

</style>