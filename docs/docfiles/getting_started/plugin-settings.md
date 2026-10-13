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
| **Adapter Class** | Null | The online backend. **Steam Lobby** for Steam. |
| **Client Wait Map** | none | Empty map clients wait in. Strongly recommended. |
| **Snapshot Interval** | 3 s | How often the host sends state. Lower = less lost progress, more traffic. |
| **Reconnect Grace Period** | 30 s | How long the new host waits for previous players. |
| **Inactive Player Timeout** | 300 s | How long a player who left keeps their state for a rejoin. |
| **Leaving Player Pawn** | Keep In World | What happens to the pawn of a player who leaves. |
| **Pause During Grace Period** | on | Pause while players reconnect. |
| **Show Migration Overlay** | on | Show a "reconnecting" screen during a migration. |

All settings are listed in the [Settings Reference](../reference/settings-reference).
