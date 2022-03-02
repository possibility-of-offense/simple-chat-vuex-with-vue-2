import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/styles.css";
import "./assets/colors.scss";

Vue.config.productionTip = false;

Vue.directive("focus", {
  inserted(el) {
    el.focus();
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
