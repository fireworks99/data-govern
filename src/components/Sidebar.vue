<template>
  <div class="sidebar_wrapper">

    <el-menu :default-openeds="['1', '2']" class="el-menu-vertical-demo" @select="handleSelect">
      <el-submenu v-for="item in func" :key="item.name + item.icon" :index="item.code">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>

        <el-menu-item v-for="subitem in item.children" :key="subitem.name + subitem.code" :index="subitem.code">

          <template slot="title">
            <i :class="subitem.icon"></i>
            <span> {{ subitem.name }}</span>
          </template>

        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
import func from '@/assets/data/func.json';
import pathMap from '@/router/codePathMap';

export default {
  name: "Sidebar",
  data() {
    return {
      func: null
    }
  },
  mounted() {
    this.func = func;
  },
  beforeDestroy() {

  },
  methods: {
    handleSelect(index, indexPath) {
      const path = pathMap[index] || '';
      if (path) {
        if (this.$route.path !== path) {
          this.$router.push(path);
        }
      } else {
        this.$message.warning('尚未配置该页面路由路径');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.sidebar_wrapper {
  height: 100%;
  width: $sidebar-width;

  .el-menu-vertical-demo {
    height: 100%;
    width: 100%;
    overflow-y: auto !important;
  }
}
</style>