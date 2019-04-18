<template>
  <div class="box">
    搜索内容：
    <input
      type="text"
      v-model.lazy="search"
      size="mini"
      placeholder="输入类名或书名或是否打折的关键字搜索"
      style="width: 30%;"
    >
    <el-table :data="tableData" height="600" border style="width: 100%;margin-top:20px;">
      <el-table-column prop="id" label="ID号" width="60"></el-table-column>
      <el-table-column prop="class" label="类名" width="60"></el-table-column>
      <el-table-column prop="bookname" label="书名" width="160"></el-table-column>
      <el-table-column prop="oldprice" label="原价" width="60"></el-table-column>
      <el-table-column prop="price" label="现价" width="60"></el-table-column>
      <el-table-column prop="kucun" label="库存" width="60"></el-table-column>
      <el-table-column prop="discountText" label="是否打折" width="100"></el-table-column>
      <el-table-column prop="mainurl" label="主海报" width="350"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ShangPinGuanLi",
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  watch: {
    //监听搜索框中是否有内容的变化，用了懒加载，如果有变化，则将搜索框中的数据通过ajax发送给后端
    search: function(newdata) {
      //   console.log(newdata);
      axios
        .get("http://localhost:7778/search-className-bookName", {
          params: {
            searchText: newdata
          }
        })
        .then(response => {
          //更新满足搜索内容的表格数据
          this.tableData = response.data;
          //给每本书添加一个书名号
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].bookname =
              "《" + this.tableData[i].bookname + "》";
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted: function() {
    /**
     * 发送ajax获取商品管理 的数据
     */
    axios
      .get("http://localhost:7778/get-ShangPinGuanLi-Data", {
        params: {
          //   test: "这是测试数据ly",
        }
      })
      .then(response => {
        // console.log(response.data);
        this.tableData = response.data;
        //给每本书添加一个书名号
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].bookname = "《" + this.tableData[i].bookname + "》";
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleEdit(index, row) {
      //   console.log(index, row);
      this.$router.push({ path: "Editor", query: { data: row } });
    },
    handleDelete(index, row) {
      if (confirm("确定要下架该商品吗?")) {
        /**
         * 如果确定下架 用ajax将 商品的id发送给服务器端，软后服务器 删除该商品
         */
        axios
          .get("http://localhost:7778/delete-goods-byId", {
            params: {
              id: row.id
            }
          })
          .then(response => {
            // console.log(response.data);
            if (response.data.affectedRows) {
              //   alert("下架成功！");

              //下架成功后，从新获取数据库中的数据
              /**
               * 发送ajax获取商品管理 的数据
               */
              axios
                .get("http://localhost:7778/get-ShangPinGuanLi-Data", {
                  params: {
                    //   test: "这是测试数据ly",
                  }
                })
                .then(response => {
                  // console.log(response.data);
                  this.tableData = response.data;
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              alert("下架失败，请重新操作！");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return;
      }
    }
  }
};
</script>
<style scoped>
.box {
  width: 1090px;
  margin: 0 auto;
}
.box input {
  padding-left: 8px;
  height: 30px;
  /* border-radius: 20px; */
}
</style>


