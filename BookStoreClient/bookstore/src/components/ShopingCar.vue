<template>
  <div style="width:1200px;margin:0 auto;">
    <div class="box" v-if="this.shopingCarArray.length>0">
      <div class="title">
        <div class="shangpin-box">
          <el-checkbox
            class="checkbox"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div class="inf">商品信息</div>
        </div>

        <div class="unit-price">单价</div>
        <div class="nums">数量</div>
        <div class="subtotal">小计（元）</div>
        <div class="operation">操作</div>
      </div>
      <div class="car-box">
        <!-- 循环购物车中的商品 -->
        <div class="car" v-for="(item,index) in shopingCarArray" :key="index">
          <div class="checkbook">
            <el-checkbox-group v-model="checkList" @change="handleCheckedBookChange">
              <el-checkbox :label="item.bookid">{{test}}</el-checkbox>
            </el-checkbox-group>
            <div class="information">
              <div class="picture">
                <img :src="item.mainurl" alt>
              </div>
              <div class="text">
                <span>{{item.bookname}}   {{item.introd}}</span>
              </div>
            </div>
          </div>

          <div class="unitprice">￥{{item.price.toFixed(2)}}</div>
          <div class="numbers">
            <el-input-number
              v-model="item.number"
              size="small"
              @change="handleChange"
              :min="1"
              :max="item.kucun"
            ></el-input-number>
          </div>
          <div class="price">￥{{(item.price*item.number).toFixed(2)}}</div>
          <div class="delete">
            <el-button @click="del(item.bookid)" type="danger" size="mini" icon="el-icon-delete"></el-button>
          </div>
        </div>
      </div>
      <!-- 结算框 -->
      <div class="jieSuan">
        <el-checkbox
          class="checkbox"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>

        <div class="selectNum">
          已选中
          <span style="color:red">{{selectnum}}</span>件
        </div>

        <div class="alldelete">
          删除选中商品：
          <el-button @click="deleteall" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </div>

        <!-- 满99包邮，没满运费统一6元 -->
        <div class="yunfei" v-if="allprice<99">
          <span>运费：￥6</span>
          <span style="margin-left:30px;">
            还差
            <span style="color:red">{{(99-allprice).toFixed(2)}}</span>元免运费
          </span>
          <router-link to="/" style="color:red">去凑单</router-link>
        </div>
        <div class="freeyunfei" v-else>已享满99免运费</div>
        <div class="allprice">
          总价（含运费）：
          <span style="color:red">￥</span>
          <span
            style="color:red;font-size:25px;font-weight:bold"
          >{{this.checkList!=0?((allprice>=99?Number(allprice):6+Number(allprice)).toFixed(2)):0}}</span>
        </div>
        <el-button class="buttonx" @click="gotoPayment">去结算</el-button>
      </div>
    </div>
    <!-- 购物车为空时，显示下面的界面 -->
    <div class="empty" v-else>
      <div class="emp-box">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554974461595&di=0593609ba8d8f3d5e91da18a7dd414bc&imgtype=0&src=http%3A%2F%2Fwww.mayiyanghuo.com%2Fhaigou%2Fimages%2FshopCartEmpty.jpg"
          alt
        >
        <p>
          购物车还是空空得呢，快去
          <router-link to="/">
            <span>首页</span>
          </router-link>逛逛吧~~~
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
var bookOptions = [];
export default {
  name: "ShopingCar",
  data() {
    return {
      isIndeterminate: true,
      //默认全部选中
      checkAll: true,
      //让购物车中的复选框的后面设为空值
      test: null,
      //复选框选中的数据
      checkList: [],
      //装从数据库中查到的购物车当中的数据
      shopingCarArray: [],
      isempty: false,
      uid:null,
      num:0
    };
  },
  methods: {
    // 计数器
    handleChange(value) {
      // console.log(value);
    },
    handleCheckAllChange(val) {
      this.checkList = val ? bookOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedBookChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === bookOptions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < bookOptions.length;
    },
    //点击去结算按钮  带参数：uid 、选中商品的Id（checkList） 、每件选中商品的数量
    gotoPayment(){
      //可以得到购物车中所有的数据
      console.log(this._data)
      //声明一个临时数组，该数组中装购物车中，选中商品的bookid、选中商品的数量，并将这个数组中的数据转到 付款页面
      var tempArray=[];
      // var checkList = this._data.checkList;
      var shopingCarArray = this._data.shopingCarArray;
      var checkListx = this._data.checkList;
      //双重循环可以遍历出，选中商品的信息
      for(var i=0;i<checkListx.length;i++){
        for(var j=0;j<shopingCarArray.length;j++){
          if(checkListx[i]==shopingCarArray[j].bookid){
            //将选中商品的bookid、选中商品的数量，装入这个临时数组中
            tempArray.push({bookid:checkListx[i],booknum:shopingCarArray[j].number})
          }
        }
      }
      // console.log(textArray)
      // 获取当前的总金额
      // var allmoney = en.path[2].children[4].lastChild.innerText
      //当都没有选中商品时，点击按钮不会跳转
      if(this.checkList.length == 0){
        return
      }else{
        //当有商品选中时，点击按钮可以跳转到付款页面，并将用户的Id，选中图书的Id和数量传到付款页面去
        this.$router.push({path:"Payment",query:{uid:this.uid,selectBookArray:tempArray}})
      }
    },
    //删除单个商品
    del(bookid) {
      //bookid为删除书的id
      /**
       * 发送ajax
       */
      axios
        .get("http://localhost:7778/delete-singleShoppingCar", {
          params: {
            uid: this.uid,
            bookid: bookid
          }
        })
        .then(response => {
         	
          //删除成功以后，将shopingCarArray数组中bookid为bookid（上面del的实参）的那条数据删除
          //临时保存数组
          this.num-=1;
          this.$route.query.updateNum(this.num);
          var tem = [];
          this.shopingCarArray.forEach(element => {
            if (element.bookid != bookid) {
              tem.push(element);
            }
          });
          this.shopingCarArray = tem;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除选中商品
    deleteall() {
      /**
       * 发送ajax
       */
      if (this.checkList == 0) {
        alert("您没有选中任何商品哦~~");
      } else {
      	
      	this.$confirm('是否删除所有物品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       }).then(() => {
          axios
            .get("http://localhost:7778/delete-selectShoppingCar", {
              params: {
                uid: this.uid,
                bookid: this.checkList
              }
            })
            .then(response => {
              /**
               * 发送ajax 根据用户的uid 获取 购物车中的信息 书Id 书名 简介 图片地址 单价 数量
               */
              axios
                .get("http://localhost:7778/get-shoppingcar", {
                  params: {
                    uid: this.uid
                  }
                })
                .then(response => {
                  // console.log(response.data);
                  //将从数据库中查询的结果设置在data中的shopingCarArray数组中
                  this.$route.query.updateNum(0)
                  this.shopingCarArray = response.data;
                  bookOptions = [];
                  //遍历shopingCarArray数组，将每个元素的id号存入checkList数组中
                  for (var i = 0; i < this.shopingCarArray.length; i++) {
                    bookOptions.push(this.shopingCarArray[i].bookid);
                  }
                  this.checkList = bookOptions;
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
       }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
       });
      }
    }
  },
  computed: {
    //计算总价格函数
    allprice: function() {
      var allmoney = 0;
      for (var i = 0; i < this.checkList.length; i++) {
        for (var j = 0; j < this.shopingCarArray.length; j++) {
          if (this.checkList[i] == this.shopingCarArray[j].bookid) {
            allmoney +=
              this.shopingCarArray[j].price * this.shopingCarArray[j].number;
          }
        }
      }
      //保留两位小数
      return allmoney.toFixed(2);
    },
    //选中几件商品函数
    selectnum: function() {
      var selectnum = 0;
      for (var i = 0; i < this.checkList.length; i++) {
        for (var j = 0; j < this.shopingCarArray.length; j++) {
          if (this.checkList[i] == this.shopingCarArray[j].bookid) {
            selectnum += this.shopingCarArray[j].number;
          }
        }
      }
      return selectnum;
    }
  },
  mounted: function() {
    this.uid=this.$route.query.uid;
    this.num=this.$route.query.num;
    console.log(this.uid)
    /**
     * 发送ajax 根据用户的uid 获取 购物车中的信息 书Id 书名 简介 图片地址 单价 数量
     */
    bookOptions=[]
    axios
      .get("http://localhost:7778/get-shoppingcar", {
        params: {
          uid: this.uid
        }
      })
      .then(response => {
           console.log(response.data);
        //将从数据库中查询的结果设置在data中的shopingCarArray数组中
        this.shopingCarArray = response.data;

        //遍历shopingCarArray数组，将每个元素的id号存入checkList数组中
        for (var i = 0; i < this.shopingCarArray.length; i++) {
          bookOptions.push(this.shopingCarArray[i].bookid);
        }
        this.checkList = bookOptions;
      })
      .catch(error => {
        console.log(error);
      });
  },
  watch: {
    //监听购物车中的商品是否都没有选中，
    checkList: function(temp) {
      //如果都没有选中
      if (temp.length == 0) {
        //给“去结算”按钮添加一个disabled属性，禁止使用该按钮
        $(".buttonx").addClass("is-disabled");
        $(".buttonx").addClass("is-jiesuan");
        $(".buttonx").attr("title", "请至少选中一件商品，再去结算");
      } else if ($(".buttonx").hasClass("is-disabled") && temp.length != 0) {
        $(".buttonx").removeClass("is-disabled");
        $(".buttonx").removeClass("is-jiesuan");
        $(".buttonx").attr("title", "");
      }
    }
  }
};
</script>
<style scoped>
.xxxx {
  background: red !important;
}
.box {
  width: 1190px;
  margin: 0 auto;
}
.box .title {
  width: 100%;
  height: 32px;
  /* background-color: aqua; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  border: 1px solid #eee;
  border-top: 4px solid #eee;
}
.text{
	overflow: hidden;
}
.box .title .checkbox {
  margin-left: 3.45%;
}
.box .title .inf {
  margin-left: 10%;
}
.box .title .unit-price {
  margin-left: 55px;
  width: 100px;
}
.box .title .nums {
  margin-left: 50px;
  width: 130px;
}
.box .title .subtotal {
  /* margin-left: 13.5%; */
  width: 100px;
}
.box .title .operation {
  /* margin-left: 9%; */
  width: 44px;
}
.box .title div {
  color: #666;
}
.box .car-box {
  margin-top: 50px;
}
.box .car {
  width: 100%;
  height: 110px;
  border: 1px solid #eee;
  margin-top: -1px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fffbf2;
}
.box .car-box .car .checkbook {
  display: flex;
  align-items: center;
  padding-right: 70px;
}
.box .car-box .car .information {
  display: flex;
  align-items: center;
  margin-left: 20px;
  /* background-color: red; */
}
.box .car-box .car .picture {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  /* background-color: red; */
}
.box .car-box .car .picture img {
  width: 100%;
  height: 100%;
}
.box .car-box .car .text {
  font-size: 12px;
  width: 200px;
  height: 62px;
  /* background-color: aqua; */
  overflow: hidden;
  margin-left: 20px;
}
.box .car-box .car .unitprice {
  /* background-color: red; */
  width: 100px;
  text-align: center;
}
.box .car-box .car .price {
  font-weight: bold;
  /* background-color: red; */
  width: 100px;
  text-align: center;
}
.box .jieSuan {
  width: 100%;
  height: 60px;
  border: 1px solid #eee;
  margin-top: 50px;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
}
.box .jieSuan .alldelete {
  margin-left: 30px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
}
.box .jieSuan .selectNum {
  margin-left: 50px;
}
.box .jieSuan .yunfei {
  width: 300px;
  /* background-color: aqua; */
  margin-left: 100px;
}
.box .jieSuan .freeyunfei {
  margin-left: 220px;
}
.box .jieSuan .allprice {
  height: 100%;
  line-height: 55px;
  margin-left: 30px;
  /* background:chartreuse; */
  position: absolute;
  right: 160px;
}
.box .jieSuan .buttonx {
  height: 100%;
  width: 120px;
  background-color: red;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
  text-decoration: none;
  position: absolute;
  right: 0;
  border-radius: 0;
  border: 0;
  line-height: 38px !important;
}
.box .jieSuan .is-jiesuan {
  opacity: 0.2;
}
.checkbox {
  margin-left: 40px;
}
.shangpin-box {
  display: flex;
  width: 416px;
}
.empty {
  /* background-color: aqua; */
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.empty .emp-box {
  display: flex;
  align-items: center;
  /* background-color: red; */
}
.empty .emp-box p {
  margin-left: 50px;
}
.empty .emp-box p span {
  display: inline-block;
  padding: 3px 8px;
  background-color: #f60;
  color: #fff;
  border-radius: 5px;
}
.empty img {
  width: 200px;
  height: 200px;
}
</style>


