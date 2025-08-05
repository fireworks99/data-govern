<template>
  <div class="home_wrapper">
    <Sidebar />

    <div class="content">
      <Breadcrumb />

      <div class="main">
        <router-view></router-view> <!-- 右侧路由组件将渲染到这里 -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.home_wrapper {
  width: 100%;
  height: 100%;
  background-color: #f7fafc;
  display: flex;

  .content {
    height: 100%;
    flex: 1;

    .main {
      height: calc(100% - #{$header-height});
      overflow-y: auto;
    }
  }
}
</style>