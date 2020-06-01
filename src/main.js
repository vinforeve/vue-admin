import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
import "./icons";

Vue.config.productionTip = false;

// runtime 运行模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
