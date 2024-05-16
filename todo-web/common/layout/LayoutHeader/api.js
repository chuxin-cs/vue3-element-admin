import { baseUrl } from "@common/config";

//获取租户列表
export const getAppTenantList = (params) => {
  return window.axios({
    url: `${baseUrl}/blade-system/tenant/find-tenant-by-account`,
    method: "get",
    params,
  });
};

//获取用户信息
export const getUserInfo = () => {
  return window.axios({
    url: `${baseUrl}/blade-user/account/info`,
    method: "get",
  });
};

//修改用户信息
export const updateInfo = (row) => {
  return window.axios({
    url: `${baseUrl}/blade-user/update-info`,
    method: "post",
    data: row,
  });
};

//修改密码
export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return window.axios({
    url: `${baseUrl}/blade-user/account/update-password`,
    method: "post",
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    },
  });
};
