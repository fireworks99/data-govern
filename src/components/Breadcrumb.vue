<template>
  <div class="breadcrumb_wrapper">
    <div class="content">

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
          <span v-if="index === breadcrumbList.length - 1">
            <i :class="item.meta.icon" style="margin-right: 5px;"></i>
            {{ item.meta.title }}
          </span>
          <!-- <a v-else style="cursor: pointer;" @click="handleBreadcrumbClick(item.path)">
            <i :class="item.meta.icon" style="margin-right: 5px;"></i>
            {{ item.meta.title }}  
          </a> -->
          <span v-else>
            <i :class="item.meta.icon" style="margin-right: 5px;"></i>
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    // 监听路由变化
    $route(to) {
      this.getBreadcrumb(to);
    }
  },
  created() {
    this.getBreadcrumb(this.$route);
  },
  methods: {
    getBreadcrumb(route) {
      // 过滤掉没有 meta.title 的路由
      const matched = route.matched.filter(item => item.meta && item.meta.title);

      // 如果第一项不是首页，就手动添加一个首页
      // const first = matched[0];
      // if (first && first.path !== '/') {
      //   matched.unshift({ path: '/', meta: { title: '首页' } });
      // }

      this.breadcrumbList = matched;
    },
    handleBreadcrumbClick(path) {
      if (this.$route.path !== path) {
        
        this.$router.push(path).catch(err => {
          // 如果是重复导航错误就忽略
          if (err.name !== 'NavigationDuplicated') {
            console.error(err);
          }
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.breadcrumb_wrapper {
  height: $header-height;
  padding: $header-padding;
  box-sizing: border-box;

  .content {
    height: $bread-height;
    display: flex;
    align-items: center;
    padding-left: 32px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(128, 128, 128, 0.2);
  }

}
</style>