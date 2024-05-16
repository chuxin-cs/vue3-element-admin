<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item
        v-if="validatenull(item.children) && vaildRoles(item)"
        :index="item.code"
        @click="open(item)"
        :key="item.code"
        :class="{ 'is-active': vaildActive(item) }"
      >
        <i class="menu-wrapper-icon" :class="item[iconKey]"></i>
        <span slot="title" :alt="item.path">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu
        v-else-if="!validatenull(item.children) && vaildRoles(item)"
        :index="item.code"
        :key="item.code"
        popper-class="tocc-menu"
      >
        <template slot="title">
          <i class="menu-wrapper-icon" v-if="first" :class="item.source"></i>
          <span slot="title" :class="{ 'el-menu--display': collapse && first }">
            {{ item.name }}
          </span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item
            :index="child.code"
            @click="open(child)"
            :class="{ 'is-active': vaildActive(child) }"
            v-if="validatenull(child.children)"
            :key="child.code"
          >
            <!-- <i :class="child.source"></i> -->
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :menu="[child]"
            :key="child.code"
            :props="props"
            :screen="screen"
            :collapse="collapse"
          ></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "sidebarItem",
  data() {
    return {
      config: {
        propsDefault: {
          label: "label",
          path: "path",
          icon: "icon",
          children: "children",
          isOpen: "isOpen",
        },
      },
    };
  },
  props: {
    menu: {
      type: Array,
    },
    screen: {
      type: Number,
    },
    first: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {};
      },
    },
    collapse: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["roles"]),
    labelKey() {
      return this.props.label || this.config.propsDefault.label;
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path;
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon;
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children;
    },
    isOpenKey() {
      return this.props.isOpen || this.config.propsDefault.isOpen;
    },
    nowTagValue() {
      if (this.$route.meta.activeKey) {
        return this.$route.meta.activeKey;
      } else {
        return "";
      }
    },
  },
  methods: {
    isURL(s) {
      return /^http[s]?:\/\/.*/.test(s);
    },
    isNull(val) {
      if (typeof val == "boolean") {
        return false;
      }
      if (typeof val == "number") {
        return false;
      }
      if (val instanceof Array) {
        if (val.length == 0) return true;
      } else if (val instanceof Object) {
        if (JSON.stringify(val) === "{}") return true;
      } else {
        if (
          val == "null" ||
          val == null ||
          val == "undefined" ||
          val == undefined ||
          val == ""
        )
          return true;
        return false;
      }
      return false;
    },
    vaildActive(item) {
      if (this.validIsOpen(item)) {
        return false;
      }
      const groupFlag = (item["group"] || []).some((ele) =>
        this.$route.path.includes(ele)
      );
      return this.nowTagValue === item[this.pathKey] || groupFlag;
    },
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return this.isNull(val);
    },
    validIsOpen(item) {
      if (item[this.isOpenKey] === 2 && this.isURL(item[this.pathKey])) {
        return true;
      }
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      if (this.validIsOpen(item)) {
        window.open(item[this.pathKey]);
      } else {
        if (this.$route.path !== item.path) {
          this.$router.push({
            path: item.path,
            query: item.query,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .menu-wrapper{
    /deep/.el-submenu__icon-arrow{
      font-weight: bold;
      color: #666;
    }
  }
  .menu-wrapper-icon{
    font-size: 18px !important;
    color: rgba(0, 0, 0, 0.9);
  }
</style>