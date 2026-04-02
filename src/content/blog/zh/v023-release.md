---
title: "PicoClaw v0.2.3 发布：系统托盘 UI、子 Agent 状态查询、Gateway 热重载"
description: "v0.2.3 带来 6 项重要特性：系统托盘 UI、子 Agent 状态查询、Cron 安全门控、Gateway 热重载、语音转录回显，以及两项安全修复"
date: 2026-03-17
tags: ["发布公告", "新特性"]
lang: zh
author: PicoClaw Team
slug: v023-release
---

**2026 年 3 月 17 日**  PicoClaw 团队发布 v0.2.3 版本

本次更新带来 6 项重要特性和多项安全修复，进一步提升桌面端体验、多 Agent 编排能力和运行时灵活性。

---

## 一、系统托盘 UI（Windows & Linux）

PicoClaw 现在支持 Windows 和 Linux 的系统托盘图标。启动后自动驻留在任务栏/菜单栏，提供一键打开 Web UI、查看版本信息、访问文档/GitHub、重启 Gateway 和退出等操作。

桌面用户不再需要保持终端窗口打开——最小化到托盘即可后台运行。

技术细节：基于 fyne.io/systray 实现，Windows 使用 .ico 图标，Linux 使用 .png。macOS 和 FreeBSD 因 CI 流水线尚未启用 CGO，目前提供 stub 回退方案确保编译不受影响，托盘支持计划后续跟进。

---

## 二、子 Agent 状态查询（SpawnStatusTool）

新增 `spawn_status` 工具，主 Agent 可以随时查询自己派生的子 Agent 运行状态。支持按 `task_id` 查询单个任务或列出全部任务，返回状态（`running` / `completed` / `failed` / `canceled`）、标签、创建时间和结果摘要。

这意味着 PicoClaw 现在可以实现真正的并行任务编排——派生多个子 Agent 处理不同任务，然后轮询状态汇总结果。

技术细节：通过 OriginChannel + OriginChatID 做会话隔离，防止跨对话信息泄露。结果截断至 300 字符，避免上下文溢出。

---

## 三、Cron 定时任务安全门控

Cron 工具的 shell 命令执行能力新增双重开关控制：

- `allow_command`：是否允许 cron 调度 shell 命令（默认关闭）
- `exec_timeout_minutes`：命令执行超时限制

执行前经过三层检查：exec 工具是否启用 → 是否来自内部频道 → 是否有显式确认。外部频道（Telegram/Discord 等）无法触发定时 shell 命令，安全默认关闭。

---

## 四、Web Gateway 热重载（实验性）

Gateway 现在支持运行时配置热重载。开启 `hot_reload: true` 后，每 2 秒轮询配置文件变化，检测到修改后自动完成：停止所有服务 → 创建新 Provider → 原子切换配置 → 重启所有服务。任一步骤失败自动回滚到旧配置。

修改模型、频道、服务配置后立即生效，无需重启进程，不中断已有对话。

> ⚠️ 已知问题：热重载在部分配置场景下存在 bug，默认关闭，启用需自行承担风险，修复正在进行中。

---

## 五、语音转录回显

开启 `echo_transcription: true` 后，用户发送的语音消息经 Groq Whisper（`whisper-large-v3`）转录后，转录文本会回显给用户。目前支持 Discord 和 Slack 频道。

系统自动检测可用的 Groq API Key，优先使用 `providers.groq.api_key`，其次扫描模型列表中的 `groq/` 前缀条目。

---

## 六、安全修复

本版本包含两项重要安全修复：

- **未认证 exec 路径加固**：`ExecTool` 新增远程频道拦截，默认禁止外部频道（Telegram/Discord 等）执行 shell 命令。`allow_remote` 配置默认 `false`，采用 fail-closed 设计。
- **符号链接路径逃逸修复**：文件系统工具的白名单检查现在会解析符号链接的真实路径，防止通过软链接绕过 `allow_read_paths` / `allow_write_paths` 限制。

---

## 构建产物

v0.2.3 提供 35 个预编译包，覆盖：

| 平台 | 架构 |
|------|------|
| Linux | x86_64, arm64, armv7, armv6, riscv64, loong64, mipsle, s390x |
| macOS | arm64 (Apple Silicon), x86_64 |
| Windows | x86_64, arm64 |
| FreeBSD | x86_64, arm64, armv6, armv7 |
| NetBSD | x86_64, arm64 |

Linux 用户可直接使用 `.deb` 或 `.rpm` 包安装。

## 升级方式

```bash
# 从源码构建
git pull && make build

# 或下载预编译包
# https://github.com/sipeed/picoclaw/releases/tag/v0.2.3
```

---

## 更新日志

### 版本定位

| 版本 | 发布日期 | 定位 | 核心主题 |
|------|----------|------|----------|
| v0.2.3 | Mar 17 | 桌面体验 + 运维能力 | 系统托盘 + 热重载 + 多 Agent 编排 |
| v0.2.2 | Mar 11 | 巩固加固 | Web UI 完善 + 安全修复 |
| v0.2.1 | Mar 9 | 生态大扩展 | Channel/Provider/MCP 全面铺开 |

### v0.2.3 新增特性

- 全平台系统托盘 UI（PR #1649）：Windows/Linux 托盘图标，一键操作（macOS/FreeBSD 待 CGO 支持）
- 子 Agent 状态查询（PR #1540）：`spawn_status` 工具，支持并行任务编排
- Cron 定时任务安全门控（PR #1647 + #1685）：三层检查，外部频道无法触发 shell 命令
- Web Gateway 热重载（PR #1684）：配置修改即时生效，失败自动回滚（实验性，默认关闭）
- 符号链接路径逃逸修复（PR #1660）：白名单检查解析真实路径
- GLM nil input 修复（PR #1663）：修复 GLM 系列 tool_use 空输入崩溃

### v0.2.2 关键特性回顾

v0.2.2 聚焦 Web 管理和安全：

- Agent 管理 UI（PR #1358）：Web 前端新增 Skills CRUD 和 Tools 开关管理，支持 Markdown frontmatter 解析
- 语音转录回显（PR #1214）：Groq Whisper-large-v3 转录后回显文本，支持 Discord/Slack
- Exec 安全加固（PR #1360）：未认证 tool-exec 路径加固，`allow_remote` 默认关闭
- Session Key 清理：sanitize `/` 和 `\`，防止路径穿越

### v0.2.1 关键特性回顾

v0.2.1 奠定了 PicoClaw 的核心能力矩阵：

- MCP Tools 支持（PR #282, yuchou87）：集成 Model Context Protocol，支持 stdio 和 SSE/HTTP 两种传输，可连接任意 MCP 服务器扩展 Agent 工具能力
- Agent Vision Pipeline：`media://` 引用的图片自动 base64 编码注入多模态 LLM，支持图片/文件附件
- JSONL Memory Store：append-only JSONL 持久化会话存储，64 分片锁保证并发安全，崩溃安全
- Model Routing：基于规则的消息复杂度评分器，自动将简单对话路由到轻量模型，降低 API 成本
- 4 个新 Channel：Matrix（mautrix）、IRC（ergochat）、企业微信 AIBot（流式任务队列）、Discord Proxy
- 3 个新 Provider：Kimi/Moonshot、Minimax、Avian
- Tool 启用/禁用配置：Web UI 可按工具单独开关权限
- PICOCLAW_HOME 环境变量：支持多实例部署和容器化

---

*PicoClaw — 轻量、跨平台、极速*

官网：picoclaw.io

GitHub：github.com/sipeed/picoclaw

文档：docs.picoclaw.io

Discord 社区：discord.gg/V4sAZ9XWpN
