# Kelly update — 2026-09-06

- Restore full bilingual source and build outputs.
- Fix English script syntax error; brand product as Kelly.
- Isolate Kelly local storage; preserve upstream MIT license.
- Add accessible role cards and route old URL to homepage.

# 更新日志

## V5.0 (2026-08-03)

### 许可证与品牌升级
- 许可证从 CC BY-NC-ND 4.0 更换为 **MIT License**（OSI 认可的开源许可证）
- 项目正式更名为 **Maya's Talent Review**
- 新增 TRADEMARK.md 保护品牌名称
- README 重写：新增「作者的期望」段落、更新 License 说明
- AGENTS.md 同步更新许可证与品牌信息

## V4.0 (2026-08-01)

### 新功能
- 完整英文版（engine.en.js + build_platform.en.js + dist/en/index.html）
- 添加 CC BY-NC-ND 4.0 开源许可证（可下载使用，不可修改后分发，不可商用）
- README 重写为中英双语，下载与使用指南置顶
- Vercel 路由支持 /en 英文版入口

## V3.4 (2026-08-01)

### Bug 修复
- 修复评估人首次登录后不自动弹出新手引导的问题

### 新功能
- 侧边栏底部新增「新手引导」按钮，项目主理人和评估人均可随时重播引导

## V3.3 (2026-08-01)

### Bug 修复
- 导入员工 CSV 时不再覆盖已导入的评估人数据
- 校准会议继任计划标签页和导出报告未关联 successionData

### 新功能
- 数据导入导出页面新增「帮助与引导」面板

## V3.2 (2026-08-01)

### Bug 修复
- 修复回收 CSV 中继任信息未同步到继任计划页面
- successionData 键值从评估人 ID 改为岗位名称
- 继任计划页面从遍历 eltList 改为遍历 keyPositions

## V3.1 (2026-08-01)

### Bug 修复
- 修复 36 处无效 \U 转义序列（页面上显示为 U0001XXXX）
- 离职风险改为百分比阈值（50%/25%）
- HRBP 模板增强为评分引导页 + 数据录入页两个 CSV
- 重置按钮改为全量清除 localStorage + 页面刷新

## V3.0 (2026-08-01)

### 新功能
- 配置向导设置关联至所有模块（绩效等级、层级等）
- 配置向导跨步骤数据丢失修复
- 七大功能升级

## V2.1 (2026-08-01)

### Bug 修复
- 修复配置向导跨步骤数据丢失问题（绩效等级在保存后被清空）
- 修复新建被评估人时层级下拉框无法读取配置向导已设置的层级选项
- 配置向导中的绩效等级（S/A/B/C/D）、层级等设置现已关联到所有模块

## V2.0 (2026-08-01)

### 新功能
- 评估人员配置独立模块（评估人姓名、岗位、部门、层级、密码）
- 被评估人员与评估人通过「直属上级」自动关联
- 关键岗位现任负责人自动匹配评估人和被评估人
- 三实体（评估人 / 被评估人 / 岗位）数据关联，消除信息孤岛
- 三个模块均支持 CSV 批量导入 + 模板下载

## V1.3 (2026-07-24)

### 变更
- 清理冗余目录 talent-review-platform，outputs 为唯一工作目录
- 添加 vercel.json 指定 dist 为部署目录
- dist 重建同步最新版本

## V1.1 (2026-07-23)

### Bug 修复
- 密码确认框点击响应修复
- 默认值改为市场通用叫法
- 绩效改为 5 档制（S/A/B/C/D）
- 潜力维度自定义评分逻辑

## V1.0 (2026-07-23)

### 初始版本
- 统一人才盘点平台
- 九宫格盘点、评估分发、结果回收
- 离职风险预警、继任计划、人才仪表盘

