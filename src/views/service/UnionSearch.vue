<template>
  <div class="wrapper">
    <div class="search">
      <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="word" class="selfdefine">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
      <div style="font-size: 14px; margin-top: 16px;">
        <span style="margin-right: 8px;">搜索策略：</span>
        <el-radio v-model="radio" label="1">模糊查询</el-radio>
        <el-radio v-model="radio" label="2">精准查询</el-radio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnionSearch',
  data() {
    return {
      word: '',
      radio: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;

  .search {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(128, 128, 128, 0.2);
    border-radius: 4px;
    padding: 16px;
  }
}
</style>

<style lang="scss">
.selfdefine {
  .el-input-group__append {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>