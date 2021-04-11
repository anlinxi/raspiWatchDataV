import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import i18n from './locales'
import config from './common/config'
import './assets/common.less'

import dataV from '@jiaminghi/data-view'

Vue.config.productionTip = false

Vue.use(dataV)
Vue.use(VueI18n)

Vue.prototype.CONFIG = config

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
