<template>
  <div class="wrapper">
    <div class="top">
      <PanelLayout title="年度任务分布" icon="date">
        <ElementGantt/>
      </PanelLayout>
    </div>
    <div class="bottom">
      <PanelLayout title="任务信息" icon="info"></PanelLayout>
    </div>
  </div>
</template>

<script>
import PanelLayout from '@/components/PanelLayout.vue';
import ElementGantt from "@/components/ElementGantt.vue";

export default {
  name: 'KnowDig',
  components: {
    PanelLayout,
    ElementGantt
  },
  data() {
    return {

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

  .bottom {
    flex: 1;
    min-height: 0;
  }
}
</style>