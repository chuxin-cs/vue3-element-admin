<template>
  <div class="avue-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in matcheds" :key="item.path">
        <router-link v-if="item.meta.breadcrumb" :to="{ path: item.path }">
          {{ item.name }}
        </router-link>
        <span v-else>{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tools-box">
      <div v-if="$route.meta.canBack" class="btn-back" @click="back">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutBreadcrumb",
  data() {
    return {};
  },
  computed: {
    matcheds() {
      return this.$route.matched.filter((f, i) => f.name && i !== 0);
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.avue-breadcrumb {
  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  justify-content: space-between;

  ::v-deep {
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
  .tools-box {
    .btn-back {
      font-size: 14px;
      color: #3072dd;
      font-weight: 600;
      line-height: 22px;
      cursor: pointer;
      &:hover {
        color: #0052d9;
      }
      span,
      i {
        display: inline-block;
        vertical-align: top;
      }
      i {
        font-weight: 600;
        margin: 4px 2px 0 0;
      }
    }
  }
}
</style>
