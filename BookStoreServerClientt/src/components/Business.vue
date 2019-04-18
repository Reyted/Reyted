<template>
  <div class="box">
    <div class="money-box">
      <h3>营业状况</h3>
      <div class="money">
        <my-money
          v-for="(item,index) in moneyArray"
          :key="index"
          :title="item.title"
          :money="item.money"
          :unit="item.unit"
          :style="item.background"
        ></my-money>
      </div>
    </div>
    <div class="bookclass-box">
      <h3>分类库存</h3>
      <div class="bookclass">
        <my-kucun
          v-for="(item,index) in bookclassArray"
          :key="index"
          :className="item.className"
          :num="item.num"
          :mystyleTop="item.backgroundTop"
          :mystyleBom="item.backgroundBom"
        ></my-kucun>
      </div>
    </div>
  </div>
</template>
<script>
import Money from "./Money";
import KuCun from "./KuCun";
import TwoCode from "./TwoCode";
import axios from "axios";
export default {
  name: "Business",
  components: {
    "my-money": Money,
    "my-kucun": KuCun,
    "my-twocode": TwoCode
  },
  methods: {
    //获取交易表中所有的金额之和，得到总金额
    getAllMoney: function() {
      var allmoney = 0;
      for (var i = 0; i < this.serviceData.length; i++) {
        allmoney += this.serviceData[i].money;
      }
      //保留两位小数
      return Number(allmoney.toFixed(2));
    },
    //获取交易表中 今日 的金额之和，得到 今日营业额
    getTodayMoney: function() {
      var todaymoney = 0;
      for (var i = 0; i < this.serviceTodayData.length; i++) {
        todaymoney += this.serviceTodayData[i].money;
      }
      //保留两位小数
      return Number(todaymoney.toFixed(2));
    },
    //获取订单总量
    getAllDingdan: function() {
      return this.serviceData.length;
    },
    //获取 今日 订单量
    getTodayDingdan: function() {
      return this.serviceTodayData.length;
    },

    /**
     * 让营业额和订单量里面的数据跑起来   动画效果
     */
    numRun: function() {
      var num0 = this.moneyArray[0].money;
      this.moneyArray[0].money = 0;

      var num1 = this.moneyArray[1].money;
      this.moneyArray[1].money = 0;

      var num2 = this.moneyArray[2].money;
      this.moneyArray[2].money = 0;

      var num3 = this.moneyArray[3].money;
      this.moneyArray[3].money = 0;

      var mytime0 = setInterval(() => {
        this.moneyArray[0].money += 11;
        if (this.moneyArray[0].money >= num0) {
          clearInterval(mytime0);
          this.moneyArray[0].money = num0;
        }
      }, 10);
      var mytime1 = setInterval(() => {
        this.moneyArray[1].money += 1;
        if (this.moneyArray[1].money >= num1) {
          clearInterval(mytime1);
          this.moneyArray[1].money = num1;
        }
      }, 10);
      var mytime2 = setInterval(() => {
        this.moneyArray[2].money += 111;
        if (this.moneyArray[2].money >= num2) {
          clearInterval(mytime2);
          this.moneyArray[2].money = num2;
        }
      }, 10);
      var mytime3 = setInterval(() => {
        this.moneyArray[3].money += 2;
        if (this.moneyArray[3].money >= num3) {
          clearInterval(mytime3);
          this.moneyArray[3].money = num3;
        }
      }, 10);
    }
  },
  //组件挂载完成生命周期函数
  mounted: function() {
    // console.log(this.$cookieStore.getCookie("name"))
    // console.log("name" in this.$cookieStore.getCookie("name"))
    /**
     * 发送ajax获取 今日营业额 \ 今日订单量
     */
    var time = new Date().toLocaleDateString();
    // console.log(time);
    axios
      .get("http://localhost:7778/get-jiaoyi-todayData", {
        params: {
          time:time,
        }
      })
      .then(response => {
        // console.log(response.data);
        //将从数据库中查询到的今日订单的数据 存到data中
        this.serviceTodayData=response.data;
        //调用获取 今日 订单量的函数
        this.moneyArray[1].money=this.getTodayDingdan();
        //调用获取 今日 营业额的函数
        this.moneyArray[0].money=this.getTodayMoney();
      })
      .catch(error => {
        console.log(error);
      });
    /**
     * 发送ajax获取 总营业额 \ 总订单量
     */
    axios
      .get("http://localhost:7778/get-jiaoyi-allData", {
        params: {
          // test: "这是测试数据ly",
        }
      })
      .then(response => {
        // console.log(response);
        //获取从后台返回的对象类型的数组 数据
        //将这个数据存到vue的data当中
        this.serviceData = response.data;

        //调用获得总金额函数，并存入data中
        this.moneyArray[2].money = this.getAllMoney();
        //调用获得总订单函数，并存入data中
        this.moneyArray[3].money = this.getAllDingdan();
        //调用让数字跑起来的函数
        this.numRun();
      })
      .catch(error => {
        console.log(error);
      });

    /**
     * 发送ajax获取分类图书的 库存
     */
    axios
      .get("http://localhost:7778/get-class-kucun", {
        params: {
          // test: "这是测试数据ly",
        }
      })
      .then(response => {
           console.log(response.data);
        //将获取的数据依次放入bookclassArray数组的num中
        for(var i=0;i<this.bookclassArray.length;i++){
          for(var j=0;j<response.data.length;j++){
            if(this.bookclassArray[i].className==response.data[j].class){
              this.bookclassArray[i].num = response.data[j].allnum;
              if(response.data[j].allnum<20){
                this.bookclassArray[i].backgroundTop=this.classKucunBuzuStyle.backgroundTop;
                this.bookclassArray[i].backgroundBom=this.classKucunBuzuStyle.backgroundBom;
              }
            }
          }
        }
        for(var k=0;k<this.bookclassArray.length;k++){
          if(this.bookclassArray[k].num==0){
             this.bookclassArray[k].backgroundTop=this.classKucunBuzuStyle.backgroundTop;
             this.bookclassArray[k].backgroundBom=this.classKucunBuzuStyle.backgroundBom;
          }
        }

      })
      .catch(error => {
        console.log(error);
      });
  },
  data: function() {
    return {
      //用来存放从数据库中返回来的数据
      serviceData: [],
      //用来存从数据库中查询到的今日订单的数据
      serviceTodayData:[],
      //用单存放订单的总量
      allDingdan: 0,
      //当每类图书的库存量低于20本时，使用下面的警告样式
      classKucunBuzuStyle: {
        backgroundTop: {
          background: "#FD684A"
        },
        backgroundBom: {
          background: "#F88068"
        }
      },
      moneyArray: [
        {
          title: "今日营业额",
          money: 0,
          unit: "￥",
          background: {
            background: "#4DA0FE"
          }
        },
        {
          title: "今日订单",
          money: 0,
          unit: "单",
          background: {
            background: "#FFBD60"
          }
        },
        {
          title: "总营业额",
          money: 0,
          unit: "￥",
          background: {
            background: "#3EDEBC"
          }
        },
        {
          title: "总订单量",
          money: 0,
          unit: "单",
          background: {
            background: "#9C86E5"
          }
        }
      ],

      bookclassArray: [
        {
          className: "童书",
          num: 0,
          backgroundTop: {
            background: "#1BAAA5"
          },
          backgroundBom: {
            background: "#43B5B1"
          }
        },
        {
          className: "小说",
          num: 0,
          backgroundTop: {
            background: "#1CCF6B"
          },
          backgroundBom: {
            background: "#43D383"
          }
        },
        {
          className: "文学",
          num: 0,
          backgroundTop: {
            background: "#46A1D8"
          },
          backgroundBom: {
            background: "#65AEDA"
          }
        },
        {
          className: "励志",
          num: 0,
          backgroundTop: {
            background: "#816AE0"
          },
          backgroundBom: {
            background: "#8E7AE1"
          }
        },
        {
          className: "养生",
          num: 0,
          backgroundTop: {
            background: "#55CED7"
          },
          backgroundBom: {
            background: "#83D1D7"
          }
        },
        {
          className: "动漫",
          num: 0,
          backgroundTop: {
            background: "#1BAAA5"
          },
          backgroundBom: {
            background: "#43B5B1"
          }
        },
        {
          className: "时尚",
          num: 0,
          backgroundTop: {
            background: "#75D446"
          },
          backgroundBom: {
            background: "#94DD70"
          }
        },
        {
          className: "科普",
          num: 0,
          backgroundTop: {
            background: "#46A1D8"
          },
          backgroundBom: {
            background: "#65AEDA"
          }
        }
      ]
    };
  }
};
</script>
<style scoped>
.box {
  /* width: 1110px; */
  width: 100%;
  height: 100%;
  /* background-color: red; */

}
.box .money-box {
  /* background: #f5f7f9; */
  padding: 20px;
  height: 40%;
}
.box .bookclass-box {
  /* background-color: #f5f7f9; */
  padding: 20px;
  height: 40%;

  margin-top: 30px;
}
.box h3 {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
}
.box .money {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  height: 100%;
}
.box .bookclass {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>