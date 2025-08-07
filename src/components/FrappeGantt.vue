<template>
  <div ref="gantt" style="overflow-x: auto;"></div>
</template>

<script>
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";

export default {
  name: "FrappeGantt",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.renderGantt();
  },
  watch: {
    tasks: {
      handler() {
        this.renderGantt();
      },
      deep: true,
    },
  },
  methods: {
    renderGantt() {
      // 清空旧内容
      this.$refs.gantt.innerHTML = "";
      // 创建 gantt 实例
      this.gantt = new Gantt(this.$refs.gantt, this.tasks, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        custom_popup_html: null, // 也可以自定义弹窗内容
        on_click: (task) => console.log("点击任务", task),
        on_date_change: (task, start, end) => {
          console.log("日期变更", task, start, end);
        },
        on_progress_change: (task, progress) => {
          console.log("进度变更", task, progress);
        },
      });
    },
  },
};
</script>
