<template>
  <div class="panel_wrapper">
    <div class="header">
      <div class="icon">
        <img :src="require(`@/assets/images/${icon}.png`)" alt="">
      </div>
      <div class="text">{{ title }}</div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelLayout',
  props: {
    icon: {
      type: String,
      default: "default"
    },
    title: {
      type: String,
      default: "标题"
    },
  },
}
</script>

<style lang="scss" scoped>
.panel_wrapper {
  height: 100%;

  .header {
    height: 48px;
    background-color: #cbd5e1;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    .icon {
      height: 80%;

      img {
        height: 100%;
      }
    }

    .text {
      margin-left: 8px;
      font-size: 18px;
      font-weight: bold;
      color: #37416b;
    }

    .right {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }

  .content {
    height: calc(100% - 48px);
    background-color: #fff;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid rgba(127, 127, 127, .2);
  }
}
</style>