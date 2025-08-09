<template>
  <div class="wrapper">
    <div class="top">
      <PanelLayout title="年度任务分布" icon="date">
        <div style="padding: 16px; box-sizing: border-box;">

          <div class="filter_wrapper">
            <div class="item">
              <div class="title">开始时间: </div>
              <div class="other">
                <el-date-picker v-model="startDate" type="date" placeholder="选择日期" size="small">
                </el-date-picker>
              </div>
            </div>
            <div class="item">
              <div class="title">结束时间: </div>
              <div class="other">
                <el-date-picker v-model="endDate" type="date" placeholder="选择日期" size="small">
                </el-date-picker>
              </div>
            </div>
            <div class="item">
              <div class="title">坐标轴刻度: </div>
              <div class="other">
                <el-select placeholder="请选择" v-model="axis" size="small">
                  <el-option label="按月" value="1"></el-option>
                  <el-option label="按年" value="2"></el-option>
                </el-select>
              </div>
            </div>
          </div>

          <ElementGantt />
        </div>
      </PanelLayout>
    </div>
    <div class="bottom">
      <PanelLayout title="任务信息" icon="info">
        <div style="padding: 16px; box-sizing: border-box; display: flex; gap: 12px; height: 100%;">
          <div class="left">
            <div class="intro">
              <el-input placeholder="输入节点名称进行查询..." prefix-icon="el-icon-search" v-model="input" clearable
                size="small"></el-input>
            </div>
            <div class="intro">层级结构: 任务 > 阶段 > 平台/装备</div>
            <div class="tree_wrapper">
              <el-tree :data="treeData" default-expand-all node-key="id" ref="tree" highlight-current
                :props="defaultProps">
              </el-tree>
            </div>
          </div>
          <div class="right">

            <div class="row">
              <PanelLayout title="训练海域" icon="list">
                <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px;">
                  <div class="desc">
                    <div>海域名称</div>
                    <div>东海训练海域</div>
                  </div>
                  <div class="desc">
                    <div>海域范围</div>
                    <div>东经120°-125°, 北纬25°-30°</div>
                  </div>
                  <div class="desc">
                    <div>训练面积</div>
                    <div>约5000平方公里</div>
                  </div>
                </div>
              </PanelLayout>
              <PanelLayout title="兵力输配" icon="soldier">
                <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px;">
                  <div class="desc">
                    <div>水面舰艇</div>
                    <div>驱逐舰2艘、护卫舰3艘、补给舰1艘</div>
                  </div>
                  <div class="desc">
                    <div>航空兵力</div>
                    <div>战斗机8架、直升机4架</div>
                  </div>
                  <div class="desc">
                    <div>陆集兵力</div>
                    <div>岸导部队</div>
                  </div>
                </div>
              </PanelLayout>
              <PanelLayout title="行动计划" icon="date">
                <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px;">
                  <div class="desc">
                    <div>计划阶段</div>
                    <div>准备阶段、实施阶段、总结阶段</div>
                  </div>
                  <div class="desc">
                    <div>行动时间</div>
                    <div>2025年3月15日-3月25日</div>
                  </div>
                  <div class="desc">
                    <div>行动区域</div>
                    <div>海域A区、B区、C区</div>
                  </div>
                </div>
              </PanelLayout>
            </div>

            <div class="row">
              <PanelLayout title="训练统计" icon="line">
                <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px;">
                  <div class="desc">
                    <div>训练次数</div>
                    <div>12次</div>
                  </div>
                  <div class="desc">
                    <div>训练天数</div>
                    <div>15天</div>
                  </div>
                  <div class="desc">
                    <div>参训部队</div>
                    <div>XX部队</div>
                  </div>
                </div>
              </PanelLayout>
              <PanelLayout title="指挥人员" icon="direct">
                <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px;">
                  <div class="desc">
                    <div>指挥员</div>
                    <div>指挥员1</div>
                  </div>
                  <div class="desc">
                    <div>演练课题</div>
                    <div>联合海上作战演练</div>
                  </div>
                  <div class="desc">
                    <div>课题类型</div>
                    <div>综合性演练</div>
                  </div>
                </div>
              </PanelLayout>
              <PanelLayout title="训练科目" icon="result">
                <div style="padding: 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px;">
                  <div class="desc">
                    <div>主要科目</div>
                    <div>科目1、科目2</div>
                  </div>
                  <div class="desc">
                    <div>辅助科目</div>
                    <div>科目3、科目4</div>
                  </div>
                  <div class="desc">
                    <div>调理目标</div>
                    <div>提高联合作战能力</div>
                  </div>
                </div>
              </PanelLayout>
            </div>

          </div>
        </div>
      </PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import ElementGantt from "@/components/ElementGantt.vue";
import treeData from '@/assets/data/task_tree.json';

export default {
  name: 'KnowDig',
  components: {
    PanelLayout,
    ElementGantt
  },
  data() {
    return {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      axis: '1',
      task: '1',
      treeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      input: ''
    }
  },
  mounted() {
    this.treeData = treeData;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  gap: 16px;

  .top {
    .filter_wrapper {
      display: flex;
      background-color: #f5f7fa;
      padding: 12px;
      box-sizing: border-box;
      margin-bottom: 12px;
      gap: 12px;
      border-radius: 8px;
      border: $normal-border;

      .item {
        display: flex;
        align-items: center;

        .title {
          white-space: nowrap;
          margin-right: 8px;
        }
      }
    }
  }

  .bottom {
    flex: 1;
    min-height: 0;

    .left {
      height: 100%;
      border: $normal-border;
      border-radius: 8px;

      .intro {
        background-color: #f8fafc;
        padding: 8px 12px;
        color: #6e7786;
        font-size: 14px;
        border-bottom: 1px solid rgba(127, 127, 127, 0.2);
      }

      .tree_wrapper {
        height: calc(100% - 48px - 36px - 1px - 1px);
        overflow-y: auto;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .row {
        flex: 1;
        display: flex;
        gap: 12px;

        &>div {
          flex: 1;
        }

        .desc {
          display: flex;
          justify-content: space-between;
          color: #777;
        }
      }
    }
  }
}
</style>