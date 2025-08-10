<template>
  <div>
    <!-- 普通节点 -->
    <div v-if="data.type === 'normal'">
      <div class="normal_wrapper" :style="[
        { borderColor: data.color },
        { backgroundColor: hexToRgba(data.color, 0.3) }]">
        <i :class="data.icon"></i>
        {{ data.title }}
      </div>
    </div>

    <!-- 条件节点 -->
    <div v-else-if="data.type === 'condition'" class="condition-node" >
      <div class="title">{{ data.title }}</div>
      <div v-for="(child, i) in data.children" :key="i">
        condition {{ i + 1 }}: {{ child.title }}
      </div>
      <button @click="$emit('add-condition-branch', data)">++++</button>
    </div>

  </div>

</template>

<script>
export default {
  name: 'SFCNodeContent',
  props: ['data'],
  // mounted() {
  //   console.log(this.data);
  // },
  methods: {
    hexToRgba(hex, alpha) {
      if (!hex) hex = "#dedede";
      let r = parseInt(hex.slice(1, 3), 16)
      let g = parseInt(hex.slice(3, 5), 16)
      let b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }
}
</script>

<style scoped lang="scss">
.normal_wrapper {
  border: 2px solid;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;

  i {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
}
</style>
