<template>
  <div class="wrapper">
    <div class="left">
      <PanelLayout title="采集布局">
        <template slot="right">
          <div class="white-btn flex_center live-btn"><i class="el-icon-plus"></i></div>
          <div class="white-btn flex_center live-btn"><i class="el-icon-refresh"></i></div>
        </template>
      </PanelLayout>
    </div>
    <div class="right">
      <PanelLayout title="文件列表" icon="list">

      </PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';

export default {
  name: 'DataGovern',
  components: {
    PanelLayout
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  gap: 16px;

  .left {
    flex: 1;

    .white-btn {
      background-color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 8px;
    }
  }

  .right {
    flex: 3;
  }
}
</style>