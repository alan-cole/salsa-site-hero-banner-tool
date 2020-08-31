import Vue from 'vue'
import App from './App.vue'
import '@dpc-sdp/ripple-global/style.scss'
import RplGlobal from '@dpc-sdp/ripple-global'
import RplMarkupExamplePlugins from '@dpc-sdp/ripple-markup/examplePlugins'

Vue.config.productionTip = false

// Install Ripple Global plugin
Vue.use(RplGlobal, { rplMarkup: { plugins: RplMarkupExamplePlugins, options: { decodeEntities: false } } })

new Vue({
  render: h => h(App),
}).$mount('#app')
