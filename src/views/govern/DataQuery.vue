<template>
  <div class="wrapper">
    <div class="top">
      <PanelLayout title="查询条件" icon="filter">
        <div style="padding: 16px; box-sizing: border-box;">

          <div class="row">
            <FilterItem title="阶段" icon="el-icon-menu">
              <el-select placeholder="请选择" v-model="value">
                <el-option label="全部阶段" value="1"></el-option>
              </el-select>
            </FilterItem>
            <FilterItem title="平台" icon="el-icon-s-grid">
              <el-select placeholder="请选择" v-model="value">
                <el-option label="全部平台" value="1"></el-option>
              </el-select>
            </FilterItem>
            <FilterItem title="治理组件" icon="el-icon-setting">
              <el-select placeholder="请选择" v-model="value">
                <el-option label="全部组件" value="1"></el-option>
              </el-select>
            </FilterItem>
          </div>

          <div class="row">
            <FilterItem title="数据格式" icon="el-icon-document">
              <el-select placeholder="请选择" v-model="value">
                <el-option label="全部格式" value="1"></el-option>
              </el-select>
            </FilterItem>
            <FilterItem title="时间范围" icon="el-icon-date">
              <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
      <PanelLayout title="查询结果" icon="result">
        <div style="padding: 16px;height: 100%;box-sizing: border-box;">
          <div class="table_wrapper">
            <el-table :data="tableData" style="width: 100%" height="100%" v-loading="loading">
              <el-table-column prop="id" label="数据ID" align="center"></el-table-column>
              <el-table-column prop="filename" label="文件名" align="center"></el-table-column>
              <el-table-column label="阶段" align="center">
                <template slot-scope="scope">
                  {{ stageMap[scope.row.stage] || '未知阶段' }}
                </template>
              </el-table-column>
              <el-table-column label="平台" align="center">
                <template slot-scope="scope">
                  {{ '平台' + scope.row.platform }}
                </template>
              </el-table-column>
              <el-table-column label="治理组件" align="center">
                <template slot-scope="scope">
                  {{ componentMap[scope.row.component] || '未设置组件' }}
                </template>
              </el-table-column>
              <el-table-column prop="format" label="数据格式" align="center" width="100"></el-table-column>
              <el-table-column prop="size" label="大小" align="center" width="100"></el-table-column>
              <el-table-column label="治理状态" align="center">
                <template slot-scope="scope">
                  <span :style="[{ backgroundColor: colorMap[scope.row.status] }]" class="status_show">
                    {{ statusMap[scope.row.status] || '未知状态' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="uploadTime" label="更新时间" align="center"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="flex_center" style="height: 48px;">
            <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </div>
      </PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import FilterItem from '@/components/FilterItem.vue';
import { queryDataByCondition } from '@/api';

export default {
  name: 'DataQuery',
  components: {
    PanelLayout,
    FilterItem
  },
  data() {
    return {
      value: '1',
      value1: [],
      tableData: [],
      stageMap: {
        '1': '准备阶段',
        '2': '实兵阶段',
        '3': '复盘阶段'
      },
      componentMap: {
        '1': '知识要素提取组件',
        '2': '关键事件提取组件',
        '3': '图片对象识别组件'
      },
      statusMap: {
        '1': '待核查',
        '2': '进行中',
        '3': '已完成'
      },
      colorMap: {
        '1': '#f59e0b',
        '2': '#3b82f6',
        '3': '#10b981'
      },

      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
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
      }, 'data_query').then(res => {
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
    min-height: 0;

    .table_wrapper {
      height: calc(100% - 48px);
      overflow-y: auto;

      .status_show {
        color: #fff;
        display: block;
        width: 64px;
        border-radius: 16px;
        margin: auto;
      }
    }
  }
}
</style>