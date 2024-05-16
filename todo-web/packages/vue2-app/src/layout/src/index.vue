<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <div class="layout-header">
      <LayoutHeader :isShowTenant="false" />
    </div>

    <!-- 主体 -->
    <div class="layout-container">
      <!-- 左侧导航栏 -->
      <div class="layout-left">
        <LayoutSidebar />
      </div>

      <!-- main区域 -->
      <div class="layout-main">
        <!--面包屑-->
        <LayoutBreadcrumb />
        <!--主体-->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
import { LayoutHeader, LayoutSidebar, LayoutBreadcrumb } from "@common/layout";

export default {
  name: "AppLayout",
  components: {
    LayoutHeader,
    LayoutSidebar,
    LayoutBreadcrumb,
  },
};
</script>

<style scoped lang="scss">
.layout {
  .layout-header {
  }
  .layout-container {
    .layout-left {
    }
    .layout-main {
    }
  }
}
</style>
