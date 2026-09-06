# Kelly 人才盘点与继任管理 / Kelly Talent Review

[打开中文版](https://shenkelly1224-prog.github.io/Kelly_Talent_Dashboard/) · [English](https://shenkelly1224-prog.github.io/Kelly_Talent_Dashboard/en/)

完整可编辑的中英双语模板，基于 Maya Xu 的 MIT 开源项目定制。包含项目配置、CSV 导入导出、评估、九宫格、校准、继任计划、仪表盘和 IDP。

## 首次使用

1. 点击“我是项目主理人”，设置自己的本地密码。
2. 完成配置向导，导入评估人员、被评估人员和关键岗位。
3. 分发评估文件，收集评估结果，再进行分析和校准。

评估人入口需要已经导入人员或收到项目主理人分发的文件。空白模板不预装员工数据。`test-data/` 是上游提供的测试数据，仅用于测试。

本版本沿用本地浏览器存储和文件分发模式，不是多人在线数据库服务。本地密码是界面锁，不是服务器账户认证。Kelly 使用独立的存储名称，旧 Maya 页面数据不会被覆盖。

## 开发

`src/engine.js` / `src/engine.en.js` 为完整业务源码；`src/build_platform*.js` 为界面构建脚本。

```sh
node build.js
node test.js
```

构建生成中文 `index.html`、英文 `en/index.html`，以及 `dist/`。GitHub Pages 从 main 根目录发布。旧 `index-3.html` 自动转到新版首页。

修复了原英文源码报告文字中未转义引号导致的整页脚本解析失败，入口增加键盘支持，并保留原功能。测试覆盖中英文角色入口、项目设置、13 个管理页面及四种 CSV 模板；中文入口另经过 Chrome 实测。

## 来源与许可

Source: https://github.com/mayaxuuu-creator/MayaXu-HR-Talent-Review

Copyright (c) 2026 Maya Xu. 保留 MIT LICENSE 和 TRADEMARK.md；Kelly 为本定制版本的产品名称。`docs/` 保留上游业务文档供参考。
