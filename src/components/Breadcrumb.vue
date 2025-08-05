<template>
  <div class="breadcrumb_wrapper">
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb"
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.breadcrumb_wrapper {
  height: $header-height;
  padding: $header-padding;
  box-sizing: border-box;

  .content {
    height: $bread-height;
    display: flex;
    align-items: center;
    padding-left: 32px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(128, 128, 128, 0.2);
  }
  
}
</style>