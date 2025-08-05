<template>
  <div class="default-page">
    <el-card class="intro-card" shadow="hover">
      <div class="title">🎯 欢迎进入数据治理与服务系统</div>
      <div class="subtitle">本系统由以下两大分系统构成：</div>

      <div class="system-grid">
        <!-- 数据治理分系统 -->
        <el-card class="system-card" shadow="never">
          <div class="system-header">
            <i class="el-icon-s-tools icon" />
            <span class="system-name">数据治理分系统</span>
          </div>
          <ul class="module-list">
            <li>1. 数据治理</li>
            <li>2. 数据查询</li>
            <li>3. 治理状态</li>
            <li>4. 算法管理</li>
          </ul>
        </el-card>

        <!-- 数据服务分系统 -->
        <el-card class="system-card" shadow="never">
          <div class="system-header">
            <i class="el-icon-s-platform icon" />
            <span class="system-name">数据服务分系统</span>
          </div>
          <ul class="module-list">
            <li>1. 联合搜索</li>
            <li>2. 知识挖掘</li>
            <li>3. 数据申领</li>
          </ul>
        </el-card>
      </div>

      <el-divider />

      <div class="footer-hint">
        请在左侧菜单中选择功能模块进行操作
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "DefaultPage",
  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="scss" scoped>
.default-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  box-sizing: border-box;
  min-height: 100%;
}

.intro-card {
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  background-color: #fff;

  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
  }

  .subtitle {
    font-size: 16px;
    text-align: center;
    margin-bottom: 24px;
    color: #606266;
  }

  .system-grid {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .system-card {
    flex: 1 1 48%;
    background-color: #fafafa;

    .system-header {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;

      .icon {
        font-size: 20px;
        margin-right: 8px;
        color: #409EFF;
      }
    }

    .module-list {
      padding-left: 20px;
      li {
        margin-bottom: 6px;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .footer-hint {
    text-align: center;
    font-size: 14px;
    color: #909399;
    margin-bottom: 20px;
  }

  .action {
    text-align: center;
  }
}
</style>
