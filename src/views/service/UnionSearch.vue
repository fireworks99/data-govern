<template>
  <div class="wrapper">

    <div class="search">
      <el-input prefix-icon="el-icon-search" placeholder="请输入内容" v-model="searchKeyword" class="selfdefine">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
      <div style="font-size: 14px; margin-top: 16px;">
        <span style="margin-right: 8px;">搜索策略：</span>
        <el-radio v-model="radio" label="1">模糊查询</el-radio>
        <el-radio v-model="radio" label="2">精准查询</el-radio>
      </div>
    </div>

    <div style="display: flex;align-items: center; color:#6e7786; height: 40px; margin: 16px auto;">
      <div>找到{{ filteredResults.length }}条结果</div>
      <div style="margin-left: 12px;">用时{{ interval }}ms</div>
      <div style="margin-left: auto; display: flex; align-items: center;">
        <div style="white-space: nowrap; margin-right: 12px;">排序方式: </div>
        <el-select placeholder="请选择" v-model="sort_way">
          <el-option label="相关度" value="1"></el-option>
        </el-select>
      </div>
    </div>

    <div class="separator" style="border-top: 1px solid rgba(127, 127, 127, .2);"></div>

    <div class="result">

      <div class="article_list">
        <div class="article" v-for="item in filteredResults" :key="item.title">
          <!-- <div class="title">{{ item.title }}</div> -->
          <div class="title" v-html="highlightKeyword(item.title)"></div>
          <!-- <div class="desc">{{ item.desc }}</div> -->
          <div class="desc" v-html="highlightKeyword(item.desc)"></div>
          <div class="tags_wrapper">
            <div class="tag">
              <i class="el-icon-date"></i>
              {{ item.date }}
            </div>
            <div class="tag">
              <i class="el-icon-document"></i>
              {{ item.type }}
            </div>
            <div class="tag">
              <i class="el-icon-collection-tag"></i>
              {{ item.tag }}
            </div>
          </div>
        </div>
      </div>

      <div class="preview">
        <div class="header">{{ title }}</div>
        <div class="content">
          <OfficePreview />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import OfficePreview from '@/components/Preview/OfficePreview.vue';
import search_data from '@/assets/data/search_data.json';

export default {
  components: { OfficePreview },
  name: 'UnionSearch',
  data() {
    return {
      searchKeyword: '性能',
      radio: '1',
      count: 3,
      interval: 301,
      sort_way: '1',
      title: '2023年春季演训数据分析报告',
      dataList: []
    }
  },
  computed: {
    filteredResults() {
      const keyword = this.searchKeyword.trim().toLowerCase();
      if (!keyword) return this.dataList;
      return this.dataList.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        item.tag.toLowerCase().includes(keyword)
      );
    }
  },
  mounted() {
    this.dataList = search_data;
  },
  methods: {
    highlightKeyword(text) {
      const keyword = this.searchKeyword.trim();
      if (!keyword) return text;
      const reg = new RegExp(`(${keyword})`, 'gi');
      return text.replace(reg, '<mark>$1</mark>');
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;

  .search {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(128, 128, 128, 0.2);
    border-radius: 4px;
    padding: 16px;
    box-sizing: border-box;
    height: 108px;
  }

  .result {
    height: calc(100% - 108px - 72px - 12px - 1px);
    display: flex;
    gap: 16px;

    .article_list {
      flex: 1;
      height: 100%;
      overflow-y: auto;

      .article {
        background-color: #fff;
        border-radius: 8px;
        padding: 12px;
        box-sizing: border-box;
        margin-bottom: 16px;
        cursor: pointer;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, .05);

        &:hover {
          box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
          ;
        }

        .title {
          color: rgb(37, 99, 235);
          font-size: 18px;
          line-height: 28px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .desc {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 8px;
        }

        .tags_wrapper {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: #6e7786;
        }
      }
    }

    .preview {
      flex: 1;
      height: 100%;
      box-shadow: 0 0 8px rgba(128, 128, 128, 0.2);

      .header {
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        color: #4c5665;
        font-weight: bold;
        background-color: #f8fafc;
        border: 1px solid rgba(127, 127, 127, .2);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .content {
        height: calc(100% - 40px);
        overflow-y: auto;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }
}
</style>

<style lang="scss">
.selfdefine {
  .el-input-group__append {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>