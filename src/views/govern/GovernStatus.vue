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

        <div style="display: flex;">
          <div style="flex: 1;">
            <div class="row">
              <SatisItem color="#10b981" icon="el-icon-circle-check" title="已完成文件" :num="2000" />
              <SatisItem color="#6b7280" icon="el-icon-time" title="未完成文件" :num="1000" />
            </div>
            <div class="row">
              <SatisItem color="#ef4444" icon="el-icon-warning" title="待核查文件" :num="100" />
              <SatisItem color="#3b82f6" icon="el-icon-folder-opened" title="文件总数" :num="3100" />
            </div>
          </div>
          <div style="flex: 1;">
            <div id="pie_chart" style="height: 100%; width: 100%;"></div>
          </div>
        </div>


      </PanelLayout>
    </div>
    <div class="bottom">
      <PanelLayout title="待核查文件列表" icon="warning">
        <div style="padding: 16px;height: 100%;box-sizing: border-box;">
          <div class="table_wrapper">
            <el-table :data="tableData" style="width: 100%" height="100%" v-loading="loading">
              <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
              <el-table-column prop="uploadTime" label="异常时间" align="center"></el-table-column>
              <el-table-column label="文件类别" align="center">
                <template slot-scope="scope">
                  {{ typeMap[scope.row.filetype] || '未知类别' }}
                </template>
              </el-table-column>
              <el-table-column label="治理组件" align="center">
                <template slot-scope="scope">
                  {{ componentMap[scope.row.component] || '未设置组件' }}
                </template>
              </el-table-column>
              <el-table-column prop="filename" label="原始文件名" align="center"></el-table-column>
              <el-table-column prop="errorcause" label="异常原因" align="center"></el-table-column>

              <el-table-column fixed="right" label="操作" width="280" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="primary" size="mini"
                    icon="el-icon-refresh">重新治理</el-button>
                  <el-button @click="handleClick(scope.row)" type="danger" size="mini"
                    icon="el-icon-delete">删除记录</el-button>
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
import SatisItem from '@/components/SatisItem.vue';
import { queryDataByCondition } from '@/api';
import * as echarts from 'echarts';

export default {
  name: 'DataStatus',
  components: {
    PanelLayout,
    SatisItem
  },
  data() {
    return {
      tableData: [],
      typeMap: {
        '1': '演训文书',
        '2': '舰艇音视频'
      },
      componentMap: {
        '1': '知识要素提取组件',
        '2': '关键事件提取组件',
        '3': '图片对象识别组件'
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getTableData();
    this.drawPie();
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
    },
    drawPie() {
      const chartDom = document.getElementById("pie_chart");

      let myChart = echarts.getInstanceByDom(chartDom);
      if (!myChart) {
        myChart = echarts.init(chartDom);
      }

      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical', // 垂直排列图例项
          right: 16,      // 水平靠右
          top: 'middle'       // 垂直居中
        },
        grid: {
          bottom: 16
        },
        series: [
          {
            type: 'pie',
            radius: ['0%', '65%'],
            center: ['40%', '60%'],
            data: [
              { value: 2000, name: '已完成文件', itemStyle: { color: '#10b981' } },
              { value: 1000, name: '未完成文件', itemStyle: { color: '#6b7280' } },
              { value: 100, name: '待核查文件', itemStyle: { color: '#ef4444' } },
            ]
          }
        ]
      };

      myChart.setOption(option);

      setTimeout(() => {
        myChart.resize();
      });
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

    .table_wrapper {
      height: calc(100% - 48px);
      overflow-y: auto;
    }
  }
}
</style>