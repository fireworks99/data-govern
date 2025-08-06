<template>
  <div class="wrapper">

    <div class="left">
      <PanelLayout title="采集布局">
        <template slot="right">
          <div class="white-btn flex_center live-btn"><i class="el-icon-plus"></i></div>
          <div class="white-btn flex_center live-btn"><i class="el-icon-refresh"></i></div>
        </template>
        <div class="intro">层级结构: 任务 > 阶段 > 平台</div>
        <div class="tree_wrapper">
          <el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
            :render-content="renderTreeNode" :props="defaultProps">
          </el-tree>
        </div>
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
import treeData from '@/assets/data/tree.json';

export default {
  name: 'DataGovern',
  components: {
    PanelLayout
  },
  data() {
    return {
      treeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.treeData = treeData;
  },
  methods: {
    renderTreeNode(h, { node, data, store }) {
      // const isLeaf = !data.children || data.children.length === 0;
      const isLeaf = data.id.length > 5;

      return h(
        'span',
        {
          class: 'custom-tree-node'
        },
        [
          // h('i', {
          //   class: isLeaf ? 'el-icon-document' : 'el-icon-folder'
          // }),
          h('span', null, isLeaf ? '📄' : '📁'),
          h('span', { style: 'margin-left: 5px;' }, node.label)
        ]
      );
    }
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

    .intro {
      background-color: #f8fafc;
      padding: 8px 12px;
      color: #6e7786;
      font-size: 14px;
    }

    .tree_wrapper {
      padding: 12px;
    }
  }

  .right {
    flex: 3;
  }
}
</style>