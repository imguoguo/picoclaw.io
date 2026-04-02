---
title: "PicoClaw v0.2.3 — System Tray UI, Sub-Agent Status, Gateway Hot Reload"
description: "v0.2.3 ships 6 major features: system tray UI, sub-agent status tracking, cron security gates, gateway hot reload, voice transcription echo, and two security fixes."
date: 2026-03-17
tags: ["release", "new features"]
lang: en
author: PicoClaw Team
slug: v023-release
---

**March 17, 2026**  PicoClaw Team releases v0.2.3

This release brings 6 major features and multiple security fixes, advancing the desktop experience, multi-agent orchestration, and runtime flexibility.

---

## 1. System Tray UI — Windows & Linux

PicoClaw now lives in your system tray on **Windows and Linux**. After startup it sits in the taskbar / menu bar, giving you one-click access to the Web UI, version info, docs, GitHub, gateway restart, and quit.

Desktop users no longer need to keep a terminal window open — minimize to tray and let it run in the background.

**Implementation details:** Built on `fyne.io/systray`. Windows uses a `.ico` icon; Linux uses `.png`. macOS and FreeBSD require CGO which is not yet enabled in the CI pipeline — a stub fallback is provided so all builds remain unaffected. Tray support for those platforms is planned.

---

## 2. Sub-Agent Status Tracking (`spawn_status`)

The new `spawn_status` tool lets the main agent query the status of its spawned sub-agents at any time. Query by `task_id` or list all tasks — returns status (`running` / `completed` / `failed` / `canceled`), label, creation time, and a result summary.

This enables true parallel task orchestration in PicoClaw: spawn multiple sub-agents for different tasks, then poll for results and aggregate them.

**Implementation details:** Session-isolated via `OriginChannel` + `OriginChatID` to prevent cross-conversation leaks. Results are truncated to 300 characters to avoid context overflow.

---

## 3. Cron Command Security Gates

Shell command execution via cron now has dual-switch control:

- `allow_command`: whether cron is allowed to schedule shell commands (default: `false`)
- `exec_timeout_minutes`: execution timeout

Three checks are required before execution: exec tool enabled → request from internal channel → explicit confirmation set. External channels (Telegram, Discord, etc.) cannot trigger scheduled shell commands. Secure by default.

---

## 4. Web Gateway Hot Reload (Experimental)

The gateway now supports runtime config hot reload. Set `hot_reload: true` and changes to `config.json` take effect **instantly** — no process restart needed.

Every 2 seconds the gateway polls for config changes. On detection it performs a full atomic swap: stop services → create new provider → reload config → restart services. Any failure triggers automatic rollback to the previous working config.

> ⚠️ **Known issue:** Hot reload has a bug that may cause unexpected behavior in some configurations. Disabled by default — enable at your own risk. A fix is in progress.

---

## 5. Voice Transcription Echo

With `echo_transcription: true`, voice messages sent by the user are transcribed via Groq Whisper (`whisper-large-v3`) and the transcription text is echoed back. Currently supported on Discord and Slack.

The system auto-detects the available Groq API key, preferring `providers.groq.api_key`, then scanning the model list for `groq/`-prefixed entries.

---

## 6. Security Fixes

Two important security fixes in this release:

- **Unauthenticated exec path hardening:** `ExecTool` now blocks remote channels from executing shell commands by default. `allow_remote` defaults to `false` — fail-closed design.
- **Symlink path escape fix:** File system tools now resolve symlinks via `filepath.EvalSymlinks` before whitelist matching, preventing bypass of `allow_read_paths` / `allow_write_paths` through symbolic links.

---

## Platforms

v0.2.3 ships 35 precompiled binaries:

| Platform | Architectures |
|----------|--------------|
| Linux | x86_64, arm64, armv7, armv6, riscv64, loong64, mipsle, s390x |
| macOS | arm64 (Apple Silicon), x86_64 |
| Windows | x86_64, arm64 |
| FreeBSD | x86_64, arm64, armv6, armv7 |
| NetBSD | x86_64, arm64 |

`.deb` and `.rpm` packages are available for Linux.

---

## Upgrade

```bash
# From source
git pull && make build

# Or download precompiled binary
# https://github.com/sipeed/picoclaw/releases/tag/v0.2.3
```

---

## Changelog

### Version Overview

| Version | Date | Focus | Theme |
|---------|------|-------|-------|
| v0.2.3 | Mar 17 | Desktop + Ops | System tray + hot reload + multi-agent |
| v0.2.2 | Mar 11 | Hardening | Web UI + security fixes |
| v0.2.1 | Mar 9 | Ecosystem | Channels / Providers / MCP rollout |

### v0.2.3 — What's New

- System tray UI for all platforms (PR #1649): Windows/Linux tray, one-click actions (macOS/FreeBSD pending CGO)
- Sub-agent status tracking (PR #1540): `spawn_status` tool, parallel task orchestration
- Cron security gates (PR #1647 + #1685): triple verification, external channels blocked
- Web gateway hot reload (PR #1684): instant config reload, auto-rollback on failure (experimental, off by default)
- Symlink path escape fix (PR #1660): whitelist checks resolve real paths
- GLM nil input crash fix (PR #1663): handle nil input in GLM `tool_use` blocks

### v0.2.2 — Highlights

v0.2.2 focused on web management and security:

- Agent management UI (PR #1358): Skills CRUD and Tools toggle in the web frontend, Markdown frontmatter parsing
- Voice transcription echo (PR #1214): Groq Whisper-large-v3 transcription echo for Discord/Slack
- Exec security hardening (PR #1360): unauthenticated tool-exec path hardened, `allow_remote` off by default
- Session key sanitization: strip `/` and `\` to prevent path traversal

### v0.2.1 — Highlights

v0.2.1 established PicoClaw's core capability matrix:

- MCP Tools support (PR #282, yuchou87): Model Context Protocol integration with stdio and SSE/HTTP transports — connect any MCP server to extend agent tools
- Agent Vision Pipeline: images referenced via `media://` are auto base64-encoded and injected into multimodal LLMs
- JSONL Memory Store: append-only JSONL session storage with 64-shard locking for concurrency safety and crash resistance
- Model Routing: rule-based message complexity scorer routes simple conversations to lightweight models, reducing API costs
- 4 new channels: Matrix (mautrix), IRC (ergochat), WeCom AIBot (streaming task queue), Discord Proxy
- 3 new providers: Kimi/Moonshot, Minimax, Avian
- Per-tool enable/disable config: Web UI supports toggling individual tool permissions
- `PICOCLAW_HOME` env var: supports multi-instance deployment and containerization

---

*PicoClaw — Lightweight, Cross-platform, Blazing Fast*

Website: picoclaw.io

GitHub: github.com/sipeed/picoclaw

Docs: docs.picoclaw.io

Discord: discord.gg/V4sAZ9XWpN
