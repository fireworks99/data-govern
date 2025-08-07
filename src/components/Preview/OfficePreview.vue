<template>
  <div class="office_wrapper">
    <vue-office-docx :src="docx" v-show="docx"/>
    <vue-office-pdf :src="pdf" v-show="pdf"/>
    <vue-office-excel :src="excel" v-show="excel"/>
    <vue-office-pptx :src="pptx" v-show="pptx"/>
  </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeExcel from '@vue-office/excel'
import VueOfficePptx from '@vue-office/pptx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
  components: {
    VueOfficeDocx,
    VueOfficePdf,
    VueOfficeExcel,
    VueOfficePptx
  },
  data() {
    return {
      docx: '',
      pdf: location.origin + '/files/2023年春季演训数据分析报告.pdf',
      excel: '',
      pptx: '',
    }
  },
  methods: {
    rendered() {
      console.log("渲染完成")
    }
  }
}
</script>