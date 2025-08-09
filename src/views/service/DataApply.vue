<template>
  <div class="wrapper">
    <div class="left">
      <PanelLayout title="采集布局">
        <template slot="right">
          <div class="white-btn flex_center live-btn"><i class="el-icon-plus"></i></div>
          <div class="white-btn flex_center live-btn"><i class="el-icon-refresh"></i></div>
        </template>
        <div class="intro">层级结构: 任务 > 阶段 > 平台</div>
        <div class="intro" style="display: flex;">
          <div style="white-space: nowrap;" class="flex_center">选择任务：</div>
          <el-select placeholder="请选择" v-model="value" size="small">
            <el-option label="任务1" value="1"></el-option>
          </el-select>
        </div>
        <div class="intro">
          <el-input placeholder="输入节点名称进行查询..." prefix-icon="el-icon-search" v-model="input" clearable size="small"></el-input>
        </div>
        <div class="tree_wrapper">
          <el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
            :render-content="renderTreeNode" :props="defaultProps" @check-change="handleCheckChange">
          </el-tree>
        </div>
      </PanelLayout>
    </div>
    <div class="right">
      <div class="top">
        <PanelLayout title="申领表" icon="fill">
          <div style="padding: 16px; box-sizing: border-box;">
            <FilterItem title="申领标题">
              <el-input v-model="title" placeholder="请输入申领标题" clearable></el-input>
            </FilterItem>

            <div class="separator"></div>

            <FilterItem title="数据描述">
              <el-input type="textarea" :rows="2" v-model="description" placeholder="请描述需要申领的数据内容"></el-input>
            </FilterItem>

            <div class="separator"></div>

            <FilterItem title="使用目的">
              <el-input type="textarea" :rows="2" v-model="aim" placeholder="请说明数据使用目的"></el-input>
            </FilterItem>

            <div style="margin-top: 12px;">
              <div style="font-size: 14px;color: #6e7786;margin-bottom: 8px;">申领文件列表</div>
              <div class="list_wrapper">
                <div style="max-height: 80px; overflow-y: auto;">
                  <div class="list_item" v-for="item in selectedFiles" :key="item.id">
                    <div>📄{{ item.label }}</div>
                    <div style="display: flex;">
                      <div>{{ item.size }}MB</div>
                      <div style="margin: auto 8px; color: #ef4447; cursor: pointer;"
                        @click="() => removeFile(item.id)">
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="total">
                  <div>共{{ selectedFiles.length }}个文件</div>
                  <div>总大小: {{ totalSize }}MB</div>
                </div>
              </div>
            </div>

            <div style="margin-top: 12px; display: flex; align-items: center; justify-content: right;">
              <el-button size="small" icon="el-icon-download">申领表导出</el-button>
              <el-button size="small" type="primary" icon="el-icon-s-promotion">提交申请</el-button>
            </div>
          </div>
        </PanelLayout>
      </div>
      <div class="bottom">
        <PanelLayout title="申领记录" icon="history">
          <div style="padding: 16px;height: 100%;box-sizing: border-box;">
            <div class="table_wrapper">
              <el-table :data="tableData" style="width: 100%" height="100%" v-loading="loading">
                <el-table-column prop="title" label="申领标题" align="center"></el-table-column>
                <el-table-column prop="uploadTime" label="申领时间" align="center"></el-table-column>
                <el-table-column label="文件数量" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.filenum }}个
                  </template>
                </el-table-column>
                <el-table-column prop="size" label="文件大小" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                  <template slot-scope="scope">
                    <span :style="[{ backgroundColor: colorMap[scope.row.status] }]" class="status_show">
                      {{ statusMap[scope.row.status] || '未知状态' }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="280" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="mini"
                      icon="el-icon-el-icon-view">查看</el-button>
                    <el-button @click="handleClick(scope.row)" type="success" size="mini"
                      icon="el-icon-download">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="flex_center" style="height: 48px;">
              <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
          </div>
        </PanelLayout>
      </div>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import treeData from '@/assets/data/tree.json';
import { renderTreeNode } from '@/utils';
import FilterItem from '@/components/FilterItem.vue';
import { queryDataByCondition } from '@/api';

export default {
  name: 'DataApply',
  components: {
    PanelLayout,
    FilterItem
  },
  data() {
    return {
      value: '1',
      input: '',
      treeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      statusMap: {
        '1': '已通过',
        '2': '审核中',
        '3': '已拒绝',
      },
      colorMap: {
        '1': '#d1fae5',
        '2': '#fef3c7',
        '3': '#fee2e2',
      },
      title: '',
      description: '',
      aim: '',
      selectedFiles: [],
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      loading: false
    }
  },
  computed: {
    totalSize() {
      return this.selectedFiles.reduce((sum, file) => sum + file.size, 0);
    }
  },
  mounted() {
    window.dataApply = this;
    this.treeData = treeData;
    setTimeout(() => {
      this.$refs.tree.setCheckedKeys(['1-1-1-1', '1-1-2-2'])
    }, 100);
    this.getTableData();
  },
  methods: {
    renderTreeNode,
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
      // console.log(this.$refs.tree.getCheckedNodes());
      const nodes = this.$refs.tree.getCheckedNodes();
      this.selectedFiles = nodes.filter(item => item.id.length > 5);
    },
    removeFile(id) {
      const ids = this.$refs.tree.getCheckedKeys().filter(item => item !== id && item.length > 5);
      this.$refs.tree.setCheckedKeys(ids);
    },
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
    },
    handleClick(row) {
      console.log(row);
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
      border-bottom: 1px solid rgba(127, 127, 127, 0.2);
    }

    .tree_wrapper {
      padding: 12px;
    }
  }

  .right {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .top {

      .list_wrapper {
        background-color: #f8fafc;
        border-radius: 8px;
        border: 1px solid rgba(127, 127, 127, .2);

        .list_item {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          box-sizing: border-box;

          &:not(:last-child) {
            border-bottom: 1px solid rgba(127, 127, 127, .2);
          }
        }

        .total {
          background-color: #f1f5f9;
          display: flex;
          justify-content: space-between;
          padding: 8px;
          box-sizing: border-box;
        }
      }

    }

    .bottom {
      flex: 1;
      min-height: 0;

      .table_wrapper {
        height: calc(100% - 48px);
        overflow-y: auto;

        .status_show {
          display: block;
          width: 64px;
          border-radius: 4px;
          margin: auto;
        }
      }
    }
  }

}
</style>