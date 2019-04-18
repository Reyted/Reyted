<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header">
      <div class="layui-logo">BookStore后台管理</div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item">
          <router-link to="/Business">营业状况</router-link>
        </li>
        
        <li class="layui-nav-item">
          <router-link to="/">管理员信息</router-link>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          <a href="javascript:;">
            <img :src="headphoto" class="layui-nav-img">
            <span>{{username}}</span>
          </a>
          <dl class="layui-nav-child">
            <dd>
              <a href>基本资料</a>
            </dd>
            <dd>
              <a href>安全设置</a>
            </dd>
          </dl>
        </li>
        <li class="layui-nav-item">
          <a href>退了</a>
        </li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree" lay-filter="test">
          <li class="layui-nav-item">
            <!-- <a href>发布商品</a> -->
            <router-link to="/AddGoods">添加商品</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/ShangPinGuanLi">商品管理</router-link>
          </li>
          
        </ul>
      </div>
    </div>

    <div class="layui-body">
      <!-- 内容主体区域 -->
      <div style="padding: 30px;" class="mybox">
        <router-view></router-view>
      </div>
    </div>

    <div class="layui-footer">
      <!-- 底部固定区域 -->
      © layui.com - 底部固定区域
    </div>
  </div>
</template>
<script>
export default {
  name: "ServerClient",
  data:function(){
      return {
          BookClassArr:["童书","小说","文学","励志","养生","动漫","时尚","科普"],
          headphoto:"",
          username:'reyted'
      }
  },
  mounted: function() {
    layui.use("element", function() {
      var element = layui.element;
    });
  }
};
</script>
<style>
  .mybox {
    height: 88%;
  }
</style>


