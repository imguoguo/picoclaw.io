---
title: "PicoClaw 正式支持 FreeBSD 和 NetBSD"
description: "你的 NAS、防火墙、路由器、嵌入式设备跑的是 BSD？从 v0.2.3 开始，PicoClaw 覆盖 FreeBSD 和 NetBSD 共 6 个构建目标，开箱即用。"
date: 2026-03-18
tags: ["新特性", "平台支持"]
lang: zh
author: PicoClaw Team
slug: freebsd-netbsd-support
---

**2026 年 3 月 17 日**  PicoClaw 团队宣布正式支持 FreeBSD 和 NetBSD

你的 NAS、防火墙、路由器、嵌入式设备跑的是 BSD？现在它也能当 AI 助手了

---

## BSD 用户等这一天等了很久

PicoClaw 从第一天起就支持 Linux、macOS、Windows

后来又加上了 RISC-V、龙芯、MIPS

但 BSD 社区的声音一直没断过：

"FreeBSD 什么时候能用？"

"我的 pfSense/OPNsense 防火墙能跑吗？"

"NAS 上的 TrueNAS 是 FreeBSD 底层，能不能直接装？"

从 v0.2.3 开始，答案是：**能**

![FreeBSD](../../../assets/blog/freebsd-netbsd-support/freebsd.png)

---

## 覆盖 6 个构建目标

我们为 BSD 提供了预编译二进制，开箱即用：

| 平台 | 架构 |
|------|------|
| FreeBSD | x86_64 / arm64 / armv7 / armv6 |
| NetBSD | x86_64 / arm64 |

高速下载地址：picoclaw.io

最新构建获取：github.com/sipeed/picoclaw/releases

不需要编译，不需要装 Go 环境

下载、解压、运行，三步搞定

---

## 为什么 BSD 用户需要 PicoClaw

BSD 系统在服务器和网络设备领域有大量存量部署

这些设备通常 7×24 小时运行、资源有限、不适合装重量级应用

PicoClaw 的特点恰好匹配：

- **10MB 内存占用** — 不影响 NAS/防火墙的主业务
- **单二进制部署** — 没有依赖，没有运行时，复制过去就能跑
- **毫秒级启动** — 重启后瞬间恢复服务

几个典型场景：

- **TrueNAS / FreeNAS**：在 NAS 上跑一个 AI 助手，通过 Telegram 远程管理文件、查询存储状态
- **pfSense / OPNsense**：防火墙上部署 AI 运维助手，自动分析日志、告警推送
- **NetBSD 嵌入式设备**：在网络设备上运行轻量 Agent，做自动化巡检
- **开发服务器**：BSD 开发者终于可以在自己的日常环境里用上 AI 助手

---

## 海外社区的反馈

BSD 支持发布后，海外技术社区反响不错。几个有意思的反馈：

- 有人在 2012 年的 HP MicroServer（FreeBSD 14）上跑通了，内存占用 8MB
- 有人把它装进了 Raspberry Pi 4 + FreeBSD 的 homelab 网关
- NetBSD 社区有开发者在测试将 PicoClaw 打包进 pkgsrc

BSD 社区的特点是用户动手能力强、对系统资源敏感、偏好轻量工具

PicoClaw 的设计理念和这个群体天然契合

---

## 三步上手

以 FreeBSD x86_64 为例：

**第一步：下载**

```sh
fetch https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw_Freebsd_x86_64.tar.gz
```

> 注：NetBSD 用户请使用 pkgin 安装 wget 或使用 curl 下载

**第二步：解压并初始化**

```sh
tar xzf picoclaw_Freebsd_x86_64.tar.gz
./picoclaw onboard
```

**第三步：开始对话**

```sh
./picoclaw agent
```

想接入 Telegram、Discord、飞书、钉钉？

编辑 `~/.picoclaw/config.json` 配置对应频道，然后运行 `picoclaw gateway` 即可

详细文档：docs.picoclaw.io

---

## 完整平台支持一览

| 平台 | 架构 |
|------|------|
| Linux | x86_64, arm64, armv7, armv6, riscv64, loong64, mipsle, s390x |
| macOS | arm64 (Apple Silicon), x86_64 |
| Windows | x86_64, arm64 |
| FreeBSD | x86_64, arm64, armv7, armv6 |
| NetBSD | x86_64, arm64 |

总计 35 个预编译包，覆盖从 5 美元开发板到企业服务器的全场景

---

*PicoClaw — 轻量、跨平台、极速*

官网：picoclaw.io

GitHub：github.com/sipeed/picoclaw

文档：docs.picoclaw.io

Discord 社区：discord.gg/V4sAZ9XWpN
