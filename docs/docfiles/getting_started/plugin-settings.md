---
sidebar_position: 4
title: Plugin Settings
---

# Plugin Settings

**Project Settings → Plugins → Host Migration**, stored in `DefaultGame.ini` under
`[/Script/HostMigrationCore.HostMigrationSettings]`.

The most important ones:

| Setting | Default | What it does |
|---|---|---|
| **Hand Over On Window Close** | on | Host closing the window hands the match over first instead of counting as a crash. |
| **Adapter Class** | empty | The online backend. **Steam Lobby** for Steam, **EOS Lobby** for EOS. Empty: picked from `DefaultPlatformService` (Steam, SteamCore, EOS, EOSCore), otherwise Null. |
| **Client Wait Map** | none | Empty map clients wait in. Strongly recommended. |
| **Snapshot Interval** | 3 s | How often the host sends state. Lower = less lost progress, more traffic. |
| **Connect Attempt Timeout** | 30 s | How long one connection attempt may take before it is cancelled and retried. 0 = no limit. |
| **Reconnect Grace Period** | 30 s | How long the new host waits for previous players. |
| **Inactive Player Timeout** | 300 s | How long a player who left keeps their state for a rejoin. |
| **Leaving Player Pawn** | Keep In World | What happens to the pawn of a player who leaves. |
| **Pause During Grace Period** | on | Pause while players reconnect. |
| **Show Migration Overlay** | on | Show a "reconnecting" screen during a migration. |

Every setting has a tooltip in **Project Settings → Plugins → Host Migration**.
