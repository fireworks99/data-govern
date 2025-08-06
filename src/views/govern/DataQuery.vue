<template>
  <div class="wrapper">
    <div class="top">
      <PanelLayout title="查询条件" icon="filter">
        <div style="padding: 16px; box-sizing: border-box;">

          <div class="row">
            <FilterItem title="阶段" icon="el-icon-menu">
              <el-input></el-input>
            </FilterItem>
            <FilterItem title="平台" icon="el-icon-menu">
              <el-input></el-input>
            </FilterItem>
            <FilterItem title="治理组件" icon="el-icon-menu">
              <el-input></el-input>
            </FilterItem>
          </div>

          <div class="row">
            <FilterItem title="数据格式" icon="el-icon-menu">
              <el-input></el-input>
            </FilterItem>
            <FilterItem title="时间范围" icon="el-icon-menu">
              <el-input></el-input>
            </FilterItem>
            <FilterItem>
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button icon="el-icon-refresh-right">重置</el-button>
            </FilterItem>
          </div>
          
        </div>
      </PanelLayout>
    </div>
    <div class="bottom">
      <PanelLayout title="查询结果" icon="result"></PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import FilterItem from '@/components/FilterItem.vue';

export default {
  name: 'DataQuery',
  components: {
    PanelLayout,
    FilterItem
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  gap: 16px;

  .top {

    .row {
      display: flex;
      gap: 32px;

      &:not(:last-child) {
        margin-bottom: 12px;
      }

      >div {
        flex: 1;
      }
    }
  }

  .bottom {
    flex: 1;
  }
}
</style>