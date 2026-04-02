---
title: "PicoClaw 安卓原生 APK 测试版发布！吃灰机顶盒一键养虾体验！"
description: "再也不用倒腾 Termux！APK 一键安装，特别针对安卓机顶盒适配，遥控器可操作，快唤醒你家的吃灰机顶盒把它升级为家庭 AI 中枢吧！"
date: 2026-04-01
tags: ["新特性", "Android", "发布公告"]
lang: zh
author: PicoClaw Team
slug: android-apk-release
imageWidth: 50
---

千呼万唤始出来，PicoClaw 安卓原生 APK 测试版来啦！

再也不用倒腾 Termux 复杂的安装，APK 包一键安装使用！

特别针对安卓机顶盒适配，简洁界面连遥控器都能操作

快唤醒你家的吃灰机顶盒，把它升级为你的家庭 AI 中枢吧！

---

## 简洁页面，遥控器可操作

![主页截图](../../../assets/blog/android-apk-release/A.jpg)

**主页：一键启动**

点一下启动，服务就跑起来了，就这么简单！

![第二页截图](../../../assets/blog/android-apk-release/B.jpg)

**第二页：内嵌 Web 界面**

不用切浏览器！第二页直接内嵌 Web UI

部署、配置、对话，一站式全部搞定！

机顶盒由于遥控器输入困难，建议使用手机扫描第一页的二维码进行本地配置

在那之前，记得打开设置里的「公共模式」

![第三页截图](../../../assets/blog/android-apk-release/C.jpg)

**第三页：运行日志**

开发者专属，遇到问题来这里翻日志，让 BUG 无所遁形。普通用户也可以点击右上角的 ⏬ 按钮，日志直接保存到本地并弹出分享框，一键发到群里让开发者帮你分析

![第四页截图](../../../assets/blog/android-apk-release/D.jpg)

**第四页：配置**

大多数情况下完全不用动！

想让局域网里其他设备也能访问？（比如手机扫码连到机顶盒上的 PicoClaw）

打开「公共模式」，重启服务即可

---

## 哪些设备可以试？

手边有安卓设备，基本都能上！

- **手机**：极度轻量，几乎不消耗性能，完全本地运行，隐私拉满的全能 AI 助手
- **旧手机**：插上电，扔角落，24 小时在线，一分钱服务器费都不用花！
- **机顶盒**：那台只用来看电视的盒子，现在可以多做一件事！1G DDR + 8G eMMC 的低配机顶盒即可完美运行，丝滑流畅。最低安卓 7 系统版本，10 年前的老机顶盒也可以用~
- **平板**：吃灰的旧平板，摇身一变成家里的 AI 控制台

其他安卓设备理论上也能跑，全面兼容性测试还在进行中，欢迎反馈

PicoClaw 内存占用极小，对硬件几乎没有要求，老设备也能焕发新生！

---

## 怎么参与测试？

前往 GitHub Releases 下载 APK，直接装上就能用！

安装时提示「来自未知来源」，允许就好，非应用商店 APK 都是这个流程，无风险放心装

→ https://github.com/sipeed/picoclaw_fui/releases

遇到问题欢迎在 GitHub Issues 或社区群反馈，一起完善让兼容性越来越好！

设备兼容性反馈收集帖：https://github.com/sipeed/picoclaw_fui/issues/42

---

## 用之前需要知道的几件事

**需要自备 API Key**

PicoClaw 本身是免费开源的，但调用 AI 模型（DeepSeek、通义千问、豆包等）需要你自己去对应平台申请 API Key

国内主流平台都有订阅套餐，价格从几十元起，够普通用户用好久好久

**这是开发者测试版**

当前版本尚未完成完整的设备兼容性测试，可能存在未发现的问题

不建议直接暴露在公网或用于关键业务

正式版本将在后续测试完善后发布

---

## 关于 PicoClaw

PicoClaw 是矽速科技 (Sipeed) 发起的开源 AI 助手项目，用 Go 语言从零编写，目前 GitHub 27K+ Stars

支持通过微信、企业微信、Telegram、QQ、飞书、钉钉等 18+ 平台对话

可以联网搜索、管理日程、写代码、处理文件，还能通过 MCP 协议扩展更多能力

---

*PicoClaw — 轻量、跨平台、极速*

官网：picoclaw.io

GitHub：github.com/sipeed/picoclaw

文档：docs.picoclaw.io

Discord 社区：discord.gg/V4sAZ9XWpN
