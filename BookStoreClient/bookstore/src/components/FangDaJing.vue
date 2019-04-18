<template>
  <div class="box">
    <div class="pic-zoom">
      <pic-zoom :url="mainPictureUrl" :scale="2.5"></pic-zoom>
    </div>
    <div class="pic-small-box">
      <div class="pic-small" v-for="(item,index) in pictureUrlArray" :key="index">
        <img :src="item" alt @mouseenter="mouseenter">
      </div>
    </div>
  </div>
  
</template>
<script>
import PicZoom from "vue-piczoom";
import $ from "jquery";
import axios from "axios"
export default {
  name: "Buy",
  components: {
    PicZoom
  },
  props:{
    bookidFangdajing:Number,
  },
  data: function() {
    return {
      //放小图片的数组
      pictureUrlArray: ["","","","",""],
      //放大图片的变量
      mainPictureUrl: "",
    };
  },
  methods: {
    //监听鼠标移动至那个小图片时，就将它的图片地址拿给放大图片的变量
    mouseenter: function(ev) {
      //   console.log(ev.toElement.currentSrc)
      this.mainPictureUrl = ev.toElement.currentSrc;
    }
  },
  mounted: function() {
    /**
     * 发送ajax获取 小图片的地址
     */
    axios
      .get("http://localhost:7778/get-smallpicture-url", {
        params: {
          id: this.bookidFangdajing,
        }
      })
      .then(response => {
        // console.log(response);
        //将返回的图片地址push到pictureUrlArray数组中
        var obj = response.data[0]
        this.pictureUrlArray=Object.values(obj)

        //默认将小图片数组中的第一个元素设置为大图片
        this.mainPictureUrl = this.pictureUrlArray[0];

        //默认将第一个小图添加一个边框样式
        $(".pic-small:first-child").addClass("mouseenterStyle");
        //当鼠标移至哪个小图时，就给它添加一个边框样式
        $(".pic-small").mouseenter(function() {
          $(this).siblings().removeClass("mouseenterStyle");
          $(this).addClass("mouseenterStyle");
        });
      })
      .catch(error => {
        console.log(error);
      });

    
    
  }
};
</script>
<style scoped>
/* .box {

} */
.box .pic-zoom {
  width: 418px;
  height: 418px;
  /* border: 1px solid #eee; */
}
.box .pic-small-box {
  height: 60px;
  width: 418px;
  /* background: red; */
  padding-left: 30px;
  margin-top: 10px;
  display: flex;
}
.box .pic-small-box .pic-small {
  width: 60px;
  height: 60px;
  /* background: blue; */
  margin-left: 10px;
  box-sizing: border-box;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box .pic-small-box .pic-small img {
  width: 53px;
  height: 53px;
}
.mouseenterStyle {
  border: 2px solid #999;
}
</style>


