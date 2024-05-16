<template>
  <div>
    <el-dialog
      title="个人中心"
      :visible.sync="visible"
      width="700px"
      append-to-body
      :close-on-click-modal="false"
    >
      <avue-form
        ref="avueForm"
        :option="option"
        v-model="form"
        @tab-click="handleTabClick"
        @submit="handleSubmit"
      ></avue-form>
    </el-dialog>
  </div>
</template>

<script>
import option from "./option";
import { getUserInfo, updateInfo, updatePassword } from "../api.js";
import md5 from "js-md5";

export default {
  data() {
    return {
      index: 0,
      option: option(this),
      form: {},
      visible: false,
    };
  },
  created() {},
  methods: {
    open() {
      this.index = 0;
      this.visible = true;
      this.$nextTick(() => {
        this.handleWitch();
      });
    },
    restUserInfo() {
      this.visible = false;
      this.handleWitch();
      window.$emitMain("restUserInfo");
    },
    handleSubmit(form, done) {
      if (this.index === 0) {
        updateInfo(this.form).then(
          (res) => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改信息成功!",
              });
              this.restUserInfo();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
            done();
          },
          (error) => {
            window.console.log(error);
            done();
          }
        );
      } else {
        updatePassword(
          md5(form.oldPassword),
          md5(form.newPassword),
          md5(form.newPassword1)
        ).then(
          (res) => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改密码成功!",
              });
              this.restUserInfo();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
            done();
          },
          (error) => {
            window.console.log(error);
            done();
          }
        );
      }
    },
    handleWitch() {
      const validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.newPassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      if (this.index === 0) {
        getUserInfo().then((res) => {
          const user = res.data.data.userVO;
          this.form = {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            realName: user.realName,
            phone: user.phone,
            email: user.email,
          };
        });

        this.$refs.avueForm.getPropRef("name").column.rules = [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ];
        this.$refs.avueForm.getPropRef("oldPassword").column.rules = [];
        this.$refs.avueForm.getPropRef("newPassword").column.rules = [];
        this.$refs.avueForm.getPropRef("newPassword1").column.rules = [];
      } else {
        this.form = {
          oldPassword: "",
          newPassword: "",
          newPassword1: "",
        };
        this.$refs.avueForm.getPropRef("name").column.rules = [];

        this.$refs.avueForm.getPropRef("oldPassword").column.rules = [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ];
        this.$refs.avueForm.getPropRef("newPassword").column.rules = [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ];
        this.$refs.avueForm.getPropRef("newPassword1").column.rules = [
          { required: true, validator: validatePass2, trigger: "blur" },
        ];
      }
    },
    handleTabClick(tabs) {
      this.index = parseFloat(tabs.index);
      this.handleWitch();
    },
  },
  destroyed() {
    this.visible = false;
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-dialog__body {
    padding: 0;
  }
  .avue-upload__icon {
    line-height: 178px !important;
  }
}
</style>
