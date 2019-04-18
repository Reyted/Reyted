<template>
  <div>
    <h3 style="padding-bottom:20px">请修改商品内容：</h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="类名" width="60">
        <input type="text" v-model="bookclass" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="书名" width="160">
        <input type="text" v-model="bookname" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="原价" width="60">
        <input type="number" v-model="oldprice" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="现价" width="60">
        <input type="number" v-model="price" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="库存" width="60">
        <input type="number" v-model="kucun" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="是否打折" width="100">
        <input type="text" v-model="discountText" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="主海报" width="400">
        <input type="text" v-model="mainurl" style="border:0;background:transparent">
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div>{{this.$route.query.data}}</div> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Editor",
  data() {
    return {
      tableData: [{}],
      bookclass: "",
      bookname: "",
      oldprice: "",
      price: "",
      kucun: "",
      discountText: "",
      mainurl: ""
    };
  },
  methods: {
    handleSave() {
      //将输入的“是”和“否”转换为相应的“0”和“1”，再存入数据库
      if(this.discountText=="是"){
          this.discountText=0;
      }
      if(this.discountText=="否"){
          this.discountText=1;
      }
      //将输入的图书类名转换为相应的数字编号后，再存入数据库
      switch(this.bookclass){
          case "童书":this.bookclass=1;break;
          case "小说":this.bookclass=2;break;
          case "文学":this.bookclass=3;break;
          case "励志":this.bookclass=4;break;
          case "养生":this.bookclass=5;break;
          case "动漫":this.bookclass=6;break;
          case "时尚":this.bookclass=7;break;
          case "科普":this.bookclass=8;break;
      }
      /**
       * 将修改过后的商品数据 通过ajax发送给后台
       */
      axios
        .get("http://localhost:7778/save-ShangPinGuanLi-Data", {
          params: {
            id:this.$route.query.data.id,
            bookclass:this.bookclass,
            bookname:this.bookname,
            oldprice:this.oldprice,
            price:this.price,
            kucun:this.kucun,
            discountText:this.discountText,
            mainurl:this.mainurl,
          }
        })
        .then(response => {
        //   console.log(response);
        if(response.data.affectedRows){
            alert("保存成功！");
            this.$router.push({ path: 'ShangPinGuanLi' })
        }else{
            alert("保存失败，请重新操作！");
        }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.bookclass = this.$route.query.data.class;
    this.bookname = this.$route.query.data.bookname;
    this.oldprice = this.$route.query.data.oldprice;
    this.price = this.$route.query.data.price;
    this.kucun = this.$route.query.data.kucun;
    this.discountText = this.$route.query.data.discountText;
    this.mainurl = this.$route.query.data.mainurl;
  }
};
</script>
<style scoped>
input {
  size: 300px !important;
  /* background-color: aquamarine !important; */
  width: 370px !important;
}
</style>

