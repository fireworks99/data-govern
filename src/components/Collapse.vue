<template>

  <div class="collapse_wrapper">

    <div class="header" @click="fold = !fold">
      <div class="title">{{ title }}</div>
      <div class="right">
        <i class="el-icon-arrow-down" v-show="fold"></i>
        <i class="el-icon-arrow-up" v-show="!fold"></i>
      </div>
    </div>

    <div :class="['content', { fold }]">
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Collapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    initFold: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fold: true,
    }
  },
  mounted() {
    this.fold = this.initFold;
  }
}
</script>

<style lang="scss" scoped>
.collapse_wrapper {
  background-color: #cbd5e122;
  border-radius: 0.5rem;
  margin-bottom: 12px;

  .header {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
      color: rgb(22, 93, 255);
    }
  }

  .content {
    padding: 0 1rem;
    max-height: 9999px;
    overflow: hidden;
    transition: all 0.1s linear;

    &.fold {
      max-height: 0;
    }
  }
}
</style>