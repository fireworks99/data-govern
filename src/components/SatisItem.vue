<template>
  <div class="satis_item">
    <div class="left flex_center">
      <div class="circle flex_center" :style="{ backgroundColor: color }">
        <i :class="icon"></i>
      </div>
    </div>
    <div class="right">
      <div class="title">{{ title }}</div>
      <div class="num">{{ num }}</div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'SatisItem',
  props: {
    color: {
      type: String,
      default: '#10b981'
    },
    icon: {
      type: String,
      default: 'el-icon-circle-check'
    },
    title: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.satis_item {
  width: 100%;
  height: 64px;
  background-color: #f8fafc;
  border-radius: 8px;
  display: flex;

  .left {
    width: 64px;

    .circle {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      color: #fff;
    }
  }
  .right {
    flex: 1;
    padding: 12px 0;

    .title {
      color: #6e7786;
      font-size: 14px;
    }

    .num {
      line-height: 20px;
      font-weight: bold;
    }
  }
}
</style>