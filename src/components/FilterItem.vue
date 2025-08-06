<template>
  <div class="filter-item">
    <div :class="['title', { 'no-title': title === '标题' }]">
      <i :class="icon"></i>
      {{ title }}
    </div>
    <div class="other">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterItem',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-item {
  display: flex;
  flex-direction: column;
  
  .title {
    font-size: 14px;
    color: #6e7786;
    margin-bottom: 8px;

    &.no-title {
      color: transparent;
    }
  }
}
</style>