import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SimpleFlowChart from '@wanglin1994/simple-flow-chart'
import SFCNodeContent from '@/components/SFCNodeContent.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(SimpleFlowChart, {
  notRegisterNodeContent: true, // 如果需要自己编写节点内容组件，设为true
  notRegisterNodeTypeContent: false // 如果需要自己编写添加节点的悬浮面板组件，设为true
})

Vue.component('SFCNodeContent', SFCNodeContent)

fetch('/config.json')
  .then(res => res.json())
  .then(config => {
    window.APP_CONFIG = config

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
