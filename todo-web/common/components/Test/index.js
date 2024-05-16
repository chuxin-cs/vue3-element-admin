import CxTest from "./src/index.vue";

CxTest.install = function (Vue) {
  Vue.component(CxTest.name, CxTest);
};

export default CxTest;
