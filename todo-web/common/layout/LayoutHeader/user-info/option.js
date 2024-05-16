import { baseUrl, fileUrl } from "@common/config";
import { getToken } from "@common/utils";

export default (vm) => {
  return {
    tabs: true,
    tabsActive: 1,
    group: [
      {
        label: "个人信息",
        prop: "info",
        column: [
          {
            label: "头像",
            span: 24,
            prop: "avatar",
            listType: "picture-img",
            tip: "只能上传jpg/png用户头像，且不超过500kb",
            type: "upload",
            action: `${baseUrl}/blade-resource/oss/endpoint/put-file`,
            headers: {
              [window.website.tokenHeader]: "bearer " + getToken(),
            },
            uploadBefore: (file, done, loading) => {
              if (file.name.length > 50) {
                vm.$message.error("文件名称长度不能大于50!");
                loading();
                return;
              }
              if (file.size > 500 * 1024) {
                vm.$message.error("文件大小不能大于500kb!");
                loading();
                return;
              }
              const isFile =
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png";
              if (!isFile) {
                vm.$message.error("上传文件只能是jpg、png格式文件!");
                loading();
                return;
              }
              done();
            },
            uploadExceed: () => {
              vm.$message.error("文件上传个数不能超过限制");
            },
            slot: true,
            propsHttp: {
              home: fileUrl,
              res: "data",
              url: "name",
            },
          },
          {
            label: "姓名",
            span: 20,
            row: true,
            prop: "name",
          },
          {
            label: "用户名",
            span: 20,
            row: true,
            prop: "realName",
          },
          {
            label: "手机号",
            span: 20,
            row: true,
            prop: "phone",
            rules: [
              {
                pattern: /^\d+$/,
                message: "只能输入数字",
                trigger: "change",
              },
              {
                min: 11,
                max: 11,
                message: "长度在为 11 个字符",
                trigger: "change",
              },
            ],
          },
          {
            label: "邮箱",
            prop: "email",
            span: 20,
            row: true,
          },
        ],
      },
      {
        label: "修改密码",
        prop: "password",
        column: [
          {
            label: "原密码",
            span: 24,
            row: true,
            type: "password",
            prop: "oldPassword",
          },
          {
            label: "新密码",
            span: 24,
            row: true,
            type: "password",
            prop: "newPassword",
          },
          {
            label: "确认密码",
            span: 24,
            row: true,
            type: "password",
            prop: "newPassword1",
          },
        ],
      },
    ],
  };
};
