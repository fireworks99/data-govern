<template>
  <el-table :data="tableData" border style="width: 100%" header-row-class-name="custom-header">
    <!-- 第一列：任务名称 + 查看链接 -->
    <el-table-column label="任务名称" width="200" align="center" fixed="left">
      <template slot-scope="scope">
        {{ scope.row.name }}
        <el-button type="text" icon="el-icon-view" style="margin-left: 12px;">查看</el-button>
      </template>
    </el-table-column>

    <!-- 第二列：时长 -->
    <el-table-column prop="duration" label="时长" width="100" align="center" fixed="left" />

    <!-- 第三列：状态 -->
    <el-table-column label="状态" align="center" fixed="left">
      <template slot-scope="scope">
        <span :style="[{ color: scope.row.status === 1 ? '#10b981' : '#3b82f6' }, { fontWeight: 'bold' }]">
          <i :class="scope.row.status === 1 ? 'el-icon-circle-check' : 'el-icon-time'"></i>
          {{ scope.row.status === 1 ? '已完成' : '进行中' }}
        </span>
      </template>
    </el-table-column>


    <!-- 后面 12 列：月份 -->
    <el-table-column v-for="(month, index) in months" :key="index" :label="month" :min-width="80" align="center">
      <template slot-scope="scope">
        <div class="month-cell">
          <!-- 条形渲染 -->
          <div v-if="isBarVisible(scope.row, index)" class="bar"
            :style="getBarStyle(scope.row.color, scope.row, index)"></div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      months: [
        "2024-01", "2024-02", "2024-03", "2024-04",
        "2024-05", "2024-06", "2024-07", "2024-08",
        "2024-09", "2024-10", "2024-11", "2024-12",
      ],
      tableData: [
        {
          name: "任务1",
          duration: "46天",
          startMonth: "2024-01",
          startOffset: 0.5, // 从1月中间开始
          endMonth: "2024-02",
          color: "#10b981",
          status: 1
        },
        {
          name: "任务2",
          duration: "61天",
          startMonth: "2024-03",
          startOffset: 0,
          endMonth: "2024-04",
          color: "#10b981",
          status: 1
        },
        {
          name: "任务3",
          duration: "92天",
          startMonth: "2024-05",
          startOffset: 0,
          endMonth: "2024-07",
          color: "#3b82f6",
          status: 2
        },
      ],
    };
  },
  methods: {
    viewTask(row) {
      console.log("查看任务：", row.name);
    },
    monthIndex(month) {
      return this.months.indexOf(month);
    },
    isBarVisible(row, colIndex) {
      const startIdx = this.monthIndex(row.startMonth);
      const endIdx = this.monthIndex(row.endMonth);
      return colIndex >= startIdx && colIndex <= endIdx;
    },
    getBarStyle(color, row, colIndex) {
      const startIdx = this.monthIndex(row.startMonth);
      const endIdx = this.monthIndex(row.endMonth);

      let style = {
        backgroundColor: color,
        height: "20px",
        borderRadius: "4px",
      };

      // 起始月份
      if (colIndex === startIdx && row.startOffset) {
        style.marginLeft = row.startOffset * 100 + "%";
        style.width = (1 - row.startOffset) * 100 + "%";
      }
      // 结束月份
      else if (colIndex === endIdx) {
        style.width = "100%";
      }
      // 中间月份
      else {
        style.width = "100%";
      }

      return style;
    },
  },
};
</script>

<style scoped>
.month-cell {
  position: relative;
  height: 24px;
}

.bar {
  position: absolute;
  top: 2px;
  left: 0;
}
</style>

<style lang="scss">
.custom-header {
  th.el-table__cell {
    background-color: #f5f7fa !important;
  }
}
</style>