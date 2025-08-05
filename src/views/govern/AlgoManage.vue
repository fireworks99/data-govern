<template>
  <div class="wrapper">
    <div class="left">
      <PanelLayout title="算法模型库" icon="model">
        <template slot="right">
          <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
        </template>
      </PanelLayout>
    </div>
    <div class="right">
      <div class="top">
        <PanelLayout title="组件流程编排" icon="share">
          <template slot="right">
            <el-button icon="el-icon-folder-checked" size="small">保存</el-button>
            <el-button icon="el-icon-folder-opened" size="small">加载</el-button>
            <el-button type="primary" icon="el-icon-video-play" size="small">运行</el-button>
          </template>
        </PanelLayout>
      </div>
      <div class="bottom">
        <PanelLayout title="治理组件列表" icon="manage_list">
          <template slot="right">
            <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
          </template>
        </PanelLayout>
      </div>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';

export default {
  name: 'AlgoManage',
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
  }

  .right {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .top {
      flex: 1;
    }

    .bottom {
      flex: 1;
    }
  }

}
</style>