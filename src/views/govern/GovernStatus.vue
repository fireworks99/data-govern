<template>
  <div class="wrapper">
    <div class="top">
      <PanelLayout title="数据治理状态" icon="line">
        <div class="intro">
          当前流数据治理节点：
          <span style="color: #10b981;font-weight: bold;">5</span>
          , 其中异常节点：
          <span style="color: #ef4444;font-weight: bold;">0</span>
        </div>

        <div class="row">
          <SatisItem color="#10b981" icon="el-icon-circle-check" title="已完成文件" :num="2000"/>
          <SatisItem color="#6b7280" icon="el-icon-time" title="未完成文件" :num="1000"/>
          <SatisItem color="#ef4444" icon="el-icon-warning" title="待核查文件" :num="100"/>
          <SatisItem color="#3b82f6" icon="el-icon-folder-opened" title="文件总数" :num="3100"/>
        </div>
      </PanelLayout>
    </div>
    <div class="bottom">
      <PanelLayout title="待核查文件列表" icon="warning"></PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import SatisItem from '@/components/SatisItem.vue';

export default {
  name: 'DataStatus',
  components: {
    PanelLayout,
    SatisItem
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

    .intro {
      background-color: #f8fafc;
      padding: 8px 12px;
      color: #6e7786;
      font-size: 14px;
      text-align: center;
    }

    .row {
      padding: 16px;
      display: flex;
      gap: 32px;
    }
  }

  .bottom {
    flex: 1;
    min-height: 0;
  }
}
</style>