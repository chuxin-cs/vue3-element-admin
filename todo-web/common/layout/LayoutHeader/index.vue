<template>
  <div class="avue-top">
    <div class="top-bar-left">
      <el-popover
        popper-class="app-popover"
        placement="bottom"
        width="400"
        trigger="click"
      >
        <div class="app-list">
          <div
            class="app-item"
            v-for="(item, idx) in appData"
            :key="idx"
            @click="goToApp(item)"
          >
            <img
              class="app-logo"
              :src="item.appIcon ? fileUrl + item.appIcon : appDefaultImg"
            />
            <div class="app-name">
              {{ item.title }}
            </div>
          </div>
        </div>
        <div slot="reference" class="app-info">
          <img
            class="app-logo"
            :src="project.appIcon ? fileUrl + project.appIcon : appDefaultImg"
          />
          <div class="app-name">
            {{ project.title }}<img src="./img/jiantou.png" />
          </div>
        </div>
      </el-popover>
    </div>
    <div class="top-bar-right">
      <template v-if="isShowTenant">
        <div class="tenant-select-box">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ currentTenantName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in tenantOptions"
                :key="item.tenantId"
                :disabled="item.tenantId == userInfo.tenantId"
                @click.native="tenantChange(item)"
              >
                {{ item.tenantName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="divider-vertical"></div>
      </template>
      <slot name="topMenu"></slot>
      <el-tooltip effect="dark" content="导航" placement="bottom">
        <div class="top-bar-navigation" @click="goNavigation">
          <i class="iconfont icon-caidan" />
        </div>
      </el-tooltip>
      <div class="divider-vertical"></div>
      <div class="top-bar-user">
        <img class="head-img" :src="userInfo.avatar" />
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ userInfo["name"] }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="openUserInfo">
              <span> 个人信息 </span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <UserInfo ref="userInfoRef"></UserInfo>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fileUrl } from "@common/config";
import { getAppTenantList } from "./api.js";
import appDefaultImg from "./img/app-default-img.png";
import UserInfo from "./user-info";

export default {
  name: "LayoutHeader",
  props: {
    //切换租户
    isShowTenant: false,
  },
  components: { UserInfo },
  data() {
    return {
      fileUrl,
      appDefaultImg,
      tenantOptions: [],
      currentTenantName: "请选择",
    };
  },
  computed: {
    ...mapGetters(["userInfo", "project", "appList"]),
    appData() {
      return this.appList.filter((item) => item.appId != this.project.appId);
    },
  },
  mounted() {
    getAppTenantList({
      appId: this.project.appId,
    }).then((res) => {
      const data = res.data.data;
      this.tenantOptions = data;
      this.currentTenantName = this.tenantOptions.filter(
        (item) => item.tenantId == this.userInfo.tenantId
      )[0].tenantName;
    });
  },
  methods: {
    //切换租户
    tenantChange(item) {
      window.$emitMain("tenantChange", item);
    },
    //个人信息
    openUserInfo() {
      this.$refs.userInfoRef.open();
    },
    //返回导航页
    goNavigation() {
      window.$emitMain("goNavigation");
    },
    //登出
    loginOut() {
      window.$emitMain("loginOut");
    },
    //应用切换
    goToApp(item) {
      window.location.href = `${window.location.protocol}//${window.location.host}/${item.appCode}/`;
    },
  },
};
</script>

<style lang="scss" scoped>
.avue-top {
  height: 56px;
  line-height: 56px;
  padding: 0 24px;
  background: #fff;
  box-shadow: 0px -0.5px 0px 0px #e7e7e7 inset;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.top-bar-left {
  display: flex;
  align-items: center;
  .btn-fold {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      vertical-align: top;
    }
    &:hover {
      background: #f3f3f3;
      border-radius: 3px;
    }
  }
  .app-info {
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .app-logo {
    width: 28px;
    height: 28px;
    vertical-align: top;
  }
  .app-name {
    margin-left: 8px;
    font-size: 20px;
    color: #203251;
    font-weight: 600;
    img {
      width: 16px;
      height: 16px;
      margin-left: 4px;
      transition: all 0.3s;
    }
  }
}
.top-bar-right {
  display: flex;
  align-items: center;
  height: 56px;
  .divider-vertical {
    display: inline-block;
    vertical-align: middle;
    width: 1px;
    height: 24px;
    margin: 0 20px;
    background: rgba(0, 0, 0, 0.1);
  }
  .top-bar-notice {
    font-size: 16px;
    color: #333;
    cursor: pointer;
    margin-right: 15px;
    ::v-deep .el-badge__content {
      line-height: 14px;
      height: 16px;
    }
  }
  .tenant-select-box {
    display: inline-flex;
    height: 20px;
    line-height: 20px;
    ::v-deep .el-dropdown {
      color: #333;
      cursor: pointer;
    }
  }
  .top-bar-navigation {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 8px;
    border-radius: 3px;
    box-sizing: initial;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
    i {
      display: inline-block;
      vertical-align: top;
      font-size: 20px;
    }
    &:hover {
      background: #f3f3f3;
      color: rgba(0, 0, 0, 0.9);
    }
  }
  .top-bar-user {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    .head-img {
      display: inline-block;
      vertical-align: top;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin-right: 6px;
    }
    ::v-deep .el-dropdown {
      display: inline-block;
      vertical-align: top;
      line-height: 20px;
      margin-top: 5px;
      color: #333;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.app-popover.el-popper {
  margin-top: 6px;
  padding: 10px 12px;
  .el-popover__title {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
  }
  .app-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .app-item {
      width: 86px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      margin-right: 10px;
      cursor: pointer;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover {
        background: #f3f3f3;
      }
      &:active {
        background: #e7e7e7;
      }
      .app-logo {
        width: 38px;
        height: 38px;
        vertical-align: top;
      }
      .app-name {
        width: 100%;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.8);
        line-height: 22px;
        margin-top: 3px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
    }
  }
}
</style>
