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

        <div style="padding: 16px;height: 100%;box-sizing: border-box;">

          <el-select clearable v-model="batchComponent" placeholder="批量设置组件">
            <el-option v-for="item in componentsOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <div class="table_wrapper">
            <el-table :data="tableData" style="width: 100%" height="100%" v-loading="loading">
              <el-table-column type="selection" align="center"></el-table-column>
              <el-table-column prop="filename" label="文件名" align="center"></el-table-column>
              <el-table-column prop="format" label="格式" align="center" width="100"></el-table-column>
              <el-table-column prop="size" label="大小" align="center" width="100"></el-table-column>
              <el-table-column prop="uploadTime" label="上传时间" align="center"></el-table-column>

              <!-- 自定义治理组件列 -->
              <el-table-column label="治理组件" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.component" placeholder="--选择组件--" clearable style="width: 180px;">
                    <el-option v-for="item in componentsOptions" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="flex_center" style="height: 48px;">
            <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>

          <div style="height: 40px; display: flex; justify-content: space-between;">
            <el-button type="danger" icon="el-icon-delete">删除所选</el-button>
            <el-button type="success" icon="el-icon-caret-right">执行选中文件治理</el-button>
          </div>
        </div>

      </PanelLayout>
    </div>

  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import treeData from '@/assets/data/tree.json';
import { queryDataByCondition } from '@/api';
import { renderTreeNode } from '@/utils';

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
      },
      batchComponent: '',
      componentsOptions: [
        { label: '知识要素提取组件', value: '1' },
        { label: '关键事件提取组件', value: '2' },
        { label: '图片对象识别组件', value: '3' },
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.treeData = treeData;
    this.getTableData();
  },
  methods: {
    renderTreeNode,
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableData();
    },
    getTableData() {
      this.loading = true;
      queryDataByCondition({
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }).then(res => {
        this.loading = false;
        if (res.status === 200) {
          this.tableData = res.data.list;
          // this.tableData = [];//暂无数据
          this.total = res.data.total;
        }
      })
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

    .table_wrapper {
      height: calc(100% - 40px - 48px - 40px);
      overflow-y: auto;
    }
  }
}
</style>