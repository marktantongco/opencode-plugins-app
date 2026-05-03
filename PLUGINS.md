# OpenCode Plugins Reference Guide

> Top 10 Best Recommended Plugins for OpenCode AI Coding Agent (2026 Edition)

---

## Table of Contents

1. [Overview](#overview)
2. [Top 10 Plugins](#top-10-plugins)
3. [Installation](#installation)
4. [Category Breakdown](#category-breakdown)
5. [Honorable Mentions](#honorable-mentions)
6. [Ecosystem Resources](#ecosystem-resources)

---

## Overview

This guide curates the **Top 10 OpenCode plugins** based on:
- **Popularity** (stars, downloads, ratings)
- **Utility** (real-world impact on development workflow)
- **Community adoption** (official ecosystem listing, GitHub activity)

All plugins are available on npm and can be added to your `opencode.json` configuration.

---

## Top 10 Plugins

### 1. Dynamic Context Pruning (DCP)

| Property | Value |
|----------|-------|
| **Package** | `opencode-dynamic-context-pruning` |
| **Stars** | 2,348 |
| **Rating** | 4.8 ⭐ |
| **Category** | Token Optimization |
| **License** | AGPL-3.0 |

**Description:** Intelligently manages conversation context to optimize token usage. Automatically reduces token usage by pruning obsolete tool outputs and replacing closed conversation content with high-fidelity technical summaries.

**Key Features:**
- Automatic context compression
- Token usage analysis (`/dcp context`, `/dcp stats`)
- Manual mode toggle
- Decompress/recompress support

**Use Case:** Essential for long coding sessions to reduce token costs by 40-60%

```json
{
  "plugin": ["opencode-dynamic-context-pruning"]
}
```

---

### 2. Morph Fast Apply

| Property | Value |
|----------|-------|
| **Package** | `opencode-morph-plugin` |
| **Stars** | 500 |
| **Rating** | 4.9 ⭐ |
| **Category** | Code Editing |
| **License** | MIT |

**Description:** Fast Apply editing with 10,500+ tok/s code merging, WarpGrep codebase search, and automatic context compaction via Morph API.

**Key Features:**
- Fast Apply (10,500+ tok/s)
- WarpGrep codebase search (+4% on SWE-Bench Pro)
- Public Repo Context search
- Automatic compaction (25,000+ tok/s)

**Use Case:** Best for large files (300+ lines) and multiple scattered changes

```json
{
  "plugin": ["opencode-morph-plugin"]
}
```

---

### 3. Tool Search

| Property | Value |
|----------|-------|
| **Package** | `opencode-tool-search` |
| **Stars** | 120 |
| **Rating** | 4.6 ⭐ |
| **Category** | Token Optimization |
| **License** | MIT |

**Description:** Implements Claude's Tool Search pattern — BM25 + regex search to discover tools on demand, reducing context usage by 69-85%.

**Key Features:**
- BM25 keyword search
- Regex search (case-insensitive)
- Deferred tool descriptions
- Configurable search limit

**Use Case:** Reduces context usage by 69-85% by deferring tool descriptions

```json
{
  "plugin": ["opencode-tool-search"]
}
```

---

### 4. Model Fallback

| Property | Value |
|----------|-------|
| **Package** | `opencode-model-fallback` |
| **Stars** | 85 |
| **Rating** | 4.7 ⭐ |
| **Category** | Reliability |
| **License** | Apache-2.0 |

**Description:** Automatic model fallback plugin. When a model API call fails, the plugin transparently switches to the next model in your configured fallback chain.

**Key Features:**
- Automatic fallback on rate limits
- Per-agent fallback chains
- Global model health tracking
- TTFT timeout (Time-to-first-token)
- Cooldown & auto-recovery
- Toast notifications

**Use Case:** Critical for production to prevent downtime from rate limits

```json
{
  "plugin": ["opencode-model-fallback"]
}
```

---

### 5. Oh My OpenCode

| Property | Value |
|----------|-------|
| **Package** | `oh-my-opencode` |
| **Stars** | 420 |
| **Rating** | 4.8 ⭐ |
| **Category** | Multi-Agent |
| **License** | MIT |

**Description:** Full multi-agent orchestration harness with background agents, pre-built LSP/AST/MCP tools, curated agents, and Claude Code compatibility.

**Key Features:**
- Specialized sub-agents (Explorer, Oracle, Librarian, Designer)
- Background task management
- LSP/AST tools
- tmux integration
- MCP servers support

**Use Case:** Best for complex multi-agent workflows and parallel coding tasks

```json
{
  "plugin": ["oh-my-opencode"]
}
```

---

### 6. Background Agents

| Property | Value |
|----------|-------|
| **Package** | `opencode-background-agents` |
| **Stars** | 180 |
| **Rating** | 4.5 ⭐ |
| **Category** | Multi-Agent |
| **License** | MIT |

**Description:** Claude Code-style background agents for OpenCode with async delegation and context persistence.

**Key Features:**
- Async delegation
- Context persistence
- Background task execution
- Claude Code style

**Use Case:** Run background tasks without blocking main agent workflow

```json
{
  "plugin": ["opencode-background-agents"]
}
```

---

### 7. Safety Net

| Property | Value |
|----------|-------|
| **Package** | `claude-code-safety-net` |
| **Stars** | 320 |
| **Rating** | 5.0 ⭐ |
| **Category** | Safety |
| **License** | MIT |

**Description:** Safety net plugin that catches destructive git and filesystem commands before they execute.

**Key Features:**
- Catches destructive git commands
- Prevents accidental file deletions
- Blocks force pushes
- Confirmation prompts
- Whitelist support

**Use Case:** Essential for preventing catastrophic mistakes in production

```json
{
  "plugin": ["claude-code-safety-net"]
}
```

---

### 8. OpenAI Codex Auth

| Property | Value |
|----------|-------|
| **Package** | `opencode-openai-codex-auth` |
| **Stars** | 250 |
| **Rating** | 4.7 ⭐ |
| **Category** | Authentication |
| **License** | MIT |

**Description:** Use your ChatGPT Plus/Pro subscription instead of API credits. Significant cost savings for existing subscribers.

**Key Features:**
- OAuth with OpenAI
- Use ChatGPT Plus/Pro
- No API credits needed
- Automatic token refresh

**Use Case:** Save costs by using existing ChatGPT subscription for OpenCode

```json
{
  "plugin": ["opencode-openai-codex-auth"]
}
```

---

### 9. Copilot Integration

| Property | Value |
|----------|-------|
| **Package** | `opencode-copilot-plugin` |
| **Stars** | 180 |
| **Rating** | 4.6 ⭐ |
| **Category** | Integration |
| **License** | MIT |

**Description:** Brings GitHub Copilot's custom instructions, skills, agents, and hooks system into OpenCode.

**Key Features:**
- Repo-wide instructions (`.github/copilot-instructions.md`)
- Path-specific instructions
- Custom skills support
- Hook scripts execution
- Slash commands (`/copilot-inspect`, `/copilot-prompt`)

**Use Case:** Leverage existing Copilot customizations in OpenCode

```json
{
  "plugin": ["opencode-copilot-plugin"]
}
```

---

### 10. Native Notifications

| Property | Value |
|----------|-------|
| **Package** | `opencode-notify` |
| **Stars** | 95 |
| **Rating** | 4.4 ⭐ |
| **Category** | Developer Experience |
| **License** | MIT |

**Description:** Native OS desktop notifications for OpenCode — know when tasks complete without staring at the terminal.

**Key Features:**
- Desktop notifications
- Sound alerts
- Task completion notifications
- Error notifications

**Use Case:** Stay informed when long-running tasks complete

```json
{
  "plugin": ["opencode-notify"]
}
```

---

## Installation

Add plugins to your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "opencode-dynamic-context-pruning",
    "opencode-morph-plugin",
    "opencode-model-fallback",
    "claude-code-safety-net",
    "opencode-notify"
  ]
}
```

OpenCode automatically installs npm plugins at startup via Bun.

---

## Category Breakdown

| Category | Plugins | Best For |
|----------|---------|----------|
| Token Optimization | DCP, Tool Search | Reducing costs in long sessions |
| Multi-Agent | Oh My OpenCode, Background Agents | Complex workflows |
| Reliability | Model Fallback | Production stability |
| Safety | Safety Net | Preventing disasters |
| Authentication | Codex Auth | Cost savings |
| Integration | Copilot | Existing workflows |
| Developer Experience | Notify | Productivity |

---

## Honorable Mentions

- **opencode-gemini-auth** — Use existing Gemini plan
- **opencode-snip** — 60-90% token reduction on shell output
- **opencode-mystatus** — Check AI subscription quotas
- **opencode-wakatime** — Track coding activity
- **opencode-sentry-monitor** — Debug with Sentry
- **opencode-daytona** — Isolated sandboxes
- **opencode-devcontainers** — Dev container isolation
- **opencode-worktree** — Git worktree management

---

## Ecosystem Resources

| Resource | URL |
|----------|-----|
| Official Docs | https://opencode.ai/docs/ecosystem/ |
| Community Registry | https://opencode.im/plugins |
| Awesome List | https://awesomeopencode.com/ |
| Marketplace | https://opencode.cafe/ |

---

*Generated: May 2026 • MIT License*
