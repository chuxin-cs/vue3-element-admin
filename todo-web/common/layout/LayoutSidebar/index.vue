<template>
  <div :class="['avue-sidebar', { collapse: keyCollapse }]">
    <el-scrollbar style="height: calc(100% - 56px)">
      <el-menu
        unique-opened
        mode="vertical"
        :default-active="nowTagValue"
        :show-timeout="200"
        :collapse="keyCollapse"
      >
        <sidebar-item
          :menu="projectMenu"
          :screen="screen"
          first
          :props="menuProps"
          :collapse="keyCollapse"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
    <div class="fold-box">
      <div class="btn-fold" @click="setCollapse">
        <i class="iconfont" :class="menuCollapseIcon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";

export default {
  name: "LayoutSidebar",
  components: { sidebarItem },
  data() {
    return {
      menuProps: {
        label: "name",
        path: "path",
        icon: "source",
        children: "children",
      },
    };
  },
  computed: {
    ...mapGetters(["menu", "keyCollapse", "screen", "isCollapse"]),
    nowTagValue() {
      return this.$route.meta.code;
    },
    projectMenu() {
      return this.menu || [];
    },
    menuCollapseIcon() {
      return this.isCollapse
        ? "icon-zuocedaohang-zhankai"
        : "icon-zuocedaohang-shouqi";
    },
  },
  mounted() {},
  methods: {
    //菜单展开收缩
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
  },
};
</script>

<style lang="scss" scoped>
.avue-sidebar {
  user-select: none;
  height: 100%;
  position: relative;
  background-color: #ffffff;
  .fold-box {
    height: 56px;
    background: #fff;
    box-shadow: 0px 0.5px 0px 0px #e7e7e7 inset;
    display: flex;
    align-items: center;
    padding: 0 16px;
    .btn-fold {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
      }
      &:hover {
        background: #f3f3f3;
        border-radius: 3px;
      }
    }
  }
  .el-scrollbar {
    padding: 12px 8px;
    ::v-deep {
      .el-scrollbar__bar.is-horizontal {
        display: none;
      }
    }
  }
  .el-menu {
    &.el-menu--collapse {
      width: auto;
      ::v-deep {
        .el-submenu.is-active {
          .el-submenu__title {
            background: #ecf2fe;
            color: #0052d9;
            i {
              color: #0052d9;
            }
          }
        }
      }
    }
    ::v-deep {
      .el-menu-item {
        height: 36px;
        line-height: 36px;
        border-radius: 3px;
        padding: 0 16px !important;
        margin-top: 4px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
        .el-tooltip {
          display: flex !important;
          padding: 0 16px !important;
        }
        i {
          font-size: 16px;
          margin-right: 8px;
          padding: 0;
        }
        &:hover {
          background: #f3f3f3;
        }
        &:active {
          background: #e7e7e7;
        }
        &.is-active {
          background: #ecf2fe;
          color: #0052d9;
        }
      }
      .el-submenu__title {
        height: 36px;
        line-height: 36px;
        border-radius: 3px;
        padding: 0 16px !important;
        margin-top: 4px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
        &:hover {
          background: #f3f3f3;
        }
        &:active {
          background: #e7e7e7;
        }
        i {
          font-size: 16px;
          margin-right: 8px;
          padding: 0;
        }
        .el-submenu__icon-arrow {
          font-size: 14px;
          color: #333;
          padding: 1px;
          margin: 0;
          right: 12px;
          top: 10px;
        }
      }
      .el-submenu {
        .el-menu-item {
          padding-left: 40px !important;
        }
        &.is-opened {
          .el-submenu__title {
            color: rgba(0, 0, 0, 0.9);
            i {
              color: rgba(0, 0, 0, 0.9);
            }
          }
        }
        .el-submenu {
          .el-menu-item {
            padding-left: 60px !important;
          }
          .el-submenu__title {
            padding-left: 40px !important;
            color: rgba(0, 0, 0, 0.9);
          }
          &.is-opened {
            .el-submenu__title {
              color: rgba(0, 0, 0, 0.9);
              i {
                color: rgba(0, 0, 0, 0.9);
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tocc-menu {
  .el-menu--popup {
    background: #fff !important;
    padding: 8px;
    .el-menu-item,
    .el-submenu__title {
      height: 36px;
      line-height: 36px;
      border-radius: 3px;
      padding: 0 12px !important;
      margin-top: 4px;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
      }
      &:hover {
        background: #f3f3f3;
      }
      &:active {
        background: #e7e7e7;
      }
      &:first-child {
        margin-top: 0;
      }
      &.is-active {
        &::before {
          display: none;
        }
        background: #ecf2fe;
        span {
          color: #0052d9;
        }
      }
    }
    .el-submenu {
      .el-submenu__title {
        i {
          right: 10px;
        }
      }
      &.is-opened {
        .el-submenu__title {
          span,
          i {
            color: rgba(0, 0, 0, 0.9);
          }
        }
      }
      &.is-active {
        .el-submenu__title {
          background: #ecf2fe;
          span,
          i {
            color: #0052d9;
          }
        }
      }
    }
  }
}
</style>
