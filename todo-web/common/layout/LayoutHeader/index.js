import LayoutHeader from "./index.vue";

LayoutHeader.install = function (Vue) {
  Vue.component(LayoutHeader.name, LayoutHeader);
};

export default LayoutHeader;
