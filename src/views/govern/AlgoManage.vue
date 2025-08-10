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

          <div style="padding: 16px; box-sizing: border-box; height: 100%;">

            <div class="flow-wrapper" ref="flowWrapper">

              <SimpleFlowChart ref="simpleFlowChart" v-model="flowData" :showScaleBar="false" vertical
                background="#f7f7f7" />

              <div class="toolbar">
                <button @click="toggleFullscreen">
                  {{ isFullscreen ? '退出全屏' : '全屏' }}
                </button>
              </div>
            </div>

          </div>

        </PanelLayout>
      </div>
      <div class="bottom">
        <PanelLayout title="治理组件列表" icon="manage_list">
          <template slot="right">
            <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
          </template>

          <div style="padding: 16px;height: 100%;box-sizing: border-box;">
            <div class="table_wrapper">
              <el-table :data="tableData" style="width: 100%" height="100%" v-loading="loading">
                <el-table-column type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="组件名称" align="center"></el-table-column>
                <el-table-column label="组件分类" align="center">
                  <template slot-scope="scope">
                    {{ componentMap[scope.row.type] }}
                  </template>
                </el-table-column>
                <el-table-column prop="multiformat" label="治理文件格式" align="center"></el-table-column>
                <el-table-column label="关联数据库" align="center">
                  <template slot-scope="scope">
                    {{ dbMap[scope.row.db] || '' }}
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
import { queryDataByCondition } from '@/api';

export default {
  name: 'AlgoManage',
  components: {
    PanelLayout
  },
  data() {
    return {
      isFullscreen: false,
      flowData: [
        // { id: 'endEvent', type: 'start', title: '开始' },
        {
          type: 'normal',
          title: '舰艇音视频',
          icon: 'el-icon-s-tools',
          color: '#2453d9',
          nodeList: []
        },
        {
          type: 'normal',
          title: '关键片段截取模型',
          icon: 'el-icon-s-tools',
          color: '#1caaea',
          nodeList: []
        },
        {
          type: 'condition',
          title: '',
          children: [
            {
              type: 'normal',
              title: 'Demon谱分析模型',
              icon: 'el-icon-s-tools',
              color: '#f59f0f',
              nodeList: []
            },
            {
              type: 'normal',
              title: 'Lofar谱分析模型',
              icon: 'el-icon-s-tools',
              color: '#f59f0f',
              nodeList: []
            },
            {
              type: 'normal',
              title: '时频谱分析模型',
              icon: 'el-icon-s-tools',
              color: '#f59f0f',
              nodeList: []
            },
          ]
        },
        { id: 'endEvent', type: 'end', title: '结束' }
      ],
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      loading: false,
      dbMap: {
        '1': '声纳视频频谱库',
        '2': '水下攻防演训知识库',
        '3': '水下攻防目标库',
        '4': '水下攻防全文检索库'
      },
      componentMap: {
        '1': '舰艇音视频治理组件',
        '2': '演训文书治理组件',
        '3': '演训声像治理组件',
      }
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
    this.getTableData();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.fitFlowChart);
  },
  methods: {
    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.$refs.flowWrapper.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
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
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .top {
      flex: 1;
      min-height: 0;

      .flow-wrapper {
        height: 100%;
        width: 100%;
        position: relative;

        .toolbar {
          position: absolute;
          top: 12px;
          right: 12px;
        }
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

}
</style>