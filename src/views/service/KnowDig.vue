<template>
  <div class="wrapper">
    <div class="top">
      <PanelLayout title="年度任务分布" icon="date">
        <FrappeGantt :tasks="taskList" />
      </PanelLayout>
    </div>
    <div class="bottom">
      <PanelLayout title="任务信息" icon="info"></PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import FrappeGantt from "@/components/FrappeGantt.vue";

export default {
  name: 'KnowDig',
  components: {
    PanelLayout,
    FrappeGantt
  },
  data() {
    return {
      taskList: [
        {
          id: "Task1",
          name: "任务 A",
          start: "2025-08-01",
          end: "2025-08-05",
          progress: 20,
        },
        {
          id: "Task2",
          name: "任务 B",
          start: "2025-08-04",
          end: "2025-08-10",
          progress: 60,
          dependencies: "Task1",
        },
        {
          id: "Task3",
          name: "任务 C",
          start: "2025-08-08",
          end: "2025-08-12",
          progress: 0,
          dependencies: "Task2",
        },
      ],
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
    flex: 1;
  }

  .bottom {
    flex: 2;
  }
}
</style>