
<div align="center">
  <img alt="vue3-element-admin" width="80" height="80" src="./src/assets/logo.png">
  <h1>vue3-element-admin</h1>

  <img src="https://img.shields.io/badge/Vue-3.4.35-brightgreen.svg"/>
  <img src="https://img.shields.io/badge/Vite-5.3.5-green.svg"/>
  <img src="https://img.shields.io/badge/Element Plus-2.7.8-blue.svg"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
  <a href="https://gitee.com/youlaiorg" target="_blank">
      <img src="https://img.shields.io/badge/Author-有来开源组织-orange.svg"/>
  </a>
</div>

![](https://foruda.gitee.com/images/1708618984641188532/a7cca095_716974.png "rainbow.png")


<div align="center">
  <a target="_blank" href="http://vue3.youlai.tech">🔍 在线预览</a> |  <a target="_blank" href="https://juejin.cn/post/7228990409909108793">📖 阅读文档</a> | <a href="./README.en-US.md">🌐English
</div>



## 项目简介

[vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin) 是基于 Vue3 + Vite5+ TypeScript5 + Element-Plus + Pinia 等主流技术栈构建的免费开源的中后台管理的前端模板（配套[Java 后端源码](https://gitee.com/youlaiorg/youlai-boot)）。


## 项目特色

- **简洁易用**：基于 [vue-element-admin](https://gitee.com/panjiachen/vue-element-admin) 升级的 Vue3 版本，无过渡封装 ，易上手。

- **数据交互**：同时支持本地 `Mock` 和线上接口，配套 [Java 后端源码](https://gitee.com/youlaiorg/youlai-boot)和[在线接口文档](https://www.apifox.cn/apidoc/shared-195e783f-4d85-4235-a038-eec696de4ea5)。

- **权限管理**：用户、角色、菜单、字典、部门等完善的权限系统功能。

- **基础设施**：动态路由、按钮权限、国际化、代码规范、Git 提交规范、常用组件封装。

- **持续更新**：项目持续开源更新，实时更新工具和依赖。



## 项目预览

![明亮模式](https://foruda.gitee.com/images/1709651876583793739/0ba1ee1c_716974.png)

![暗黑模式](https://foruda.gitee.com/images/1709651875494206224/2a2b0b53_716974.png)

![接口文档](https://foruda.gitee.com/images/1687755822857820115/96054330_716974.png)

## 项目地址

| 项目 | Gitee                                                        | Github                                                       | 
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | 
| 前端 | [vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin) | [vue3-element-admin](https://github.com/youlaitech/vue3-element-admin) | [vue3-element-admin](https://gitcode.net/youlai/vue3-element-admin) |
| 精简版 | [vue3-element-admin-thin](https://gitee.com/cshaptx4869/vue3-element-admin-thin) | [vue3-element-admin-thin](https://github.com/youlaitech/vue3-element-admin-thin) |
| 后端 | [youlai-boot](https://gitee.com/youlaiorg/youlai-boot)       | [youlai-boot](https://github.com/haoxianrui/youlai-boot.git) |

## 环境准备

| 环境                 | 名称版本                                                     | 下载地址                                                     |
| -------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **开发工具**         | VSCode    | [下载](https://code.visualstudio.com/Download)           |
| **运行环境**         | Node ≥18 (其中 20.6.0 版本不可用)    | [下载](http://nodejs.cn/download)                        |


## 项目启动

```bash
# 克隆代码
git clone https://gitee.com/youlaiorg/vue3-element-admin.git

# 切换目录
cd vue3-element-admin

# 安装 pnpm
npm install pnpm -g

# 设置镜像源(可忽略)
pnpm config set registry https://registry.npmmirror.com

# 安装依赖
pnpm install

# 启动运行
pnpm run dev
```



## 项目部署

```bash
# 项目打包
pnpm run build

# 上传文件至远程服务器
将本地打包生成的 dist 目录下的所有文件拷贝至服务器的 /usr/share/nginx/html 目录。

# nginx.cofig 配置
server {
	listen     80;
	server_name  localhost;
	location / {
			root /usr/share/nginx/html;
			index index.html index.htm;
	}
	# 反向代理配置
	location /prod-api/ {
      # api.youlai.tech 替换后端API地址，注意保留后面的斜杠 /
      proxy_pass http://api.youlai.tech/; 
	}
}
```

## 本地Mock

项目同时支持在线和本地 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，修改文件 `.env.development` 的 `VITE_MOCK_DEV_SERVER` 为  `true` **即可**。

## 后端接口

> 如果您具备Java开发基础，按照以下步骤将在线接口转为本地后端接口，创建企业级前后端分离开发环境，助您走向全栈之路。

1. 获取基于 `Java` 和 `SpringBoot` 开发的后端 [youlai-boot](https://gitee.com/youlaiorg/youlai-boot.git) 源码。
2. 根据后端工程的说明文档 [README.md](https://gitee.com/youlaiorg/youlai-boot#%E9%A1%B9%E7%9B%AE%E8%BF%90%E8%A1%8C) 完成本地启动。
3. 修改 `.env.development` 文件中的 `VITE_APP_API_URL` 的值，将其从 https://api.youlai.tech 更改为 http://localhost:8989 即可。


## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

  ![](https://foruda.gitee.com/images/1687755823137387608/412ea803_716974.png)

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。

- **项目组件、函数和引用爆红**

	重启 VSCode 尝试

- **其他问题**

  如果有其他问题或者建议，建议 [ISSUE](https://gitee.com/youlaiorg/vue3-element-admin/issues/new)



## 项目文档

- [基于 Vue3 + Vite + TypeScript + Element-Plus 从0到1搭建后台管理系统](https://blog.csdn.net/u013737132/article/details/130191394)

- [ESLint+Prettier+Stylelint+EditorConfig 约束和统一前端代码规范](https://blog.csdn.net/u013737132/article/details/130190788)
- [Husky + Lint-staged + Commitlint + Commitizen + cz-git 配置 Git 提交规范](https://blog.csdn.net/u013737132/article/details/130191363)


## 提交规范

执行 `pnpm run commit` 唤起 git commit 交互，根据提示完成信息的输入和选择。

![](https://foruda.gitee.com/images/1687755823165218215/c1705416_716974.png)


## 项目统计

![Alt](https://repobeats.axiom.co/api/embed/aa7cca3d6fa9c308fc659fa6e09af9a1910506c3.svg "Repobeats analytics image")


Thanks to all the contributors!

[![contributors](https://contrib.rocks/image?repo=youlaitech/vue3-element-admin)](https://github.com/youlaitech/vue3-element-admin/graphs/contributors)


## 交流群🚀

> **关注「有来技术」公众号，获取交流群二维码。**
>
> 如果交流群的二维码过期，请加微信(haoxianrui)并备注「前端」、「后端」或「全栈」以获取最新二维码。
>
> 为确保交流群质量，防止营销广告人群混入，我们采取了此措施。望各位理解！

| 公众号 | 交流群 |
|:----:|:----:|
| ![有来

