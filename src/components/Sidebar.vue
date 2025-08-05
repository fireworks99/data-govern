<template>
  <div class="sidebar_wrapper">

    <el-menu
      :default-active="$route.path" 
      :default-openeds="['/govern', '/service']" 
      class="el-menu-vertical-demo"
      router>

      <div v-for="item in funcs" :key="item.path">

        <el-submenu :index="item.path" v-if="item.children.length > 1">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>

          <el-menu-item v-for="subitem in item.children" :key="subitem.path" :index="item.path + '/' + subitem.path">
            <template slot="title">
              <i :class="subitem.meta.icon"></i>
              <span> {{ subitem.meta.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>

        <!-- el-menu-item 的 index 属性实际上是你希望跳转的路由路径，Element UI 会自动调用 $router.push(index)。 -->
        <!-- 如果是 ''，Vue Router 会认为这是当前路径，不做跳转，或跳转失败。 -->
        <el-menu-item :index="item.path || '/'" v-else>
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>

      </div>


    </el-menu>

  </div>
</template>

<script>
import { routes } from '@/router';

export default {
  name: "Sidebar",
  data() {
    return {
      funcs: null
    }
  },
  mounted() {
    this.funcs = routes;
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