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
| **Adapter Class** | empty | The online backend. **Steam Adapter** for Steam, **EOS Adapter** for EOS. Empty: picked from `DefaultPlatformService` (Steam, SteamCore, EOS, EOSCore), otherwise Null. |
| **Client Wait Map** | none | Empty map clients wait in. Strongly recommended. |
| **Snapshot Interval** | 3 s | How often the host sends state. Lower = less lost progress, more traffic. |
| **Connect Attempt Timeout** | 30 s | How long one connection attempt may take before it is cancelled and retried. 0 = no limit. |
| **Reconnect Grace Period** | 30 s | How long the new host waits for previous players. |
| **Inactive Player Timeout** | 300 s | How long a player who left keeps their state for a rejoin. |
| **Leaving Player Pawn** | Keep In World | What happens to the pawn of a player who leaves. |
| **Keep Host URL Options** | on | The new host opens the map with the host's URL options (game mode settings), minus **Skipped Host URL Options**. |
| **Wait For Game Ready** | off | The new host restores after **Notify Game Ready**, for games that set up the match after the map loads. See [Games that set up the match later](../features/game-ready). |
| **Restore Into Game Pawn** | off | A returning player keeps the pawn the game spawns for them, with the saved pawn's state and position loaded into it. |
| **Pause During Grace Period** | on | Pause while players reconnect. |
| **Show Migration Overlay** | on | Show a "reconnecting" screen during a migration. |
| **Show Debug Overlay** | off | Draw the [debug overlay](testing#debug-overlay) on every machine. |
| **Debug Overlay Corner** | Top Right | Screen corner the debug overlay is drawn in: Top Left, Top Right, Bottom Left or Bottom Right. |

Every setting has a tooltip in **Project Settings → Plugins → Host Migration**.
